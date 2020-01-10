const { PORTS } = require('../../../src/data/constants/app/config');

// Get base url based on test environment
function getBaseUrl(testEnvName) {
  let baseUrl = 'http://localhost:';

  switch (testEnvName) {
    case 'development':
      baseUrl = `${baseUrl}${PORTS.dev}`;
      break;

    case 'production':
      baseUrl = `${baseUrl}${PORTS.prod}`;
      break;

    default:
      baseUrl = `${baseUrl}${PORTS.dev}`;
      break;
  }

  return baseUrl;
}

module.exports = (on, config) => {
  const testEnvName = config.env.testEnvName || 'development';
  const baseUrl = getBaseUrl(testEnvName);

  return Object.assign({}, config, {
    baseUrl,
  });
};
