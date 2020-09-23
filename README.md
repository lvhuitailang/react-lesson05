### 1. 添加react-app-rewired 和 customize-cra

> `npm install react-app-rewired customize-cra -D`
    
* 配置config-overrides.js文件
    
        const {override} = require('customize-cra');
        module.exports = override();

### 2. 添加less 和 less-loader

> `npm install less less-loader -D`
    
* 编辑config-overrides.js文件

        const {
            override,
            addLessLoader,//less样式
        } = require('customize-cra');
        const modifyVars = require('./theme');
        
        
        module.exports = override(
            addLessLoader({
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: modifyVars
                },
            }),
        );



### 3. 添加antd 和 主题

> `npm install antd -S`

> `npm install babel-plugin-import -D`

* 编辑config-overrides.js文件

        const {
            override,
            addLessLoader,//less样式
            fixBabelImports,  //按需引入样式
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
        );

### 4. 添加装饰器写法

> `npm install @babel/plugin-proposal-decorators -D`

* 编辑config-overrides.js文件

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
        