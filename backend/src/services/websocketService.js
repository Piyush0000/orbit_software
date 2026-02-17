const WebSocket = require('ws');
const { prisma } = require('../config/database');
const { setWebSocketService } = require('./globalWebSocketService');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // Store connected clients by storeId
    this.setupWebSocketHandlers();
    
    // Register this instance globally
    setWebSocketService(this);
  }

  setupWebSocketHandlers() {
    this.wss.on('connection', (ws, req) => {
      // Extract storeId from the URL query parameter
      const urlParams = new URLSearchParams(req.url.split('?')[1]);
      const storeId = urlParams.get('storeId');
      const clientType = urlParams.get('type') || 'dashboard'; // 'dashboard' or 'website'

      if (!storeId) {
        ws.close();
        return;
      }

      // Store the client connection
      if (!this.clients.has(storeId)) {
        this.clients.set(storeId, new Map());
      }

      const storeClients = this.clients.get(storeId);
      storeClients.set(ws, { type: clientType, connectedAt: new Date() });

      console.log(`Client connected: ${clientType} for store ${storeId}`);

      // Handle incoming messages
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(ws, message, storeId, clientType);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        this.removeClient(ws, storeId);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.removeClient(ws, storeId);
      });

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connected',
        message: `Connected to ${clientType} for store ${storeId}`,
        timestamp: new Date()
      }));
    });
  }

  handleMessage(ws, message, storeId, senderType) {
    switch (message.type) {
      case 'update-section':
        this.handleSectionUpdate(message.data, storeId, senderType, ws);
        break;
      case 'request-sync':
        this.handleSyncRequest(storeId, ws);
        break;
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  async handleSectionUpdate(data, storeId, senderType, senderWs) {
    try {
      // Update the section data in the database
      const customization = await prisma.websiteCustomization.findUnique({
        where: { storeId },
        select: { productSections: true }
      });

      let updatedSections = customization?.productSections || [];

      // Update the specific section
      const sectionIndex = updatedSections.findIndex(s => s.id === data.sectionId);
      if (sectionIndex !== -1) {
        updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], ...data.updates };
      } else {
        // If section doesn't exist, add it
        updatedSections.push({ id: data.sectionId, ...data.updates });
      }

      // Save updated sections to database
      await prisma.websiteCustomization.upsert({
        where: { storeId },
        update: { productSections: updatedSections },
        create: { storeId, productSections: updatedSections }
      });

      // Broadcast the update to all clients for this store except the sender
      this.broadcastToStore(storeId, {
        type: 'section-update',
        data: {
          sectionId: data.sectionId,
          updates: data.updates,
          updatedSections
        },
        timestamp: new Date(),
        senderType
      }, senderWs);

    } catch (error) {
      console.error('Error handling section update:', error);
      
      // Send error back to sender
      senderWs.send(JSON.stringify({
        type: 'error',
        message: 'Failed to update section',
        error: error.message
      }));
    }
  }

  async handleSyncRequest(storeId, ws) {
    try {
      // Get current data for the store
      const customization = await prisma.websiteCustomization.findUnique({
        where: { storeId },
        select: { productSections: true }
      });

      const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: { name: true, subdomain: true, category: true }
      });

      // Send current state back to requesting client
      ws.send(JSON.stringify({
        type: 'sync-response',
        data: {
          sections: customization?.productSections || [],
          storeInfo: store
        },
        timestamp: new Date()
      }));

    } catch (error) {
      console.error('Error handling sync request:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to sync data',
        error: error.message
      }));
    }
  }

  broadcastToStore(storeId, message, excludeWs = null) {
    const storeClients = this.clients.get(storeId);
    if (!storeClients) return;

    storeClients.forEach((clientInfo, ws) => {
      if (ws !== excludeWs && ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(message));
        } catch (error) {
          console.error('Error broadcasting to client:', error);
          this.removeClient(ws, storeId);
        }
      }
    });
  }

  removeClient(ws, storeId) {
    const storeClients = this.clients.get(storeId);
    if (storeClients) {
      storeClients.delete(ws);
      if (storeClients.size === 0) {
        this.clients.delete(storeId);
      }
    }
    console.log(`Client disconnected for store ${storeId}`);
  }

  // Method to broadcast updates from external sources (like API calls)
  broadcastSectionUpdate(storeId, sectionId, updates) {
    this.broadcastToStore(storeId, {
      type: 'section-update',
      data: {
        sectionId,
        updates,
        timestamp: new Date()
      }
    });
  }

  // Get current connections info
  getConnectionInfo() {
    const info = {};
    this.clients.forEach((storeClients, storeId) => {
      info[storeId] = {
        totalConnections: storeClients.size,
        clients: Array.from(storeClients.values()).map(client => client.type)
      };
    });
    return info;
  }
}

module.exports = WebSocketService;