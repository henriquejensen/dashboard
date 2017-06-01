'use strict'

//const COMPANY_ICON_INVERSE = "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-assertiva-negative.png";
const COMPANY_NAME_LONG = "ASSERTIVA SOLUÇÕES EM MARKETING E CRÉDITO";
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const { join, resolve }  = require("path");

/**TO DO
 * insert -> const ExtractTextPlugin = require('extract-text-webpack-plugin')
 * Este plugin extrai os css em modulos para um/mais css separado, aumentando
 * o desempenho no carregamento e o tamanho final do bundle. Usar somente quando
 * todo o css estiver em modulo (https://github.com/webpack-contrib/extract-text-webpack-plugin)
 */

module.exports = {
  entry: {
    app: join(__dirname, 'src','index.js'),
    vendor: ['immutable', 'react-router', 'react', 'react-bootstrap', 'redux', 'react-dom'] // arquivos que serao colocados em outro js(chunk)
  },
  output: {
    publicPath: "/",         // caminho que sera usado pelos <script> <link> injetados pelo webpack
    path: join(__dirname, "public"), // https://github.com/webpack/docs/wiki/configuration#outputpath
    filename: '[hash].bundle.js'
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            "babel-loader",
          ]
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
    new CleanPlugin(['public/*.js', 'public/*.gz', 'public/index.html'], {
      root: __dirname,
    }),

    // cria o html a partir do template e cria o index com o bundle injetado nele dentro da pasta public
    new HtmlPlugin({
      title: COMPANY_NAME_LONG,
      filename: join(__dirname, "public", "index.html"),
      template: join(__dirname, "html", "template.html")
    }),

    // define uma constante global na app com o valor producao
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),

    // quebra os arquivos da entrada vendor em outro js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),

    new CompressionPlugin({
      // https://webpack.js.org/plugins/compression-webpack-plugin/#components/sidebar/sidebar.jsx
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
    extensions: ['.js', '.css']
  }
};
