import path from 'path';
import merge from 'webpack-merge';

import rules from './rules.config';
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import constants from "./constants";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const config: Configuration = {
  entry: {
    'burger-menu': path.resolve(__dirname, '../app/js/components/burger-menu'),
    'bg-text': path.resolve(__dirname, '../app/js/components/bg-text'),
    'header': path.resolve(__dirname, '../app/js/layouts/header'),
    'screen-head': path.resolve(__dirname, '../app/js/screens/head'),
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  externals: constants.isDev ? [] : ['jquery'],
  plugins: [
    ...(constants.isDev ? [] : [
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css'
      }),
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(constants.isDev ? 'development' : 'production'),
        DEBUG: JSON.stringify(false),
        BROWSER: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/html/index.twig'),
      filename: 'index.html',
      inject: 'head'
    }),
    new CleanWebpackPlugin()
  ]
};
export default merge(rules, config);
