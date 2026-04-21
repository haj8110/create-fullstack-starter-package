## Suggested GitHub issues (ready to file)

GitHub CLI isn’t available in this environment, so below are **10 copy/paste-ready issues** with suggested labels.

When filing, add labels:
- `good first issue` for beginner-friendly work
- `help wanted` for larger/ambiguous work

---

### 1) Add `--yes` / non-interactive defaults

**Labels**: `good first issue`

**Problem**
The CLI prompts by default. This is great locally, but makes CI and scripted scaffolding harder.

**Acceptance criteria**
- Add `--yes` (or `-y`) that accepts defaults when a flag is not provided.
- Works with `--ts/--js`, `--db`, and `--auth/--no-auth` resolution.
- Update README usage examples.

---

### 2) Add a `--features` flag (CSV) for feature packs

**Labels**: `help wanted`

**Problem**
Auth is currently a single boolean feature. We want a scalable mechanism for multiple feature packs.

**Acceptance criteria**
- Add `--features auth,billing,rbac` parsing (even if only `auth` is implemented initially).
- Design a folder convention under `templates/` for packs (e.g. `templates/packs/<pack>/<backend|frontend>-<ts|js>`).
- Keep backwards compatibility with `--auth`.

---

### 3) Add Docker support templates for generated apps

**Labels**: `help wanted`

**Problem**
Generated apps should run in Docker for local development and production builds.

**Acceptance criteria**
- Add Dockerfiles for backend and frontend.
- Add `docker-compose.yml` for backend + selected DB.
- Document usage in generated project README or root README output.

---

### 4) Add GitHub Actions CI for this repo

**Labels**: `good first issue`

**Problem**
We need consistent checks for PRs.

**Acceptance criteria**
- Add a workflow that runs on PRs and pushes to default branch.
- Steps: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`.
- Cache dependencies.

---

### 5) Add a “generate app” smoke test to CI

**Labels**: `help wanted`

**Problem**
CLI regressions often only show up after scaffolding.

**Acceptance criteria**
- In CI, run the CLI to generate an app into a temp folder.
- Ensure required files exist (`backend/package.json`, `frontend/package.json`, root `package.json`).
- Optionally run `npm install` in generated app (or at least validate scripts).

---

### 6) Improve Windows path / ESM edge cases documentation

**Labels**: `good first issue`

**Problem**
Windows users can hit path and shell differences; also ESM can surprise contributors.

**Acceptance criteria**
- Add a docs section to README/CONTRIBUTING covering Windows + PowerShell tips.
- Add troubleshooting section (common errors and fixes).

---

### 7) Postgres template: migrations + ORM decision

**Labels**: `help wanted`

**Problem**
Postgres scaffolding should include a coherent migrations story.

**Acceptance criteria**
- Choose a default approach (Prisma/Drizzle/Knex/native) and implement it in templates.
- Provide `.env.example` values and a minimal model.
- Add a seed or example route that touches the DB.

---

### 8) Auth pack: refresh tokens + logout endpoint

**Labels**: `help wanted`

**Problem**
JWT-only access tokens are not enough for production apps.

**Acceptance criteria**
- Add refresh token flow (rotate tokens).
- Add logout endpoint.
- Update frontend helpers for token refresh and protected routes.

---

### 9) Add screenshots + demo gif (docs polish)

**Labels**: `good first issue`

**Problem**
The README promises a great DX but lacks compelling visuals.

**Acceptance criteria**
- Add `docs/screenshots/` with at least CLI + app screenshots (placeholders acceptable initially).
- Update README links so they render on GitHub.

---

### 10) Add a `create-fullstack-starter upgrade` command (design doc first)

**Labels**: `help wanted`

**Problem**
Users want to adopt starter improvements without re-generating and re-copying files manually.

**Acceptance criteria**
- Add a short RFC/design doc proposing an upgrade mechanism (codemods, patch files, or tracked manifest).
- Include trade-offs and a minimal first milestone.

