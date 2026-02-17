# 🚀 Quick Start Guide - ORBIT360 Onboarding Website

## ⚡ Fastest Way to Run

### Option 1: Using the Batch Script (Windows)
```bash
cd d:\orbit\onboarding
start.bat
```

### Option 2: Manual Commands
```bash
cd d:\orbit\onboarding
npm install
npm run dev
```

## 🌐 Access the Website

Once running, open your browser to:
```
http://localhost:3004
```

## 📋 What to Test

1. **Homepage** (`/`)
   - Click "Get Started" button
   - Scroll through features
   - Check animations

2. **Registration** (`/register`)
   - Fill Step 1: Business Info
   - Fill Step 2: Contact Details
   - Fill Step 3: Owner Info
   - Click "Create Store"

3. **Success Page** (`/success`)
   - See confirmation message
   - Note the Store ID

4. **Admin Panel** (http://localhost:3001/dashboard/merchants)
   - See the new pending merchant
   - Click "Activate" to provision

## 🔧 Prerequisites

Make sure these are running:
- ✅ Backend API (http://localhost:5000)
- ✅ Admin Panel (http://localhost:3001)
- ✅ Merchant Dashboard (http://localhost:3003)

## 📊 Complete System Ports

| Application | Port | URL |
|------------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Admin Panel | 3001 | http://localhost:3001 |
| Merchant Dashboard | 3003 | http://localhost:3003 |
| **Onboarding Website** | **3004** | **http://localhost:3004** |

## 🎯 Testing the Complete Flow

1. Open onboarding website: http://localhost:3004
2. Register a new merchant
3. Check admin panel: http://localhost:3001/dashboard/merchants
4. Activate the merchant
5. Merchant receives dashboard URL
6. Merchant logs in: http://localhost:3003

## 🎨 Features to Check

- ✨ Animated background gradients
- ✨ Smooth page transitions
- ✨ Multi-step form with progress bar
- ✨ Form validation
- ✨ Success page with confetti
- ✨ Responsive design (try resizing browser)
- ✨ Hover effects on buttons and cards

## 📝 Sample Test Data

Use this data to test registration:

```
Business Name: Tech Store Pro
Category: Electronics
Email: test@techstore.com
Phone: +1234567890
First Name: John
Last Name: Doe
Address: 123 Main Street
City: New York
Country: United States
```

## 🐛 Common Issues

**Port 3004 already in use?**
```bash
# Change port in package.json
"dev": "next dev -p 3005"
```

**Backend not responding?**
```bash
# Start backend first
cd d:\orbit\backend
npm run dev
```

**Dependencies not installed?**
```bash
cd d:\orbit\onboarding
rm -rf node_modules
npm install
```

## 🎉 You're All Set!

The onboarding website is ready to accept merchant registrations! 🚀
