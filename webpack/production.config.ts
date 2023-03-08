import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { Configuration } from 'webpack';
import merge from 'webpack-merge';

import base from './base.config';
import constants from './constants';

const config: Configuration = {
  mode: constants.isDev ? 'development' : 'production',
  optimization: {
    minimize: !constants.isDev,
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    ...(constants.isDev ? [] : [
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css'
      }),
    ])
  ]
};

export default merge(base, config);
