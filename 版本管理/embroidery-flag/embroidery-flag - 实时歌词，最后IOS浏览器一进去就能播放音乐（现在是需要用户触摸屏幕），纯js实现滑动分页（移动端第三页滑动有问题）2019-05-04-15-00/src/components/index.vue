<template>
  <div class="index">
        <div id="wraper">
            <div id="content">
                <div class="page" id="page1">
                    <home></home>
                </div>
                <div class="page" id="page2">
                    <statistics></statistics>
                </div>
                <div class="page" id="page3">
                    <enterprise></enterprise>
                </div>
                <div class="page" id="page4">
                    <congratulation></congratulation>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import home from './home.vue'
import statistics from './statistics.vue'
import enterprise from './enterprise.vue'
import congratulation from './congratulation.vue'

export default {
  name: 'index',
  data () {
    return {
        
    }
  },
  methods:{
      //滑动页面
      mouePage(){
        var page1 = document.getElementById('page1'),        //滑动item
        page2 = document.getElementById('page2'),
        page3 = document.getElementById('page3'),
        page4 = document.getElementById('page4'),

        wraper = document.getElementById('wraper'),
        content = document.getElementById('content');    //滑动容器
        var itemHeight = wraper.offsetHeight;                //滑动item高度         
        var index = 0;                                       //滑动计数
        var moveY,                                           //滑动距离
            endY,                                            //滑动停止的Y坐标
            startY;                                          //滑动开始的Y坐标
        // content.style.height = (itemHeight * 4) + 'px'
        // 触摸开始
        function boxTouchStart(e) {
            console.log('触摸开始')
            var touch = e.touches[0];
            startY = touch.pageY;
            endY = content.style.webkitTransform;
            if(!endY){
                endY = 0;
            }else{
                endY = parseInt(endY.replace('translateY(',''))
            }
        }
    
        // 触摸结束
        function boxTouchEnd(e) {
            console.log('触摸结束')
            console.log($(e.target).parents('.page')[0].id,'祖先元素')

        }
        // 触摸移动
        function boxTouchMove(e) {

            var touch = e.touches[0];
            moveY = touch.pageY - startY;
            index = Number($(e.target).parents('.page')[0].id.split('page')[1])
            // console.log('触摸移动',moveY,$(e.target).parents('.page')[0].id)
                // alert('页面移动',moveY,index);

                //下一页
            if(moveY < 0) {
                if(index == 4) {
                    return false;
                }   
                content.style.webkitTransform = 'translateY(-'+(itemHeight*index)+'px)' 
                // alert(content.style.webkitTransform,'下一页');
            }
            //上一页
            else if(moveY > 0) {
                if(index == 1) {
                    return false;
                }
                content.style.webkitTransform = 'translateY('+(itemHeight+endY)+'px)' 
                // alert(content.style.webkitTransform,'上一页');

            }

        }
        content.addEventListener('touchstart', boxTouchStart, false )
        content.addEventListener('touchmove', boxTouchMove, false)
        content.addEventListener('touchend', boxTouchEnd, false)
      }
  },
  components:{
      home,
      statistics,
      enterprise,
      congratulation,

  },
 
 mounted(){
        let _this = this;
        console.log('进入首页');

        //滑动页面
        _this.mouePage();
  }
}
</script>

<style scoped>
  html,body,h2 {
      margin: 0;
      padding: 0;
    }
    .index{
        height: 100vh;
        overflow: hidden;
    }
    html,body,#wraper,#content {
      width: 100%;
      height: 100%;
    }
    #wraper {
      overflow: hidden;
    }
    #content {
      transition: all 1s linear;
    }
    .page {
      width: 100%;
      height: 100%;
    }
    /* #page1 {
      background: #f00
    }
    #page2 {
      background: #0f0
    }
    #page3 {
      background: #00f
    } */
</style>
