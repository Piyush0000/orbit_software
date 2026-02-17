// Centralized error handler for consistent responses
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  if (err.meta?.fbtrace_id) {
    console.error('Meta error trace', err.meta.fbtrace_id, err.meta);
  }
  const payload = {
    message,
    ...(err.meta && { meta: err.meta }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };
  res.status(status).json(payload);
};

module.exports = errorHandler;
