/* eslint-disable @typescript-eslint/no-var-requires */

import path from 'path';
import config from './base.conf';
import webpack from 'webpack';

const HTMLWebpackPlugin =  require('html-webpack-plugin');
const { merge } = require('webpack-merge');


export default merge(config, <webpack.Configuration>{
  entry: path.resolve(__dirname, '../../samples/index.tsx'),
  mode: 'production',
  plugins: [
    new HTMLWebpackPlugin({ title: 'EmptyState DEV' })
  ],
  output: {
    filename: 'test.bundle.js',
    path: path.resolve(__dirname, '../../dist-sample'),
  }
});
