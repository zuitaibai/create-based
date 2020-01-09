// del: @babel/polyfill =core-js regenerator-runtime， @babel/runtime

// 注意 babel的版本要 7.4.0及以上，babel-loader的版本用8以上
// install:   core-js regenerator-runtime @babel/runtime-corejs3
// install-D: babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime

module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            // @babel/preset-flow
            // @babel/preset-react
            // @babel/preset-typescript
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                // package.json 中声明的 browserslist 可以影响到 babel、postcss
                // babel 是优先读取.babelrc 文件中@babel/preset-env 的 targets 属性，未定义会读取 package.json 中的 browserslist。
                // targets: { 'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8'] },
                // debug: true,
                corejs: {
                    version: 3,
                    proposals: true,
                },
                modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
            }
        ]
    ];
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {
                    version: 3,
                    proposals: true
                },
                useESModules: true
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}