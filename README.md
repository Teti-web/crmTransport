# crmTransport

An internal CRM for a transport/logistics company — order and fleet tracking workflows built around real business entities (drivers, vehicles, clients, routes) rather than a tutorial to-do/blog clone. Built end-to-end on the MERN stack, with a focus on usable data tables and a genuine multi-entity data model.

## Tech stack

**Backend** — Node.js, Express, MongoDB (Mongoose)
- **JWT + bcryptjs** — authentication with hashed passwords and token-based sessions
- **cookie-parser** — httpOnly cookie-based session handling
- **Multer + Cloudinary** — file/image upload and hosting (driver documents, vehicle photos)
- **Nodemailer + deep-email-validator** — transactional email and email verification
- **express-async-handler** — centralized async error handling

**Frontend** — React (separate `client/` app)
- **Context API** for auth/global state
- Custom **hooks** and a dedicated **services** layer for API calls, kept separate from UI components

## Data model

REST API organized as `routes → controllers → models`, with seven core entities: **users** (auth), **drivers**, **clients**, **cars** (fleet), **routes**, **events**, and **tasks** — covering the actual operational surface of a transport company rather than a generic CRUD demo.

```
/api/users     — auth, account management
/api/drivers   — driver records
/api/clients   — client records
/api/cars      — fleet/vehicle records
/api/routes    — route planning
/api/events    — scheduled events
/api/tasks     — task/work assignment
```

## What this project practices

- Designing a relational-ish data model across multiple linked entities (drivers ↔ cars ↔ routes ↔ clients) instead of a single-resource CRUD app
- Full auth flow: hashed passwords, JWT sessions, httpOnly cookies
- File upload handling with an external storage provider (Cloudinary), not just local disk
- Separating the frontend into components / hooks / services, with Context API for shared auth state — the same layering principle used on production frontend/backend split projects

## Local development

```bash
npm install
npm run dev       # runs server (nodemon) and client concurrently
```

Requires a `.env` with `MONGO_URI` and mail/Cloudinary credentials — see `config/` for expected variables.
