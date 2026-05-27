# AKADEMIA IA MADAGASIKARA

Site vitrine officiel d'**AKADEMIA IA MADAGASIKARA**, centre de formation à
l'Intelligence Artificielle pour débutants à Madagascar.

> Voir [`SPECS.md`](./SPECS.md) pour la spécification complète et
> [`DEPLOY.md`](./DEPLOY.md) pour les instructions de déploiement.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + composants shadcn-style
- **MDX** pour le blog (`next-mdx-remote` + `gray-matter` + `remark-gfm`)
- **Resend** pour l'envoi d'emails du formulaire de contact
- **Zod** pour la validation des formulaires
- **Recharts** + **jose** (signature de cookie) pour le back-office `/admin`
- Polices via `next/font` : Inter + Plus Jakarta Sans
- Hébergement : **Vercel**

---

## Prérequis

- Node.js >= 18.18 (recommandé : 20 ou 22)
- npm >= 9 (ou pnpm / yarn)
- Un compte [Resend](https://resend.com) (clé API gratuite, jusqu'à 100 emails/jour)

---

## Démarrage en local

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env.local depuis le template
cp .env.example .env.local

# 3. Remplir les valeurs dans .env.local (au minimum RESEND_API_KEY)
# Sans clé Resend, le formulaire fonctionne en "mode mock" :
# il ne crashe pas, il logue le message dans la console serveur.

# 4. Lancer le serveur de développement
npm run dev
```

→ Ouvrir http://localhost:3000

---

## Scripts npm

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement avec hot reload |
| `npm run build` | Build de production |
| `npm start` | Démarre le serveur de production (après `build`) |
| `npm run lint` | Lance ESLint |
| `npm run format` | Formate tout le code avec Prettier |
| `npm run typecheck` | Vérifie les types TypeScript sans build |

---

## Structure du projet

```
.
├── public/                       # Assets statiques
├── src/
│   ├── app/
│   │   ├── api/contact/          # API route du formulaire
│   │   ├── a-propos/             # Page À propos
│   │   ├── blog/                 # Liste + [slug] articles
│   │   ├── contact/              # Page de contact
│   │   ├── faq/                  # Page FAQ
│   │   ├── formations/           # Liste + [slug] formations
│   │   ├── mentions-legales/
│   │   ├── politique-confidentialite/
│   │   ├── icon.svg              # Favicon
│   │   ├── apple-icon.svg        # Icône iOS
│   │   ├── layout.tsx            # Layout racine (Header + Footer + JSON-LD)
│   │   ├── not-found.tsx         # Page 404 custom
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── robots.ts             # robots.txt dynamique
│   │   └── sitemap.ts            # sitemap.xml dynamique
│   ├── components/
│   │   ├── mdx/                  # Typographie pour le rendu MDX
│   │   ├── sections/             # Sections de chaque page
│   │   ├── site/                 # Header, Footer, Logo, MobileNav, CookieBanner
│   │   └── ui/                   # Button, Card, Badge réutilisables
│   ├── content/posts/            # Articles de blog en .mdx
│   └── lib/
│       ├── data/                 # Données (formations, FAQ, témoignages, posts)
│       ├── contact-schema.ts     # Schéma Zod du formulaire
│       ├── email.ts              # Wrapper Resend
│       ├── site-config.ts        # Nom, nav, coordonnées, réseaux
│       └── utils.ts              # cn() + formatDate()
├── .env.example                  # Template des variables d'environnement
├── DEPLOY.md                     # Guide de déploiement Vercel
├── SPECS.md                      # Spécifications fonctionnelles
└── README.md
```

---

## Comment ajouter du contenu

### Un nouvel article de blog

Crée un fichier `.mdx` dans `src/content/posts/` :

```mdx
---
title: 'Titre de l'article'
excerpt: 'Phrase d'accroche courte.'
category: 'Guide'                  # Guide | Outils | Tendances | ...
publishedAt: '2026-06-15'
readingTime: 6
coverTheme: 'gradient'             # navy | gradient | gradient-warm
---

Le contenu en **Markdown / MDX** : titres, listes, [liens](/formations),
tableaux, citations, code...
```

L'article apparaît automatiquement sur `/blog` et `/blog/<slug>`.

### Une nouvelle formation

Édite `src/lib/data/formations.ts` et ajoute un objet dans le tableau `formations`.

### Une question dans la FAQ

Édite `src/lib/data/faq.ts`.

### Les coordonnées, la nav, les réseaux sociaux

Édite `src/lib/site-config.ts`.

---

## Palette de marque

| Token | Hex | Usage |
|---|---|---|
| `navy-800` | `#0A1F44` | Couleur principale, fonds sombres |
| `navy-700` | `#102A56` | États hover sombres |
| `navy-600` | `#1E3A8A` | Accents, liens |
| `navy-500` | `#2D4A8A` | Hover accent |
| `paper` | `#F7F9FC` | Fond clair |
| `white` | `#FFFFFF` | Surfaces (cards) |
| `ink` | `#1F2937` | Texte principal |
| `muted` | `#6B7280` | Texte secondaire |
| `gold` | `#F4C46B` | Accent parcimonieux (badges) |

---

## Déploiement

Voir [`DEPLOY.md`](./DEPLOY.md) pour le guide pas-à-pas (fusion des branches,
configuration Vercel, variables d'environnement, domaine personnalisé,
vérification Resend).

---

## Licence

© 2026 AKADEMIA IA MADAGASIKARA. Tous droits réservés.



---

## Back-office `/admin`

Une interface d'administration est disponible à `https://ton-domaine/admin`.

### Fonctionnalités

- **Dashboard** : 4 KPIs (formations actives, articles publiés, messages 30 j, taux de traitement) + 2 graphiques Recharts (tendance des messages, répartition par sujet).
- **Formations / Articles / FAQ / Témoignages** : CRUD complet avec table, recherche, filtres et pagination.
- **Messages** : boîte de réception des soumissions du formulaire de contact (lecture, mark-as-read, archivage, suppression, réponse par mail).
- **Paramètres** : diagnostic en lecture seule des variables d'environnement.

### Accès

Le back-office est protégé par un mot de passe unique + cookie signé (12 h, JWT HS256 via `jose`). Le middleware Next.js redirige automatiquement les requêtes non authentifiées vers `/admin/login`.

Variables d'environnement requises (voir `.env.example`) :

```env
ADMIN_PASSWORD=mot-de-passe-long-et-aleatoire
ADMIN_SESSION_SECRET=secret-genere-avec-openssl-rand-base64-48
```

### Persistance — V1

Le back-office utilise un **store en mémoire** dans cette première version. Les données sont seedées au démarrage depuis les fichiers existants (`src/lib/data/*` et `src/content/posts/*.mdx`), mais **les modifications faites depuis l'admin sont perdues au prochain redémarrage**.

C'est volontaire : ça permet de tester le back-office sans configurer de base de données. Pour passer en production avec persistance, voir la section suivante.

### Migration vers une base de données

Le module `src/lib/admin/store.ts` expose une API stable :

```ts
adminFormations: { list, get, create, update, remove }
adminPosts:      { list, get, create, update, remove }
adminFaq:        { list, get, create, update, remove }
adminTestimonials: { list, get, create, update, remove }
adminMessages:   { list, get, create, setStatus, remove }
```

Pour migrer, il suffit de réimplémenter ces fonctions avec **Prisma + Postgres** (Vercel Postgres / Neon / Supabase) — les pages CRUD n'ont pas à être modifiées. Étapes typiques :

1. `npm install prisma @prisma/client && npx prisma init`
2. Définir le schéma dans `prisma/schema.prisma` à partir des types `AdminFormation`, `AdminPost`, etc.
3. `npx prisma migrate dev`
4. Remplacer le contenu de `store.ts` par des appels Prisma.