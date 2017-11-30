const webpack = require('webpack');
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
