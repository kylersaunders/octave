const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.?css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    //publicPath:'/build/'
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    devMiddleware: { publicPath: '/' },
    port: 8080,
    proxy: {
      '/': 'http://localhost:3434/',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
};
