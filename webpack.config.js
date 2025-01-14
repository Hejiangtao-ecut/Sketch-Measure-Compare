const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.min.js',
        library: 'sketchMeasureCompare',
        libraryTarget: 'window',
        libraryExport: 'default',
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: isProduction
        ? [
              new CopyPlugin({
                  patterns: ['README.md', 'package.json', 'index.d.ts', 'popup.html', 'manifest.json', {from: 'js', to: 'js'}, {from: 'img', to: 'img'}],
              }),
          ]
        : [
              new HtmlWebpackPlugin({
                  template: 'index.html',
              }),
          ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: [path.resolve('./url-webpack-loader'), 'babel-loader'],
            },
            {
                test: /\.css$/i,
                use: [
                    path.resolve('./url-webpack-loader'),
                    'css-loader',
                    'uglifycss-loader',
                ],
            },
            {
                test: /\.html$/i,
                use: [path.resolve('./url-webpack-loader'), 'html-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
            }),
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
