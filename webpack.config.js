'use strict'

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const { join, resolve }  = require("path");

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    publicPath: "public", // caminho que sera usado pelos <script> <link> indejetados pelo webpack
    path: join(__dirname, "public"), // https://github.com/webpack/docs/wiki/configuration#outputpath
    filename: '[hash].bundle.js',
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

    // https://github.com/johnagan/clean-webpack-plugin#example-webpack-config
    new CleanPlugin(['public/*.js', 'public/*.gz'], {
      root: __dirname,
    }),

    new HtmlPlugin({
      title: 'Assertiva',
      filename: join(__dirname, "index.html"),
      template: join(__dirname, "html", "template.html")
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
