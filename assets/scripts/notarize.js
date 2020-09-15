/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const electronNotarize = require('electron-notarize');

const {appId} = require('../../app-information.js');

require('dotenv').config();

module.exports = async (params) => {
  // Only notarize the app on Mac OS only.
  if (process.platform !== 'darwin' || params.electronPlatformName !== 'darwin') {
    return;
  }

  console.log('afterSign hook triggered', params);

  const appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);

  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  try {
    await electronNotarize.notarize({
      appBundleId: appId,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PWD,
      appPath,
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
