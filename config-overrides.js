const {
    override,
    addLessLoader,//less样式
    fixBabelImports,  //按需引入样式
    addDecoratorsLegacy,//装饰器模式写法
} = require('customize-cra');
const modifyVars = require('./theme');


module.exports = override(
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: modifyVars
        },
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//这里要写true
    }),
    addDecoratorsLegacy(),
);