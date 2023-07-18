/* eslint-disable @typescript-eslint/no-var-requires */
const constants = require('./webpack/_common/constants');

module.exports = {
  // @ts-ignore
  compact: !constants.isDev,
  // @ts-ignore
  minified: !constants.isDev,
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-webpack-alias', {
            config: './webpack/_common/resolve.config.ts'
          }
        ]
      ]
    }
  },
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/transform-class-properties',
  ]
};
