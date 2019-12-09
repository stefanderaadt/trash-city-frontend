/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: {
      main: path.resolve(__dirname, '../src', 'index.ts')
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, '../dist')
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      overlay: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: { loader: 'awesome-typescript-loader' }
        },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /.*\.(gif|png|jp(e*)g|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 21000,
                name: 'images/[name]_[hash:7].[ext]'
              }
            }
          ]
        },
        // Vendor CSS loader
        // This is necessary to pack third party libraries like antd
        {
          test: /\.css$/,
          include: path.resolve(__dirname, '../node_modules'),
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif|eot|woff|ttf)(\?[a-z0-9]+)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, '../public', 'index.html')
      }),
      new CopyWebpackPlugin([{ from: 'public' }]),
      new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devtool: 'source-map'
  };
};
