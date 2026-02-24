# CRM Setup Guide

This CRM module has been integrated into your Orbit Admin dashboard. It provides complete lead management functionality with Firebase Firestore integration.

## Features

✅ **Lead Management**

- View all leads from Firebase Firestore
- Filter leads by date range and form type
- Update lead status (Leads, Contacted, Won, Lost)
- Delete leads with confirmation
- Detailed lead view modal

✅ **Dashboard Analytics**

- Total leads count
- Contacted leads count
- Won leads count

✅ **Responsive Design**

- Desktop table view
- Mobile card view
- Fully responsive UI

## Files Created

```
src/
├── app/
│   └── dashboard/
│       └── crm/
│           └── page.tsx              # Main CRM page
├── components/
│   └── crm/
│       └── lead-detail.tsx           # Lead detail modal component
├── lib/
│   └── firebase-crm.ts               # Firebase configuration
└── types/
    └── crm.ts                        # TypeScript types for CRM

.env.local.example                    # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies (Already Done)

Firebase is already installed in your project.

### 2. Configure Firebase

1. Copy the `.env.local.example` file to `.env.local`:

   ```bash
   copy .env.local.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

### 3. Firebase Firestore Setup

The CRM will automatically search for leads in these collections:

- `leads`
- `forms`
- `submissions`
- `contacts`
- `formSubmissions`

**Expected Document Structure:**

```javascript
{
  name: "John Doe",
  formType: "book-demo" | "contact",
  createdAt: Timestamp | string,
  status: "leads" | "contacted" | "won" | "lost",

  // Optional fields for Book Demo
  phoneNumber: "1234567890",
  category: "D2C brand",
  revenueRange: "$10k-$50k",

  // Optional fields for Contact Us
  workEmail: "john@example.com",
  email: "john@example.com",
  website: "https://example.com",
  budget: "$5000",
  goals: "Increase sales",
  message: "Looking for help with..."
}
```

### 4. Firestore Security Rules

Make sure your Firestore security rules allow reading and writing to the collections:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to leads collections
    match /leads/{document=**} {
      allow read, write: if true; // Adjust based on your auth requirements
    }
    match /forms/{document=**} {
      allow read, write: if true;
    }
    match /submissions/{document=**} {
      allow read, write: if true;
    }
    match /contacts/{document=**} {
      allow read, write: if true;
    }
    match /formSubmissions/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 5. Access the CRM

Navigate to: `http://localhost:3001/dashboard/crm`

## Usage

### Viewing Leads

- All leads are displayed in a table (desktop) or cards (mobile)
- Click on any lead to view detailed information

### Filtering Leads

- **By Type**: Use the dropdown to filter by "Book Demo" or "Contact Us"
- **By Date**: Select a date range to filter leads by submission date

### Managing Leads

- **Update Status**: Click on a lead to open the detail modal, then click on a status button
- **Delete Lead**: Click the trash icon in the detail modal, then confirm deletion

### Statistics

The dashboard shows three key metrics:

- **Total Leads**: All leads matching current filters
- **Contacted**: Leads with "Contacted" status
- **Won**: Leads with "Won" status

## Troubleshooting

### No leads showing?

1. Check browser console for errors
2. Verify Firebase credentials in `.env.local`
3. Ensure Firestore security rules allow read access
4. Check that your collection name matches one of the supported names
5. Verify documents have the required fields (`name`, `formType`, `createdAt`)

### Can't update/delete leads?

1. Check Firestore security rules allow write access
2. Verify the lead document exists in Firestore
3. Check browser console for error messages

### Firebase not connecting?

1. Restart your dev server after adding `.env.local`
2. Verify all environment variables are set correctly
3. Check Firebase project settings match your credentials

## Next Steps

You can customize:

- Add more status options in `src/types/crm.ts`
- Modify the UI in `src/app/dashboard/crm/page.tsx`
- Add more filters or search functionality
- Export leads to CSV
- Add email integration
- Create custom reports

## Support

If you encounter any issues, check:

1. Browser console for JavaScript errors
2. Network tab for failed API requests
3. Firebase console for Firestore data and security rules
