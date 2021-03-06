const http = require('http')
const app = require('./app');
const logger = require('./utils/logger');
const server = http.createServer(app);
const config = require('./utils/config');

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
})