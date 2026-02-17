# Provisioning API Documentation

## Overview
This document describes the provisioning API endpoints for the ORBIT360 multi-tenant platform.

## Base URL
```
http://localhost:5000/api/provisioning
```

---

## Authentication
All endpoints require admin authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <admin_jwt_token>
```

---

## Endpoints

### 1. Activate Merchant

**Endpoint:** `POST /merchants/:id/activate`

**Description:** Activates a merchant and triggers automatic provisioning of dashboard, website, and workspace.

**URL Parameters:**
- `id` (string, required) - Store ID to activate

**Request Body:**
```json
{
  "themeId": "uuid",
  "planId": "uuid",
  "subdomain": "merchant-store",
  "domain": "merchant-store.com",
  "category": "Electronics",
  "integrations": {
    "meta": true,
    "stripe": true
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Merchant activated successfully",
  "data": {
    "success": true,
    "storeId": "uuid",
    "merchantId": "merchant_abc123",
    "dashboardUrl": "http://localhost:3003?merchant=merchant_abc123",
    "websiteUrl": "merchant-store.orbit360.shop",
    "message": "Merchant provisioned successfully"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields or store already provisioned
- `404 Not Found` - Store not found
- `500 Internal Server Error` - Provisioning failed

---

### 2. Get Provisioning Status

**Endpoint:** `GET /merchants/:id/provisioning-status`

**Description:** Get the current provisioning status for a merchant.

**URL Parameters:**
- `id` (string, required) - Store ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "storeId": "uuid",
    "status": "IN_PROGRESS",
    "workspaceCreated": true,
    "dashboardCreated": true,
    "websiteDeployed": false,
    "dataInitialized": false,
    "credentialsSent": false,
    "currentStep": "WEBSITE_DEPLOYED",
    "completionPercent": 60,
    "errorLog": null,
    "retryCount": 0,
    "startedAt": "2026-02-05T15:30:00.000Z",
    "completedAt": null,
    "createdAt": "2026-02-05T15:30:00.000Z",
    "updatedAt": "2026-02-05T15:30:45.000Z",
    "store": {
      "id": "uuid",
      "name": "My Store",
      "subdomain": "my-store",
      "theme": {
        "id": "uuid",
        "name": "Upfront Modern",
        "slug": "upfront-modern"
      },
      "plan": {
        "id": "uuid",
        "name": "Professional",
        "slug": "professional"
      },
      "deployment": {
        "merchantId": "merchant_abc123",
        "dashboardUrl": "http://localhost:3003?merchant=merchant_abc123",
        "websiteUrl": "my-store.orbit360.shop"
      }
    }
  }
}
```

---

### 3. Retry Provisioning

**Endpoint:** `POST /merchants/:id/retry-provisioning`

**Description:** Retry failed provisioning for a merchant.

**URL Parameters:**
- `id` (string, required) - Store ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Provisioning retry initiated",
  "data": {
    "success": true,
    "storeId": "uuid",
    "merchantId": "merchant_abc123",
    "dashboardUrl": "http://localhost:3003?merchant=merchant_abc123",
    "websiteUrl": "my-store.orbit360.shop"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Can only retry failed provisioning
- `404 Not Found` - Provisioning record not found
- `500 Internal Server Error` - Retry failed

---

### 4. Get Themes

**Endpoint:** `GET /themes`

**Description:** Get all available themes.

**Query Parameters:**
- `activeOnly` (boolean, optional) - Filter to only active themes

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Upfront Modern",
      "slug": "upfront-modern",
      "description": "A clean and modern e-commerce theme",
      "thumbnail": null,
      "version": "1.0.0",
      "isActive": true,
      "config": {
        "colors": {
          "primary": "#4F46E5",
          "secondary": "#10B981"
        }
      },
      "previewUrl": null,
      "createdAt": "2026-02-05T15:00:00.000Z",
      "updatedAt": "2026-02-05T15:00:00.000Z"
    }
  ]
}
```

---

### 5. Create Theme

**Endpoint:** `POST /themes`

**Description:** Create a new theme.

**Request Body:**
```json
{
  "name": "Custom Theme",
  "slug": "custom-theme",
  "description": "A custom theme for special merchants",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "version": "1.0.0",
  "config": {
    "colors": {
      "primary": "#FF5733",
      "secondary": "#33FF57"
    },
    "layout": "grid",
    "features": ["mega-menu", "quick-view"]
  },
  "previewUrl": "https://example.com/preview"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Theme created successfully",
  "data": {
    "id": "uuid",
    "name": "Custom Theme",
    "slug": "custom-theme",
    "description": "A custom theme for special merchants",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "version": "1.0.0",
    "isActive": true,
    "config": { ... },
    "previewUrl": "https://example.com/preview",
    "createdAt": "2026-02-05T15:00:00.000Z",
    "updatedAt": "2026-02-05T15:00:00.000Z"
  }
}
```

---

### 6. Update Theme

**Endpoint:** `PUT /themes/:id`

**Description:** Update an existing theme.

**URL Parameters:**
- `id` (string, required) - Theme ID

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Theme Name",
  "description": "Updated description",
  "isActive": false
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Theme updated successfully",
  "data": { ... }
}
```

---

### 7. Delete Theme

**Endpoint:** `DELETE /themes/:id`

**Description:** Delete a theme (only if not in use).

**URL Parameters:**
- `id` (string, required) - Theme ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Theme deleted successfully"
}
```

**Error Responses:**
- `400 Bad Request` - Theme is in use by stores
- `404 Not Found` - Theme not found

---

### 8. Get Plans

**Endpoint:** `GET /plans`

**Description:** Get all subscription plans.

**Query Parameters:**
- `activeOnly` (boolean, optional) - Filter to only active plans

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Professional",
      "slug": "professional",
      "description": "For growing businesses",
      "price": "79.99",
      "billingCycle": "monthly",
      "features": { ... },
      "productLimit": 1000,
      "orderLimit": null,
      "storageLimit": 51200,
      "bandwidthLimit": 512000,
      "isActive": true,
      "isPopular": true,
      "createdAt": "2026-02-05T15:00:00.000Z",
      "updatedAt": "2026-02-05T15:00:00.000Z"
    }
  ]
}
```

---

### 9. Create Plan

**Endpoint:** `POST /plans`

**Description:** Create a new subscription plan.

**Request Body:**
```json
{
  "name": "Custom Plan",
  "slug": "custom-plan",
  "description": "A custom plan for special needs",
  "price": 149.99,
  "billingCycle": "monthly",
  "features": {
    "products": 5000,
    "orders": "unlimited",
    "support": "24/7"
  },
  "productLimit": 5000,
  "orderLimit": null,
  "storageLimit": 102400,
  "bandwidthLimit": 1024000,
  "isPopular": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Plan created successfully",
  "data": { ... }
}
```

---

### 10. Update Plan

**Endpoint:** `PUT /plans/:id`

**Description:** Update an existing plan.

**URL Parameters:**
- `id` (string, required) - Plan ID

**Request Body:** (all fields optional)
```json
{
  "price": 99.99,
  "isActive": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Plan updated successfully",
  "data": { ... }
}
```

---

### 11. Delete Plan

**Endpoint:** `DELETE /plans/:id`

**Description:** Delete a plan (only if not in use).

**URL Parameters:**
- `id` (string, required) - Plan ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Plan deleted successfully"
}
```

---

### 12. Seed Defaults

**Endpoint:** `POST /seed-defaults`

**Description:** Seed default themes and plans (development/setup only).

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Default themes and plans seeded successfully",
  "data": {
    "themes": [ ... ],
    "plans": [ ... ]
  }
}
```

---

## Provisioning Flow

### Complete Merchant Activation Flow

1. **Admin selects merchant** from pending merchants list
2. **Admin clicks "Activate"** and fills in:
   - Theme selection
   - Plan selection
   - Domain/subdomain
   - Category
   - Integrations

3. **POST /merchants/:id/activate** is called
4. **Backend provisioning starts** (< 30 seconds):
   - ✅ Update store config (10%)
   - ✅ Create workspace (25%)
   - ✅ Create dashboard (40%)
   - ✅ Deploy website (60%)
   - ✅ Initialize data (80%)
   - ✅ Send credentials (95%)
   - ✅ Mark complete (100%)

5. **Merchant receives email** with:
   - Dashboard URL
   - Website URL
   - Login instructions

6. **Merchant logs in** and completes onboarding wizard

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

All endpoints are subject to rate limiting:
- 100 requests per 15 minutes per IP

---

## Testing

### Using cURL

```bash
# Get all themes
curl -X GET http://localhost:5000/api/provisioning/themes \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Activate merchant
curl -X POST http://localhost:5000/api/provisioning/merchants/STORE_ID/activate \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "themeId": "THEME_ID",
    "planId": "PLAN_ID",
    "subdomain": "my-store",
    "category": "Electronics"
  }'

# Get provisioning status
curl -X GET http://localhost:5000/api/provisioning/merchants/STORE_ID/provisioning-status \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- UUIDs are version 4
- Provisioning is asynchronous but typically completes in < 30 seconds
- Failed provisioning can be retried up to 3 times automatically
- Themes and plans can only be deleted if not in use
