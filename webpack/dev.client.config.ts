import 'webpack-dev-server';

import path from 'path';
import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import common from './base.config';
import constants from "./constants";

const config: Configuration = {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://${constants.host}:${constants.port}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../app')
  ],
  devServer: {
    compress: false,
    port: constants.port,
    host: constants.host,
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    overlay: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

export default merge(common, config);
