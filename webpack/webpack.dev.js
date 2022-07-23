const path = require('path'); /* node path */
const tailwindcss = require('tailwindcss');
const webpack = require('webpack');

const PurgecssPlugin = require('purgecss-webpack-plugin'); /* for cleaning unused style */

const ROOT_PATH = {
  src: path.resolve(__dirname, `../src`)
};

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name][contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist/dev')
  },

  module: {
    rules: [
      // load css
      {
        // sass or scss
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [[tailwindcss, 'postcss-preset-env', 'autoprefixer']]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    static: {
      directory: path.join(__dirname, '../dist/dev')
    },
    open: true,
    hot: true,
    compress: true,
    port: 9001
  }
};
