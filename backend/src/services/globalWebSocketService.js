// Global WebSocket service instance
let websocketServiceInstance = null;

module.exports = {
  setWebSocketService: (instance) => {
    websocketServiceInstance = instance;
  },
  
  getWebSocketService: () => {
    return websocketServiceInstance;
  }
};