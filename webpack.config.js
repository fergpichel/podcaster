const webpack = require('webpack');
const path = require('path');
const loaders = require('./config/loaders');
const plugins = require('./config/plugins');
const paths = require('./config/paths');

const isProdEnvironment = () => {
  return process.env.NODE_ENV === 'prod';
};

var config = {
  entry: './index.js', // entry point
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/dist'),
    publicPath: paths.ASSETS
  },
  devtool: isProdEnvironment() ? false : 'source-map',
  devServer: {
    port: 8080, // development port server
  },
  module: {
    loaders: [
      loaders.CSSLoader,
      loaders.JSLoader
        ]
   },
   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery"
     }),
     plugins.ExtractTextPlugin,
     plugins.StyleLintPlugin,
     plugins.HtmlWebpackPlugin,
     new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
   ]
}

if (isProdEnvironment()) {
  plugins.push(plugins.UglifyJsPlugin);
}

module.exports = config;
