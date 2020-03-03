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
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
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
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new AppManifestWebpackPlugin({
        logo: path.join(PATHS.source, './resources/favicons/favicon.svg'),
        prefix: 'assets/',
        output: 'assets/',
        emitStats: false,
        statsFilename: 'iconstats.json',
        statsEncodeHtml: false,
        persistentCache: true,
        inject: true,
        config: {
          appName: 'Webpack App',
          appDescription: null,
          developerName: null,
          developerURL: null,
          background: '#fff',
          theme_color: '#fff',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/?homescreen=1',
          version: '1.0',
          logging: false,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: { offset: 25 },
            favicons: true,
            firefox: true,
            windows: true,
            yandex: true,
          },
        }
      })
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
      {
        output: {
          path: PATHS.dist,
          filename: 'js/[name].js',
          publicPath: '',
        },
      }
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devServer(),
      stylus(),
      {
        output: {
          path: PATHS.dist,
          filename: 'js/[name].js',
        },
      },
    ]);
  }
};
