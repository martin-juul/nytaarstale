# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


## Nytårstalen – Kongeriget Danmark

En lille React + Vite app der viser den årlige nytårstale fra Kongehuset. Taler hentes som JSON-filer fra public/assets/[år].json.

### Kom i gang
- Udvikling: `yarn dev`
- Build: `yarn build`
- Preview: `yarn preview`

Appen forsøger som udgangspunkt at hente talen for det aktuelle år. Du kan skifte år via genvejene eller indtaste et specifikt år.

### Tilføj nye taler
Læg en fil i mappen `public/assets` med filnavnet `[år].json`, fx `public/assets/2025.json`.

Skema for JSON-filen:
```json
{
  "year": 2025,
  "monarch": "H.M. Kong Frederik X",
  "date": "2025-12-31T18:00:00+01:00",
  "title": "Nytårstalen 2025",
  "paragraphs": [
    "Første afsnit ...",
    "Næste afsnit ..."
  ]
}
```

- `year`: Talens årstal (heltal)
- `monarch`: Navn/titel på monarken
- `date`: ISO dato/tid for talen
- `title`: Titel som vises i toppen
- `paragraphs`: Liste af afsnit (strings)

### Design og farver
- Farver følger Dannebrog: rød (#C8102E) og hvid, med neutrale grå nuancer.
- Typografi og layout er inspireret af Apples Human Interface Guidelines: ren, luftig typografi, afrundede kort, diskrete skygger og fokus på læsbarhed.

Bemærk: Dette er et uofficielt projekt og ikke affilieret med Kongehuset.
