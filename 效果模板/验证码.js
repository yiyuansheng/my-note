/**验证码**/
window.onload=function(){
    createWorld();
};
plane.onclick=function(){
    createWorld();
};
var code="";
function createWorld(){
    //1:创建二个变量保存验证宽度高度 120 30
    var w = 120;
    var h = 40;
//2:修改画布宽度高度
    plane.width=w;
    plane.height=h;
//3:获取画笔
    var ctx = plane.getContext("2d");
//4:填充背景颜色 随机色
    ctx.fillStyle = rc(180,230);
//5:填充矩形 120 30
    ctx.fillRect(0,0,w,h);
//6:绘制随机4个字符
    var pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//6.1:创建循环4次，每次绘制一个字符
    for(var i=0;i<4;i++){
        //6.2:c本次绘制字符
        var c = pool[rn(0,pool.length)];
        code+=c;
        var fs = rn(30,40);       //随机的字体大小
        ctx.font = fs+"px SimHei";//设置字体大小
        ctx.fillStyle ="#fff";//设置字体颜色
        ctx.textBaseline = 'top';  //设置文本基线
        var deg = rn(-45,45);      //创建随机旋转角度
        ctx.save();                //保存当前画笔状态
        ctx.translate(30*i+15,15);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(c,-15+5,-15);
        ctx.restore();             //恢复画笔状态
    }
//7:绘制6条干扰线
    for(var i=0;i<6;i++){
        //7.1: 设置描边样式
        ctx.strokeStyle = rc(0,255);
        //7.2: 开始新路径
        ctx.beginPath();
        //7.3: 移动某个点 x y
        ctx.moveTo(rn(0,w),rn(0,h));
        //7.4: 画直线     x y
        ctx.lineTo(rn(0,w),rn(0,h));
        //7.5: 描边
        ctx.stroke();
    }
//8:绘制50个干扰点 填充半径0.5圆
    for(var i=0;i<50;i++){
        //8.1:设置填充样式 随机
        ctx.fillStyle = rc(0,255);
        //8.2:开始新路径
        ctx.beginPath();
        //8.3:绘制填充半径0.5圆
        ctx.arc(rn(0,w),rn(0,h),0.5,0,2*Math.PI);
        //8.4:填充
        ctx.fill();
    }

//9:创建函数 返回指定范围内随机整数
    function rn(min,max){
        var n =  Math.floor(Math.random()*(max-min)+min);
        return n;
    }
//10:创建函数 返回指定范围的随机颜色
    function rc(min,max){
        var r = rn(min,max);
        var g = rn(min,max);
        var b = rn(min,max);
        return `rgb(${r},${g},${b})`;
    }
}
eml.onblur=function(){
    if(eml.value==""){
        $("#eml").next().next().html("验证码不能为空");
    }
    else if($("#eml").val().toUpperCase()!=code){
        $("#eml").next().next().html("验证码错误");
    }else{
        $("#eml").next().next().html("");
    }
};