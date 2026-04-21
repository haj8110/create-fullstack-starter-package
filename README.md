# create-fullstack-starter

**Scaffold a production-grade full‑stack app (Express + React/Vite) with a backend-first architecture—ready for real products, not demos.**

**Branding tagline**: **“Ship a scalable backend + modern React front-end in minutes.”**

---

## Key features

- **Backend-first architecture**: controllers/services/routes/config layout that scales past “hello world”.
- **Modern front-end**: React + Vite templates (TypeScript or JavaScript).
- **Multiple databases**: `mongodb` and `postgres` scaffolding (more coming).
- **Optional auth module**: JWT auth + secure password hashing scaffolding (`--auth`).
- **Interactive by default**: prompts for language, database, and auth when flags aren’t provided.
- **Workspace-style DX**: a root `package.json` that runs both `backend` and `frontend` with a single `npm run dev`.
- **Batteries included**: env template generation, sensible scripts, and predictable folder structure.

---

## Tech stack

- **CLI**: Node.js, TypeScript, Commander, Inquirer, Ora
- **Backend**: Node.js, Express (TypeScript or ESM JavaScript)
- **Frontend**: React, Vite (TypeScript or JavaScript)
- **Databases**: MongoDB, PostgreSQL
- **Auth (optional)**: JWT (backend + front-end hooks/helpers)

---

## CLI usage

Run without installing globally:

```bash
npx create-fullstack-starter@latest my-app
```

This will prompt you for language, database, and whether to include auth.

### Flags

```bash
--ts                 use TypeScript templates
--js                 use JavaScript (ESM) templates
--db <db>            database: mongodb | postgres
--auth               include authentication module (JWT)
--no-auth            exclude authentication module
--pm <pm>            package manager: pnpm | yarn | npm
--no-install         skip installing dependencies
--force              overwrite target directory if not empty
--debug              print debug information
```

### Examples

```bash
# TypeScript + MongoDB + auth
npx create-fullstack-starter@latest my-app --ts --db mongodb --auth

# JavaScript + Postgres, skip install (CI / scripting)
npx create-fullstack-starter@latest my-app --js --db postgres --no-install
```

---

## Quick start (generated app)

```bash
npx create-fullstack-starter@latest my-app
cd my-app
npm run dev
```

Then open:
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000` (exact port depends on the template/env)

---

## What you get (generated folder structure)

```text
my-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── index.(ts|js)
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── package.json
```

### How the backend is organized

- **controllers/**: HTTP request/response orchestration (thin layer)
- **services/**: business logic (thick layer)
- **routes/**: API surface and route grouping
- **middleware/**: auth, validation, cross-cutting concerns
- **config/**: environment and database wiring

---

## Screenshots (placeholders)

Add screenshots/gifs under `docs/screenshots/` and update these links:

- `docs/screenshots/cli.png` (CLI prompt flow)
- `docs/screenshots/app.png` (frontend home)
- `docs/screenshots/auth.png` (login/register)

Example:

```md
![CLI](docs/screenshots/cli.png)
```

---

## Why this project (positioning)

Many starters optimize for “a fun demo” or a specific framework opinion. This project is intentionally:

- **Backend-first**: designed to grow into a real API (layered structure, clear boundaries).
- **Framework-agnostic on purpose**: Express + Vite are boring in the best way—easy to hire for, deploy, and maintain.
- **CLI-driven**: you generate a new app consistently, instead of cloning a repo and deleting half of it.
- **Modular**: auth is an opt-in module, not something you’re forced to rip out.

If you like stacks like T3, this aims to be the **simpler, more backend-oriented “ship it” alternative**—with room to add enterprise features without refactoring from scratch.

---

## 5 “wow features” (ideas to stand out)

- **Composable feature packs**: `auth`, `billing`, `rbac`, `emails`, `files`, etc. that scaffold end-to-end (API + UI + env + docs).
- **One-command deploy previews**: generate Docker + a minimal CI workflow for PR preview environments.
- **API contract generation**: generate OpenAPI + typed client for the React app by default.
- **Production observability starter**: structured logging, request IDs, and basic metrics with zero configuration.
- **Upgrade-safe templates**: a codemod-style “upgrade” command to apply starter improvements to existing projects.

---

## Make the CLI more powerful (recommended upgrades)

- **Interactive setup**: detect defaults (package manager, node version) and ask only what’s missing.
- **Template selection**: choose backend (Express/Fastify) and database layer (Prisma/Drizzle/native driver).
- **Feature toggles**: `--features auth,billing,rbac,emails,files,rate-limit` to scaffold integrated modules.
- **Non-interactive mode**: `--yes` to accept defaults for CI and automation.
- **Update command**: `create-fullstack-starter upgrade` to apply template improvements safely.

---

## Roadmap

See `ROADMAP.md`.

---

## Contributing

Contributions are welcome—especially templates, database integrations, tests, docs, and DX improvements.

- Read `CONTRIBUTING.md`
- Look for issues labeled **good first issue** or **help wanted**

---

## License

MIT — see `LICENSE`.
