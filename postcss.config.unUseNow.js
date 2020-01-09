/* module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({ preset: 'default' }),

        //以下是没有yarn add过的插件
        // font-magician
        // postcss-preset-env
        // postcss-assets
        // postcss-modules
        //require('postcss-sprites')({
            //stylesheetPath: './dist/css',
            //spritePath: './dist/images/',
            // basePath: ???
            //retina: true,
            //outputDimensions: true,
            //filterBy: function (image) {
                // image: {styleFilePath,path,originalUrl,url,ratio,retina,groups,token,coords,spritePath,spriteUrl,spriteWidth,spriteHeight}
                //if (!/\.png$/.test(image.url)) {
                    //return Promise.reject();
                //}
                //return Promise.resolve();
            //}
        //}),
    ]
};*/

/* module.exports = ({ file, options, env }) => {
    const plugins = [ require('autoprefixer') ];
    console.log(env);
    if(true) plugins.push(
        require('cssnano')({ preset: 'default', })
    );
    return {
        plugins
    };
} */
