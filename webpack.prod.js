const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const cssRule = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: '../' }
    },
    {
        loader: 'css-loader',
        options: {importLoaders: 2}
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('autoprefixer')({flexbox: 'no-2009'}),
                require('cssnano')({
                    // preset: 'default'
                    preset: ['default', { discardComments: { removeAll: true } }]
                })
            ]
        }
    }
];

const prod = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].[contenthash:7].js',
        chunkFilename: "js/[name].[contenthash:7].chunk.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: cssRule
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: cssRule.concat('less-loader')
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: cssRule.concat('sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 10000, name: 'images/[name].[contenthash:7].[ext]' }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 10000, name: 'media/[name].[hash:7].[ext]' }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 10000, name: 'css/fonts/[name].[hash:7].[ext]' }
            }
        ]
    },
    // 附加插件列表
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:7].css',
            chunkFilename: 'css/[id].[contenthash:7].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    optimization: {
        minimize: true,
        namedModules: false,
        namedChunks: false
    },
};

module.exports = merge(common, prod);