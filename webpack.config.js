var HtmlWebpackPlugin = require('html-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
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
        new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
        new ZipPlugin({
            path: 'zip',
            filename: 'cdk_one_click_deployment.zip'})],
    devServer: {
        historyApiFallback: true
    },
    optimization: {
         splitChunks: {
             chunks: 'all',
            },
         },
};