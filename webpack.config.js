const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
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
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
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
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
  ],*/
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
};
