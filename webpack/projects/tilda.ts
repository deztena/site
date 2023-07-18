import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import base from '../_common/production.config';

import path from "path";

const config: Configuration = {
  entry: path.resolve(__dirname, '../../app/tilda'),
  output: {
    path: path.resolve(__dirname, '../../public/tilda'),
  },
};

export default merge(base, config);
