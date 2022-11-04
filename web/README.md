# Electricity Maps

**This documentation is specifically for the frontend web/mobile app.**

_If you're looking for more info on the parsers, check out [how to setup Python development environment](https://github.com/electricityMaps/electricitymaps-contrib/wiki/Set-up-local-environment#setup-python-development-environment) and [how to fix a broken parser (and test it locally)](https://github.com/electricityMaps/electricitymaps-contrib/wiki/Fixing-a-broken-parser)._

## Local development

Prerequisites:

- Ensure you have `NodeJS` and `pnpm` installed locally (`brew install pnpm`)
- Run `pnpm install` in both the web and mockserver directories

1. Start the mockserver: `yarn run mockserver`
2. Run app in another tab: `yarn develop`

## Scripts

- `pnpm dev` - start a development server with hot reload.
- `pnpm build` - build for production. The generated files will be on the `dist` folder.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run unit and integration tests related to changed files based on git.
- `pnpm cy:e2e` - work with integration tests. Remember to run `pnpm dev` before!
- `pnpm cy:components` - work with component tests.
  <!-- - `pnpm test:ci` - run all unit and integration tests in CI mode. -->
  <!-- - `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner. -->
  <!-- - `pnpm test:e2e:headless` - run all e2e tests headlessly. -->
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript and ESLint.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.

### TODO: Scripts currently disabled until we're ready

```
    "test:e2e": "pnpm preview:test 'cypress open'",
    "test:e2e:headless": "pnpm preview:test 'cypress run'",
    "test:e2e:ci": "vite build && pnpm preview:test 'cypress run --record'",
```

### Using production API (internal eMap team only)

As an eMap internal team member, you can also run the app connected to production API instead of the mockserver:

- Run `VITE_PUBLIC_ELECTRICITYMAP_PUBLIC_TOKEN='YOUR TOKEN' pnpm dev`
- Add a `?remote=true` query parameter

## Geometries development

See [how to edit world geometries](https://github.com/electricityMaps/electricitymaps-contrib/wiki/Edit-world-geometries).
