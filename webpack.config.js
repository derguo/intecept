const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const webpack = require("webpack");
const packagejson = require("./package.json");

var es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
    entry:["./src/main_use.js"],
    output:{
       path:path.resolve(__dirname,"dist/"),
       filename:"index.js",
       publicPath:"http://localhost:8080/"
       //vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules"
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
          chunks:["main"],
          
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:"vendor",
        //     filename:"[name].js"
        // })
        
    ]
}