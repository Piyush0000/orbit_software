# Dropshipping SaaS Backend

Node.js + Express multi-tenant backend using PostgreSQL (Prisma) for transactional data and MongoDB (Mongoose) for flexible layout data.

## Quick Start
1) Install dependencies  
```bash
npm install
```
2) Copy env and edit  
```bash
cp .env.example .env
```
3) Run Prisma  
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4) Seed defaults  
```bash
npm run seed
```
5) Start server  
```bash
npm run dev
```

## Structure
`src/config` env + db clients  
`src/middleware` auth, rbac, validation, error handling  
`src/controllers` route handlers for auth/users/stores/products/orders/layout/storefront/admin  
`src/routes` API route definitions  
`src/models/prisma` schema reference (real schema in `backend/prisma/schema.prisma`)  
`src/models/mongoose` layout/template/section schemas  
`src/services` email, upload (multer), analytics  
`src/utils` helper + validator glue  

## API
Base path: `/api`
- Auth: `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/logout`, `/auth/verify-email/:token`
- Users: `/users/me` (GET/PUT), `/users/me/password`, `/users/me` DELETE
- Stores: CRUD + analytics + settings under `/stores`
- Products: CRUD + variants under `/products`
- Orders: create + status updates under `/orders`
- Layouts: `/layouts/store/:storeId`, template listing, apply template
- Storefront: `/storefront/:subdomain` for public data and checkout
- Admin: `/admin/*` (RBAC ADMIN)

## Notes
- JWT auth via `Authorization: Bearer <token>`
- Rate limiting + helmet + CORS enabled
- Uploads use disk storage at `UPLOAD_PATH`; swap to cloud easily in `uploadService.js`
- Email sending via Nodemailer; when SMTP not set, calls are no-ops

## Seed
Creates default admin (env `DEFAULT_ADMIN_EMAIL`/`DEFAULT_ADMIN_PASSWORD`) and minimal template/section.

## Scripts
- `npm run dev` start with nodemon
- `npm run seed` seed admin + templates
- `npm run prisma:migrate` run migrations
- `npm run prisma:generate` regenerate Prisma client

## Meta Ads Backend (OAuth + Ads)
- Signup/Login: `POST /api/app-auth/signup`, `POST /api/app-auth/login` (returns JWT)
- Connect Meta: `GET /auth/meta/login` (requires `Authorization: Bearer <jwt>`, redirects to Meta), callback at `/auth/meta/callback`
- Meta APIs (JWT protected):  
  - `GET /api/meta/status` - Check connection status  
  - `GET /api/meta/ad-accounts`  
  - `GET /api/meta/campaigns?adAccountId=`  
  - `POST /api/meta/campaigns` (body: `adAccountId,name,objective,budget,status`)  
  - `PATCH /api/meta/campaigns/:id/pause` and `/resume`  
  - `GET /api/meta/insights?adAccountId=` (impressions, clicks, spend, ctr, cpc)

## Meta Setup
1) Add to `.env`:
```
META_APP_ID=...
META_APP_SECRET=...
META_REDIRECT_URI=http://localhost:5000/auth/meta/callback
META_API_VERSION=v19.0
META_TOKEN_ENC_KEY=<32-byte-hex>
```
2) Ensure MongoDB running and `MONGODB_URI` set.
3) Start server, create user via signup, hit `/auth/meta/login` with bearer token to connect Meta.
