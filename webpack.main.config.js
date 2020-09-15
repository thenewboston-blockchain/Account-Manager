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
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
  target: 'electron-main',
};
