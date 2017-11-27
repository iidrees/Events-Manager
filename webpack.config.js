const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, '/client/src/app.js')
  ],
  output: {
    path: path.join(__dirname, '/client/dist'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: path.join(__dirname, '/client/src'),
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
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
