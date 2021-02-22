/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
  return path.join(__dirname, src);
}

module.exports = {
  devtool: 'source-map',
  entry: './src/main/main.ts',
  mode: 'development',
  module: {
    rules,
  },
  output: {
    path: path.join(__dirname, 'bundle', 'main'),
  },
  resolve: {
    alias: {
      '@main': srcPaths('src/main'),
      '@models': srcPaths('src/models'),
      '@renderer': srcPaths('src/renderer'),
      '@shared': srcPaths('src/shared'),
      '@thenewboston/ui': srcPaths('node_modules/@thenewboston/ui'),
      '@thenewboston/utils': srcPaths('node_modules/@thenewboston/utils'),
      react: srcPaths('node_modules/react'),
      'react-dom': srcPaths('node_modules/react-dom'),
      'react-hot-loader': srcPaths('node_modules/react-hot-loader'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
  target: 'electron-main',
};
