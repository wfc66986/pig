// 自定义 窗口拖动指令
const config = {
    bind(el, binding, vnode) {
		// console.log(binding)
      /**
       * el 指令绑定的元素 
       */
      el.onmousedown = function (e) {
        // console.log("开始拖动");
        let pr = el.parentNode.parentNode;
        let disX = e.clientX - pr.offsetLeft;
        let disY = e.clientY - pr.offsetTop;
        document.onmousemove = function (e) {
          // console.log("拖动中");
          pr.style.left = e.clientX - disX + "px";
          pr.style.top = e.clientY - disY + "px";
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          // console.log("拖动结束");
        };
        return false;
      }

	  if(!binding.value){
		  // 窗口与页面间添加蒙版
		  var shade = document.createElement('div')
		  shade.id = "shade"
		  shade.style.position = "fixed"
		  shade.style.top = 0
		  shade.style.left = 0
		  shade.style.right = 0
		  shade.style.bottom = 0
		  shade.style.zIndex = 150
		  shade.style.background = "rgba(0, 0, 0, 0.5)"
		  document.body.appendChild(shade)
	  }
    },
    unbind(el, binding, vnode) {
      var shade = document.getElementById('shade')
      if(shade) document.body.removeChild(shade)
    }
  }
  
  export default config