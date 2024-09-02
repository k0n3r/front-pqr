const webpack = require("webpack");
const {VueLoaderPlugin} = require('vue-loader'); // Importar el plugin correctamente para Vue 3
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        pqr: "./src/pqr/main.js",
        respuestaPqr: "./src/respuestaPqr/main.js",
        configuracionPqr: "./src/configuracionPqr/main.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "[name]/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
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
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, // Usa MiniCssExtractPlugin.loader en lugar de style-loader
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource', // Utiliza la nueva forma de Webpack 5 para manejar recursos
                generator: {
                    filename: 'images/[name][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]',
                },
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // Usar el plugin correcto para Vue 3
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
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
