## Roadmap

This roadmap is intentionally practical: it focuses on features that improve **real-world shipping**, **maintainability**, and **contributor velocity**.

---

## Short-term (next 1–4 weeks)

- [ ] **Harden auth pack**: refresh tokens, password reset, email verification, and better security defaults.
- [ ] **Docker support**: `docker-compose` for backend + DB, production Dockerfiles, and local DX docs.
- [ ] **CI**: GitHub Actions for lint + typecheck + build + basic “generate app” smoke test.
- [ ] **More DB polish**: improve Postgres experience (migrations/ORM decision, connection config, dev seed).
- [ ] **Docs + examples**: screenshots, demo gif, and copy/paste deployment recipes.
- [ ] **Template tests**: minimal contract tests to ensure scaffolding produces runnable apps.

---

## Mid-term (1–3 months)

- [ ] **RBAC pack**: roles/permissions middleware + admin UI scaffolding.
- [ ] **Payments pack**: Stripe billing (checkout + webhooks + customer portal) with env/docs.
- [ ] **Notifications pack**: email provider integration + in-app notifications scaffold.
- [ ] **File uploads pack**: S3-compatible storage + signed URLs + basic UI.
- [ ] **Observability pack**: structured logs, request IDs, error reporting integration.
- [ ] **OpenAPI**: generate OpenAPI spec and a typed client for the React app.

---

## Long-term (3–12 months)

- [ ] **Microservices-ready option**: service boundaries, gateway pattern, and shared contracts.
- [ ] **Plugin system**: feature packs as plugins (installable/upgradeable) with versioned migrations.
- [ ] **Upgrade command**: safely apply new starter improvements to existing generated projects.
- [ ] **Monorepo presets**: optional Turbo/Nx integration for larger organizations.

