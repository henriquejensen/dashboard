'use strict'

//const COMPANY_ICON_INVERSE = "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-assertiva-negative.png";
const COMPANY_NAME_LONG = "ASSERTIVA SOLUÇÕES EM MARKETING E CRÉDITO";
const webpack = require('webpack');
const { join }  = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlPlugin = require('html-webpack-plugin');

const port = 8080;

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    // A ORDEM DE IMPORTAÇÃO É IMPORTANTE, babel-polyfill deve ser o primeiro na ordem
    // https://github.com/facebook/react/issues/8379#issuecomment-264858787 => resposta para o problema no IE 1
    // https://babeljs.io/docs/usage/polyfill/
    "babel-polyfill", // necessario para a compatibilidade com o IE

    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:${port}',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    // documento de entrada
    join(__dirname, 'src','index.js')
  ],
  output: {
    filename: '[name][hash].js',
    // the output bundle

    path: __dirname,

    publicPath: '/',
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
      title: COMPANY_NAME_LONG,
      filename: join(__dirname, "index.html"),
      template: join(__dirname, "html", "template.html")
    })

    //new BundleAnalyzerPlugin()    
  ]
}