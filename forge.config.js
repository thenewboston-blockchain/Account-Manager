/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  buildIdentifier: 'com.thenewboston.account.manager.app',
  makers: [
    {
      config: {
        iconUrl: path.join(__dirname, 'assets/icon.ico'),
        name: 'thenewboston',
        setupIcon: path.join(__dirname, 'assets/icon.ico'),
      },
      name: '@electron-forge/maker-squirrel',
    },
    {
      config: {},
      name: '@electron-forge/maker-dmg',
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32', 'linux'],
    },
    {
      config: {},
      name: '@electron-forge/maker-deb',
    },
    {
      config: {},
      name: '@electron-forge/maker-rpm',
    },
  ],
  packagerConfig: {
    asar: true,
    'hardened-runtime': true,
    name: 'TNB Account Manager',
  },
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: path.join(__dirname, 'webpack.main.config.js'),
        renderer: {
          config: path.join(__dirname, 'webpack.renderer.config.js'),
          entryPoints: [
            {
              html: path.join(__dirname, 'public/index.html'),
              js: path.join(__dirname, 'src/renderer/renderer.tsx'),
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
  publishers: [
    {
      config: {
        prerelease: true,
        repository: {
          name: 'Account-Manager',
          owner: 'thenewboston-developers',
        },
      },
      name: '@electron-forge/publisher-github',
    },
  ],
};
