const axios = require('axios');
const LogisticsProvider = require('../models/mongoose/LogisticsProvider');

const STAGING_URL = 'https://capi-qc.fship.in';
const PROD_URL = 'https://capi.fship.in';

class FShipService {
  async getClient(storeId) {
    const provider = await LogisticsProvider.findOne({ storeId, provider: 'FSHIP', isActive: true });
    if (!provider) {
      throw new Error('FShip logistics provider not configured or inactive for this store');
    }

    const baseUrl = provider.config.isStaging ? STAGING_URL : PROD_URL;
    const signature = provider.apiKey;

    console.log(`[FShip Service] Store ID: ${storeId}`);
    console.log(`[FShip Service] Environment: ${provider.config.isStaging ? 'Staging' : 'Production'}`);
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
    
    // Store signature for endpoints that require prefix overrides
    client._signature = signature;

    // Add request interceptor for debugging
    client.interceptors.request.use(
      config => {
        console.log(`[FShip Request] ${config.method?.toUpperCase()} ${config.url}`);
        console.log(`[FShip Request] Headers:`, {
          'Content-Type': config.headers['Content-Type'],
          'signature': config.headers['signature'] ? '***' + config.headers['signature'].slice(-10) : 'NONE'
        });
        return config;
      },
      error => {
        console.error('[FShip Request Error]:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
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

  async getAllCouriers(storeId) {
    const client = await this.getClient(storeId);
    try {
      const response = await client.get('/api/getallcourier');
      console.log('[FShip] Couriers response:', JSON.stringify(response.data, null, 2));
      console.log('[FShip] Response status:', response.status);
      console.log('[FShip] Response headers:', response.headers);
      
      // Handle different response formats
      let couriersData;
      if (Array.isArray(response.data)) {
        // Direct array response
        couriersData = { courier: response.data };
      } else if (response.data.courier) {
        // Already in expected format
        couriersData = response.data;
      } else {
        // Unexpected format
        console.log('[FShip] Unexpected response format:', typeof response.data, response.data);
        couriersData = { courier: [] };
      }
      
      console.log('[FShip] Processed couriers data:', couriersData);
      return couriersData;
    } catch (error) {
      console.error('[FShip] Failed to fetch couriers:', error.response?.data || error.message);
      console.error('[FShip] Error status:', error.response?.status);
      console.error('[FShip] Error headers:', error.response?.headers);
      throw error;
    }
  }

  async testConnection(storeId) {
    const client = await this.getClient(storeId);
    try {
      // Test with a simple endpoint first
      console.log('[FShip] Testing connection with rate calculator...');
      const testResponse = await client.post('/api/ratecalculator', {
        "source_Pincode": "110001",
        "destination_Pincode": "400001",
        "payment_Mode": "PREPAID",
        "amount": 1000,
        "express_Type": "surface",
        "shipment_Weight": 1,
        "shipment_Length": 10,
        "shipment_Width": 10,
        "shipment_Height": 10,
        "volumetric_Weight": 1
      });
      console.log('[FShip] Rate calculator test response:', testResponse.data);
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
}

module.exports = new FShipService();