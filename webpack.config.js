const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: "public",
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        },
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: "json"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader!autoprefixer-loader"
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
        }
    ]
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
          output: {
              comments: false,
          },
      }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
