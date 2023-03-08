import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

import constants from './constants';
import {Configuration} from "webpack";

const rules: Configuration = {
  module: {
    rules: [
      {
        test:   /\.twig$/,
        loader: 'twig-loader'
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'json-loader'
      }, {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: constants.isDev ? [/node_modules/] : []
      }, {
        test: /\.s?[ac]ss$/,
        use: [
          constants.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: path.join(constants.staticPath, 'images').replace(/^\//, '')
        }
      }, {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          outputPath: path.join(constants.staticPath, 'fonts').replace(/^\//, '')
        }
      }
    ]
  },
};

export default rules;
