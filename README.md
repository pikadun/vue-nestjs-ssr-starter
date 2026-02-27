# Web Template

Minimal full-stack SSR template:
- Frontend: Vue 3 + Vue Router + Reka UI
- Backend: NestJS + Fastify
- Build: Rsbuild 2
- Styling: UnoCSS (PostCSS integration)
- Language: TypeScript

## Requirements

- Node.js >= 22.6.0
- npm

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run type-check
npm run lint
```

## Project Layout

```text
eng/        # Lint, spellcheck, commit rules
public/     # Static public assets
scripts/    # Rsbuild and dev bootstrap config
src/client/ # Vue app and SSR client entry
src/server/ # NestJS app, SSR/todo modules, DB module
src/shared/ # Shared constants/types
```

## License

MIT
