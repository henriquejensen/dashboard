const webpack = require('webpack');
const path  = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: '/public',
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
          loader: "style-loader!css-loader"
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
        }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  //plugins: [new BundleAnalyzerPlugin()]
}