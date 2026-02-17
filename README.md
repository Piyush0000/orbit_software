# Orbit 360

<div align="center">

![Orbit 360](https://img.shields.io/badge/Orbit-360-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**A comprehensive e-commerce platform with integrated Meta (Facebook/Instagram) advertising management**

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [API Reference](#-api-endpoints)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Documentation](#-documentation)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Support](#-support)

---

## 🌟 Overview

Orbit 360 is a full-stack e-commerce platform that seamlessly integrates with Meta's advertising ecosystem. Built with modern technologies, it provides businesses with powerful tools to manage their online store while running effective advertising campaigns on Facebook and Instagram.

### Key Highlights

- **All-in-One Solution**: Complete e-commerce platform with built-in Meta Ads management
- **Enterprise Ready**: Robust security, scalability, and multi-tenant architecture
- **Developer Friendly**: Well-documented APIs, clean code structure, and comprehensive guides
- **Production Grade**: Battle-tested integrations with OAuth 2.0, JWT authentication, and encrypted storage

---

## ✨ Features

### 🏪 Core E-commerce Platform

| Feature | Description |
|---------|-------------|
| **Multi-Tenant Architecture** | Manage multiple stores from a single platform |
| **Product Management** | Full catalog with variants, inventory tracking, and categories |
| **Order Processing** | End-to-end order management with status tracking |
| **Customer Management** | Comprehensive customer profiles and order history |
| **Analytics Dashboard** | Real-time insights into sales, revenue, and performance |
| **Customizable Layouts** | Flexible UI components and theming options |

### 📱 Meta Ads Integration

| Feature | Description |
|---------|-------------|
| **OAuth 2.0 Connection** | Secure authentication with Meta Business accounts |
| **Ad Account Management** | View and switch between multiple ad accounts |
| **Campaign Operations** | Create, pause, resume, and manage campaigns |
| **Real-Time Insights** | Track impressions, clicks, spend, and conversions |
| **Budget Tracking** | Monitor spending and optimize campaign budgets |
| **Multiple Objectives** | Support for various campaign goals (traffic, conversions, etc.) |

### 🔐 Security Features

- JWT-based authentication with secure token management
- Encrypted Meta token storage using AES-256
- Rate limiting on all API endpoints
- CORS protection with configurable origins
- OAuth 2.0 implementation for Meta integration
- Permission-based access control
- Automatic token expiry handling and refresh

---

## 🛠️ Technology Stack

### Backend

```
Runtime:        Node.js 18+
Framework:      Express.js
Databases:      PostgreSQL (via Prisma ORM), MongoDB (via Mongoose)
Authentication: JWT, OAuth 2.0
Security:       Helmet, CORS, Rate Limiting, bcrypt
API Client:     Axios (Meta Marketing API)
```

### Frontend

```
Framework:      Next.js 16 (App Router)
Language:       TypeScript
Styling:        Tailwind CSS
UI Components:  Shadcn/ui
State:          React Hooks
Notifications:  Sonner
HTTP Client:    Fetch API
```

---

## 📁 Project Structure

```
D:\orbit\
├── backend/                          # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   ├── metaController.js            # Meta API operations
│   │   │   ├── metaOAuthController.js       # OAuth flow handlers
│   │   │   ├── authController.js            # Authentication
│   │   │   ├── storeController.js           # Store management
│   │   │   ├── productController.js         # Product CRUD
│   │   │   └── orderController.js           # Order processing
│   │   ├── routes/                  # API route definitions
│   │   │   ├── meta.js                      # Meta endpoints
│   │   │   ├── metaOAuth.js                # OAuth routes
│   │   │   ├── auth.js                      # Auth routes
│   │   │   └── ...
│   │   ├── services/                # Business logic layer
│   │   │   ├── metaApiService.js           # Meta API wrapper
│   │   │   └── ...
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js                      # JWT verification
│   │   │   ├── rateLimiter.js              # Rate limiting
│   │   │   └── errorHandler.js             # Error handling
│   │   ├── models/                  # Database schemas
│   │   │   ├── User.js                      # Mongoose User model
│   │   │   └── ...
│   │   ├── config/                  # Configuration files
│   │   │   └── database.js                 # DB connections
│   │   └── utils/                   # Helper functions
│   ├── prisma/
│   │   ├── schema.prisma            # PostgreSQL schema
│   │   └── migrations/              # Database migrations
│   ├── package.json
│   ├── .env.example                 # Environment template
│   └── README.md
│
├── software/Orbit-360/              # Next.js Frontend
│   ├── app/
│   │   ├── (auth)/                  # Auth routes group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/               # Main dashboard
│   │   ├── integrations/            # Integration management
│   │   │   └── page.tsx                    # Meta integration UI
│   │   ├── sales/                   # Sales & orders
│   │   ├── products/                # Product management
│   │   └── layout.tsx               # Root layout
│   ├── components/                  # React components
│   │   ├── ui/                      # Shadcn components
│   │   ├── meta/                    # Meta-specific components
│   │   └── ...
│   ├── lib/                         # Utilities
│   ├── public/                      # Static assets
│   ├── package.json
│   └── README_META_INTEGRATION.md
│
└── docs/                            # Documentation
    ├── QUICK_START.md                       # 10-minute setup
    ├── META_INTEGRATION_SETUP.md            # Detailed Meta setup
    ├── INTEGRATION_SUMMARY.md               # Technical overview
    └── API_REFERENCE.md                     # API documentation
```

---

## 🚀 Quick Start

Get Orbit 360 running locally in **10 minutes**:

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14.x or higher ([Download](https://www.postgresql.org/download/))
- **MongoDB** 6.x or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))
- **Meta Developer Account** ([Sign Up](https://developers.facebook.com/))

### Installation Steps

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd orbit
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Required: DATABASE_URL, MONGODB_URI, JWT_SECRET, META credentials

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed the database (optional)
npm run seed

# Start the backend server
npm run dev
```

Backend will start on **http://localhost:5000**

#### 3. Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd software/Orbit-360

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start the frontend server
npm run dev
```

Frontend will start on **http://localhost:3000**

#### 4. Verify Installation

1. Open **http://localhost:3000** in your browser
2. You should see the Orbit 360 login page
3. Register a new account or use seeded credentials
4. Navigate to the dashboard

### First-Time Setup

After installation, follow these steps:

1. **Create Your Store**: Go to Stores → Create New Store
2. **Add Products**: Navigate to Products → Add Product
3. **Connect Meta** (Optional): Go to Integrations → Connect Meta Account

For detailed setup instructions, see **[QUICK_START.md](./QUICK_START.md)**

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# ======================
# Database Configuration
# ======================
DATABASE_URL="postgresql://username:password@localhost:5432/orbit360"
MONGODB_URI="mongodb://localhost:27017/orbit360"

# ======================
# JWT Configuration
# ======================
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRE="7d"
JWT_REFRESH_SECRET="your-refresh-token-secret"
JWT_REFRESH_EXPIRE="30d"

# ======================
# Meta Integration
# ======================
META_APP_ID="your-meta-app-id"
META_APP_SECRET="your-meta-app-secret"
META_REDIRECT_URI="http://localhost:5000/auth/meta/callback"
META_API_VERSION="v19.0"
META_TOKEN_ENC_KEY="your-32-character-encryption-key"

# ======================
# Server Configuration
# ======================
NODE_ENV="development"
PORT=5000
FRONTEND_URL="http://localhost:3000"

# ======================
# CORS Configuration
# ======================
CORS_ORIGIN="http://localhost:3000"

# ======================
# Email Configuration (Optional)
# ======================
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### Frontend Environment Variables

Create a `.env.local` file in the `software/Orbit-360/` directory:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXT_PUBLIC_APP_NAME="Orbit 360"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Meta App Configuration

To enable Meta integration:

1. Go to [Meta Developers](https://developers.facebook.com/)
2. Create a new app (Business type)
3. Add **Facebook Login** product
4. Configure OAuth Redirect URI: `http://localhost:5000/auth/meta/callback`
5. Add required permissions: `ads_management`, `ads_read`, `business_management`
6. Copy App ID and App Secret to your `.env` file

See **[META_INTEGRATION_SETUP.md](./META_INTEGRATION_SETUP.md)** for detailed instructions.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/refresh` | Refresh access token | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `POST` | `/api/auth/forgot-password` | Request password reset | ❌ |
| `POST` | `/api/auth/reset-password` | Reset password | ❌ |
| `GET` | `/api/auth/verify-email/:token` | Verify email address | ❌ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### Meta Integration

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/auth/meta/login` | Initiate OAuth flow | ✅ |
| `GET` | `/auth/meta/callback` | OAuth callback handler | ❌ |
| `GET` | `/api/meta/status` | Check connection status | ✅ |
| `DELETE` | `/api/meta/disconnect` | Disconnect Meta account | ✅ |
| `GET` | `/api/meta/ad-accounts` | List ad accounts | ✅ |
| `GET` | `/api/meta/campaigns` | List campaigns | ✅ |
| `POST` | `/api/meta/campaigns` | Create new campaign | ✅ |
| `GET` | `/api/meta/campaigns/:id` | Get campaign details | ✅ |
| `PATCH` | `/api/meta/campaigns/:id/pause` | Pause campaign | ✅ |
| `PATCH` | `/api/meta/campaigns/:id/resume` | Resume campaign | ✅ |
| `DELETE` | `/api/meta/campaigns/:id` | Delete campaign | ✅ |
| `GET` | `/api/meta/insights` | Get performance insights | ✅ |

### Stores

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/stores` | List all stores | ✅ |
| `POST` | `/api/stores` | Create new store | ✅ |
| `GET` | `/api/stores/:id` | Get store details | ✅ |
| `PUT` | `/api/stores/:id` | Update store | ✅ |
| `DELETE` | `/api/stores/:id` | Delete store | ✅ |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/products` | List products | ✅ |
| `POST` | `/api/products` | Create product | ✅ |
| `GET` | `/api/products/:id` | Get product details | ✅ |
| `PUT` | `/api/products/:id` | Update product | ✅ |
| `DELETE` | `/api/products/:id` | Delete product | ✅ |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/orders` | List orders | ✅ |
| `POST` | `/api/orders` | Create order | ✅ |
| `GET` | `/api/orders/:id` | Get order details | ✅ |
| `PUT` | `/api/orders/:id` | Update order | ✅ |
| `DELETE` | `/api/orders/:id` | Cancel order | ✅ |

For detailed API documentation with request/response examples, see **[API_REFERENCE.md](./docs/API_REFERENCE.md)**

---

## 📚 Documentation

### Setup & Installation
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 10 minutes
- **[META_INTEGRATION_SETUP.md](./META_INTEGRATION_SETUP.md)** - Comprehensive Meta setup guide

### Technical Documentation
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - Implementation overview
- **[software/Orbit-360/README_META_INTEGRATION.md](./software/Orbit-360/README_META_INTEGRATION.md)** - Frontend documentation
- **[backend/README.md](./backend/README.md)** - Backend API documentation

### External Resources
- [Meta Marketing API Documentation](https://developers.facebook.com/docs/marketing-apis)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

## 🧪 Testing

### Manual Testing

#### Test Meta Integration

1. Start both servers (backend and frontend)
2. Navigate to **http://localhost:3000**
3. Log in with your credentials
4. Go to **Integrations** page
5. Click **Connect Meta Account**
6. Complete OAuth flow
7. Test the following features:
   - View ad accounts
   - List campaigns
   - Create a test campaign
   - View campaign insights
   - Pause/Resume campaign

#### Test E-commerce Features

1. Create a new store
2. Add sample products
3. Create a test order
4. View order in dashboard
5. Check analytics

### Database Migration Testing

To apply Meta integration database changes:

```bash
cd backend

# Option 1: Using migration script
node migrate-meta.js

# Option 2: Using Prisma
npx prisma migrate dev --name add_meta_fields
npx prisma generate
```

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start

**Symptoms**: Server crashes or won't start

**Solutions**:
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Check if MongoDB is running
sudo service mongod status

# Verify DATABASE_URL format
# Correct: postgresql://user:pass@localhost:5432/dbname

# Check if port 5000 is available
lsof -i :5000
# If occupied, change PORT in .env
```

#### Frontend Won't Connect to Backend

**Symptoms**: API calls fail, CORS errors

**Solutions**:
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check NEXT_PUBLIC_API_URL in .env.local
# Should match backend URL exactly

# Review browser console for errors
# Check Network tab for failed requests
```

#### Meta OAuth Fails

**Symptoms**: Redirect fails, "Invalid redirect URI" error

**Solutions**:
1. Verify `META_REDIRECT_URI` in `.env` matches Meta app settings exactly
2. Ensure Meta app is in development mode (allows localhost)
3. Check that required permissions are granted in Meta app
4. Verify App ID and App Secret are correct
5. Clear browser cookies and try again

#### "Token Expired" Error

**Symptoms**: Meta API calls fail with authentication error

**Solutions**:
1. Reconnect Meta account from Integrations page
2. Verify `META_TOKEN_ENC_KEY` hasn't changed
3. Check token expiry settings in Meta app
4. Review backend logs for token refresh errors

#### Database Connection Failed

**Symptoms**: "Can't reach database server" error

**Solutions**:
```bash
# For PostgreSQL
# Check connection string format
DATABASE_URL="postgresql://user:password@localhost:5432/orbit360"

# Test connection
psql -U user -d orbit360

# For MongoDB
# Check connection string
MONGODB_URI="mongodb://localhost:27017/orbit360"

# Test connection
mongosh "mongodb://localhost:27017/orbit360"
```

For more troubleshooting help, see **[META_INTEGRATION_SETUP.md](./META_INTEGRATION_SETUP.md)**

---

## 🗺️ Roadmap

### ✅ Completed Features

- [x] Core e-commerce platform with multi-tenant support
- [x] User authentication and authorization
- [x] Store and product management
- [x] Order processing system
- [x] Meta OAuth 2.0 integration
- [x] Ad account and campaign management
- [x] Real-time performance insights
- [x] Comprehensive documentation

### 🚧 In Development

- [ ] Advanced campaign analytics dashboard
- [ ] Mobile app optimization
- [ ] Email notification system
- [ ] Inventory management system

### 📋 Planned Features

#### Short-term (Next 3 months)
- [ ] Ad set creation and management
- [ ] Creative asset uploads
- [ ] Advanced audience targeting
- [ ] Campaign templates
- [ ] Bulk campaign operations

#### Mid-term (3-6 months)
- [ ] A/B testing interface
- [ ] Automated campaign optimization
- [ ] Budget recommendation engine
- [ ] Multi-account management
- [ ] Advanced reporting and export

#### Long-term (6-12 months)
- [ ] AI-powered campaign suggestions
- [ ] Integration with Google Ads
- [ ] Multi-language support
- [ ] White-label solution
- [ ] Mobile applications (iOS/Android)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code structure
   - Write clean, documented code
   - Add tests for new features
4. **Test thoroughly**
   - Test all affected features
   - Ensure no breaking changes
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Coding Standards

- **JavaScript/TypeScript**: Use ESLint configuration
- **Formatting**: Prettier with 2-space indentation
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: JSDoc for functions, inline for complex logic
- **Security**: Never commit secrets or API keys

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Update documentation if needed
- Ensure all tests pass
- Follow commit message conventions

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Orbit 360

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

### Get Help

- **Documentation**: Check the `/docs` folder for comprehensive guides
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@orbit360.com

### Reporting Bugs

When reporting bugs, please include:
- Clear description of the issueaort
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Relevant logs or screenshots

### Feature Requests

We love hearing your ideas! Submit feature requests through GitHub Issues with the `enhancement` label.

---

## 🙏 Acknowledgments

Built with these amazing technologies:
- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Meta Marketing API](https://developers.facebook.com/docs/marketing-apis) - Advertising platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI components

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/your-repo/orbit360?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-repo/orbit360?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-repo/orbit360)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-repo/orbit360)

---

<div align="center">

**Made with ❤️ by the Orbit 360 Team**

[Website](https://orbit360.com) • [Documentation](./docs) • [Report Bug](https://github.com/your-repo/issues) • [Request Feature](https://github.com/your-repo/issues)

</div>


