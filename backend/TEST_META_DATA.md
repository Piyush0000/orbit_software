# Testing Meta Data Fetch

## Issue: Campaigns showing zero data

If you're seeing zeros for all metrics (spend, impressions, revenue, etc.), here's how to debug:

### Step 1: Check if your campaigns actually have data

1. Go to [Facebook Ads Manager](https://business.facebook.com/adsmanager)
2. Select your ad account
3. Check if your campaigns have:
   - Impressions > 0
   - Spend > 0
   - Any activity in the last 30 days

**Important**: If your campaigns are brand new or haven't run yet, they will show zeros.

### Step 2: Check backend logs

1. Restart your backend server
2. Go to your frontend and select an ad account
3. Check the backend terminal logs for:
   ```
   === META CAMPAIGNS RAW RESPONSE ===
   (JSON data from Meta)
   === END META RESPONSE ===
   ```

4. Look at what Meta is returning:
   - If `insights.data` is empty `[]`, your campaigns have no data yet
   - If `insights.data` exists but values are "0", that's the actual Meta data
   - If you see an error, there's a permission or API issue

### Step 3: Verify Meta API permissions

The app needs these permissions:
- `ads_read` - To read campaign data
- `ads_management` - To manage campaigns

Check in [Meta App Dashboard](https://developers.facebook.com/apps) > Your App > App Review

### Step 4: Check currency conversion

Meta API returns spend in the ad account's currency. If your ad account is in USD:
- The backend fetches USD values
- The frontend displays them as INR
- **No automatic currency conversion** is applied

If you need to convert USD to INR, you'll need to:
1. Add a currency conversion rate to your backend
2. Multiply all monetary values by the conversion rate

### Step 5: Test with a different date range

Try fetching data for a longer period:
- In `backend/src/controllers/metaController.js`, change `last_30d` to `last_90d`
- Or add a date range parameter to your API calls

### Common Scenarios

**Scenario 1: Brand new campaigns**
- **Symptoms**: All zeros
- **Solution**: Wait for campaigns to run and generate impressions/spend

**Scenario 2: Test ad account**
- **Symptoms**: All zeros, no real campaigns
- **Solution**: Use a production ad account with active campaigns

**Scenario 3: Wrong date range**
- **Symptoms**: Zeros even though campaigns ran months ago
- **Solution**: Adjust date_preset to cover the period when campaigns were active

**Scenario 4: Incomplete permissions**
- **Symptoms**: Can see campaigns but no insights data
- **Solution**: Re-authenticate and ensure all permissions are granted

### Debug command

Check the raw Meta API response in your browser:

```
https://graph.facebook.com/v21.0/act_YOUR_AD_ACCOUNT_ID/campaigns?fields=id,name,status,daily_budget,lifetime_budget,insights.date_preset(last_30d){spend,impressions,clicks,ctr,cpc,actions,action_values,purchase_roas}&access_token=YOUR_ACCESS_TOKEN
```

Replace:
- `YOUR_AD_ACCOUNT_ID` with your actual ad account ID
- `YOUR_ACCESS_TOKEN` with your Meta access token
