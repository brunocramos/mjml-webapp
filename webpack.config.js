var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "app.css",
});

const minify = new webpack.optimize.UglifyJsPlugin({
  mangle: {
    keep_fnames: true,
    except: ['$super'],
  },
  compress: {
    warnings: false // https://github.com/webpack/webpack/issues/1496
  },
});

module.exports = {
  entry: './src/App.jsx',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
    ],
  },
  plugins: [
    // minify,
    extractSass,
  ]
};
