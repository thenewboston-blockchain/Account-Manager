const rules = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    exclude: /(.webpack|node_modules)/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|.webpack)/,
    loaders: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.(svg|ico|icns)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
];

module.exports = rules;
