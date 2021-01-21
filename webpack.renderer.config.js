/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
  return path.join(__dirname, src);
}

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules,
  },
  output: {
    path: path.join(__dirname, 'bundle', 'renderer'),
  },
  resolve: {
    alias: {
      '@main': srcPaths('src/main'),
      '@models': srcPaths('src/models'),
      '@renderer': srcPaths('src/renderer'),
      '@shared': srcPaths('src/shared'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
  },
  target: 'electron-renderer',
};
