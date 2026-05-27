# Guide de déploiement — AKADEMIA IA MADAGASIKARA

Ce document explique comment **fusionner toutes les étapes** dans `main`, puis **déployer** le site sur Vercel.

---

## Étape A — Fusionner les branches dans `main`

Tu as 10 Pull Requests, chacune correspondant à une étape :

| PR | Branche | Étape |
|---|---|---|
| #1 | `chore/update-specs` | SPECS finalisé |
| #2 | `step-01-init` | Initialisation Next.js |
| #3 | `step-02-design-system` | Design system + layout |
| #4 | `step-03-homepage` | Page d'accueil |
| #5 | `step-04-about` | Page À propos |
| #6 | `step-05-formations` | Formations (liste + détails) |
| #7 | `step-06-faq` | FAQ |
| #8 | `step-07-blog` | Blog MDX |
| #9 | `step-08-contact` | Contact + Resend |
| #10 | `step-09-seo-rgpd` | SEO + RGPD |
| #11 | `step-10-deploy` | Polissage final |

### Option recommandée — Tout-en-un (la plus rapide)

La branche `step-10-deploy` contient **toutes les étapes précédentes**. Pour pousser le projet entier en production en un seul merge :

1. Sur GitHub, va sur la PR de `step-10-deploy`.
2. **Change la base** : par défaut elle cible `step-09-seo-rgpd`. Clique sur le sélecteur de base et choisis `main`.
3. La PR affiche maintenant **tous les changements** depuis le repo vide jusqu'au site complet.
4. Clique **"Merge pull request"** → "Confirm merge".
5. Tu peux ensuite supprimer toutes les autres branches (bouton "Delete branch" sur chaque PR).

### Option alternative — Étape par étape

Si tu veux garder l'historique des étapes dans `main` (10 commits distincts) :

1. Merge la PR #2 (`step-01-init`) dans `main`.
2. Sur la PR #3, change la base de `step-01-init` → `main`. Merge.
3. Continue ainsi pour PR #4, 5, 6, 7, 8, 9, 10, 11.

C'est plus long, mais l'historique de `main` raconte le projet étape par étape.

---

## Étape B — Déployer sur Vercel

### B.1 Créer le projet Vercel

1. Va sur https://vercel.com/new
2. Connecte ton compte GitHub si ce n'est pas déjà fait.
3. Sélectionne le repo **`foriasser-hub/ewa`**.
4. Vercel détecte automatiquement Next.js. **Ne change rien** aux paramètres par défaut.
5. **Avant de cliquer "Deploy"**, configure les variables d'environnement (voir B.2).

### B.2 Configurer les variables d'environnement

Dans la section **Environment Variables** du formulaire Vercel, ajoute :

| Nom | Valeur | Exemple |
|---|---|---|
| `RESEND_API_KEY` | Ta clé Resend | `re_xxxxxxx` |
| `CONTACT_FROM_EMAIL` | Adresse expéditrice | `onboarding@resend.dev` (ou ton domaine vérifié) |
| `CONTACT_TO_EMAIL` | Adresse de réception | `contact@akademia-ia.mg` |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site | `https://akademia-ia.mg` (ou l'URL Vercel temporaire) |

**Important** : ces variables doivent être définies pour les 3 environnements Vercel (Production, Preview, Development).

### B.3 Premier déploiement

1. Clique **Deploy**.
2. Patiente ~2 minutes : Vercel installe les dépendances, compile, déploie.
3. Tu obtiens une URL du type `https://ewa-xyz123.vercel.app`. **Le site est en ligne.**

### B.4 Tester le site déployé

Vérifie ces 5 points :

- [ ] La page d'accueil s'affiche correctement
- [ ] http://[ton-url]/sitemap.xml renvoie une liste d'URLs
- [ ] http://[ton-url]/robots.txt est correct
- [ ] Tu peux envoyer un message depuis `/contact` et le **recevoir** sur ton email
- [ ] Le bandeau cookies apparaît à la première visite

---

## Étape C — Connecter un domaine personnalisé

### C.1 Acheter un domaine (si ce n'est pas déjà fait)

Recommandés : Namecheap, OVH, Gandi, ou un registrar local malgache.
Suggestion : `akademia-ia.mg` ou `akademia-ia.com` ou `akademia-ia-mg.com`.

### C.2 Lier le domaine à Vercel

1. Sur Vercel, va dans ton projet → **Settings** → **Domains**.
2. Clique **Add**, tape ton domaine (ex. `akademia-ia.mg`).
3. Vercel te donne 2 enregistrements DNS à ajouter chez ton registrar :
   - Un **A record** pour `@` pointant vers `76.76.21.21`
   - Un **CNAME record** pour `www` pointant vers `cname.vercel-dns.com`
4. Va chez ton registrar (zone DNS), ajoute ces enregistrements.
5. Patiente 5 à 60 minutes (propagation DNS). Vercel te confirme par email quand c'est actif.

### C.3 Mettre à jour `NEXT_PUBLIC_SITE_URL`

Une fois le domaine actif, sur Vercel → **Settings** → **Environment Variables**, change :
- `NEXT_PUBLIC_SITE_URL` → `https://akademia-ia.mg` (ou ton domaine final)

Puis **redeploie** (onglet Deployments → 3 points sur le dernier déploiement → "Redeploy").

---

## Étape D — Vérifier avec Resend

### D.1 Vérifier ton domaine sur Resend (recommandé)

Sans domaine vérifié, tes emails partent depuis `onboarding@resend.dev` — ils risquent d'atterrir en spam.

1. Sur https://resend.com → **Domains** → **Add Domain**.
2. Suis les instructions : Resend te donne 3 enregistrements DNS (DKIM, SPF, etc.) à ajouter.
3. Une fois validé, change `CONTACT_FROM_EMAIL` sur Vercel pour utiliser ton vrai domaine, ex. `contact@akademia-ia.mg`.

---

## Étape E — Maintenance

### Ajouter un article de blog

1. Clone le repo en local.
2. Crée un fichier `.mdx` dans `src/content/posts/`. Exemple :

   ```mdx
   ---
   title: 'Mon nouvel article'
   excerpt: 'Une phrase courte et accrocheuse.'
   category: 'Guide'
   publishedAt: '2026-06-15'
   readingTime: 6
   coverTheme: 'gradient'
   ---

   Contenu en **Markdown / MDX**...
   ```

3. Commit + push sur `main`.
4. Vercel redéploie **automatiquement** dans la minute. L'article apparaît sur `/blog`.

### Modifier une formation

Édite `src/lib/data/formations.ts`. Push sur `main`. Vercel redéploie.

### Modifier la FAQ

Édite `src/lib/data/faq.ts`.

### Modifier les coordonnées / le pied de page / le menu

Édite `src/lib/site-config.ts`.

---

## Aide

En cas de problème de déploiement :
1. Va dans l'onglet **Deployments** sur Vercel.
2. Clique sur le déploiement en échec.
3. L'onglet **Build Logs** te dit exactement quelle ligne pose problème.

Bon déploiement ! 🚀
