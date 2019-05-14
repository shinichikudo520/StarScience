<template>
  <div class="congratulation">
    <div class="top">
        <button type="button" class="btn btn-primary btn-lg">为祖国送祝福</button>
    </div>
    <div class="content">
        <ul style="list-style:none" id="marquee">
            <li v-for="(item,indx) in congratulationText" :key="indx">{{item}}</li>
        </ul>
    </div>
    <div class="bottom">
        <img src="../assets/img/bottomImg.png" alt="" srcset="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'congratulation',
  data () {
    return {
        p_demo:'',//获取页面body节点
        start:"",//触摸开始的坐标点
        move:"",//触摸移动实时的坐标点
        num:"",//触摸结束的坐标点
        congratulationText:[
            '李***萍上传了祝福语',
            '欧阳***上传了绘画作品',
            '熊****平上传了祝福语',
            '杨****思上传了绘画作品',
            '陆****平上传了祝福语',
            '刘****玲上传了绘画作品',
            '郑****宇上传了祝福语',
            '胡****敏上传了绘画作品',
            '周****若传了祝福语',
            '李***静上传了绘画作品',
            '樊****奇上传了祝福语',
            '张****云上传了绘画作品',
            '张****凤上传了祝福语',
            '李***安上传了绘画作品',

        ],//祝贺信息列表
        timeout:"",//记录计时器
    }
  },
  methods:{
    //   滑动页面
    movePage(){
        let _this = this;
        let p_demo = document.getElementsByClassName('congratulation')[0];
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
                if(_this.num> 100){
                    console.log('跳转到下一页');
                    _this.$router.push({//跳转到热力图页
                        'path':'/'
                    });            
                }else if(_this.num< -100){//首页 往上不跳转
                    console.log('跳转到企业信息列表');
                    _this.$router.push({//跳转到热力图页
                        'path':'/enterprise'
                    });
                }

        })
    },
    //滚动条
    scrollAnimation(){
        let _this = this;
        clearTimeout(_this.timeout);
        var marquee = document.getElementById('marquee');
        var offset=0;
        console.log(marquee,'marquee')
        if(marquee == null){
            return
        }
        var scrollheight =  marquee.offsetHeight;//整个高度
        var firstNode = marquee.children[0].cloneNode(true);
        marquee.removeChild(marquee.children[0]);//还有这里
        marquee.appendChild(firstNode);//还有这里
        if(offset == scrollheight){
            offset = 0;
        }
        marquee.style.marginTop = "-"+offset+"px";
        offset += 1;
        _this.timeout = setTimeout(_this.scrollAnimation,1000);
    }
  },
  mounted(){
        let _this = this;
        console.log('进入首页');
        _this.movePage();//添加页面滑动监听跳转页面

        _this.scrollAnimation();//祝贺信息滚动条加载
  },
  beforeDestroy(){
      let _this = this;
      clearTimeout(_this.timeout);
  }
}
</script>

<style scoped>
    /* 主体样式 */
    .congratulation{
        /* width: 100vw; */
        height: 100vh;
        background-color: #FFF100;
        font-family: '微软雅黑';
    }
    /* 顶部 */
    .congratulation>>>.top{
        text-align: center;
        padding-top: 8%;
    }
    /* 顶部按钮 */
    .congratulation>>>.top button{
        background-color: #FF0000;
        color: #FFF100;
        border: .0625rem solid #000000;
        border-radius: 1.875rem;
    }
    /* 中部内容 */
    .congratulation>>>.content{
        margin-top: 11%;
        height: 50vh;
        overflow: hidden;
    }
    /* 中部文字 */
    .congratulation>>>.content ul{
        padding: 0;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        color: #786E4D;    

    }
    .congratulation>>>.content ul li{
        line-height: 1.9;
    }
    /* 底部图片 */
    .congratulation>>>.bottom img{
        width: 100%;
        height: 25%;
        position: absolute;
        bottom: 0;
    }
</style>
