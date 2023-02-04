const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/client/index.js',
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
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   use: ['source-map-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png)$/i,
        loader: 'file-loader',
        options: {
          name: '/public/assets/logo.png',
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '/build'), //src/client?
    },
    devMiddleware: { publicPath: '/' },
    port: process.env.DEV_PORT,
    host: process.env.PROXY_HOST,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/': `http://localhost:${process.env.PORT}/`,
    },
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
      // favicon: path.resolve(
      //   __dirname,
      //   './src/client/public/assets/favicon.ico'
      // ),
      // logo: path.resolve(__dirname, './src/client/public/assets/logo.png'),
    }),
  ],
};
