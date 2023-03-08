import path from 'path';
import merge from 'webpack-merge';

import rules from './rules.config';
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackInlineSourcePlugin from "html-webpack-inline-source-plugin";
import constants from "./constants";

const config: Configuration = {
  entry: [
    path.resolve(__dirname, '../app/')
  ],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]-[hash].js',
    publicPath: '/'
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
      inlineSource: '.(js|css)$',
      template: path.resolve(__dirname, '../app/html/index.twig'),
      filename: 'index.html',
      inject: 'head'
    }),
    // @ts-ignore
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ]
};
export default merge(rules, config);
