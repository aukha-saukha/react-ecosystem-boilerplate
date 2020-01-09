const { resolve } = require('path');

// List of supported browsers
const BROWSERS_LIST = ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'];

// Distribution base directory
const distBase = resolve(__dirname, '../../dist');

// Distribution base directory for development environment
const distBaseDev = `${distBase}/dev`;

// Distribution base directory for production environment
const distBaseProd = `${distBase}/prod`;

// Distribution base directory for webpack dev server
const distBaseWds = `${distBase}/wds`;

// Distribution private directory for development environment
const distDevPrivate = `${distBaseDev}/private`;

// Distribution public directory for development environment
const distDevPublic = `${distBaseDev}/public`;

// Distribution private directory for production environment
const distProdPrivate = `${distBaseProd}/private`;

// Distribution public directory for production environment
const distProdPublic = `${distBaseProd}/public`;

// Extensions to resolve
const EXTENSIONS_TO_RESOLVE = ['.js', '.json'];

// Various directories with path
const PATHS = {
  distBase,
  distBaseDev,
  distBaseProd,
  distBaseWds,
  distDevPrivate,
  distDevPublic,
  distProdPrivate,
  distProdPublic,
  distDevPublicCSS: `${distDevPublic}/css`,
  distDevPrivateJS: `${distDevPrivate}/js`,
  distDevPublicJS: `${distDevPublic}/js`,
  distProdPublicCSS: `${distProdPublic}/css`,
  distProdPrivateJS: `${distProdPrivate}/js`,
  distProdPublicJS: `${distProdPublic}/js`,
  distProdPublicStats: `${distProdPublic}/stats`,
  nodeModules: resolve(__dirname, '../../node_modules'),
  src: resolve(__dirname, '../../src'),
};

module.exports = {
  BROWSERS_LIST,
  EXTENSIONS_TO_RESOLVE,
  PATHS,
};
