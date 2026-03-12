const getBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.endsWith("/api") ? url : `${url}/api`;
};

const API_BASE_URL = getBaseUrl();


async function fetcher(url: string, options: any = {}) {
  // Add token from localStorage if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      options.headers = { 
        ...options.headers, 
        'Authorization': `Bearer ${token}` 
      };
    }
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}

export async function getStoreSettings(storeId: string) {
  return fetcher(`/stores/${storeId}/settings`);
}

// ─── Meta Ads ─────────────────────────────────────────────────────────────

export async function getMetaStatus() {
  return fetcher(`/meta/status`);
}

export async function getMetaAdAccounts() {
  return fetcher(`/meta/ad-accounts`);
}

export async function getMetaCampaigns(adAccountId: string) {
  return fetcher(`/meta/campaigns?adAccountId=${adAccountId}`);
}

export async function getMetaInsights(adAccountId: string, datePreset: string = 'last_30d') {
  return fetcher(`/meta/insights?adAccountId=${adAccountId}&datePreset=${datePreset}`);
}

export async function getMetaCreativeInsights(adAccountId: string) {
  return fetcher(`/meta/creatives/insights?adAccountId=${adAccountId}`);
}

export async function updateStoreSettings(storeId: string, settings: any) {
  return fetcher(`/stores/${storeId}/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
}

export async function getStoreAnalytics(storeId: string) {
  return fetcher(`/stores/${storeId}/analytics`);
}

export async function getStoreOrders(storeId: string) {
  return fetcher(`/orders/store/${storeId}`);
}

export async function getStoreProducts(storeId: string) {
  return fetcher(`/products?storeId=${storeId}`);
}

export async function createStoreProduct(storeId: string, productData: any) {
  return fetcher(`/products?storeId=${storeId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
}

export async function getStoreCustomers(storeId: string) {
  return fetcher(`/stores/${storeId}/customers`);
}

export async function getLogisticsStatus(storeId: string) {
  return fetcher(`/logistics/${storeId}/status`).catch(() => ({ success: false, configured: false }));
}

export async function configureLogistics(storeId: string, settings: any) {
  return fetcher(`/logistics/${storeId}/configure`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
}

export async function testLogisticsConnection(storeId: string) {
  return fetcher(`/logistics/${storeId}/test`);
}

export async function getLogisticsCouriers(storeId: string) {
  return fetcher(`/logistics/${storeId}/couriers`);
}

export async function trackShipment(storeId: string, waybill: string) {
  return fetcher(`/logistics/${storeId}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybill }),
  });
}

export async function getShipmentSummary(storeId: string, waybill: string) {
  return fetcher(`/logistics/${storeId}/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybill }),
  });
}

export async function getStoreCustomization(storeId: string) {
  return fetcher(`/stores/${storeId}/customization`);
}

export async function updateStoreCustomization(storeId: string, customization: any) {
  return fetcher(`/stores/${storeId}/customization`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customization),
  });
}

export async function deleteStoreProduct(productId: string) {
  return fetcher(`/products/${productId}`, {
    method: "DELETE",
  });
}

// ─── Logistics: Shipment Management ──────────────────────────────────────────

export async function createShipment(storeId: string, orderData: any) {
  return fetcher(`/logistics/${storeId}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
}

export async function cancelShipment(storeId: string, waybill: string, reason?: string) {
  return fetcher(`/logistics/${storeId}/cancel-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybill, reason }),
  });
}

export async function registerPickup(storeId: string, waybills: string[]) {
  return fetcher(`/logistics/${storeId}/register-pickup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybills }),
  });
}

export async function getShippingLabel(storeId: string, waybill: string) {
  return fetcher(`/logistics/${storeId}/label`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybill }),
  });
}

export async function reattemptShipment(storeId: string, data: any) {
  return fetcher(`/logistics/${storeId}/reattempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// ─── Logistics: Tools ─────────────────────────────────────────────────────────

export async function calculateRate(storeId: string, rateData: any) {
  return fetcher(`/logistics/${storeId}/rate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rateData),
  });
}

export async function checkPincodeServiceability(storeId: string, source_Pincode: string, destination_Pincode: string) {
  return fetcher(`/logistics/${storeId}/pincode`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source_Pincode, destination_Pincode }),
  });
}

// ─── Logistics: Warehouses ────────────────────────────────────────────────────

export async function addWarehouse(storeId: string, data: any) {
  return fetcher(`/logistics/${storeId}/warehouse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateWarehouse(storeId: string, data: any) {
  return fetcher(`/logistics/${storeId}/warehouse`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
