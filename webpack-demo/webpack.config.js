const path = require('path');
//C:\Users\yuansheng\Desktop\tmp\dist
console.log(path.resolve(__dirname, 'dist'));
console.log(__dirname); //C:\Users\yuansheng\Desktop\tmp

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const uglify = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取为单独的css
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCssWebpack= require('purifycss-webpack'); //消除没有用到的css
const glob = require('glob'); //与PurifyCssWebpack配合使用-找路径

const CopyWebpackPlugin = require('copy-webpack-plugin'); //静态资源输出

const json = require('./webpack.config.json');
console.log(json);
module.exports = {
    //指定模式, 开发模式为develop 4.x用
    mode: 'development',
    // mode: 'production',
    // devtool: 'source-map', //3.x之前用
    // 入口配置
    entry: {
        //多个文件 按照顺序依次打包
        // a: ['./src/index.js', './src/index2.js']
        // index1: './src/index.js',
        index1: json.entry,
        // index2: './src/index2.js'
    },
    // 出口配置
    output: {
        /** path: __dirname + '/dist', //path为绝对路径**/
        path: path.resolve(__dirname, 'dist'), //resolve--把__dirname和dist合并
        filename: '[name].bundle.js'
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.css$/,
                // // use: ['style-loader', 'css-loader'],
                // loader: ['style-loader', 'css-loader'],
                // use: [
                //     {loader: "style-loader"},
                //     {loader: "css-loader"},
                //     {loader: "postcss-loader"},
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader'],
                    //打包后css背景图路径
                    publicPath: '../'
                })
                // use: [
                //      MiniCssExtractPlugin.loader,
                //     "css-loader"
                // ]
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     use: ['babel-loader'],
            //     exclude: /node_modules/
            // },
            {
               test: /\.less$/,
               use: ExtractTextPlugin.extract({
                   fallback: 'style-loader',
                   use: ['css-loader', 'less-loader'],
                   publicPath: '../'
               })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader", //url-loader依赖于file-loader所以只引一个
                    options: {
                        limit: 14000, //大于14000kb采用文件路径加载而不是base64
                        outputPath: 'images' //打包图片存放的目录
                    }
                }]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        // new uglify(), //压缩插件4.x之后弃用
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(['dist']), //先删除dist文件夹再重新new HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            // chunks: ['index1'], //与this.entry.index1对应
            filename: 'index.html',
            // 压缩配置
            // minify: {
            //     collapseWhitespace: true, //压缩空白
            //     removeAttributeQuotes: true //删除属性双引号
            // },
            hash: true, //动态哈希，消除缓存
            title: '我配置的标题', //html标题
            template: './src/index.html' //模板
        }),
        new ExtractTextPlugin('css/index.css'), //提取出去的路径
        // new HtmlWebpackPlugin({
        //   chunks: ['index2'],//块-与this.entry.index2对应
        //   filename: 'index2.html',
        //   hash:true,
        //   title: '我配置的标题2',
        //   template: './src/index.html'
        // })
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets'),
                to: './public'
            }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    optimization: {
        // 分块
        splitChunks: {
            cacheGroups: {
                aaa: {
                    chunks: "initial", //提取块的方式
                    name: 'jquery', //entry.jquery, 入口的js
                    enforce: true //强制
                },
                bbb: {
                    chunks: "initial",
                    name: 'index1',
                    enforce: true
                }
            }
        }
    },
    // 开发服务器
    devServer: {
        // 设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器ip地址，localhost
        host: 'localhost',
        //设置端口，
        port: 8090,
        open: true, //自动打开浏览器
        hot: true, //热更新
    }
}