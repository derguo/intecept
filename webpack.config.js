const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
var es3ifyPlugin = require('es3ify-webpack-plugin');
module.exports = {
    entry:["./src/main.js"],
    output:{
       path:path.resolve(__dirname,"dist/"),
       filename:"index.js",
    },
    module:{
        loaders:[
            {test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'},
        ]
    },
    plugins:[
        new es3ifyPlugin(),
    ]
}