/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-destructuring */

const packageJson = require('./package.json');

const appName = packageJson.productName;
const version = packageJson.version;
const mode = (version.includes('alpha') && 'alpha') || (version.includes('beta') && 'beta') || 'stable';
const appId = 'com.thenewboston.account.manager.app';
const subVersion = version.slice(version.indexOf(mode));

module.exports = {
  appId,
  appName,
  mode,
  subVersion,
  version,
};
