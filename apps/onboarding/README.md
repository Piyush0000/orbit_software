# ORBIT360 Merchant Onboarding Website

A beautiful, professional onboarding website for merchants to register and join the ORBIT360 platform.

## 🎨 Features

- **Stunning Design**: Modern gradient backgrounds, smooth animations, and professional UI
- **Multi-Step Registration**: 3-step onboarding form with validation
- **Responsive**: Works perfectly on all devices
- **Animations**: Framer Motion animations for smooth transitions
- **Connected to Backend**: Integrates with ORBIT360 backend API

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## 📦 Installation

```bash
cd onboarding
npm install
```

## 🏃 Running the App

```bash
npm run dev
```

The app will run on **http://localhost:3004**

## 📄 Pages

### Homepage (`/`)
- Hero section with call-to-action
- Features showcase
- How it works (4 steps)
- Stats display
- CTA section

### Registration (`/register`)
- Step 1: Business Information
  - Business Name
  - Category
- Step 2: Contact Details
  - Email
  - Phone
- Step 3: Owner Information
  - First Name, Last Name
  - Address, City, Country

### Success (`/success`)
- Confirmation message
- Next steps
- What happens next
- Confetti animation

## 🔗 API Integration

The registration form connects to:
```
POST http://localhost:5000/api/stores/register
```

## 🎨 Color Theme

- Primary: Purple (#8B5CF6)
- Secondary: Pink (#EC4899)
- Accent: Blue (#3B82F6)
- Background: Dark gradient (slate-950 → purple-950)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Next Steps After Registration

1. Admin reviews application
2. Admin activates merchant in admin panel
3. Merchant receives email with:
   - Dashboard URL
   - Website URL
   - Login credentials
4. Merchant completes 7-step onboarding
5. Merchant goes live!

## 🔧 Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📝 License

Part of the ORBIT360 ecosystem
