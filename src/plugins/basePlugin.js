class BasePlugin {
    constructor(doneCallback) {
        this.doneCallback = doneCallback;
    }

    apply(compiler) {
        // 监听事件
        // 编译完成
        compiler.plugin('done', (stats) => {
            console.log('done');
        });
        // 输出到output之前
        compiler.plugin('emit', function(compilation, callback) {
            let fileList = 'In this build:\n\n';
            for (let name in compilation.assets) {
                fileList += ('- ' + name + '\n');
            }

            compilation.assets['fileList.md'] = {
                source: function() {
                    return fileList;
                },
                size: function() {
                    return fileList.length;
                }
            }

            callback();
        });
    
        // 监听到done事件后执行callback
        compiler.hooks.done.tap('basePlugin', stats => {
            this.doneCallback(stats);
        });
    }
}

module.exports = BasePlugin;
