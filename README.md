# chrisrahme.dev

Monorepo for [chrisrahme.dev](https://chrisrahme.dev).

[![Netlify Status](https://api.netlify.com/api/v1/badges/97669e03-bf47-4654-848c-c47bf04f4ca8/deploy-status)](https://app.netlify.com/sites/chrisrahme/deploys)

| Folder     | Description                                            |
| ---------- | ------------------------------------------------------ |
| `website/` | Nuxt app: Server-rendered, deployed to Netlify         |
| `studio/`  | Sanity Studio: content, resume, projects, about, texts |

## Development

```bash
npm install           # root: git hooks only
npm run install:all   # Install website + studio dependencies
npm run dev:website   # Nuxt app on http://localhost:3000 (default)
npm run dev:studio    # Sanity Studio on http://localhost:3333 (default)
```

Each folder has its own `package.json`. Run `npm install` inside `website/` and `studio/` once or `npm run install:all` from the root.

The website reads its Sanity config from `website/.env` (see `website/.env.example`).

## Types

After a change to the schema (`studio/schemaTypes/`) or to the GROQ queries (`website/sanity/queries.ts`), run:

```bash
npm run typegen
```

This regenerates `website/sanity.types.ts`.

## Sanity

- Project `1ff3j3n2`, dataset `production` (public), org `Chris Rahmé`.
- Hosted Studio: https://chrisrahme.sanity.studio (`npx sanity deploy` from `studio/`, app ID in `sanity.cli.ts`).
- Deploy schema changes to the Content Lake: `npx sanity schemas deploy` (from `studio/`).
- One-time import of the old `data/` files: `npx sanity exec scripts/import-legacy-data.ts --with-user-token` (from `studio/`).

## Deployment

The website is server-rendered on Netlify (`nuxt build`, Nitro Netlify preset).
Pages are cached at the edge and revalidated in the background (`swr` route rule in `website/nuxt.config.ts`), so content edits in the Studio go live within a few minutes without needing a build.
Netlify only builds when files under `website/` change.

There are three versions of the chrisrahme.dev website deployed on Netlify:

| Netlify site    | What it serves                                                                               |
| --------------- | -------------------------------------------------------------------------------------------- |
| `chrisrahme`    | https://chrisrahme.dev, built from `main`                                                    |
| `chrisrahme-v2` | https://chrisrahme-v2.netlify.app, frozen snapshot of commit `57b9e03` (branch `archive/v2`) |
| `chrisrahme-v1` | https://chrisrahme-v1.netlify.app, the 2022 VueJS site                                       |
