const axios = require('axios');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const { encrypt } = require('../utils/crypto');
const MetaApiService = require('../services/metaApiService');

const normalizeMetaError = (error) => {
  if (error.response?.data?.error) {
    const metaErr = error.response.data.error;
    const err = new Error(metaErr.message || 'Meta API error');
    err.status = error.response.status || 400;
    err.meta = {
      type: metaErr.type,
      code: metaErr.code,
      fbtrace_id: metaErr.fbtrace_id,
      message: metaErr.message
    };
    return err;
  }
  const err = new Error('Meta API error');
  err.status = error.response?.status || 400;
  return err;
};

const buildOAuthUrl = (state) => {
  const scopes = ['ads_read', 'ads_management', 'business_management'].join(',');
  const params = new URLSearchParams({
    client_id: env.meta.appId,
    redirect_uri: env.meta.redirectUri,
    scope: scopes,
    response_type: 'code',
    state
  });
  return `https://www.facebook.com/${env.meta.apiVersion}/dialog/oauth?${params.toString()}`;
};

const login = async (req, res) => {
  const state = jwt.sign({ userId: req.user.id }, env.jwt.secret, { expiresIn: '15m' });
  const url = buildOAuthUrl(state);
  return res.redirect(url);
};

const callback = async (req, res, next) => {
  try {
    const { code, state } = req.query;
    if (!code || !state) return res.status(400).json({ message: 'Missing code or state' });
    let decoded;
    try {
      decoded = jwt.verify(state, env.jwt.secret);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid state' });
    }
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let tokenRes;
    try {
      tokenRes = await axios.get(
        `https://graph.facebook.com/${env.meta.apiVersion}/oauth/access_token`,
        {
          params: {
            client_id: env.meta.appId,
            client_secret: env.meta.appSecret,
            redirect_uri: env.meta.redirectUri,
            code
          }
        }
      );
    } catch (error) {
      return next(normalizeMetaError(error));
    }

    const { access_token, expires_in } = tokenRes.data;
    const expiresAt = new Date(Date.now() + (expires_in || 0) * 1000);
    const encrypted = encrypt(access_token);

    // Fetch ad accounts
    const metaService = new MetaApiService(access_token);
    const accounts = await metaService.getAdAccounts();
    const adAccountIds = (accounts?.data || []).map((a) => a.id);

    user.metaAccessToken = encrypted;
    user.metaTokenExpiresAt = expiresAt;
    user.metaAdAccounts = adAccountIds;
    await user.save();

    return res.json({ message: 'Meta connected', adAccounts: adAccountIds, expiresAt });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, callback };
