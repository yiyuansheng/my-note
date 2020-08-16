const path = require('path');
//C:\Users\yuansheng\Desktop\tmp\dist
console.log(path.resolve(__dirname, 'dist'));
console.log(__dirname); //C:\Users\yuansheng\Desktop\tmp
module.exports = {
    // 入口配置
    entry: {
        a: './src/index.js'
    },
    // 出口配置
    output: {
        /** path: __dirname + '/dist', //path为绝对路径**/
        path: path.resolve(__dirname, 'dist'), //resolve--把__dirname和dist合并
        filename: 'bundle.js'
    },
    // loaders
    module: {

    },
    plugins: [],
    // 开发服务器
    devServer: {

    }
}