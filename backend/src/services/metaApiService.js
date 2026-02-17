const axios = require('axios');
const env = require('../config/env');

class MetaApiService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.client = axios.create({
      baseURL: `https://graph.facebook.com/${env.meta.apiVersion}/`,
      params: { access_token: accessToken },
      timeout: 10000
    });
  }

  static normalizeError(error) {
    if (error.response?.data?.error) {
      const metaErr = error.response.data.error;
      // Map Meta permission issues (code 200) to a friendly shape
      const isNoPermission = metaErr.code === 200;
      return {
        status: isNoPermission ? 403 : error.response.status || 400,
        message: metaErr.message || 'Meta API error',
        type: metaErr.type,
        code: metaErr.code,
        fbtrace_id: metaErr.fbtrace_id,
        noPermission: isNoPermission
      };
    }
    return { status: 500, message: 'Meta API error' };
  }

  async request(config) {
    try {
      const res = await this.client.request(config);
      return res.data;
    } catch (error) {
      const normalized = MetaApiService.normalizeError(error);
      const err = new Error(normalized.message);
      err.status = normalized.status;
      err.meta = normalized;
      if (normalized.noPermission) err.noPermission = true;
      throw err;
    }
  }

  formatAdAccountId(id) {
    if (!id) return id;
    const clean = String(id).replace(/act_/gi, '');
    return `act_${clean}`;
  }

  async getAdAccounts() {
    return this.request({ url: 'me/adaccounts', method: 'GET' });
  }

  async getCampaigns(adAccountId) {
    const actId = this.formatAdAccountId(adAccountId);
    // Request specific fields including insights
    // Note: If insights.data is empty, it means no data for the date range
    return this.request({ 
      url: `${actId}/campaigns`, 
      method: 'GET',
      params: {
        fields: 'id,name,status,objective,daily_budget,lifetime_budget,insights.date_preset(last_30d){spend,impressions,clicks,ctr,cpc,actions,action_values,purchase_roas}',
        limit: 100
      }
    });
  }

  async createCampaign(adAccountId, payload) {
    const actId = this.formatAdAccountId(adAccountId);
    return this.request({
      url: `${actId}/campaigns`,
      method: 'POST',
      data: payload
    });
  }

  async updateCampaignStatus(campaignId, status) {
    return this.request({
      url: `${campaignId}`,
      method: 'POST',
      data: { status }
    });
  }

  async getInsights(adAccountId, metrics, options = {}) {
    const actId = this.formatAdAccountId(adAccountId);
    return this.request({
      url: `${actId}/insights`,
      method: 'GET',
      params: {
        fields: metrics.join(','),
        date_preset: options.datePreset,
        time_increment: options.timeIncrement
      }
    });
  }

  async getCreatives(adAccountId) {
    const actId = this.formatAdAccountId(adAccountId);
    return this.request({
      url: `${actId}/adcreatives`,
      method: 'GET',
      params: {
        fields: 'id,name,thumbnail_url,image_url,object_story_spec,object_story_id'
      }
    });
  }

  async getAdsWithInsights(adAccountId, options = {}) {
    const actId = this.formatAdAccountId(adAccountId);
    return this.request({
      url: `${actId}/ads`,
      method: 'GET',
      params: {
        fields:
          'id,name,creative{id,name,thumbnail_url,object_story_id},insights.date_preset(last_30d){spend,impressions,clicks,ctr,cpc,actions,action_values,purchase_roas}',
        limit: 100,
        date_preset: options.datePreset
      }
    });
  }

  async generatePreview(adAccountId, creativeSpec, adFormat) {
    const actId = this.formatAdAccountId(adAccountId);
    return this.request({
      url: `${actId}/generatepreviews`,
      method: 'GET',
      params: {
        creative: JSON.stringify(creativeSpec),
        ad_format: adFormat
      }
    });
  }

  // Lightweight access check; maps Meta permission errors to boolean
  async hasAccess(adAccountId) {
    const actId = this.formatAdAccountId(adAccountId);
    try {
      await this.request({ url: `${actId}/campaigns`, method: 'GET', params: { limit: 1 } });
      return true;
    } catch (err) {
      if (err.noPermission) return false;
      throw err;
    }
  }
}

module.exports = MetaApiService;
