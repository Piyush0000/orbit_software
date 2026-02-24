const logisticsService = require('../services/logisticsService');
const LogisticsProvider = require('../models/mongoose/LogisticsProvider');

exports.testConnection = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const result = await logisticsService.testConnection(storeId);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.getCouriers = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const couriers = await logisticsService.getAllCouriers(storeId);
    res.json({ success: true, couriers });
  } catch (err) {
    next(err);
  }
};

exports.trackShipment = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { waybill } = req.body;
    const tracking = await logisticsService.trackOrder(storeId, waybill);
    res.json({ success: true, tracking });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { waybill } = req.body;
    const summary = await logisticsService.getShipmentSummary(storeId, waybill);
    res.json({ success: true, summary });
  } catch (err) {
    next(err);
  }
};

exports.configureProvider = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { apiKey, isStaging } = req.body;
    
    console.log(`[Logistics] Configuring provider for store: ${storeId}`);
    console.log(`[Logistics] API Key received: ${apiKey ? '***' + apiKey.slice(-4) : 'none'}`);
    console.log(`[Logistics] Environment: ${isStaging ? 'Staging' : 'Production'}`);

    const provider = await LogisticsProvider.findOneAndUpdate(
      { storeId, provider: 'FSHIP' },
      { 
        apiKey, 
        config: { isStaging },
        isActive: true
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, provider });
  } catch (err) {
    next(err);
  }
};

exports.getProviderStatus = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    console.log(`Checking logistics status for store: ${storeId}`);
    const provider = await LogisticsProvider.findOne({ storeId, provider: 'FSHIP' });
    res.json({ 
      success: true, 
      configured: !!provider, 
      active: provider?.isActive || false,
      settings: provider ? {
        apiKey: provider.apiKey,
        isStaging: provider.config?.isStaging ?? true
      } : null
    });
  } catch (err) {
    console.error(`Error checking logistics status: ${err.message}`);
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const orderData = req.body;
    const shipment = await logisticsService.createForwardOrder(storeId, orderData);
    res.json({ success: true, shipment });
  } catch (err) {
    next(err);
  }
};
