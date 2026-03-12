const axios = require('axios');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { prisma } = require('../config/database');
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
  const scopes = [
    'ads_read', 
    'ads_management', 
    'business_management',
    'read_insights'
  ].join(',');
  
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
  // Use JWT for state to pass userId securely through Meta OAuth
  const state = jwt.sign({ userId: req.user.id }, env.jwt.secret, { expiresIn: '15m' });
  const url = buildOAuthUrl(state);
  return res.redirect(url);
};

const callback = async (req, res, next) => {
  try {
    const { code, state, error } = req.query;
    
    // User denied or Meta error
    if (error) {
      return res.redirect(`${env.frontendUrl}/integrations?meta=error&msg=${encodeURIComponent(error)}`);
    }

    if (!code || !state) return res.status(400).json({ message: 'Missing code or state' });
    
    let decoded;
    try {
      decoded = jwt.verify(state, env.jwt.secret);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired state' });
    }

    const actor = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!actor) return res.status(404).json({ message: 'User not found' });

    // Exchange code for short-lived token, then short-lived for long-lived
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
      console.error("[Meta Callback] Exchange failed:", error.response?.data || error.message);
      return next(normalizeMetaError(error));
    }

    const { access_token } = tokenRes.data;
    
    // Exchange for Long-Lived Token (60 days)
    let longLivedRes;
    try {
      longLivedRes = await axios.get(
        `https://graph.facebook.com/${env.meta.apiVersion}/oauth/access_token`,
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: env.meta.appId,
            client_secret: env.meta.appSecret,
            fb_exchange_token: access_token
          }
        }
      );
    } catch (error) {
       console.error("[Meta Callback] LLT exchange failed:", error.response?.data || error.message);
       return next(normalizeMetaError(error));
    }

    const finalToken = longLivedRes.data.access_token;
    const expiresAt = new Date(Date.now() + (longLivedRes.data.expires_in || 5184000) * 1000);
    const encrypted = encrypt(finalToken);

    // Fetch initial ad accounts for the user's dashboard selection
    const metaService = new MetaApiService(finalToken);
    const accounts = await metaService.getAdAccounts();
    const adAccountIds = (accounts?.data || []).map((a) => a.id);

    // Persist to Prisma
    await prisma.user.update({
      where: { id: actor.id },
      data: {
        metaAccessToken: encrypted,
        metaTokenExpiresAt: expiresAt,
        metaAdAccounts: adAccountIds
      }
    });

    // Success redirect
    return res.redirect(`${env.frontendUrl}/integrations?meta=success`);
  } catch (err) {
    next(err);
  }
};

const status = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    
    const connected = !!(user.metaAccessToken && user.metaTokenExpiresAt);
    const expired = user.metaTokenExpiresAt ? new Date(user.metaTokenExpiresAt) < new Date() : false;

    return res.json({
      connected: connected && !expired,
      adAccounts: user.metaAdAccounts || [],
      expiresAt: user.metaTokenExpiresAt,
      isExpired: expired
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Meta status' });
  }
};

module.exports = { login, callback, status };
