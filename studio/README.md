# Studio

Sanity Studio for [chrisrahme.dev](https://chrisrahme.dev). See the root README for the full picture.

```bash
npm install
npm run dev              # http://localhost:3333
npm run typegen          # schema.json + ../website/sanity.types.ts
npm run import:legacy    # one-time import of the old website/data files (needs a logged-in CLI)
npx sanity schemas deploy
npx sanity deploy        # hosts the Studio on sanity.studio
```
