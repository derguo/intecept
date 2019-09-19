const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const webpack = require("webpack");
const packagejson = require("./package.json");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const es3ifyPlugin = require("es3ify-webpack-plugin");
const uglify = require("uglifyjs-webpack-plugin");

const my = require("./my-webpack-plugin");

module.exports = {
  entry: ["./src/main_use.js"],
  entry: {
    
    react: ["react"],
    reactDom: ["react-dom"],
    polyfill: ["babel-polyfill"],
    app: "./src/main_use.js",
    //vendor: Object.keys(packagejson.dependencies),
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "js/[name]_[chunkhash:8].js",
    //publicPath:"../"//"http://localhost:8080/",
    publicPath:"/"
  },
  mode: "production",
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: //"style-loader!css-loader?modules"
        ExtractTextWebpackPlugin.extract("style-loader", "css-loader"),//
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: "url-loader?limit=100&name=images/[name]_[hash:7].[ext]"
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new es3ifyPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["react", "reactDom", "polyfill","app"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["react", "reactDom", "polyfill"],
      filename: "js/[name].js"
    }),
    // new uglify({
    //     output:{
    //       comments:false,
    //       beautify:true,
    //     }
    // }),
    new ExtractTextWebpackPlugin("css/[name]_[hash:8].css"),
    //new my(),
  ]
};