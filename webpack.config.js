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
       //vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    
    },
    module:{
        loaders:[
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules"
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