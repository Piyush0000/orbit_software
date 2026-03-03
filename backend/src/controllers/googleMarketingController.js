const axios = require('axios');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 🛰️ ORBIT 360 - GOOGLE MARKETING CONTROLLER
 * Handles OAuth2 for Google Ads/Analytics/Merchant Center.
 * No merchant-specific secrets needed in env; everything flows through the Orbit Platform Client.
 */

const getAuthUrl = async (req, res) => {
  const { storeId } = req.query;
  if (!storeId) return res.status(400).json({ message: 'Missing storeId' });

  // Use state to track which store is being connected
  const state = jwt.sign({ storeId, userId: req.user.id }, env.jwt.secret, { expiresIn: '15m' });

  const scopes = [
    'https://www.googleapis.com/auth/adwords',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ].join(' ');

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
    `client_id=${env.google.clientId}&` +
    `redirect_uri=${encodeURIComponent(env.google.redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scopes)}&` +
    `state=${state}&` +
    `access_type=offline&` +
    `prompt=consent`;

  return res.json({ url: authUrl });
};

const handleCallback = async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).json({ message: 'Missing code or state' });

  try {
    // 1. Verify state and extract storeId
    const decoded = jwt.verify(state, env.jwt.secret);
    const { storeId } = decoded;

    // 2. Exchange code for tokens
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: env.google.clientId,
      client_secret: env.google.clientSecret,
      redirect_uri: env.google.redirectUri,
      grant_type: 'authorization-code'
    });

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // 3. Save to Integration table
    await prisma.integration.upsert({
      where: {
        storeId_provider: {
          storeId,
          provider: 'GOOGLE'
        }
      },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token || undefined, // Google only sends refresh_token once
        expiresAt,
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        storeId,
        provider: 'GOOGLE',
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
        isActive: true
      }
    });

    // 4. Redirect back to frontend
    return res.redirect(`${env.frontendUrl}/marketing/performance?google=success`);
  } catch (err) {
    console.error('[GoogleMarketing] Callback Error:', err.message);
    return res.redirect(`${env.frontendUrl}/marketing/performance?google=error`);
  }
};

const getStatus = async (req, res) => {
  const { storeId } = req.params;
  try {
    const integration = await prisma.integration.findUnique({
      where: {
        storeId_provider: {
          storeId,
          provider: 'GOOGLE'
        }
      }
    });
    return res.json({
      connected: !!integration && integration.isActive,
      expiresAt: integration?.expiresAt,
      provider: 'GOOGLE'
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const disconnect = async (req, res) => {
  const { storeId } = req.params;
  try {
    await prisma.integration.update({
      where: {
        storeId_provider: {
          storeId,
          provider: 'GOOGLE'
        }
      },
      data: { isActive: false }
    });
    return res.json({ message: 'Disconnected successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
  getStatus,
  disconnect
};
