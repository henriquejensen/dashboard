'use strict'

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const { resolve, join }  = require("path");

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: resolve(__dirname, "./public"),
    publicPath: '/',
    filename: '[name].[hash].js'
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
  plugins: [
    new CleanPlugin(['public'], {
      root: __dirname,
      exclude: ['*.js']
    }),

    new HtmlPlugin({
      title: 'Assertiva',
      template: join(__dirname, "./public", "index.html")
    }),

    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),

    new webpack.optimize.AggressiveMergingPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};
