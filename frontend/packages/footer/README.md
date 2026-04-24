# @asv/footer-ui (local)

This folder contains a local, buildable package that re-exports the app's footer UI for prototyping a reusable package.

Build:

```bash
cd frontend/packages/footer
npx tsup src/index.ts --format cjs,esm --dts --out-dir dist
```

Usage (local development):

In the app you can `npm install` or `pnpm add` this package by using a file: spec, or link it with `pnpm link`/`npm link`.

Example import:

```ts
import { FooterUI, FooterProps } from '@asv/footer-ui';
```

Example (app): use the mapper to derive package data from global settings and render the `FooterUI` component:

```tsx
import { mapGlobalSettingsToPackageFooterData } from '../../src/features/footer/model/footer.mapper';
import { FooterUI } from '../../src/features/footer/ui';

const data = mapGlobalSettingsToPackageFooterData(settings);
<FooterUI
  data={data}
  legalLinks={[{ label: 'Impressum', to: '/impressum' }]}
/>;
```

CI / Publishing notes:

- A GitHub Actions workflow is available at `.github/workflows/ci.yml` to run tests and build the app and package.
- To publish to npm, add a publish workflow with `NODE_AUTH_TOKEN` configured and run `npm publish --access public` in the package folder.
