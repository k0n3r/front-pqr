const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        pqr: "./src/pqr/main.js",
        respuestaPqr: "./src/respuestaPqr/main.js",
        configuracionPqr: "./src/configuracionPqr/main.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        publicPath: "../",
        filename: "[name]/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: 'images'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pqr/index.html",
            filename: "pqr/index.html",
            chunks: ["pqr"],
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/respuestaPqr/index.html",
            filename: "respuestaPqr/index.html",
            chunks: ["respuestaPqr"],
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: "./src/configuracionPqr/index.html",
            filename: "configuracionPqr/index.html",
            chunks: ["configuracionPqr"],
            hash: true
        })
    ],
    resolve: {
        modules: ['node_modules', '../../node_modules'],
        alias: {
            topViews: path.resolve(__dirname, '../../'),
            src: path.resolve(__dirname, './src/'),
            pqr: path.resolve(__dirname, './src/pqr/'),
            respuesta: path.resolve(__dirname, './src/respuestaPqr/'),
            configuracion: path.resolve(__dirname, './src/configuracionPqr/')
        }
    }
}