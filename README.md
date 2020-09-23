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