const path = require("path"); /* node path */
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin"); /* for loading / create html */
const MinicssExtractPlugin = require("mini-css-extract-plugin"); /* extracting css from js*/
const PurgecssPlugin = require("purgecss-webpack-plugin"); /* for cleaning unused style */
const tailwindcss = require("tailwindcss");

const ROOT_PATH = {
  src: path.resolve(__dirname, `src`),
};

const CustomExtractor = (content) => {
  return content.match(/[A-z0-9-:\/\@\>]+/g) || [];
};

module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    filename: "[name][contenthash].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  resolve: {
    // for shorten imports
    alias: {
      // default root
      "@components": `${ROOT_PATH.src}/res/components`,

      // libs
      "@libs": `${ROOT_PATH.src}/lib`,

      // globals
      "@globals": `${ROOT_PATH.src}/res/globals`,

      // globals
      "@styles": `${ROOT_PATH.src}/res/styles`,

      // assets
      "@assets": `${ROOT_PATH.src}/../public/assets`,

      // resolve naming conflicts using its file extention
      extensions: [
        ".jsx",
        ".js",
        ".json",
        "...",
      ] /* ... use default extention */,
    },
  },

  module: {
    rules: [
      // load css
      {
        // sass or scss
        test: /\.s[ac]ss$/i,
        use: [
          MinicssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [tailwindcss,"postcss-preset-env", "autoprefixer"],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?(js|jsx)$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx", // Remove this if you're not using JSX
          target: "es2015", // Syntax to compile to (see options below for possible values)
        },
      },

      //  pulling assets
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif)$/i,
        type: "asset/resource",
      },

      // pulling fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    // create root html
    new HtmlWebpackPlugin({
      title: "title-here",
      filename: "index.html",
    }),
    // new Dotenv(),
    // css extractor from js
    new MinicssExtractPlugin({
      filename: "[name].bundle.css",
    }),
    // unused style clean up
    new PurgecssPlugin({
      paths: glob.sync(`${ROOT_PATH.src}/**/*`, { nodir: true }),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    hot: true,
    compress: true,
    port: 9002,
  },
};
