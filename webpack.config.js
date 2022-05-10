// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV; //== "production";

const config = {
  entry: ["./src/index.js", "./src/sass/main.scss"],
  output: {
    path: !isProduction? path.resolve(__dirname, "dist") : path.resolve(__dirname, "pages/page"),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new miniCss({
      filename: 'main.css',
   })

  ],
  module: {
    rules: [
/*       {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      }, */
      {
        test: /\.s[ac]ss$/i,
        use: [miniCss.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },

    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
