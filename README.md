# loader
导出为一个函数的 node 模块，可以调用[loader api](https://www.webpackjs.com/api/loaders/)

## 加载本地loader
我们默认的loader都是npm下载的，如果我们要加载本地loader，webpack有个配置，先从node_modules找，没找到再从自定义文件夹找
```
module.export = {
    resolveLoader:{
        modules: ['node_modules','src/loaders']
    }
}
```

## loader编写
- 根目录下新建文件夹src，创建入口文件index.js
```javascript
console.log('test loader');
```
- 新建文件夹src/loaders/，创建自定义loader。loader-utils包用于获取参数，自带无需安装
```javascript
const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    const result = source.replace('test', options.name);
    return result;
}
```
- 异步loader，需要使用this.async方法
```javascript
const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    const callback = this.async();
    setTimeout(() => {
        const result = source.replace('test', options.name);
        callback(null, result);
    }, 1000)
}
```
- webpack.config.js 引用自定义loader
```javascript
{
    test: /\.js$/,
    use: {
        loader: path.resolve(__dirname, "./src/loaders/index.js"),
        options: {
             name: 'xixi'
        }
    }
}
```

# plugin
实例化的时候回执行apply方法，plugin监听webpck发出的各种[事件](https://www.webpackjs.com/api/compiler-hooks/#emit)
```javascript
class BasePlugin {
    constructor(doneCallback) {
    }

    apply(compiler) {
        // 监听事件
        // 编译完成
        compiler.plugin('done', (stats) => {
            console.log('done');
        });
    }
}

module.exports = BasePlugin;
```

```javascript
class BasePlugin {
    constructor(doneCallback) {
        this.doneCallback = doneCallback;
    }

    apply(compiler) {
        // 监听到done事件后执行callback
        compiler.hooks.done.tap('basePlugin', stats => {
            this.doneCallback(stats);
        });
    }
}

module.exports = BasePlugin;
```


