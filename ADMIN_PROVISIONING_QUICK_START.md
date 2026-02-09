# 🚀 ADMIN PROVISIONING - QUICK START GUIDE

## ⚡ **Get Started in 3 Steps**

### **Step 1: Run Database Migration** (2 minutes)

```bash
cd D:\orbit\backend
npx prisma migrate dev --name add_merchant_credentials
npx prisma generate
```

This creates the `MerchantCredentials` table in your database.

---

### **Step 2: Start the Servers** (1 minute)

**Terminal 1 - Backend:**
```bash
cd D:\orbit\backend
npm run dev
```

**Terminal 2 - Orbit Admin:**
```bash
cd D:\orbit\orbit_admin
npm run dev
```

---

### **Step 3: Create Your First Merchant** (2 minutes)

1. **Open Orbit Admin**: http://localhost:3001
2. **Login** with your admin credentials
3. **Navigate** to "Provisioning" in the sidebar
4. **Fill the form**:
   - Merchant Name: `Test Fashion Store`
   - Email: `test@fashion.com`
   - Click **"Generate"** for password
   - Category: `Clothing & Fashion`
   - Theme: `Fashion Upfront`
   - Click **"Generate"** for subdomain
5. **Click "Create Merchant"**
6. **Success!** Copy the credentials from the dialog

---

## 🎯 **What You Get**

When you create a merchant, the system automatically:

✅ **Creates User Account**
- Email: `test@fashion.com`
- Password: Auto-generated secure password
- Role: MERCHANT
- Status: Active

✅ **Creates Store**
- Name: Test Fashion Store
- Subdomain: `testfashionstore123.orbit360.com`
- Theme: Fashion Upfront (API-driven)
- Category: Clothing & Fashion
- Status: Active, Provisioning COMPLETED

✅ **Sets Up Website**
- Default branding (colors, typography)
- Hero section with store name
- Contact info with email
- SEO meta tags
- Social links placeholders

✅ **Initializes Onboarding**
- Status: IN_PROGRESS
- Current step: 1
- Completion: 10%

✅ **Stores Credentials**
- Saved in MerchantCredentials table
- Visible in Admin dashboard
- Show/hide password toggle
- Copy to clipboard buttons

---

## 🔑 **Test Merchant Login**

After creating a merchant:

1. **Open Orbit-360**: http://localhost:3000 (or your Orbit-360 URL)
2. **Login with**:
   - Email: `test@fashion.com`
   - Password: (from the success dialog or credentials tab)
3. **Verify**:
   - Dashboard loads correctly
   - Store name appears
   - Theme is applied
   - Products load from API

---

## 📋 **View All Merchant Credentials**

1. In Orbit Admin, go to **Provisioning**
2. Click **"View Credentials"** tab
3. See table with:
   - All merchant names
   - Emails (with copy button)
   - Passwords (show/hide + copy button)
   - Store details
   - Theme badges
   - Active status
   - Dashboard & Storefront links
   - Created dates

---

## 🎨 **Available Themes**

Choose from 11 API-driven themes:

**Clothing:**
- fashion-upfront
- fashion-upfront-2

**Footwear:**
- footwear-upfront

**Toys:**
- toy-upfront
- toy-upfront-2
- toy-upfront-3

**Perfume:**
- perfume-upfront
- perfume-upfront-theme2
- perfume-upfront-theme3

**Cosmetics:**
- beauty-personal-care-upfront

**Furniture:**
- furniture-upfront

All themes are **100% API-driven** with no dummy data!

---

## 🔧 **Troubleshooting**

### **Migration fails**
```bash
# Reset and try again
cd D:\orbit\backend
npx prisma migrate reset
npx prisma migrate dev --name add_merchant_credentials
```

### **"Email already exists" error**
- Use a different email address
- Or delete the existing user from database

### **"Subdomain already exists" error**
- Click "Generate" again for a new subdomain
- Or manually enter a unique subdomain

### **Theme not appearing**
- Make sure you selected a category first
- Themes are filtered by category

### **Merchant can't login**
- Verify email and password are correct
- Check User table in database
- Ensure User.isActive = true

---

## 📊 **API Endpoints**

### **Create Merchant**
```
POST http://localhost:5000/api/admin/provision
Headers: { Authorization: "Bearer <admin_token>" }
Body: {
  "merchantName": "Test Store",
  "email": "test@example.com",
  "password": "SecurePass123!",
  "category": "clothing",
  "theme": "fashion-upfront",
  "subdomain": "teststore123"
}
```

### **Get All Credentials**
```
GET http://localhost:5000/api/admin/merchant-credentials
Headers: { Authorization: "Bearer <admin_token>" }
```

### **Update Password**
```
PUT http://localhost:5000/api/admin/merchant-credentials/:id/password
Headers: { Authorization: "Bearer <admin_token>" }
Body: { "newPassword": "NewSecurePass123!" }
```

---

## ✅ **Success Checklist**

After creating a merchant, verify:

- [ ] Merchant appears in "View Credentials" tab
- [ ] Email and password are visible (with show/hide)
- [ ] Copy buttons work for email and password
- [ ] Dashboard link opens Orbit-360 login
- [ ] Merchant can login with credentials
- [ ] Storefront link opens with correct theme
- [ ] Products load from API (no dummy data)
- [ ] Store name appears in dashboard
- [ ] Onboarding status shows "IN_PROGRESS"

---

## 🎉 **You're Done!**

Your admin provisioning system is now fully operational!

**Next**: Create more merchants, assign different themes, and watch your platform grow! 🚀

---

## 📚 **Full Documentation**

For complete details, see: `ADMIN_PROVISIONING_IMPLEMENTATION.md`
