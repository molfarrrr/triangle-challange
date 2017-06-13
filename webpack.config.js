const path = require('path');
const dist = path.join(__dirname, 'dist');
const src = path.join(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin(`[name].bundle.css`);

module.exports = {
  context: src,
  entry: [
    './index.js',
  ],
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
            'node_modules',
            'src/**/*.spec.js'
        ],
        use: ['babel-loader'],
      },

        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],

                fallback: "style-loader"
            })
        }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },

  plugins: [
      extractSass,
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './index.html',
          hash: true
      })
  ],
};
