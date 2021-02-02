import path from 'path';
import webpack from 'webpack';


const config: webpack.Configuration = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../src')
    ]
  },
};

export default config;
