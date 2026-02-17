const MetaApiService = require('../services/metaApiService');
const { decrypt } = require('../utils/crypto');
const env = require('../config/env');

const normalizeAdAccountId = (id) => {
  if (!id) return null;
  const clean = String(id).replace(/act_/gi, '');
  return `act_${clean}`;
};

const respondNoPermission = (res) =>
  res.status(403).json({
    error: 'NO_PERMISSION',
    message: 'User does not have advertiser access to this ad account'
  });

const ensureMetaToken = (user) => {
  if (user?.metaAccessToken) {
    if (!user.metaTokenExpiresAt) {
      const err = new Error('Meta account not connected');
      err.status = 400;
      throw err;
    }
    if (new Date(user.metaTokenExpiresAt) < new Date()) {
      const err = new Error('Meta token expired, please re-authenticate');
      err.status = 401;
      throw err;
    }
    return decrypt(user.metaAccessToken);
  }
  if (env.meta.publicAccessToken) {
    return env.meta.publicAccessToken;
  }
  const err = new Error('Meta account not connected');
  err.status = 401;
  throw err;
};

const withService = (user) => {
  const token = ensureMetaToken(user);
  return new MetaApiService(token);
};

const getAdAccounts = async (req, res, next) => {
  try {
    const service = withService(req.user);
    const data = await service.getAdAccounts();
    const accounts = data.data || [];

    // Check access per account with a lightweight permission probe
    const withAccess = await Promise.all(
      accounts.map(async (acc) => {
        const id = normalizeAdAccountId(acc.id);
        try {
          const hasAccess = await service.hasAccess(id);
          return {
            id,
            name: acc.name,
            hasAccess,
            status: hasAccess ? 'ACTIVE' : 'NO_PERMISSION'
          };
        } catch (err) {
          // If Meta says no permission, mark accordingly; otherwise bubble up
          if (err.noPermission) {
            return {
              id,
              name: acc.name,
              hasAccess: false,
              status: 'NO_PERMISSION'
            };
          }
          throw err;
        }
      })
    );

    res.json({ adAccounts: withAccess });
  } catch (err) {
    next(err);
  }
};

const getCampaigns = async (req, res, next) => {
  try {
    const adAccountId = normalizeAdAccountId(req.query.adAccountId);
    if (!adAccountId) return res.status(400).json({ message: 'adAccountId required' });
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const data = await service.getCampaigns(adAccountId);
    
    // Debug logging
    console.log('=== META CAMPAIGNS RAW RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('=== END META RESPONSE ===');
    
    res.json({ campaigns: data.data });
  } catch (err) {
    next(err);
  }
};

const createCampaign = async (req, res, next) => {
  try {
    const { name, objective, budget, status } = req.body;
    const adAccountId = normalizeAdAccountId(req.body.adAccountId);
    if (!adAccountId || !name || !objective || !status) {
      return res.status(400).json({ message: 'adAccountId, name, objective, status required' });
    }
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const payload = {
      name,
      objective,
      status,
      daily_budget: budget
    };
    const data = await service.createCampaign(adAccountId, payload);
    res.status(201).json({ campaign: data });
  } catch (err) {
    next(err);
  }
};

const pauseCampaign = async (req, res, next) => {
  try {
    const service = withService(req.user);
    const data = await service.updateCampaignStatus(req.params.id, 'PAUSED');
    res.json({ campaign: data });
  } catch (err) {
    next(err);
  }
};

const resumeCampaign = async (req, res, next) => {
  try {
    const service = withService(req.user);
    const data = await service.updateCampaignStatus(req.params.id, 'ACTIVE');
    res.json({ campaign: data });
  } catch (err) {
    next(err);
  }
};

const getInsights = async (req, res, next) => {
  try {
    const adAccountId = normalizeAdAccountId(req.query.adAccountId);
    if (!adAccountId) return res.status(400).json({ message: 'adAccountId required' });
    const metrics = ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'actions', 'action_values', 'purchase_roas'];
    const datePreset = req.query.datePreset || 'last_30d';
    const timeIncrement = req.query.timeIncrement || '1';
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const data = await service.getInsights(adAccountId, metrics, {
      datePreset,
      timeIncrement
    });
    
    // Debug logging
    console.log('=== META INSIGHTS RAW RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('=== END META INSIGHTS ===');
    
    res.json({ insights: data.data });
  } catch (err) {
    next(err);
  }
};

const getCreatives = async (req, res, next) => {
  try {
    const adAccountId = normalizeAdAccountId(req.query.adAccountId);
    if (!adAccountId) return res.status(400).json({ message: 'adAccountId required' });
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const data = await service.getCreatives(adAccountId);
    res.json({ creatives: data.data });
  } catch (err) {
    next(err);
  }
};

const getCreativeInsights = async (req, res, next) => {
  try {
    const adAccountId = normalizeAdAccountId(req.query.adAccountId);
    if (!adAccountId) return res.status(400).json({ message: 'adAccountId required' });
    const datePreset = req.query.datePreset || 'last_30d';
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const data = await service.getAdsWithInsights(adAccountId, {
      datePreset
    });

    const ads = data.data || [];
    const byCreative = {};

    ads.forEach((ad) => {
      const creative = ad.creative || {};
      if (!creative.id) return;
      const insightsData = ad.insights?.data?.[0] || {};

      const impressions = parseInt(insightsData.impressions || 0, 10);
      const clicks = parseInt(insightsData.clicks || 0, 10);
      const spend = parseFloat(insightsData.spend || 0);

      const actions = insightsData.actions || [];
      const purchaseAction = actions.find(
        (a) =>
          a.action_type === 'purchase' ||
          a.action_type === 'offsite_conversion.fb_pixel_purchase'
      );
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0, 10) : 0;

      const actionValues = insightsData.action_values || [];
      const purchaseValue = actionValues.find(
        (av) =>
          av.action_type === 'purchase' ||
          av.action_type === 'offsite_conversion.fb_pixel_purchase'
      );
      const revenue = purchaseValue ? parseFloat(purchaseValue.value || 0) : 0;

      if (!byCreative[creative.id]) {
        byCreative[creative.id] = {
          creative_id: creative.id,
          impressions: 0,
          clicks: 0,
          spend: 0,
          purchases: 0,
          revenue: 0
        };
      }

      byCreative[creative.id].impressions += impressions;
      byCreative[creative.id].clicks += clicks;
      byCreative[creative.id].spend += spend;
      byCreative[creative.id].purchases += purchases;
      byCreative[creative.id].revenue += revenue;
    });

    const insights = Object.values(byCreative).map((row) => ({
      ...row,
      ctr: row.impressions > 0 ? (row.clicks / row.impressions) * 100 : 0,
      cpc: row.clicks > 0 ? row.spend / row.clicks : 0
    }));

    res.json({ insights });
  } catch (err) {
    next(err);
  }
};

const getCreativePreview = async (req, res, next) => {
  try {
    const adAccountId = normalizeAdAccountId(req.query.adAccountId);
    const adFormat = req.query.adFormat || 'DESKTOP_FEED_STANDARD';
    const creativeId = req.query.creativeId;
    const objectStoryId = req.query.objectStoryId;
    if (!adAccountId) return res.status(400).json({ message: 'adAccountId required' });
    if (!creativeId && !objectStoryId) {
      return res.status(400).json({ message: 'creativeId or objectStoryId required' });
    }
    const service = withService(req.user);
    const hasAccess = await service.hasAccess(adAccountId);
    if (!hasAccess) return respondNoPermission(res);
    const creativeSpec = creativeId
      ? { creative_id: creativeId }
      : { object_story_id: objectStoryId };
    const data = await service.generatePreview(adAccountId, creativeSpec, adFormat);
    res.json({ previews: data.data });
  } catch (err) {
    next(err);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const publicToken = env.meta.publicAccessToken;
    const connected = !!(user?.metaAccessToken && user?.metaTokenExpiresAt) || !!publicToken;
    const isExpired =
      user?.metaTokenExpiresAt ? new Date(user.metaTokenExpiresAt) < new Date() : false;
    
    res.json({
      connected: connected && !isExpired,
      expiresAt: user?.metaTokenExpiresAt || null,
      adAccounts: user?.metaAdAccounts || []
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAdAccounts,
  getCampaigns,
  createCampaign,
  pauseCampaign,
  resumeCampaign,
  getInsights,
  getCreatives,
  getCreativeInsights,
  getCreativePreview,
  getStatus
};
