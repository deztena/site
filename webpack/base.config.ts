import path from 'path';
import merge from 'webpack-merge';

import rules from './rules.config';
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import constants from "./constants";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import {StatsWriterPlugin} from "webpack-stats-plugin";

const config: Configuration = {
  entry: {
    'burger-menu': path.resolve(__dirname, '../app/js/components/burger-menu'),
    'bg-text': path.resolve(__dirname, '../app/js/components/bg-text'),
    'header': path.resolve(__dirname, '../app/js/layouts/header'),
    'dropdown': path.resolve(__dirname, '../app/js/components/dropdown'),
    'screen-head': path.resolve(__dirname, '../app/js/screens/head'),
    'screen-services': path.resolve(__dirname, '../app/js/screens/services')
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-[contenthash].js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    },
  },
  externals: constants.isDev ? [] : ['jquery'],
  plugins: [
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
    new CleanWebpackPlugin(),
    new StatsWriterPlugin({
      stats: {
        all: false,
        assets: true
      }
    })
  ]
};
export default merge(rules, config);
