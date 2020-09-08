const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');

const isDevMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  node: {
    __dirname: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Pages: path.resolve(__dirname, 'src/pages/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Core: path.resolve(__dirname, 'src/core/'),
      Contexts: path.resolve(__dirname, 'src/contexts/'),
      Providers: path.resolve(__dirname, 'src/providers/'),
      Store: path.resolve(__dirname, 'src/store/'),
      Utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.theme\.css$/i,
        use: 'raw-loader'
      },
      {
        test: /(?<!\.theme)\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hot module replacement
              hmr: isDevMode,
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      options: {
        baseUrl: isDevMode ? '"http://localhost:8080/"' : process.env.HOST_NAME
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['ru_RU', 'uk_UA']
    })
  ]
};
