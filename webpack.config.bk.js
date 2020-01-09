const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const env = 'development'; // production none


module.exports = {
    mode: env, // production none
    devtool: 'source-map',
    entry: {// string | object | array
        index: './src/index.js',
    },
    output: {
        //contenthash或chunkhash会与热更新冲突，请在生产环境下启用contenthash或chunkhash
        filename: 'js/[name].bundle.js', // 可以 'sf/asdf/asdf/[name].js'
        // filename: 'js/[name].bundle.[contenthash:7].js', // 可以 'sf/asdf/asdf/[name].js'
        chunkFilename: "js/[name].chunk.js",
        // chunkFilename: "js/[name].chunk.[contenthash:7].js",
        path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
        // publicPath: '', // 输出解析文件的目录，url相对于HTML页面  //静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径
        // publicPath: 'https://cdn.example.com/',
        // library: "MyLibrary", // 导出库(exported library)的名称
        // 导出库(exported library)的类型
            /* libraryTarget: "umd", // 通用模块定义
            libraryTarget: "umd2", // 通用模块定义
            libraryTarget: "commonjs2", // exported with module.exports
            libraryTarget: "commonjs-module", // 使用 module.exports 导出
            libraryTarget: "commonjs", // 作为 exports 的属性导出
            libraryTarget: "amd", // 使用 AMD 定义方法来定义
            libraryTarget: "this", // 在 this 上设置属性
            libraryTarget: "var", // 变量定义于根作用域下
            libraryTarget: "assign", // 盲分配(blind assignment)
            libraryTarget: "window", // 在 window 对象上设置属性
            libraryTarget: "global", // property set to global object
            libraryTarget: "jsonp", // jsonp wrapper */
        // 高级输出配置
            /* pathinfo: true, // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息。
            chunkFilename: "[id].js",
            chunkFilename: "[chunkhash].js", // 长效缓存(/guides/caching)// 「附加分块(additional chunk)」的文件名模板
            jsonpFunction: "myWebpackJsonp", // 用于加载分块的 JSONP 函数名
            sourceMapFilename: "[file].map",
            sourceMapFilename: "sourcemaps/[file].map", // 「source map 位置」的文件名模板
            devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // 「devtool 中模块」的文件名模板
            devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // 「devtool 中模块」的文件名模板（用于冲突）
            umdNamedDefine: true, // boolean// 在 UMD 库中使用命名的 AMD 模块
            crossOriginLoading: "use-credentials", // 枚举
            crossOriginLoading: "anonymous",
            crossOriginLoading: false,// 指定运行时如何发出跨域请求问题 */
        // 专家级输出配置（自行承担风险）
            /* devtoolLineToLine: { test: /\.jsx$/ }, // 为这些模块使用 1:1 映射 SourceMaps（快速）
            hotUpdateMainFilename: "[hash].hot-update.json", // 「HMR 清单」的文件名模板
            hotUpdateChunkFilename: "[id].[hash].hot-update.js", // 「HMR 分块」的文件名模板
            sourcePrefix: "\t", // 包内前置式模块资源具有更好可读性 */
    },
    // 模块配置
    module: {
        // 模块规则（配置 loader、解析器等选项）
        rules: [
            // html中引用的静态资源在这里处理,默认配置参数attrs=img:src,处理图片的src引用的资源.
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 除了img的src,还可以继续配置处理更多html引入的资源
                    attrs: ['img:src', 'img:data-src', 'audio:src']
                }
            },
            // 处理图片(雷同file-loader，更适合图片)
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小图转成base64
                    name: 'assets/img/[name].[hash:7].[ext]'
                }
            },
            // 处理多媒体文件
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/media/[name].[hash:7].[ext]'
                }
            },
            // 处理字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.css$/,
                // 最佳实践：只在test和文件名匹配中使用正则表达式, 在include和exclude中使用绝对路径数组, 尽量避免exclude,更倾向于使用 include
                // include: [ path.resolve(__dirname, "app") ], //必须匹配选项
                // exclude: [ path.resolve(__dirname, "app/demo-files") ], //必不匹配选项（优先于 test 和 include）
                use: [
                    {
                        loader: /* env === 'development' ? 'style-loader' : */ MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', minimize: env === 'production', hmr: env === 'development',
                            // if hmr does not work, this is a forceful method.
                            // reloadAll: true,
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1, //此处我先不要小图 base64
                            /* 经我测试，这样与下面=效
                            outputPath: 'images',
                            name: '[name].[contenthash:7].[ext]', */
                            // 这句与上面=效
                            name: 'images/[name].[ext]',
                            // name: 'images/[name].[contenthash:7].[ext]',

                            /* publicPath: '../asdf' */
                        }
                    }
                ]
            }
        ]
    },
    // 附加插件列表
    plugins: [
        // 大量需要使用到的模块，在此处一次性注入，避免到处import/require。
        /* new webpack.ProvidePlugin({
            React: 'react',
            Zepto: 'zepto',
        }), */
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            // filename: 'css/[name].[contenthash:7].css',
            chunkFilename: 'css/[id].css',
            // chunkFilename: 'css/[id].[contenthash:7].css',
        }),
        new HtmlWebpackPlugin({title: 'index', hash: true,/* , filename: 'assets/admin.html' */}),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimize: env === 'production', //取代 new UglifyJsPlugin(/* ... */)
        namedModules: true, //配置中如果没有设置此选项，默认会在 mode development 启用，在 mode production 禁用。
        // namedChunks: true, // 配置中如果没有设置此选项，默认会在 mode development 启用，在 mode production 禁用。
        runtimeChunk: {name: 'manifest'},
        splitChunks: {
            chunks: "all", //initial表示只会提取初始入口模块的公共代码、async只会提取异步加载模块的公共代码、 all
            minSize: 30000, //模块大于30k会被抽离到公共模块 // 提高缓存利用率，这需要在http2/spdy
            maxSize: 0,//没有限制
            minChunks: 2, //模块出现2次就会被抽离到公共模块
            maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
            maxInitialRequests: 3, //入口模块最多只能加载3个
            automaticNameDelimiter: '~',// 多页面共用chunk命名分隔符
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,// 确定模块打入的优先级
                    reuseExistingChunk: true,// 使用复用已经存在的模块
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: -10
                }
            }
        }
    },
    devServer: {
        //todo:
        //未解决：package.json处设--open chrome，还是打开的默认浏览器
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        /*
            open设为true, 会以默认浏览器自动打开
            设为 'firefox', 运行时是以firefox打开的
            设为'chrome'，运行时是以cent browser打开(我pc上装着cent)（看来cent(chrome内核)有什么对pc的特殊设置）
            所以设为chrome的绝对路径，启效.
            //webpack-dev-server 使用opn包打开浏览器 //openOptions = Object.assign({}, openOptions, { app: options.open });
            // opn api中：app: string | string[]
            // opn api中：Chrome is google chrome on macOS, google-chrome on Linux and chrome on Windows.
            // opn api中：You may also pass in the app's full path. For example on WSL,
            // this can be /mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe for the Windows installation of Chrome. */
        open: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        port: 8889,
        host: '0.0.0.0',
        useLocalIp: true, //This option lets the browser open with your local IP: eg: http://192.168.1.6:8889/
        // publicPath: "/assets/", //确保 publicPath 总是以斜杠(/)开头和结尾   默认 是 "/"
        /* proxy: [{
            context: ["/auth", "/api"],
            target: "http://sss:3000",
        }] */
        proxy: {
            '/api': 'http://sss:3000', //  /api/users => http://sss:3000/api/users
            // pathRewrite: {'^/api' : ''},
            /* bypass: function (req, res, proxyOptions) {
                if (req.headers.accept.indexOf('html') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return '/index.html';
                }
            } */
        }
    }
    /* devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        // ...
    }, */
    // 解析模块请求的选项（不适用于对 loader 解析）
    /* resolve: {
        // 用于查找模块的目录
        modules: [ "node_modules", path.resolve(__dirname, "app") ],
        // 使用的扩展名
        extensions: [".js", ".json", ".jsx", ".css"],
        // 模块别名列表
        alias: {}, // []
    }, */
    // performance: {},
    // devtool 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
        /* devtool: "source-map", // enum // 牺牲了构建速度,最详细
        devtool: "inline-source-map", // 嵌入到源文件中
        devtool: "eval-source-map", // 将 SourceMap 嵌入到每个模块中
        devtool: "hidden-source-map", // SourceMap 不在源文件中引用
        devtool: "cheap-source-map", // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
        devtool: "cheap-module-source-map", // 有模块映射(module mappings)的 SourceMap 低级变体
        devtool: "eval", // 没有模块映射，而是命名模块。以牺牲细节达到最快。 */
    // webpack的主目录,相对于此目录解析 //entry 和 module.rules.loader 选项
    // context: __dirname, // string（绝对路径！）
    // 构建目标 // 包(bundle)应该运行的环境 //更改 块加载行为(chunk loading behavior) 和 可用模块(available module)
        /* target: "web", // 枚举
        target: "webworker", // WebWorker
        target: "node", // node.js 通过 require
        target: "async-node", // Node.js 通过 fs and vm
        target: "node-webkit", // nw.js
        target: "electron-main", // electron，主进程(main process)
        target: "electron-renderer", // electron，渲染进程(renderer process)
        target: (compiler) => {  ...  }, // 自定义 */
    // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
        /* externals: ["react", /^@angular\//],
        externals: "react", // string（精确匹配）
        externals: /^[a-z\-]+($|\/)/, // 正则
        externals: {
            angular: "this angular", // this["angular"]
            react: { // UMD
                commonjs: "react",
                commonjs2: "react",
                amd: "react",
                root: "React"
            }
        },
        externals: (request) => { ...  return "commonjs " + request } */
    // 精确控制要显示的 bundle 信息
        /* stats: "errors-only",
        stats: {
            assets: true,
            colors: true,
            errors: true,
            errorDetails: true,
            hash: true,
            // ...
        }, */
};