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