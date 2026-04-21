# Contributing

Thanks for helping make `create-fullstack-starter` a production-grade, contributor-friendly starter generator.

This project is a **CLI generator**: most changes fall into one of two categories:
- **CLI behavior** (parsing flags, prompts, file generation, dependency install)
- **Templates** (the generated backend/frontend code under `templates/`)

---

## Development setup

### Prerequisites

- Node.js **>= 18.18**
- npm / pnpm / yarn (any is fine; npm is used in examples)

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

### Run locally (as a CLI)

The CLI entrypoint is `bin/index.js` which executes the built output in `dist/`.

```bash
npm run build
node ./bin/index.js my-app --ts --db mongodb --no-install --force
```

### Suggested smoke test (generated app)

```bash
cd my-app
npm install
npm run dev
```

---

## Repo structure (high level)

- `src/`: CLI source (prompts, flags, template copy, env generation)
- `templates/`: project templates copied into `backend/` and `frontend/`
- `utils/` and `scripts/`: dev helpers (used for local testing/debugging)

---

## Coding guidelines

### General

- **Prefer clarity over cleverness**: contributors should understand intent quickly.
- **Be deterministic**: generator output should not depend on machine-specific state.
- **Avoid surprising side effects**: no network calls during scaffolding unless clearly intentional.

### TypeScript / Node conventions

- **ESM only**: keep imports compatible with Node ESM.
- **Validate inputs**: fail fast with actionable error messages (include context and likely fixes).
- **Keep generator steps explicit**: copy templates → write env → write root scripts → install deps.

### Template guidelines

- Keep templates **dependency-light** and **production-leaning** (avoid toy examples).
- Don’t commit `node_modules/`, build output, or OS files.
- If you add a new feature pack (e.g. auth), ensure it’s **end-to-end**:
  - backend routes + services + env variables
  - frontend wiring (helpers/hooks/pages) if applicable
  - template README snippets if needed

---

## Branch naming conventions

Use a prefix that matches the intent:

- **feat/**: new feature (e.g. `feat/postgres-template`)
- **fix/**: bug fix (e.g. `fix/windows-paths`)
- **docs/**: documentation only (e.g. `docs/readme-refresh`)
- **chore/**: tooling/refactors (e.g. `chore/tsup-config`)

---

## PR process

### Before opening a PR

- Run:

```bash
npm run lint
npm run typecheck
npm run build
```

- Smoke-test the CLI at least once (example):

```bash
node ./bin/index.js my-app --ts --db mongodb --no-install --force
```

### PR checklist

- **Scope**: small and focused PRs are easiest to review.
- **Description**: what changed and why.
- **Test plan**: commands you ran and what you verified.
- **Screenshots**: if the change impacts generated UI, add a screenshot/gif if possible.

---

## Beginner-friendly contribution steps

If you’re new here, these are great first contributions:

1. Pick an issue labeled **good first issue** or **help wanted** (see `ISSUES.md` for ready-to-file ideas).
2. Fork the repo and create a branch (see naming conventions above).
3. Make your change (CLI or templates).
4. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
5. Generate a sample app and sanity-check it runs.
6. Open a PR with a short description and test plan.


