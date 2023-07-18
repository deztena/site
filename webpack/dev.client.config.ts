import 'webpack-dev-server';

import path from 'path';
import webpack, { Configuration } from 'webpack';
import merge from 'webpack-merge';

import common from './_common/base.config';
import constants from "./_common/constants";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://${constants.host}:${constants.port}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../app')
  ],
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    compress: false,
    port: constants.port,
    host: constants.host,
    useLocalIp: true,
    open: true,
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/_common/html/index.twig'),
      filename: 'index.html',
      inject: 'head'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

export default merge(common, config);
