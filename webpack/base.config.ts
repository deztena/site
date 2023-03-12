import path from 'path';
import merge from 'webpack-merge';

import rules from './rules.config';
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackInlineSourcePlugin from "html-webpack-inline-source-plugin";
import constants from "./constants";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const config: Configuration = {
  entry: {
    main: path.resolve(__dirname, '../app/js'),
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  externals: constants.isDev ? [] : ['jquery'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(constants.isDev ? 'development' : 'production'),
        DEBUG: JSON.stringify(false),
        BROWSER: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$',
      template: path.resolve(__dirname, '../app/html/index.twig'),
      filename: 'index.html',
      inject: 'head',
      chunks: constants.isDev ? undefined :['main']
    }),
    ...(constants.isDev ? [] : [
      // @ts-ignore
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
    ]),
    new CleanWebpackPlugin()
  ]
};
export default merge(rules, config);
