# SPECS.md — Site vitrine "AKADEMIA IA MADAGASIKARA"

> Centre de formation à l'Intelligence Artificielle pour débutants — Madagascar.

---

## 1. Vision & Objectifs

### 1.1 Vision
Créer un site vitrine **moderne, rassurant et accessible** qui démystifie l'IA et donne envie aux débutants de se former. Le site doit transformer un visiteur curieux en prospect (inscription à une formation ou prise de contact).

### 1.2 Objectifs business
- **Attirer** les débutants intéressés par l'IA via le SEO et le bouche-à-oreille.
- **Rassurer** sur l'accessibilité des formations (pas besoin d'être ingénieur).
- **Convertir** les visiteurs en leads via le formulaire de contact et l'inscription aux formations.
- **Établir l'autorité** via un blog pédagogique régulièrement alimenté.

### 1.3 Objectifs techniques (KPI)
| Indicateur | Cible |
|---|---|
| Score Lighthouse Performance | ≥ 90 |
| Score Lighthouse Accessibilité | ≥ 95 |
| Score Lighthouse SEO | ≥ 95 |
| Time to First Byte (TTFB) | < 500 ms |
| Largest Contentful Paint (LCP) | < 2.5 s |
| Compatible mobile | 100 % responsive |

---

## 2. Cibles & Personas

### Persona 1 — "Tahina, l'étudiant" (cible principale)
- 21 ans, étudiant à Antananarivo (université ou école sup).
- Entend parler d'IA partout, veut prendre une longueur d'avance.
- Peu ou pas de bases techniques, budget limité.
- **Cherche** : une formation accessible, en français/malgache, qui ouvre des débouchés.

### Persona 2 — "Hery, le jeune pro"
- 28 ans, déjà en poste (marketing, gestion, communication).
- Veut intégrer l'IA dans son métier (vibe coding, génération de visuels, automatisation).
- **Cherche** : une formation courte, pratique, orientée outils (Kiro, ChatGPT, Midjourney, etc.).

### Persona 3 — "Mialy, la créative"
- 25 ans, designer, communicante ou freelance.
- Veut maîtriser les outils d'IA générative pour booster sa productivité.
- **Cherche** : Design IA, prompts, workflow créatif assisté.

---

## 3. Arborescence du site

```
/                       → Accueil
/a-propos               → À propos
/formations             → Liste des formations
/formations/[slug]      → Détail d'une formation
/blog                   → Liste des articles
/blog/[slug]            → Article de blog
/faq                    → FAQ
/contact                → Contact
/mentions-legales       → Mentions légales
/politique-confidentialite → RGPD
```

---

## 4. Spécifications fonctionnelles par page

### 4.1 Accueil (`/`)
- **Hero** : titre accrocheur ("Apprenez l'IA à Madagascar, même en partant de zéro"), sous-titre, 2 CTA (Voir les formations / Nous contacter), illustration moderne sur fond bleu marine.
- **Bandeau de réassurance** : 3-4 chiffres clés (ex. "+200 apprenants", "95 % de satisfaction", "Formateurs experts", "Présentiel à Tana + en ligne").
- **Section "Pourquoi nous"** : 3 piliers (Pédagogie sans jargon / Accompagnement humain / Projets concrets).
- **Aperçu des formations** : les 3 formations phares en cards (IA pour étudiants, Vibe coding avec Kiro, Design IA), lien "Voir toutes les formations".
- **Témoignages** : 3 témoignages d'anciens apprenants (photo, nom, formation, citation).
- **Derniers articles du blog** : 3 articles récents.
- **CTA final** : bandeau "Prêt à démarrer ?" → contact.

### 4.2 À propos (`/a-propos`)
- Histoire et mission du centre.
- L'équipe pédagogique (photo, nom, rôle, bio courte).
- Nos valeurs.
- Nos partenaires / certifications.

### 4.3 Liste des formations (`/formations`)
- Grille de cards (titre, durée, niveau, prix, badge "débutant", court descriptif, image).
- Filtres optionnels (niveau, durée, format présentiel/en ligne).
- Click sur une card → page détail.

### 4.4 Détail formation (`/formations/[slug]`)
- En-tête : titre, durée, prix, niveau, dates de prochaines sessions.
- Description détaillée.
- Programme (modules, syllabus).
- Pré-requis.
- Pour qui ?
- Compétences acquises.
- Modalités (présentiel, en ligne, hybride, financement CPF).
- CTA : "S'inscrire" ou "Demander un entretien" (renvoie vers contact pré-rempli).

### 4.5 FAQ (`/faq`)
- Questions/réponses regroupées par catégorie : Inscription, Pédagogie, Tarifs & financement, Certification.
- Accordéons (ouvrir/fermer).
- Barre de recherche dans la FAQ (bonus).

### 4.6 Contact (`/contact`)
- Formulaire : Nom, Prénom, Email, Téléphone (optionnel), Sujet (select : info formation / autre), Message, case RGPD.
- Coordonnées : adresse, téléphone, email, horaires.
- Carte (Google Maps ou OpenStreetMap).
- Liens réseaux sociaux.
- Validation côté client + côté serveur, anti-spam (honeypot ou hCaptcha).

### 4.7 Blog (`/blog` et `/blog/[slug]`)
- Liste paginée d'articles avec image, titre, extrait, date, temps de lecture, catégorie.
- Page article : titre, image de couverture, contenu en MDX, auteur, date, partage social, articles liés.
- Tags / catégories.
- Flux RSS (bonus).

---

## 5. Spécifications de design & UX

### 5.1 Direction artistique
- **Style** : moderne, épuré, professionnel mais chaleureux.
- **Palette** :
  - **Bleu marine** (`#0A1F44` à `#102A56`) — couleur principale, évoque la confiance, la profondeur, le savoir.
  - **Blanc** (`#FFFFFF`) et **blanc cassé** (`#F7F9FC`) — fond et respiration.
  - **Bleu marine clair** (`#1E3A8A` ou `#2D4A8A`) — états hover, accents.
  - **Gris anthracite** (`#1F2937`) — texte principal.
  - **Gris doux** (`#6B7280`) — texte secondaire.
  - Optionnel : un **accent doré clair** (`#F4C46B`) très parcimonieux pour les badges premium / CPF (à valider).
- **Typographie** : sans-serif lisible (**Inter** ou **Plus Jakarta Sans**) pour le corps ; titre légèrement plus expressif (**Manrope** ou **Plus Jakarta Sans Bold**).
- **Iconographie** : pictogrammes en ligne (Lucide), bleu marine ou blanc selon le fond.
- **Imagerie** : photos d'apprenants malgaches + illustrations abstraites évoquant les neurones / data, dans des tons bleu marine et blanc cohérents.

### 5.2 Principes UX
- Navigation principale visible en haut, sticky.
- Menu mobile en hamburger.
- Footer riche : liens, newsletter, mentions légales, réseaux sociaux.
- Tous les CTA principaux contrastent fortement.
- Breadcrumbs sur les pages profondes (formations, blog).
- Mode sombre (bonus, V2).

### 5.3 Accessibilité (WCAG 2.1 AA)
- Contrastes conformes.
- Navigation clavier.
- Tags `alt` sur toutes les images.
- Landmarks ARIA (header, main, nav, footer).
- Focus visibles.
- Tailles de police relatives (rem).

---

## 6. Spécifications techniques

### 6.1 Stack recommandée (voir section 8)
- Framework : **Next.js 14+ (App Router)**
- Langage : **TypeScript**
- Styles : **Tailwind CSS** + composants **shadcn/ui**
- Contenu blog : **MDX** (Contentlayer ou `next-mdx-remote`)
- Formulaire : API Route Next + **Resend** pour l'email
- Déploiement : **Vercel**

### 6.2 SEO
- Metadata par page (title, description, OpenGraph, Twitter Card).
- Sitemap.xml et robots.txt automatiques.
- Données structurées JSON-LD : `Organization`, `Course` (formations), `Article` (blog), `FAQPage`.
- URLs propres, lisibles, en français.
- Balises `hreflang` (français uniquement en V1, mais préparé pour multilingue).

### 6.3 Performance
- Images optimisées via `next/image`.
- Polices auto-hébergées via `next/font`.
- Lazy-loading natif des images sous la ligne de flottaison.
- Pré-rendering statique (SSG) partout où c'est possible.

### 6.4 Sécurité & RGPD
- Bandeau cookies conforme (Tarteaucitron ou solution simple maison).
- Pages mentions légales et politique de confidentialité.
- Pas de tracking sans consentement.
- Validation et sanitization des entrées du formulaire (Zod).
- Rate-limiting sur l'API contact.

### 6.5 Qualité de code
- ESLint + Prettier.
- Conventions de commit (Conventional Commits).
- Husky + lint-staged en pre-commit (optionnel).
- Tests unitaires sur les utils (Vitest, optionnel V1).

---

## 7. Modèle de contenu

### 7.0 Catalogue initial des formations (V1)

Trois formations phares au lancement :

#### Formation 1 — "IA pour étudiants"
- **Slug** : `ia-pour-etudiants`
- **Cible** : étudiants du supérieur, lycéens en terminale.
- **Niveau** : Débutant.
- **Format** : présentiel + en ligne (hybride).
- **Objectif** : comprendre ce qu'est l'IA, savoir utiliser ChatGPT et les outils d'IA pour ses études (recherche, rédaction, révision, projets), comprendre les enjeux éthiques.
- **Modules clés** :
  1. Qu'est-ce que l'IA ? (vulgarisation)
  2. Maîtriser ChatGPT et les LLM pour étudier
  3. Outils d'IA pour la recherche et la rédaction
  4. IA et créativité (images, vidéos)
  5. Éthique, biais, sources fiables
  6. Mini-projet de fin de formation

#### Formation 2 — "Vibe coding avec KIRO"
- **Slug** : `vibe-coding-avec-kiro`
- **Cible** : débutants en programmation, jeunes pros, entrepreneurs.
- **Niveau** : Débutant à intermédiaire.
- **Format** : en ligne ou hybride.
- **Objectif** : apprendre à créer des applications, sites et outils en collaborant avec un assistant IA (Kiro), sans avoir un parcours dev classique.
- **Modules clés** :
  1. Introduction au vibe coding et à Kiro
  2. Décrire un projet à une IA (prompts efficaces, specs)
  3. Construire un site vitrine avec Kiro
  4. Construire une mini-app web avec Kiro
  5. Itérer, déboguer, comprendre le code généré
  6. Déployer son projet en ligne
  7. Projet final accompagné

#### Formation 3 — "Design IA"
- **Slug** : `design-ia`
- **Cible** : designers, communicants, marketeurs, freelances créatifs.
- **Niveau** : Débutant à intermédiaire.
- **Format** : en ligne ou hybride.
- **Objectif** : intégrer l'IA générative dans le workflow créatif (visuels, identité, contenus, mockups) pour gagner en productivité et créativité.
- **Modules clés** :
  1. Panorama des outils d'IA visuelle (Midjourney, DALL·E, Stable Diffusion, etc.)
  2. L'art du prompt visuel
  3. Identité de marque assistée par IA
  4. Maquettes et UI assistées par IA
  5. Vidéo et motion design avec l'IA
  6. Workflow pro et droits d'usage
  7. Projet créatif final



### 7.1 Formation
```ts
type Formation = {
  slug: string
  title: string
  excerpt: string         // résumé court (carte)
  description: string     // contenu détaillé (MDX)
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  duration: string        // ex. "3 jours", "6 semaines"
  price: number
  format: 'Présentiel' | 'En ligne' | 'Hybride'
  cpfEligible: boolean
  prerequisites: string[]
  audience: string[]      // pour qui
  skills: string[]        // compétences acquises
  modules: { title: string; description: string }[]
  nextSessions: string[]  // dates ISO
  coverImage: string
}
```

### 7.2 Article de blog
```ts
type Post = {
  slug: string
  title: string
  excerpt: string
  content: string         // MDX
  coverImage: string
  author: { name: string; avatar: string; bio?: string }
  category: string
  tags: string[]
  publishedAt: string     // ISO
  readingTime: number     // minutes
}
```

### 7.3 FAQ
```ts
type FaqItem = {
  category: 'Inscription' | 'Pédagogie' | 'Tarifs' | 'Certification'
  question: string
  answer: string          // markdown autorisé
}
```

---

## 8. Hors-scope V1
- Espace apprenant connecté.
- Paiement en ligne.
- Multi-langue.
- Newsletter avancée (juste un champ email vers un provider en V1).
- LMS interne.

---

## 9. Livrables
- Code source sur GitHub (branches `main` + feature branches).
- Site déployé sur Vercel.
- Document SPECS.md (ce fichier) maintenu à jour.
- README avec instructions d'installation locale.
