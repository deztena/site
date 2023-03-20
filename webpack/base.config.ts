import path from 'path';
import merge from 'webpack-merge';

import rules from './rules.config';
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import constants from "./constants";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import {StatsWriterPlugin} from "webpack-stats-plugin";

const config: Configuration = {
  entry: path.resolve(__dirname, '../app/js'),
  output: {
    path: path.resolve(__dirname, '../release'),
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name]-[contenthash].chunk.js',
    publicPath: 'https://raw.githubusercontent.com/deztena/site/test-release/release/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        lodash: {
          test: /[\\/]node_modules[\\/]/,
          name: function (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },
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
