// node服务
var express = require('express'); // 导入express框架
var bodyParser = require('body-parser'); // 做内容解析-http请求参数解析
var app = express(); // 生成实例+
// 配置参数解析
// 解析 application/json
// app.use(bodyParser());
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 不配置cors跨域

// 第一个接口 method get
var arr = ['红楼梦', '西游记', '三国演义', '水浒传']
// 获取
app.get('/api/jsonp', function (req, res) {
    let callBack = req.query.callBack
    if (callBack) {
        res.send(`${callBack}(${JSON.stringify({ data: arr})})`)
    }
    else {
        res.send('必须指定回调函数callBack')
    }
})

app.listen(3002, function () {
    console.log('服务启动端口3002');

})