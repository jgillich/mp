"use strict";
const webpack = require("webpack");
const path = require("path");
const failPlugin = require("webpack-fail-plugin");
const htmlPlugin = new (require("html-webpack-plugin"))({
  title: "cloudfm",
});

require("dotenv").config({path: "../.env", silent: true});
const envPlugin = new webpack.DefinePlugin({
    "process.env.DATABASE_URL": `"${process.env.DATABASE_URL}"`,
    "process.env.SERVER_URL": `"${process.env.SERVER_URL}"`,
});

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  devtool: "#eval",
  entry: "./src/main.tsx",
  module: {
    loaders: [
      {loader: "file", test: /\.(jpe?g|png|gif)$/i},
      {loader: "file", test: /\.(svg|woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i},
      {loader: "ts-loader", test: /\.tsx?$/},
      {loader: "style!css", test: /\.css$/},


    ],
    preLoaders: [
      {loader: "tslint", test: /\.tsx?$/},
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("target"),
  },
  plugins: [failPlugin, htmlPlugin, envPlugin],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css"]
  },
};
