const path = require('path'); /* node path */
const tailwindcss = require('tailwindcss');

const MinicssExtractPlugin = require('mini-css-extract-plugin'); /* extracting css from js*/
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ROOT_PATH = {
  src: path.resolve(__dirname, `../src`)
};

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name][contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist/prod')
  },

  module: {
    rules: [
      // load css
      {
        // sass or scss
        test: /\.s[ac]ss$/i,
        use: [
          MinicssExtractPlugin.loader,
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

  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  plugins: [
    // // css extractor from js
    new MinicssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ]
};
