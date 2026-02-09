# 🚀 Start Merchant Storefront - Quick Guide

## 📍 Your Port Setup:
- Port 5000: Backend API
- Port 3001: Admin Dashboard
- Port 3003: Orbit-360 (Merchant Dashboard)
- Port 3004: Storefront (Kids Wonderland) ← Start this!

---

## 🎯 Quick Steps to View "new business" Store

### Step 1: Open New Terminal (Terminal 4)
In VS Code: **Terminal → New Terminal** or `Ctrl+Shift+\``

### Step 2: Navigate to Template
```powershell
cd "D:\orbit\templates\orbit_front_others\toy upfront 2"
```

### Step 3: Install Dependencies (First Time Only)
```powershell
npm install

```

### Step 4: Start Template on Port 3004
```powershell
$env:PORT=3004; npm run dev
```

### Step 5: Open Storefront
```
http://localhost:3004
```

**Or click "Preview Store" button in Orbit-360 dashboard (top-right)!**

---

## ✅ Expected Output

```powershell
PS D:\orbit\templates\orbit_front_others\toy upfront 2> $env:PORT=3004; npm run dev

> toy-upfront@0.1.0 dev
> next dev -p 3004

   ▲ Next.js 14.x.x
   - Local:        http://localhost:3004
   - Network:      http://192.168.x.x:3004

 ✓ Ready in 2.5s
 ○ Compiling / ...
 ✓ Compiled / in 3.2s
```

---

## 🎨 You Should See:

**Homepage:**
- 🎪 Kids Wonderland banner
- 🧸 Toy products in grid
- 🎯 Categories navigation
- 🛒 Shopping cart
- 🔍 Search bar

**Features:**
- Browse toys
- Add to cart
- Product details
- Checkout
- Responsive design

---

## 🔄 Customize from Orbit-360

**Step 1:** Login to http://localhost:3003

**Step 2:** Go to "Website" tab

**Step 3:** Change colors, add logo, edit content

**Step 4:** Click "Save"

**Step 5:** Refresh storefront (http://localhost:3004)

**Step 6:** See changes! 🎉

---

## 🎯 All 4 Services Running

After this, you'll have:

1. ✅ **Backend** - http://localhost:5000
2. ✅ **Admin** - http://localhost:3001  
3. ✅ **Orbit-360** - http://localhost:3003
4. ✅ **Storefront** - http://localhost:3004 ⭐

---

**Ready? Open Terminal 4 and run the commands above!** 🚀
