import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import constants from './constants';
import {Configuration} from "webpack";

const rules: Configuration = {
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      }, {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: constants.isDev ? [/node_modules/] : []
      }, {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
};

export default rules;
