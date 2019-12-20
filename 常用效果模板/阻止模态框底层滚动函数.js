
//1、pc和手机端  
  /** 阻止弹窗底层内容滚动，如body内容, 需传入参数
         * dom元素节点 /
         * isModal：是否打开模态层的布尔值true/false(1 或 0 )
         * modalCanMove：是否允许弹层滚动（可选参数）**/
       var toggleBody = function(dom,isModal, modalCanMove) {
            // 如果模态框需要滚动 -- 有选择列表用得多
            if (modalCanMove) {
                alert(10)
                if (isModal) {
                    document.body.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height:100%; overflow: hidden;'
                }
                else {
                    document.body.style.cssText = 'position: relative; height:auto; overflow: auto;'
                }
                return;
            }
            // 以下方法引导页用得多
            var el = document.querySelector(dom);
            var stop = function (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            if(isModal){
                el.addEventListener("touchmove",stop,false);
            }
            else {
                el.removeEventListener("touchmove",stop,false);
            }
        }
	
//2、pc端
/** 阻止弹窗底层内容滚动，如body内容, 需传入参数true/false(1 或 0 ) **/
var toggleBody = function(isModal) {
    if(isModal){
	
		//方法一
        //document.body.style.overflow = 'hidden'


		//方法二
        document.body.style.height = '100vh';

        document.body.style['overflow-y'] = 'hidden'
    }
    else {
		//方法一
        //document.body.style.overflow= 'auto'


		//方法二
        document.body.style.height = 'unset';

        document.body.style['overflow-y'] = 'auto'

    }
};
toggleBody(1);
// toggleBody(0);