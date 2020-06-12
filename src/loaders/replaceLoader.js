const loaderUtils = require('loader-utils');

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    const result = source.replace('test', options.name);
    return result;
}