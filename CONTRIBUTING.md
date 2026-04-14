# Contributing

Thanks for your interest in contributing to `create-fullstack-starter`!

## Development

### Prerequisites

- Node.js \(>= 18.18\)
- npm

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

### Run locally

```bash
node ./bin/index.js my-app --ts --db mongodb --no-install
```

## Templates

- Templates live in `templates/`.
- The generator copies a backend template into `backend/` and a frontend template into `frontend/`.
- Keep templates dependency-light and avoid committing `node_modules/`.

## Pull requests

- Keep PRs small and focused.
- Include a short test plan in the PR description (what you ran / verified).

