const rules = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    exclude: /(.webpack|node_modules)/,
    parser: {amd: false},
    test: /\.(m?js|node)$/,
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
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
    test: /\.tsx?$/,
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
    test: /\.(svg|ico|icns)$/,
  },
  {
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
    },
    test: /\.(jpg|png|woff|woff2|eot|ttf)$/,
  },
];

module.exports = rules;
