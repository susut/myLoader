const path = require("path");
const BasePlugin = require('./src/plugins/basePlugin');

module.exports = {
    mode: "development",
    resolveLoader:{
        modules: ['node_modules','src/loaders']
    },
    entry: {
        main: path.resolve(__dirname, "src/index.js")
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "replaceLoader",
                    options: {
                        name: 'xixi'
                    }
                }
            }
        ]
    },
    plugins: [
        new BasePlugin(() => {
            console.log('成功监听到回调');
        })
    ]
}