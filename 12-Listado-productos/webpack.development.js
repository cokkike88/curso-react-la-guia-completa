const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    } 
                ]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            file: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        new Dotenv({
            path: './development.env'
        })
    ],
    devServer: {
        port: 5566,
        host: '0.0.0.0',
        historyApiFallback: true
    }
}