const webpack = require('webpack');
const path = require('path');

require('dotenv').config();

module.exports = {
  entry: [
    path.join(__dirname, '/client/src/app.js')
  ],
  output: {
    path: path.join(__dirname, '/client/dist/'),
    publicPath: '/dist/', // remember to change it to static to run from server
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PORT': JSON.stringify(process.env.PORT)
    }),
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
    contentBase: 'client/dist/index.html',
    proxy: {
      '/api/v1/*': {
        target: 'http://localhost:5050'
      },
    },
  },
};
