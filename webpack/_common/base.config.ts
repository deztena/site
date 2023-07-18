import path from 'path';
import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import rules from './rules.config';
import resolve from './resolve.config';
import webpack, {Configuration} from "webpack";
import constants from "./constants";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import {StatsWriterPlugin} from "webpack-stats-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

const config: Configuration = {
  mode: constants.isDev ? 'development' : 'production',
  entry: {
    'burger-menu': path.resolve(__dirname, '../app/js/components/burger-menu'),
    'bg-text': path.resolve(__dirname, '../app/js/components/bg-text'),
    'header': path.resolve(__dirname, '../app/js/layouts/header'),
    'dropdown': path.resolve(__dirname, '../app/js/components/dropdown'),
    'screen-head': path.resolve(__dirname, '../app/js/screens/head'),
    'screen-services': path.resolve(__dirname, '../app/js/screens/services'),
    'slider': path.resolve(__dirname, '../app/js/components/slider'),
    'anime-slider': path.resolve(__dirname, '../app/js/components/anime-slider2'),
    'anime-svg': path.resolve(__dirname, '../app/js/components/anime-svg'),
    'anime-blur': path.resolve(__dirname, '../app/js/components/anime-blur'),
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-[contenthash].js',
    publicPath: '/',
  },
  optimization: {
    minimize: !constants.isDev,
    minimizer: !constants.isDev ? [
      new UglifyJsPlugin()
    ] : [],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        slider: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    },
  },
  externals: constants.isDev ? [] : ['jquery'],
  plugins: [
    ...(constants.analyzeBundle ? [
      new BundleAnalyzerPlugin()
    ] : []),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(constants.isDev ? 'development' : 'production'),
        DEBUG: JSON.stringify(false),
        BROWSER: JSON.stringify(true)
      }
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
export default merge(rules, resolve, config);
