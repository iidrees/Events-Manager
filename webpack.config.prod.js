const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/app.js'),

  output: {
    path: path.join(__dirname, '/client/dist'),
    publicPath: '/dist/', // remember to change it to static to run from server
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['client/dist/']),
    new Dotenv({
      path: './.env',
      systemvars: true
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false
      }
    })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '/client/src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
};
