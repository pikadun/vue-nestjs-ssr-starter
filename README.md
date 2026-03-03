# Web Template

A lightweight SSR template for Vue 3 + NestJS (with a Todo example).

## Tech Stack

- Vue 3 + Vue Router (SSR) + PrimeVue
- NestJS + Fastify
- Rsbuild 2 + TypeScript
- Sequelize + SQLite (`:memory:`)
- Zod + `nestjs-zod`

## Requirements

- Node.js >= 22.6.0
- npm

## Quick Start

```bash
npm install
npm run dev
```

Default development URL: `http://localhost:8888/development`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run type-check`

## Project Layout

```text
eng/        # Engineering configuration
scripts/    # Build and development bootstrap
src/client/ # Frontend and SSR app composition
src/server/ # Nest service and SSR/API modules
src/shared/ # Shared code for frontend and backend
```

## TODO

- PrimeVue components currently use named imports (e.g. `import { Button } from 'primevue'`) as a workaround for an Rsbuild ESM default export issue caused by its internal ESM runner. This only affects the dev environment. Once the upstream fix lands, remove these explicit named imports from Vue components and rely on auto-imports instead. Tracking: https://github.com/web-infra-dev/rsbuild/issues/7277

- The project currently suffers from a FOUC (Flash of Unstyled Content) issue during SSR. PrimeVue styles are not inlined at server render time, causing a visible style flash on first load. This needs to be resolved upstream by the PrimeVue community. Tracking: https://github.com/primefaces/primevue/issues/7289, https://github.com/primefaces/primevue/issues/8044

## License

MIT
