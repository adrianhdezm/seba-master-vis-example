
'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

    entry: {
        'vendor': ['angular','angular-animate','angular-aria','angular-messages','angular-material','angular-material-icons','@uirouter/angularjs', 'vis', 'moment'],
        'app': path.resolve(__dirname,'src/app.js')
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'scripts/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Extract svg files
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=./images/[name].[ext]"
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html')
        }),

        new ExtractTextPlugin("styles/[name].css"),
    ]
};