const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: [ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
    path.join(__dirname, '/client/src/app.js')
  ],
  output: {
    path: path.join(__dirname, '/client/dist'),
    publicPath: '/dist/', // r`emember to change it to static to run from server
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new CleanWebpackPlugin(['client/dist/']),
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
