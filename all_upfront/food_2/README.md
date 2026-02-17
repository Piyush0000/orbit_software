# Provision & Co. | Premium Food & Beverage Storefront

A professional, conversion-focused e-commerce storefront for gourmet snacks, artisanal beverages, and ready-to-eat meals. Built with a focus on speed, premium aesthetics, and a seamless user experience.

## ✨ Key Features

- **🚀 Dynamic Hero Section**: Responsive carousel with high-impact typography and auto-play functionality.
- **🛒 Advanced Cart System**: 
  - **Full Cart Page**: Comprehensive item management with real-time subtotal/total calculations.
  - **Cart Drawer**: Instant-access slide-out drawer for quick summaries and faster checkout.
  - **Cross-Selling**: Targeted "Complement Your Meal" recommendations for beverages and desserts.
- **🔍 Integrated Search**: Live frontend search with text highlighting and instant result filtering.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **🔒 Authentication**: Clean, premium Login and Signup pages.
- **🍱 Product Intelligence**: 
  - **Veg/Non-Veg Clarity**: Clear iconography for dietary preferences.
  - **Standardized Detail Page**: Features rich typography, nutrition tables, spice level indicators, and storage tips.
  - **Trust Indicators**: Verified reviews and safety badges to enhance buyer confidence.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`CartContext`)
- **Type Safety**: TypeScript

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── cart/            # Full shopping bag page
│   ├── categories/      # PLP (Product Listing Pages)
│   ├── products/        # PDP (Product Detail Pages)
│   └── (auth)/          # Authentication (Login/Signup)
├── components/          # Reusable React components
│   ├── sections/        # Major landing page sections (Hero, BestSellers, etc.)
│   └── ui/              # Atomic UI components (Shadcn + Customs)
├── context/             # Global providers (Cart State)
├── lib/                 # Utility functions and static data
└── public/              # High-quality assets and images
```

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Build for Production

```bash
npm run build
```

## 📜 License

This project is proprietary. © 2026 Provision & Co.
