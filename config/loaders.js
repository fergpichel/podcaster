const plugins = require('./plugins');

const CSSLoader = {
    test: /\.css$/,
    use: ['css-hot-loader'].concat(plugins.ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: __dirname + '/postcss.config.js'
            }
          },
        },
      ],
    })),
  };
  
  const JSLoader = {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-2', 'react'],
        plugins: [["babel-plugin-syntax-jsx"]]
      }
    }
  };
  
  module.exports = {
    CSSLoader: CSSLoader,
    JSLoader: JSLoader
  };