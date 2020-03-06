var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ZipPlugin = require('zip-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.jsx",

    output: {
        filename: "[name].js",
        path: path.resolve(path.join(__dirname, "./dist")),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: "css-loader",
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new ExtractTextWebpackPlugin("App.css"),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    devServer: {
        historyApiFallback: true
    },
    optimization: {
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};