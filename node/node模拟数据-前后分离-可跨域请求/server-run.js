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

// cors配置跨域请求，纯后端配置，开发上下均不影响
//设置跨域请求1
var allowCrossDomain = function (req, res, next) {
    //自定义中间件，设置跨域需要的响应头。'*'代表所有，可指定具体地址
    res.header('Access-Control-Allow-Origin', '*');
    //允许请求方法-任何方法，注意：跨域请求会首先发送options请求试探；
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET, POST, PUT, DELETE');
    //允许任何类型
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');
    //  允许带cookie
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
};
app.use(allowCrossDomain); // 添加到express中

//设置跨域请求2
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//   });


// 第一个接口 method get
var arr = ['红楼梦', '西游记', '三国演义', '水浒传']
// 获取
app.get('/api/articles', function (req, res) {
    res.send(arr)
})
// 指定params和query参数
app.get('/api/articles/:num', function (req, res) {
    console.log(req.params); // :num
    if (req.query.name) {
        res.send(arr.find(item => item === req.query.name))
    }
    else res.send(arr)
})
// 提交
app.post('/api/articles', function (req, res) {
    console.log(req.body);
    if (req.body && req.body.name) {
        //把传递的书箱写入
        arr.push(req.body.name);
        res.send(arr);
    } else {
        res.send({ "msg": "name参数必须！！！" })
    }
})
//修改
app.put("/api/articles", function (req, res) {
    console.log(req.body) //接收参数
    //把传递的书箱写入
    arr.push(req.body.name);
    res.send(articles);
})
//删除
app.delete("/api/articles", function (req, res) {
    console.log(req.body) //接收参数
    //把传递的书箱写入
    if (arr.length) {
        arr.splice(req.body.index, 1);
    }
    res.send(arr);
})

app.listen(3000, function () {
    console.log('服务启动端口3000');

})