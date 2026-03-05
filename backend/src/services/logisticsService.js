const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STAGING_URL = 'https://capi-qc.fship.in';
const PROD_URL = 'https://capi.fship.in';

// ─── File-based config store (no MongoDB needed) ─────────────────────────────
// Stores API keys in: backend/logistics_config.json
const CONFIG_FILE = path.join(__dirname, '../../..', 'logistics_config.json');

function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('[FShip] Failed to read config file:', e.message);
  }
  return {};
}

function writeConfig(data) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('[FShip] Failed to write config file:', e.message);
    throw e;
  }
}

function getProviderConfig(storeId) {
  const all = readConfig();
  return all[storeId] || null;
}

function saveProviderConfig(storeId, apiKey, isStaging) {
  const all = readConfig();
  all[storeId] = { apiKey, isStaging, isActive: true, updatedAt: new Date().toISOString() };
  writeConfig(all);
  return all[storeId];
}

class FShipService {
  async getClient(storeId) {
    const provider = getProviderConfig(storeId);
    if (!provider || !provider.isActive) {
      throw new Error('FShip logistics provider not configured or inactive for this store');
    }

    const baseUrl = provider.isStaging ? STAGING_URL : PROD_URL;
    const signature = provider.apiKey;

    console.log(`[FShip Service] Store ID: ${storeId}`);
    console.log(`[FShip Service] Environment: ${provider.isStaging ? 'Staging' : 'Production'}`);
    console.log(`[FShip Service] Base URL: ${baseUrl}`);
    console.log(`[FShip Service] API Key length: ${signature?.length || 0}`);
    console.log(`[FShip Service] API Key (last 10 chars): ${signature ? '***' + signature.slice(-10) : 'NONE'}`);

    const client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'signature': signature
      }
    });

    client._signature = signature;

    client.interceptors.request.use(
      config => {
        console.log(`[FShip Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        console.error('[FShip Request Error]:', error);
        return Promise.reject(error);
      }
    );

    client.interceptors.response.use(
      response => {
        console.log(`[FShip API] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        return response;
      },
      error => {
        console.error(`[FShip API] Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
        console.error(`[FShip API] Response data:`, error.response?.data);
        return Promise.reject(error);
      }
    );

    return client;
  }

  // ─── Provider Management (file-based, no MongoDB) ──────────────────────────

  getStatus(storeId) {
    const provider = getProviderConfig(storeId);
    return {
      success: true,
      configured: !!provider,
      active: provider?.isActive || false,
      settings: provider ? {
        apiKey: provider.apiKey,
        isStaging: provider.isStaging ?? true
      } : null
    };
  }

  configure(storeId, apiKey, isStaging) {
    const result = saveProviderConfig(storeId, apiKey, isStaging);
    return { success: true, provider: result };
  }

  // ─── FShip API Methods ──────────────────────────────────────────────────────

  async getAllCouriers(storeId) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.get('/api/getallcourier');
      console.log('[FShip] Couriers response:', JSON.stringify(response.data, null, 2));
      let couriersData;
      if (Array.isArray(response.data)) {
        couriersData = { courier: response.data };
      } else if (response.data.courier) {
        couriersData = response.data;
      } else {
        couriersData = { courier: [] };
      }
      return couriersData;
    } catch (error) {
      console.error('[FShip] Failed to fetch couriers:', error.response?.data || error.message);
      throw error;
    }
  }

  async testConnection(storeId) {
    const client = await this.getClient(storeId);
    try {
      const testResponse = await client.post('/api/ratecalculator', {
        source_Pincode: '110001',
        destination_Pincode: '400001',
        payment_Mode: 'PREPAID',
        amount: 1000,
        express_Type: 'surface',
        shipment_Weight: 1,
        shipment_Length: 10,
        shipment_Width: 10,
        shipment_Height: 10,
        volumetric_Weight: 1
      });
      return { success: true, data: testResponse.data };
    } catch (error) {
      console.error('[FShip] Connection test failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async trackOrder(storeId, waybill) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/trackinghistory', { waybill });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to track order:', error.response?.data || error.message);
      throw error;
    }
  }

  async getShipmentSummary(storeId, waybill) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/shipmentsummary', { waybill });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to get shipment summary:', error.response?.data || error.message);
      throw error;
    }
  }

  async createForwardOrder(storeId, orderData) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/createforwardorder', orderData);
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to create order:', error.response?.data || error.message);
      throw error;
    }
  }

  async cancelOrder(storeId, waybill, reason) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/cancelorder', { waybill, reason });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to cancel order:', error.response?.data || error.message);
      throw error;
    }
  }

  async registerPickup(storeId, waybills) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/registerpickup', { waybills });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to register pickup:', error.response?.data || error.message);
      throw error;
    }
  }

  async getShippingLabel(storeId, waybill) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/shippinglabel', { waybill });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to get shipping label:', error.response?.data || error.message);
      throw error;
    }
  }

  async calculateRate(storeId, rateData) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/ratecalculator', rateData);
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to calculate rate:', error.response?.data || error.message);
      throw error;
    }
  }

  async checkPincodeServiceability(storeId, source_Pincode, destination_Pincode) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/pincodeserviceability', {
        source_Pincode,
        destination_Pincode
      });
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to check pincode serviceability:', error.response?.data || error.message);
      throw error;
    }
  }

  async reattemptOrder(storeId, reattemptData) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/reattemptorder', reattemptData);
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to reattempt order:', error.response?.data || error.message);
      throw error;
    }
  }

  async addWarehouse(storeId, warehouseData) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/AddWarehouse', warehouseData);
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to add warehouse:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateWarehouse(storeId, warehouseData) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.post('/api/UpdateWarehouse', warehouseData);
      return response.data;
    } catch (error) {
      console.error('[FShip] Failed to update warehouse:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new FShipService();