/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devserver');
const stylus = require('./webpack/stylus');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack');

const PATHS = {
  source: path.join(__dirname, 'source'),
  dist: path.join(__dirname, 'dist'),
};

const PAGES_DIR = path.resolve(__dirname, 'source/pages');
const PAGES = fs.readdirSync(PAGES_DIR);
const common = merge([
  {
    entry: {
      main: './source/index.js',
    },
    output: {
      path: PATHS.dist,
      filename: 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css',
      }),
      ...PAGES
        .filter((page) => page !== 'layouts')
        .map((page) => new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `${PAGES_DIR}/${page}/${page}.pug`,
        })),
      new FaviconsWebpackPlugin({
        logo: path.join(PATHS.source, 'resources/favicons/favicon.svg'),
        mode: 'webapp',
        devMode: 'webapp',
        favicons: {
          appName: '',
          appDescription: '',
          developerName: 'Constantin P.',
          developerURL: null,
          background: '#ddd',
          theme_color: '#333',
          icons: {
            coast: false,
            yandex: false,
          },
        },
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
  },
  pug(),
  images(),
  fonts(),
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      stylus(),
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devServer(),
      stylus(),
    ]);
  }
};
