/**
 * Created by Administrator on 2017/7/26.
 */
//会员注册
$("#feeds").load("style.html");
$("#dd").load("styleTow.html");


(function(){
    var headTu=document.getElementById("headTu");
    window.onscroll=function(){
        var scrollTop=document.body.scrollTop;
        if(scrollTop>50){
            headTu.style.cssText="height:50px";
        }else{
            headTu.style.cssText="height:0";
        }
    }
})();

(function(){

    var txtEmail=document.getElementsByName("email")[0],
        txtPwd=document.getElementsByName("upwd")[0],
        txtTel=document.getElementsByName("tel")[0],
        txtTxte=document.getElementsByName("text")[0],
        txtPwdTow=document.getElementsByName("pwdTow")[0];
        //txtTxteTow=document.getElementsByName("textTow")[0];
    //为它们绑定单击事件
    txtEmail.onfocus=getFocus;//邮箱
    txtPwd.onfocus=getFocus;//密码
    txtTel.onfocus=getFocus;//电话
    txtTxte.onfocus=getFocus;//图片验证
    txtPwdTow.onfocus=getFocus;//二次验证密码
    //txtTxteTow.onfocus=getFocus;//手机验证

    function getFocus(){
        //txt_focus
        this.className = "txt_focus";
        //下一个div清除焦点
        this.parentNode.nextElementSibling.children[0].className = "";
    }

    txtEmail.onblur = function(){
        //绑定reg
        vali(this,/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
    };

    txtTel.onblur = function(){vali(this,/^1\d{10}$/);};
        //绑定reg

    txtTxte.onblur = function(){vali(this,/^[a-z]\d{4}$/i);};
        //绑定reg֤


    //=function(){
    //    //绑定reg֤
    //    vali(this,/^\d{4}$/);
    //};

    function vali(txt,reg){
        //thisX->表示window
        txt.className="";
        //div
        var div=txt.parentNode//li
            .nextElementSibling//下一个li
            .children[0];//div
        if(reg.test(txt.value)){
            div.className="vali_success";
            //验证成功class
        }else{
            div.className="vali_fail";
            //验证失败时classΪ^^^^
            flag=false;
        }
    }
    txtPwd.onblur =
        txtPwdTow.onblur = function(){vali(this,/^[a-zA-Z]\w{5,17}$/);};
        //密码正则
})();
//结束

//功能点一:完成用户注册
//1:获取注册按钮绑定点击事件
var loginName = "";
var loginUpwd = "";
var loginTel = "";
var loginUid = "";
var flag=true;
$("#btn1").click(function(){
    //2:获取参数
    var email = $("input[name=email]").val();
   // var text = $("input[name=text]").val();
    var  upwd= $("input[name=upwd]").val();
    var tel = $("input[name=tel]").val();
    //var pwdTow = $("input[name=pwdTow]").val();
    //3:创建AJAX异步请求将参数发送 /reg

    if(flag&&email&&upwd&&tel){
        $.ajax({
            type:"POST",
            url:"data/ua_userinfo.php",
            data:{
                email:email, upwd:upwd, tel:tel},
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    loginName = email;
                    loginUpwd = upwd;
                    loginTel = tel;
                    loginUid = data.uid;
                    setTimeout(function(){
                        location.href = "register.html";
                    },1000);
                }else{
                    alert("注册失败");
                    $("div.vali_info").html(data.msg);
                }
            },
            error:function(){alert("网络出现故障请检查");}
        });
    }else{alert('不全')}

    //4:并且接回返回 code:1,msg:"添加成功"
    //5:跳转页面index.html 重新登录
});



//随机生成验证码
var w=120;
var h=30;
c1.width=w;
c1.height=h;
var ctx=c1.getContext("2d");
ctx.fillStyle=rc(180,230);
ctx.fillRect(0,0,w,h);
ctx.fillStyle=rc(0,180);
var str="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
for(var i=0;i<4;i++){
    var c=str[rn(0,str.length-1)];
    var fs=rn(18,40);
    ctx.font=fs+"px SimHei";
    ctx.fillStyle=rc(10,150);
    ctx.textBaseline="top";
    var deg=rn(-45,45);
    ctx.save();
    ctx.translate(30*i+5,15);
    ctx.rotate(deg*Math.PI/180);
    ctx.fillText(c,0,-15);
    ctx.restore();

}
for(var i=0;i<6;i++){
    ctx.strokeStyle=rc(0,255);
    ctx.beginPath();
    ctx.moveTo(rn(0,w),rn(0,h));
    ctx.lineTo(rn(0,w),rn(0,h));
    ctx.stroke();
}
for(var i=0;i<50;i++){
    ctx.fillStyle=rc(0,255);
    ctx.beginPath();
    ctx.arc(rn(0,w),rn(0,h),0.5,0,2*Math.PI);
    ctx.fill();
}
function rn(min,max){
    var n= Math.floor(Math.random()*(max-min)+min);
    return n;
};
function rc(min,max){
    var r=rn(min,max);
    var g=rn(min,max);
    var b=rn(min,max);
    return `rgb(${r},${g},${b})`;
}
a1.onclick=function(e){
    e.preventDefault();
    location.reload(true);
}
//验证码样式结束
