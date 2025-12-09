const app = require('./app');

/**
 * Server entrypoint
 * - Listens on port 3001 by default (as required by preview system)
 * - Uses HOST 0.0.0.0 to accept external connections
 * - Includes graceful shutdown on SIGTERM
 */
const PORT = process.env.PORT || 3001; // Run on 3001 as required
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
