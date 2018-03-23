'use strict';

const path = require('path');
const _ExtractTextPlugin = require('extract-text-webpack-plugin');
const _StyleLintPlugin = require('stylelint-webpack-plugin');
const _LiveReloadPlugin = require('webpack-livereload-plugin');
const _UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const _HtmlWebpackPlugin = require('html-webpack-plugin')


const ExtractTextPlugin = new _ExtractTextPlugin('[name].bundle.css');

const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, 'stylelint.config.js'),
  context: path.resolve(__dirname, '../css'),
  files: '**/*.css',
  failOnError: false,
  quiet: false,
});

const LiveReloadPlugin = new _LiveReloadPlugin({
  appendScriptTag: true,
});

const UglifyJsPlugin = new _UglifyJsPlugin({
  test: /\.jsx?$/,
  cache: true,
  parallel: true,
  sourceMap: true
});

const HtmlWebpackPlugin = new _HtmlWebpackPlugin({
  title: 'Podcaster',
  filename: 'index.html',
  template: 'index.html'
});

module.exports = {
  ExtractTextPlugin: ExtractTextPlugin,
  StyleLintPlugin: StyleLintPlugin,
  UglifyJsPlugin: UglifyJsPlugin,
  HtmlWebpackPlugin: HtmlWebpackPlugin
};
