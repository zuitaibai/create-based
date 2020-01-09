const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const cssRule = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath: '../', hmr: true }
    },
    {
        loader: 'css-loader',
        options: { sourceMap: true, importLoaders: 2,  /*modules: false, import: true */}
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            ident: 'postcss',
            plugins: [ require('autoprefixer')({flexbox: 'no-2009'}) ]
        }
    }
];

const dev = {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].js',
        chunkFilename: "js/[name].chunk.js",
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
                use: cssRule.concat({
                    loader: 'less-loader',
                    options: { sourceMap: true, /* strictMath: true, noIeCompat: true, localIdentName: '[local]--[hash:base64:5]'  */}
                })
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: cssRule.concat({
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 1, name: 'images/[name].[ext]' }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 1, name: 'media/[name].[ext]' }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: { limit: 1, name: 'css/fonts/[name].[ext]' }
            }
        ]
    },
    // 附加插件列表
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    optimization: {
        minimize: false,
        namedModules: true,
        namedChunks: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        open: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        port: 8889,
        host: '0.0.0.0',
        useLocalIp: true,
        proxy: {
            '/api': 'http://sss:3000',
        }
    }
};

module.exports = merge(common, dev);