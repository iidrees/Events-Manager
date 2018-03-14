const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, '/client/src/app.js')
  ],
  output: {
    path: path.join(__dirname, '/client/dist'),
    publicPath: '/dist/', // remember to change it to static to run from server
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
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
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: path.join(__dirname, '/client/src'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(scss|css|sass)$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    }]
  },
  devtool: 'eval',
  devServer: {
    port: 8000,
    contentBase: 'client/',
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:5050'
      },
    },
  },
};
