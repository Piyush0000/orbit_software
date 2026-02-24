const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ADMIN_TOKEN_KEY = "orbit_admin_token";

export const setAdminToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) {
    window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  } else {
    window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  }
};

const getAdminToken = () => {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
};

type ApiOptions = {
  method?: "GET" | "POST" | "PUT";
  body?: Record<string, unknown>;
};

async function adminRequest<T>(path: string, options: ApiOptions = {}) {
  const { method = "GET", body } = options;
  const token = getAdminToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) {
      setAdminToken(null);
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login?expired=true";
      }
    }
    let message = "Request failed";
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

export const loginAdmin = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    let message = "Login failed";
    try {
      const data = await res.json();
      message = data?.message || message;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }
  const data = (await res.json()) as { token: string };
  setAdminToken(data.token);
  return data;
};

export const getAdminMe = () =>
  adminRequest<{ admin: AdminUser }>("/api/admin/auth/me");

export type Store = {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string | null;
  isActive: boolean;
  onboardingStatus: string;
  createdAt: string;
  lastOnboardingActivityAt?: string | null;
  onboarding?: {
    status: string;
    currentStep: number;
    completionPercent: number;
    stepData?: Record<string, unknown>;
    startedAt?: string | null;
    completedAt?: string | null;
  } | null;
  description?: string | null;
  user?: { email?: string; fullName?: string | null };
};

export type AdminUser = {
  id: string;
  email: string;
  fullName?: string | null;
  role?: string;
  isActive?: boolean;
};

export type SupportTicket = {
  id: string;
  subject: string;
  summary?: string | null;
  status: string;
  source?: string | null;
  store?: Store | null;
  assignedAdmin?: AdminUser | null;
  createdAt: string;
  updatedAt: string;
};

export type TicketMessage = {
  id: string;
  ticketId: string;
  senderType: string;
  adminId?: string | null;
  message: string;
  createdAt: string;
};

export type TicketNote = {
  id: string;
  ticketId: string;
  adminId: string;
  note: string;
  createdAt: string;
};

export type CommunicationLog = {
  id: string;
  channel: string;
  direction: string;
  summary: string;
  occurredAt: string;
  createdAt: string;
};

export type CallLog = {
  id: string;
  channel: string;
  notes: string;
  occurredAt: string;
  createdAt: string;
};

export type BrandOnboardingDetails = {
  store: Store & {
    user?: { email?: string; fullName?: string | null };
    onboardingSteps?: Array<{
      stepKey: string;
      status: string;
      completedAt?: string | null;
      updatedAt?: string | null;
    }>;
    activityLogs?: Array<{ action: string; createdAt: string }>;
  };
  onboarding: Store["onboarding"];
  missingFields: Record<string, string[]>;
};

export type PlatformMetrics = {
  stores: number;
  activeStores: number;
  merchants: number;
  orders: number;
  revenue: number;
  averageOrderValue: number;
};

export type OrderItem = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: string | number;
  variantInfo?: Record<string, unknown> | null;
};

export type Order = {
  id: string;
  orderNumber: string;
  storeId: string;
  customerEmail: string;
  customerName: string;
  subtotal: string | number;
  tax: string | number;
  shipping: string | number;
  total: string | number;
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  store?: { id: string; name: string; subdomain: string };
  items?: OrderItem[];
};

export type ProductVariant = {
  id: string;
  name: string;
  sku?: string | null;
  price?: string | number | null;
  stock: number;
  options?: Record<string, unknown>;
};

export type ProductItem = {
  id: string;
  storeId: string;
  name: string;
  price: string | number;
  stock: number;
  isActive: boolean;
  category?: string | null;
  variants?: ProductVariant[];
};

export type OnboardingFunnelMetrics = {
  totalStores: number;
  statusSummary: Record<string, number>;
  stepSummary: Record<string, Record<string, number>>;
};

export const getBrands = (params?: { isActive?: boolean }) => {
  const search = new URLSearchParams();
  if (typeof params?.isActive === "boolean") {
    search.set("isActive", String(params.isActive));
  }
  const query = search.toString();
  return adminRequest<{ stores: Store[] }>(
    `/api/admin/brands${query ? `?${query}` : ""}`,
  );
};

export const getBrandOnboardingDetails = (brandId: string) =>
  adminRequest<BrandOnboardingDetails>(
    `/api/admin/brands/${brandId}/onboarding/details`,
  );

export const getBrandActivity = (brandId: string) =>
  adminRequest<{ logs: Array<{ action: string; createdAt: string }> }>(
    `/api/admin/brands/${brandId}/activity`,
  );

export const getPlatformMetrics = () =>
  adminRequest<{ metrics: PlatformMetrics }>("/api/admin/analytics/platform");

export const getBrandMetrics = (brandId: string) =>
  adminRequest<{ metrics: Record<string, unknown> }>(
    `/api/admin/analytics/brands/${brandId}`,
  );

export const getPlatformAggregates = (params?: {
  periodType?: string;
  start?: string;
  end?: string;
}) => {
  const search = new URLSearchParams();
  if (params?.periodType) search.set("periodType", params.periodType);
  if (params?.start) search.set("start", params.start);
  if (params?.end) search.set("end", params.end);
  const query = search.toString();
  return adminRequest<{ aggregates: Array<Record<string, unknown>> }>(
    `/api/admin/analytics/aggregates${query ? `?${query}` : ""}`,
  );
};

export const getOnboardingFunnel = () =>
  adminRequest<{ metrics: OnboardingFunnelMetrics }>(
    "/api/admin/analytics/onboarding-funnel",
  );

export const getInactiveOnboarding = (days = 7) =>
  adminRequest<{ stores: Store[]; inactivityDays: number }>(
    `/api/admin/onboarding/inactive?days=${days}`,
  );

export const getBrandDetail = (storeId: string) =>
  adminRequest<BrandOnboardingDetails>(`/api/admin/brands/${storeId}`);

export const getUsers = () =>
  adminRequest<{ users: AdminUser[] }>("/api/admin/users");

export const getStores = () =>
  adminRequest<{ stores: Store[] }>("/api/admin/stores");

export const getTickets = (params?: {
  status?: string;
  storeId?: string;
  assignedAdminId?: string;
}) => {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.storeId) search.set("storeId", params.storeId);
  if (params?.assignedAdminId)
    search.set("assignedAdminId", params.assignedAdminId);
  const query = search.toString();
  return adminRequest<{ tickets: SupportTicket[] }>(
    `/api/admin/tickets${query ? `?${query}` : ""}`,
  );
};

export const getTicket = (ticketId: string) =>
  adminRequest<{
    ticket: SupportTicket;
    messages: TicketMessage[];
    notes: TicketNote[];
  }>(`/api/admin/tickets/${ticketId}`);

export const respondToTicket = (ticketId: string, message: string) =>
  adminRequest<{ ticket: SupportTicket }>(
    `/api/admin/tickets/${ticketId}/respond`,
    {
      method: "POST",
      body: { message },
    },
  );

export const addTicketNote = (ticketId: string, note: string) =>
  adminRequest<{ note: TicketNote }>(`/api/admin/tickets/${ticketId}/notes`, {
    method: "POST",
    body: { note },
  });

export const resolveTicket = (ticketId: string) =>
  adminRequest<{ ticket: SupportTicket }>(
    `/api/admin/tickets/${ticketId}/resolve`,
    {
      method: "POST",
    },
  );

export const getBrandCommunications = (brandId: string) =>
  adminRequest<{ communications: CommunicationLog[] }>(
    `/api/admin/brands/${brandId}/communications`,
  );

export const getBrandCalls = (brandId: string) =>
  adminRequest<{ calls: CallLog[] }>(`/api/admin/brands/${brandId}/calls`);

export const createBrandCommunication = (
  brandId: string,
  payload: { channel: string; summary: string },
) =>
  adminRequest<{ communication: CommunicationLog }>(
    `/api/admin/brands/${brandId}/communications`,
    {
      method: "POST",
      body: payload,
    },
  );

export const createBrandCall = (
  brandId: string,
  payload: { channel: string; notes: string },
) =>
  adminRequest<{ call: CallLog }>(`/api/admin/brands/${brandId}/calls`, {
    method: "POST",
    body: payload,
  });

export const provisionBrand = (
  brandId: string,
  config: {
    themeId: string;
    planId: string;
    subdomain: string;
    category: string;
    domain?: string;
  },
) =>
  adminRequest<{
    success: boolean;
    dashboardUrl: string;
    websiteUrl: string;
  }>(`/api/admin/brands/${brandId}/provision`, {
    method: "POST",
    body: config,
  });

export const getThemes = () =>
  adminRequest<{ themes: Array<{ id: string; name: string; slug: string }> }>(
    "/api/admin/themes",
  );

export const getPlans = () =>
  adminRequest<{ plans: Array<{ id: string; name: string; slug: string }> }>(
    "/api/admin/plans",
  );

// Provisioning APIs
export const getPendingMerchants = () =>
  adminRequest<{
    success: boolean;
    merchants: Array<Store & { user: AdminUser; onboarding: unknown }>;
  }>("/api/admin/provisioning/pending");

export const getProvisioningDetails = (storeId: string) =>
  adminRequest<{
    success: boolean;
    store: Store & {
      user: AdminUser;
      theme: unknown;
      websiteCustomization: unknown;
      onboarding: unknown;
      plan: unknown;
    };
  }>(`/api/admin/provisioning/${storeId}`);

export const provisionMerchant = (
  storeId: string,
  payload: {
    themeId: string;
    planId?: string;
    categoryConfig?: Record<string, unknown>;
  },
) =>
  adminRequest<{
    success: boolean;
    message: string;
    store: {
      id: string;
      name: string;
      subdomain: string;
      storefront: string;
      dashboard: string;
      themeId: string;
      provisioningStatus: "COMPLETED" | "PENDING" | "IN_PROGRESS" | "FAILED";
    };
  }>(`/api/admin/provisioning/${storeId}/provision`, {
    method: "POST",
    body: payload,
  });

export const updateMerchantDomain = (
  storeId: string,
  payload: { customDomain?: string },
) =>
  adminRequest<{
    success: boolean;
    store: {
      id: string;
      subdomain: string;
      customDomain?: string;
      storefront: string;
    };
  }>(`/api/admin/provisioning/${storeId}/domain`, {
    method: "PUT",
    body: payload,
  });

// New Merchant Provisioning APIs
export type MerchantCredential = {
  id: string;
  merchantName: string;
  email: string;
  password: string;
  userId: string;
  storeId: string;
  storeName: string;
  subdomain: string;
  customDomain?: string | null;
  theme: string;
  category: string;
  isActive: boolean;
  provisioningStatus: string;
  onboardingStatus: string;
  mustChangePassword: boolean;
  dashboardUrl: string;
  storefrontUrl: string;
  upfrontTemplateUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const createMerchant = (payload: {
  merchantName: string;
  email: string;
  password: string;
  category: string;
  theme: string;
  subdomain: string;
  customDomain?: string;
  planId?: string;
  categoryConfig?: Record<string, unknown>;
}) =>
  adminRequest<{
    success: boolean;
    message: string;
    merchant: {
      id: string;
      name: string;
      email: string;
      password: string;
      storeId: string;
      storeName: string;
      subdomain: string;
      customDomain?: string | null;
      theme: string;
      category: string;
      dashboardUrl: string;
      storefrontUrl: string;
      upfrontTemplateUrl: string;
      createdAt: string;
    };
  }>("/api/admin/provision", {
    method: "POST",
    body: payload,
  });

export const getCategoryConfigs = () =>
  adminRequest<{
    success: boolean;
    configs: Array<Record<string, unknown>>;
  }>("/api/admin/category-configs");

export const getStoreCategoryConfig = (storeId: string) =>
  adminRequest<{
    success: boolean;
    category: string;
    config: Record<string, unknown>;
  }>(`/api/admin/stores/${storeId}/category-config`);

export const updateStoreCategoryConfig = (
  storeId: string,
  payload: { category: string; config: Record<string, unknown> },
) =>
  adminRequest<{
    success: boolean;
    category: string;
    config: Record<string, unknown>;
  }>(`/api/admin/stores/${storeId}/category-config`, {
    method: "PUT",
    body: payload,
  });

export const getMerchantCredentials = () =>
  adminRequest<{
    success: boolean;
    credentials: MerchantCredential[];
    total: number;
  }>("/api/admin/merchant-credentials");

export const getMerchantCredential = (id: string) =>
  adminRequest<{
    success: boolean;
    credentials: MerchantCredential;
  }>(`/api/admin/merchant-credentials/${id}`);

export const updateMerchantPassword = (id: string, newPassword: string) =>
  adminRequest<{
    success: boolean;
    message: string;
  }>(`/api/admin/merchant-credentials/${id}/password`, {
    method: "PUT",
    body: { newPassword },
  });

export const getAdminOrders = (params?: {
  storeId?: string;
  status?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  limit?: number;
  offset?: number;
}) => {
  const search = new URLSearchParams();
  if (params?.storeId) search.set("storeId", params.storeId);
  if (params?.status) search.set("status", params.status);
  if (params?.paymentStatus) search.set("paymentStatus", params.paymentStatus);
  if (params?.fulfillmentStatus)
    search.set("fulfillmentStatus", params.fulfillmentStatus);
  if (typeof params?.limit === "number")
    search.set("limit", String(params.limit));
  if (typeof params?.offset === "number")
    search.set("offset", String(params.offset));
  const query = search.toString();
  return adminRequest<{ orders: Order[]; pagination: Record<string, unknown> }>(
    `/api/admin/orders${query ? `?${query}` : ""}`,
  );
};

export const getAdminOrder = (orderId: string) =>
  adminRequest<{ order: Order }>(`/api/admin/orders/${orderId}`);

export const updateAdminOrderStatus = (orderId: string, status: string) =>
  adminRequest<{ order: Order }>(`/api/admin/orders/${orderId}/status`, {
    method: "PUT",
    body: { status },
  });

export const updateAdminOrderFulfillment = (
  orderId: string,
  fulfillmentStatus: string,
) =>
  adminRequest<{ order: Order }>(`/api/admin/orders/${orderId}/fulfillment`, {
    method: "PUT",
    body: { fulfillmentStatus },
  });

export const updateAdminPaymentStatus = (
  orderId: string,
  paymentStatus: string,
) =>
  adminRequest<{ order: Order }>(`/api/admin/orders/${orderId}/payment`, {
    method: "PUT",
    body: { paymentStatus },
  });

export const getAdminProducts = (storeId: string) =>
  adminRequest<{ products: ProductItem[] }>(
    `/api/admin/products?storeId=${storeId}`,
  );

export const updateAdminProductStock = (productId: string, stock: number) =>
  adminRequest<{ product: ProductItem }>(
    `/api/admin/products/${productId}/stock`,
    {
      method: "PUT",
      body: { stock },
    },
  );

export const updateAdminVariantStock = (variantId: string, stock: number) =>
  adminRequest<{ variant: ProductVariant }>(
    `/api/admin/variants/${variantId}/stock`,
    {
      method: "PUT",
      body: { stock },
    },
  );


