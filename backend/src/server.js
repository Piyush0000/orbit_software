const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const { publicLimiter, dashboardLimiter } = require('./middleware/rateLimit');
const env = require('./config/env');
const { connectMongo } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const WebSocketService = require('./services/websocketService');

const authRoutes = require('./routes/auth');
const appAuthRoutes = require('./routes/appAuth');
const userRoutes = require('./routes/users');
const storeRoutes = require('./routes/stores');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const layoutRoutes = require('./routes/layouts');
const storefrontRoutes = require('./routes/storefront');
const adminRoutes = require('./routes/admin');
const metaOAuthRoutes = require('./routes/metaOAuth');
const metaRoutes = require('./routes/meta');
const onboardingRoutes = require('./routes/onboarding');
const provisioningRoutes = require('./routes/provisioning');
const publicRoutes = require('./routes/public');
const websiteCustomizationRoutes = require('./routes/websiteCustomization');
const storefrontPublicRoutes = require('./routes/storefrontPublic');
const logisticsRoutes = require('./routes/logistics');


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/storefront/public', publicLimiter);
app.use('/api/public', publicLimiter);
app.use('/api/products', dashboardLimiter);
app.use('/api/website', dashboardLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/app-auth', appAuthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/layouts', layoutRoutes);
app.use('/api/storefront', storefrontRoutes);
app.use('/api/admin', adminRoutes);
app.use('/auth/meta', metaOAuthRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/provisioning', provisioningRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/website', websiteCustomizationRoutes);
app.use('/api/storefront/public', storefrontPublicRoutes);
app.use('/api/logistics', logisticsRoutes);

app.use('/uploads', express.static(env.upload.path));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();
    
    // Create HTTP server
    const server = http.createServer(app);
    
    // Initialize WebSocket service
    const websocketService = new WebSocketService(server);
    
    // Start listening
    server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error('Startup failed', err);
    process.exit(1);
  }
};

start();
