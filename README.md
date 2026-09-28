# Pension Sahayak

A responsive DAD Day demo built with Next.js App Router, TypeScript, Tailwind CSS and MongoDB. This is an independent prototype, not an official pension service.

## Local setup

Requires Node.js 20.9+ and a running MongoDB Community Server (or your own local MongoDB container).

```powershell
cd D:\aj\shubham
npm install
# .env.local is already configured. To recreate it:
Copy-Item .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. Development and production start commands bind to the loopback interface.

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/pension_sahayak
```

If MongoDB is installed as a Windows service, start it using your usual MongoDB service controls. Alternatively, with Docker installed:

```powershell
docker run --name pension-sahayak-mongo -p 127.0.0.1:27017:27017 -v pension-sahayak-data:/data/db -d mongo:8
```

On later runs: `docker start pension-sahayak-mongo`. Do not run a second database on the same port.

## Commands

- `npm run dev`: development server
- `npm run lint`: ESLint
- `npm run typecheck`: TypeScript checks (run build first for generated Next types if needed)
- `npm test`: validation and checklist tests
- `npm run build`: production build
- `npm start`: serve the production build

## Deployment (Netlify)

Netlify is linked to the GitHub repository and deploys automatically using `netlify.toml` (Next.js runtime, Node 22):

- push to `main`: production deploy at https://pension-sahayak.netlify.app
- pull request: deploy preview

`.github/workflows/ci.yml` runs lint, tests, build and typecheck on every push and pull request.

Required settings:

- Netlify environment variable `MONGODB_URI`: the Atlas connection string.
- MongoDB Atlas > Network Access: allow `0.0.0.0/0` (Netlify Functions have no fixed outbound IPs).

`/api/health` on the deployed site reports whether the database is reachable.

## Architecture

- `src/app/[lang]`: pages in English, Hindi and Telugu (`/en`, `/hi`, `/te`), metadata, error/not-found boundaries
- `src/app/api`: route handlers (language-neutral; errors carry a translatable `code`)
- `src/i18n`: locale config, dictionaries (`messages/en.ts` is the source), server/client loaders
- `src/proxy.ts`: redirects URLs without a language prefix using the saved choice or browser language
- `src/components`: reusable layout, form, pension workflow and directory components; client boundaries only for interaction
- `src/lib/workflows.ts`: extensible workflow definitions and checklist logic
- `src/lib/validation.ts`: shared Zod request validation
- `src/lib/server/db.ts`: cached MongoDB connection, pool and bounded connection timeouts
- `src/lib/server/grievances.ts`: persistence service and explicit response projection
- `src/lib/server/http.ts`: bounded JSON parsing, origin validation and error responses
- `src/lib/centres.ts`: explicitly fictional directory data
- `tests`: validation checks (additional test cases deferred)

No MongoDB connection is required at build time. Static guidance, directory and PPO demo work without MongoDB. Creating/tracking grievances requires MongoDB; failures return 503 and never report a successful save. The database and grievance collection are created lazily on the first save. Reference index creation is idempotent.

## APIs

| Method | Route                       | Behaviour                                                   |
| ------ | --------------------------- | ----------------------------------------------------------- |
| GET    | /api/health                 | Live DB ping; 200 connected, 503 unavailable                |
| POST   | /api/pension                | JSON `{"ppo":"DEMO-PPO-12345"}`; mock record only           |
| GET    | /api/service-centres?q=Pune | Filter fictional directory                                  |
| POST   | /api/grievances             | Validate and persist a demo grievance                       |
| GET    | /api/grievances/:reference  | Return status/category/date only; no subject or description |

POST grievance JSON:

```json
{
  "category": "Payment",
  "subject": "Sample pension issue",
  "description": "A fictional missed pension payment for this demo.",
  "demoConsent": true
}
```

Errors use `{ "error": "...", "code": "..." }`; the UI shows a translated message for `code`. Successful data endpoints use `{ "data": ... }`.
Grievance references contain 128 random bits and act as bearer references. There is no public listing or status-update endpoint. Treat references as private. This is not a substitute for authentication.

## Features and limits

- Responsive mobile/tablet/desktop layouts, keyboard focus, skip link, larger text control, semantic forms and status messages.
- Five guided pension workflows, branch/status-aware checklists and text downloads.
- Demo PPO lookup and searchable fictional service-centre directory.
- MongoDB-backed grievance creation and tracking; status remains Received until a future case-management layer exists.
- No government APIs, real PPO validation, uploads, payments, appointment booking, authentication or AI chatbot.
- All workflow instructions are illustrative, not legal advice or confirmed eligibility/document requirements.
- MongoDB must be running separately. No in-memory fallback is used.
- Do not enter real personal information. Before exposing publicly, add authentication/authorization, distributed rate limiting, CSRF strategy for authenticated sessions, audit logging, retention/deletion controls, deployment secrets, verified content and security review.
