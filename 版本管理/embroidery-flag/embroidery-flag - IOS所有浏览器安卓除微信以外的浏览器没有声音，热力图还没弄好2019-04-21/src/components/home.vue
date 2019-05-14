<template>
  <div class="home">
    <div class="main">
        <h1 class="naming">冠名</h1>
        <h1 class="hollowOut">一起绣国旗</h1>
        <p class="purpose">庆祝祖国成立70周年全民献礼</p>
        <div class="hostCompany">
            <div>
                主办单位：共青团中央
            </div>
            <div>
                承办单位：悉乏教育科技（深圳）有限公司
            </div>
            <div>
                技术支持：中星科技
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        p_demo:'',//获取页面body节点
        start:"",//触摸开始的坐标点
        move:"",//触摸移动实时的坐标点
        num:"",//触摸结束的坐标点
    }
  },
  methods:{
    //   滑动页面
    movePage(){
        let _this = this;
        let p_demo = document.getElementsByClassName('home')[0];
        p_demo.addEventListener("touchstart", function (e){        /*触摸开始*/
                // console.log("触摸开始")
                // console.log(e)
                _this.start = e.touches[0].pageY;
                // console.log(_this.start)       /*得出刚触屏时距离页面顶部的距离*/
        })

        p_demo.addEventListener("touchmove", function (e){       /*触摸移动*/
                // console.log("触摸移动")
                // console.log(e)
                _this.move = e.touches[0].pageY;
                // console.log(_this.move)     /*得出触屏结束后距离页面顶部的距离*/
        }) 

        p_demo.addEventListener("touchend", function (e){            /*触摸结束*/
                console.log("触摸结束")
                // console.log(e)
                _this.num = _this.start - _this.move ;   /*得出开始和结束距离页面顶部的差值*/
                console.log(_this.num)     /*得出触屏结束后距离页面顶部的距离*/
                if(_this.num>15){
                    console.log('跳转到下一页');
                    _this.$router.push({//跳转到热力图页
                        'path':'/statistics'
                    });
                    
                }else{//首页 往上不跳转
                    console.log('不跳转');
                }

        })
    }
  },
  mounted(){
        let _this = this;
        console.log('进入首页');
        
        _this.movePage();//添加页面滑动监听跳转页面
  }
}
</script>

<style scoped>
    /* 主体样式 */
    .home{
        /* width: 100vw; */
        height: 100vh;
        background: url('../assets/img/nationalFlag.png') 0 0 no-repeat;
        background-size: 100vw 97vh;
        background-color: #E00000;
        position: relative;

    }
    /* 内容部分 */
    .home>>>.main{
        position: absolute;
        bottom: 10%;
        left: 8%;
        font-family: '宋体';
    }
    /* 冠名 */
    .home>>>.naming{
        color: white;
    }
    /* 镂空字体 */
    .home>>>.hollowOut{
        -webkit-text-stroke:1px #FFFF00;
        color: transparent;
        font-size: 3rem;
    }
    /* 目的 */
    .home>>>.purpose{
        color: #FFFF00;
        font-weight: 700;
    }
    /* 主办公司 */
    .home>>>.hostCompany{
        margin-top: 1.25rem;
        font-size: .5rem;
        color: #FCF5F5;
        opacity: 0.6;
    }
</style>
