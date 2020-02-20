const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devserver');
const stylus = require('./webpack/stylus');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const css = require('./webpack/css');
//const extractCSS = require('./webpack/css.extract');
//const uglifyJS = require('./webpack/js.uglify');
//const webpack = require('webpack');

const PATHS = {
    source: path.join(__dirname, 'source'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'filter': PATHS.source + '/pages/filter/filter.js',
            'room-details': PATHS.source + '/pages/room-details/room-details.js',
            'registration': PATHS.source + '/pages/registration/registration.js',
            'sign-in': PATHS.source + '/pages/sign-in/sign-in.js',
        },
        output: {
            path: PATHS.dist,
            filename: 'js/[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATHS.source + '/pages/index/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'filter.html',
                chunks: ['filter', 'common'],
                template: PATHS.source + '/pages/filter/filter.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'room-details.html',
                chunks: ['room-details', 'common'],
                template: PATHS.source + '/pages/room-details/room-details.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'registration.html',
                chunks: ['registration', 'common'],
                template: PATHS.source + '/pages/registration/registration.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'sign-in.html',
                chunks: ['sign-in', 'common'],
                template: PATHS.source + '/pages/sign-in/sign-in.pug'
            })
            /*
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            */
            /*
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
            */
        ]
    },
    pug(),
    images(),
    fonts(),
]);

module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            stylus()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devServer(),
            stylus(),
        ])
    }
};
