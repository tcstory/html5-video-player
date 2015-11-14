/**
 * Created by tcstory on 11/11/15.
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: 'js/bundle.js',
        path: './build/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                //loader: 'style!css'
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app.html',
            filename: 'app.html'
        }),
        new ExtractTextPlugin('./css/styles.css')
    ]
};
