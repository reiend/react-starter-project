const path = require('path'); /* node path */
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /* for loading / create html */
const PurgecssPlugin = require('purgecss-webpack-plugin'); /* for cleaning unused style */
const Dotenv = require('dotenv-webpack');

const ROOT_PATH = {
  src: path.resolve(__dirname, `../src`)
};

module.exports = {
  resolve: {
    // for shorten imports
    alias: {
      // default root component
      '@components': `${ROOT_PATH.src}/res/components`,

      // src
      '@src': `${ROOT_PATH.src}`,

      // libs
      '@libs': `${ROOT_PATH.src}/libs`,

      // globals
      '@globals': `${ROOT_PATH.src}/res/globals`,

      // styles
      '@styles': `${ROOT_PATH.src}/res/styles`,

      // assets
      '@assets': `${ROOT_PATH.src}/../public/assets`
    },
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        // transpiler
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      //  pulling assets
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif)$/i,
        type: 'asset/inline'
      },

      // pulling fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    // create root html
    new HtmlWebpackPlugin({
      title: 'title here',
      filename: 'index.html',
      template: `${ROOT_PATH.src}/index.html`
    }),

    new Dotenv(),

    // // unused style clean up
    new PurgecssPlugin({
      paths: glob.sync(`${ROOT_PATH.src}/**/*`, { nodir: true }),
      defaultExtractor: content =>
        content.match(/[/@/:\w-/:/-/>]+(?<!:)/g) || [] // for not purging styles with ->, :, @
    })
  ]
};
