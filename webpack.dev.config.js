'use strict'

const webpack = require('webpack');
const { resolve }  = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlPlugin = require('html-webpack-plugin');

const port = 8080;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:${port}',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.js'
  ],
  output: {
    filename: '[name][hash].js',
    // the output bundle

    path: __dirname,

    publicPath: `http://localhost:${port}/`,
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          use: [
            "babel-loader",
          ],
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          exclude: /node_modules/,
          use: "json-loader"
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  devServer: {
    contentBase: __dirname,
    // match the output path

    historyApiFallback: true,
    // necessario quando se esta usando um history HTML5 API, pois qualquer url deve ser servida com o index.html

    hot: true,
    // enable HMR on the server

    inline: true,

    open: true,

    port: port,

    stats: 'errors-only',

    publicPath: '/'
    // match the output `publicPath`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new HtmlPlugin({
      title: 'Assertiva',
      template: resolve(__dirname, "./index.html")
    })

    //new BundleAnalyzerPlugin()    
  ]
}