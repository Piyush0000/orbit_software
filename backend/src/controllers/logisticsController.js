const logisticsService = require('../services/logisticsService');

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

    const result = logisticsService.configure(storeId, apiKey, isStaging ?? true);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getProviderStatus = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    console.log(`Checking logistics status for store: ${storeId}`);
    const status = logisticsService.getStatus(storeId);
    res.json(status);
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
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { waybill, reason } = req.body;
    const result = await logisticsService.cancelOrder(storeId, waybill, reason);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.registerPickup = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { waybills } = req.body;
    if (!waybills || !Array.isArray(waybills) || waybills.length === 0) {
      return res.status(400).json({ success: false, message: 'waybills must be a non-empty array' });
    }
    const result = await logisticsService.registerPickup(storeId, waybills);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.getShippingLabel = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { waybill } = req.body; // can be comma-separated for multiple
    if (!waybill) {
      return res.status(400).json({ success: false, message: 'waybill is required' });
    }
    const label = await logisticsService.getShippingLabel(storeId, waybill);
    res.json({ success: true, label });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.calculateRate = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const rateData = req.body;
    const rates = await logisticsService.calculateRate(storeId, rateData);
    res.json({ success: true, rates });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.checkPincodeServiceability = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { source_Pincode, destination_Pincode } = req.body;
    if (!source_Pincode || !destination_Pincode) {
      return res.status(400).json({ success: false, message: 'source_Pincode and destination_Pincode are required' });
    }
    const result = await logisticsService.checkPincodeServiceability(storeId, source_Pincode, destination_Pincode);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.reattemptOrder = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const reattemptData = req.body;
    if (!reattemptData.apiorderid || !reattemptData.action) {
      return res.status(400).json({ success: false, message: 'apiorderid and action are required' });
    }
    const result = await logisticsService.reattemptOrder(storeId, reattemptData);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.addWarehouse = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const warehouseData = req.body;
    const result = await logisticsService.addWarehouse(storeId, warehouseData);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};

exports.updateWarehouse = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const warehouseData = req.body;
    const result = await logisticsService.updateWarehouse(storeId, warehouseData);
    res.json({ success: true, result });
  } catch (err) {
    if (err.response?.data) {
      err.message = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
    }
    next(err);
  }
};
