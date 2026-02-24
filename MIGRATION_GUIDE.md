# Supabase Migration & Cloudinary Setup Guide

This guide covers migrating your local database to **Supabase** (Postgres) and setting up **Cloudinary** for persistent image storage.

---

## 1. Cloudinary Setup (Images)

Cloudinary ensures your store logos and product images are NOT deleted when the server restarts.

### Steps:
1. Create a free account at [Cloudinary](https://cloudinary.com/).
2. From your Dashboard, copy the **Cloud Name**, **API Key**, and **API Secret**.
3. Add them to your `backend/.env` file:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart your backend server. It will now automatically upload all new images to the cloud.

---

## 2. Supabase Migration (Database)

Supabase provides a hosted Postgres database that is perfect for production.

### Step A: Setup Supabase
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. In your Project Settings, go to **Database**.
3. Copy the **Connection string** (choose **URI** format).
   - It should look like: `postgresql://postgres.[ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres`

### Step B: Connect Backend
1. Update your `backend/.env` with the new connection string:
   ```env
   DATABASE_URL="postgresql://postgres.[ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
   ```
2. **Important**: Add `?pg_bouncer=true` to the end of the URL if you use the connection pooler (port 5432/6543).

### Step C: Push Schema
Run these commands from the `backend` folder to recreate your tables on Supabase:
```bash
# Generate the client
npx prisma generate

# Push the schema (creates all tables)
npx prisma db push
```

### Step D: Seed Data
Since the database is new, you need to seed the default themes and categories:
```bash
# Run the seed script
npm run seed
```

---

## 3. Deployment Summary
Once the database is on Supabase and images are on Cloudinary, your system is truly "Platform Independent". You can deploy to Render/Vercel without worrying about data loss.

- **Frontend**: Deploy `Orbit-360`, `orbit_admin`, and themes to Vercel.
- **Backend**: Deploy `backend` to Render.
- **Subdomains**: Ensure your Render URL allows cross-origin requests from your Vercel domains.
