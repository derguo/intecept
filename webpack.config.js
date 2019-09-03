const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const webpack = require("webpack");
const packagejson = require("./package.json");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');
const my = require("./my-webpack-plugin");

module.exports = {
    entry:["./src/main_use.js"],
    entry:{
        app:"./src/main_use.js",
        react:["react"],
        reactDom:["react-dom"],
        polyfill:["babel-polyfill"],

    },
    output:{
       path:path.resolve(__dirname,"dist/"),
       filename:"[name]_[chunkhash:8].js",
       //publicPath:"http://localhost:8080/"
       vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                //ExtractTextWebpackPlugin.extract("style-loader", "css-loader"),//
            },
            {
                test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
                loader:'url-loader?limit=100&name=images/[name]_[hash:7].[ext]',

              },
            {test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'},
        ]
    },
    plugins:[
        new es3ifyPlugin(),
        new HtmlWebpackPlugin({
          template:"./src/index.html",
          chunks:["app","react","reactDom","polyfill"],
          
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:["react","reactDom","polyfill"],
            filename:"[name].js"
        }),
        //new ExtractTextWebpackPlugin("css/[name].css"),
        new my(),
    ]
}