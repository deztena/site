import path from 'path';
import { Configuration } from 'webpack';

const resolve: Partial<Configuration> = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    alias: {
    },
    modules: [path.join(__dirname, '../node_modules'), 'node_modules']
  },
};

export default resolve;
