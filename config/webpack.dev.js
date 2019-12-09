/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const common = require('./webpack.common.js');

const mapStyle = process.env.MAP_STYLE === 'true';

const env = dotenv.config().parsed;

module.exports = merge(common(env), {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    overlay: true,
    open: false,
    stats: 'errors-only',
    inline: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: mapStyle ? 'css-loader?sourceMap' : 'css-loader' }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
