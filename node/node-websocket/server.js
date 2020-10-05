//:使用第三方ws模块服务ws协议服务器
//1:加载ws模块
const ws = require("ws");
//2:创建ws服务器,并且指定监听端口
var server = new ws.Server({port:9001});
//3:为ws服务器绑定事件 connection
//  每一个客户端连接都会触发此事件
server.on("connection",(socket)=>{
  //4:每隔1s不停向客户发送数据  send();
  var counter = 0;
  var timer = setInterval(()=>{
    counter++;
    socket.send("I am Server - "+counter);
  },1000);
  //5:接收客户端发送消息       绑定事件message
  socket.on("message",(msg)=>{
       console.log("服务器接收到消息"+msg);
  });
  //6:WS服务器接收客户端发来的断开连接请求
  socket.on("close",()=>{
    console.log("客户端断开连接");
    clearInterval(timer);
  });
})