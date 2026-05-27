# AKADEMIA IA MADAGASIKARA

Site vitrine du centre de formation à l'Intelligence Artificielle **AKADEMIA IA MADAGASIKARA**.

> Cible : débutants en IA — étudiants, jeunes professionnels, créatifs.
> Voir [`SPECS.md`](./SPECS.md) pour la spécification complète.

---

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- ESLint + Prettier
- Polices Google Fonts (Inter + Plus Jakarta Sans) via `next/font`

À venir aux étapes suivantes : shadcn/ui, MDX pour le blog, Resend pour le contact, Vercel pour l'hébergement.

---

## Prérequis

- **Node.js >= 18.18** (recommandé : Node 20 ou 22)
- **npm >= 9** (ou `pnpm` / `yarn` au choix)

---

## Démarrage en local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Ouvre ensuite [http://localhost:3000](http://localhost:3000).

---

## Scripts npm

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement (hot reload). |
| `npm run build` | Construit la version de production. |
| `npm start` | Démarre le serveur de production (après `build`). |
| `npm run lint` | Exécute ESLint. |
| `npm run format` | Formate le code avec Prettier. |
| `npm run format:check` | Vérifie le formatage sans rien modifier. |
| `npm run typecheck` | Vérifie les types TypeScript sans build. |

---

## Structure

```
.
├── public/                # Assets statiques (favicon, images publiques)
├── src/
│   └── app/               # Routes (App Router)
│       ├── layout.tsx     # Layout racine + polices + metadata
│       ├── page.tsx       # Page d'accueil
│       └── globals.css    # Styles globaux Tailwind
├── tailwind.config.ts     # Palette bleu marine + blanc + tokens
├── next.config.mjs
├── tsconfig.json
├── SPECS.md               # Spécifications fonctionnelles et techniques
└── README.md
```

---

## Palette de marque

| Token | Hex | Usage |
|---|---|---|
| `navy-800` | `#0A1F44` | Couleur principale (fonds sombres, titres) |
| `navy-700` | `#102A56` | Hover sombre |
| `navy-600` | `#1E3A8A` | Accent / liens |
| `navy-500` | `#2D4A8A` | Hover accent |
| `paper` | `#F7F9FC` | Fond clair par défaut |
| `white` | `#FFFFFF` | Surfaces (cards) |
| `ink` | `#1F2937` | Texte principal |
| `muted` | `#6B7280` | Texte secondaire |
| `gold` | `#F4C46B` | Accent parcimonieux (badges premium) |
