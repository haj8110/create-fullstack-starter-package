# 🚀 create-fullstack-starter

> Create a production-ready fullstack app in seconds ⚡

A powerful CLI to scaffold scalable fullstack applications with Node.js, React, and modern best practices.

---

## ⚡ Demo

![Demo](./demo.gif)

---

## 🔥 Why this?

Most starters give you a basic setup.

This CLI focuses on:
- 🧱 Clean, scalable backend architecture
- ⚙️ Ready-to-use fullstack setup
- 🚀 Fast project bootstrap (under 30 seconds)
- 🛠 Developer-friendly CLI

---

## ✨ Features

- ✅ Node.js + Express backend
- ✅ React frontend
- ✅ TypeScript or JavaScript support
- ✅ MongoDB (more DBs coming soon)
- ✅ Optional auth module (`--auth`) with JWT + bcrypt
- ✅ Clean folder structure (controller/service based)
- ✅ Pre-configured scripts
- ✅ Zero config setup

---

## 📦 Installation

```bash
npm install -g create-fullstack-starter
```

or use directly:

```bash
npx create-fullstack-starter my-app
```

---

## 🚀 Usage

```bash
npx create-fullstack-starter my-app
```

### Options

```bash
--ts             Use TypeScript
--db <name>      Choose database (mongodb)
--auth           Include authentication module (JWT)
--pm <pm>        Package manager (pnpm | yarn | npm)
--no-install     Skip dependency install
--force          Overwrite existing folder
```

### Example

```bash
npx create-fullstack-starter my-app --ts --db mongodb
```

---

## 🔐 Authentication (optional)

Enable auth scaffolding with:

```bash
npx create-fullstack-starter my-app --auth
```

### Endpoints

- `POST /api/auth/register` `{ email, password }` → `{ token, user }`
- `POST /api/auth/login` `{ email, password }` → `{ token, user }`
- `GET /api/protected` (requires `Authorization: Bearer <token>`)

### Env vars

When `--auth` is enabled, backend `.env.example` includes:

- `JWT_SECRET`
- `JWT_EXPIRES_IN` (default `1h`)
- `BCRYPT_SALT_ROUNDS` (default `10`)

---

## 📁 Project Structure

```text
my-app/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── config/
│   └── server.ts
│
├── frontend/
│   ├── src/
│   └── public/
│
└── package.json
```

---

## 🧠 Architecture

Backend follows a scalable pattern:

* Controllers → Handle request/response
* Services → Business logic
* Routes → API structure
* Config → Environment & DB setup

---

## 🛣 Roadmap

* [ ] 🔐 Authentication (JWT)
* [ ] 🐳 Docker support
* [ ] 🧪 Testing setup (Jest)
* [ ] 🗄 PostgreSQL & Prisma
* [ ] ⚡ Interactive CLI prompts
* [ ] ☁️ Deployment configs (AWS / Vercel)

---

## 🤝 Contributing

Contributions are welcome!

```bash
git clone https://github.com/haj8110/create-fullstack-starter-package
cd create-fullstack-starter-package
npm install
```

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

Haj Mohamed  
Backend Developer | Node.js | AWS

---

## 📄 License

MIT
