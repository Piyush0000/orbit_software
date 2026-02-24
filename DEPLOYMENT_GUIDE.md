# Orbit Platform Deployment Guide

This guide outlines the steps to deploy the entire Orbit ecosystem to **Render** (Backend) and **Vercel** (Frontends).

## 1. Prerequisites
- A **GitHub/GitLab** repository containing the code.
- A **Render** account (for Backend and Databases).
- A **Vercel** account (for Frontends).
- **MongoDB Atlas** account (or Render MongoDB).
- **Postgres Database** (Render or Supabase).

---

## 2. Backend Deployment (Render)

**Recommended Service Type**: Web Service

1. **Connect Repository**: Point to your repo and set the **Root Directory** to `backend`.
2. **Environment Variables**: Add the following from your `backend/.env`:
   - `DATABASE_URL`: Your Postgres connection string.
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A long random string.
   - `PORT`: 10000 (Render default).
   - `NODE_ENV`: production.
   - (Any other keys like `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, etc.)
3. **Build Command**: `npm install && npx prisma generate`
4. **Start Command**: `node src/server.js`

---

## 3. Merchant Dashboard Deployment (Vercel)

1. **New Project**: Select the repo and set the **Root Directory** to `Orbit-360`.
2. **Framework Preset**: Next.js.
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api` (The Render URL).
4. **Build Note**: If you encounter issues with the `output: export` in `next.config.ts`, you may want to remove that line to use Vercel's standard Next.js hosting.

---

## 4. Admin Panel Deployment (Vercel)

1. **New Project**: Select the repo and set the **Root Directory** to `orbit_admin`.
2. **Framework Preset**: Next.js.
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api` (The Render URL).

---

## 5. Storefront Templates Deployment (Vercel)

Each theme in `all_upfront/` can be deployed as its own project.

1. **New Project**: Select the repo and set the **Root Directory** to the specific theme folder (e.g., `all_upfront/electronics_1`).
2. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com/api` (The Render URL).
3. **Subdomains**: To handle multiple merchants on one theme, add your main domain to the Vercel project and use wildcard subdomains (e.g., `*.yourdomain.com`). The code already detects the subdomain from the hostname.

---

## Important Connection Check
After deploying the backend, ensure you update the `NEXT_PUBLIC_API_URL` in all frontend Vercel projects to point to the live Render URL.

## ⚠️ Notes on Storage
The current backend uses local folder storage for uploads (`/uploads`). On Render/Vercel, these files will be **deleted** whenever the service restarts.
- **Recommendation**: Integrate **Cloudinary** or **AWS S3** for persistent image storage (logos, products).
- **Static Assets**: Ensure all themes point to absolute URLs for images once deployed.
