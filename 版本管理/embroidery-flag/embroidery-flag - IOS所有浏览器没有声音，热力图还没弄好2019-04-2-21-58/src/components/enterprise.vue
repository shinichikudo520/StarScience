<template>
  <div class="enterprise">
        <div class="top">
            <img src="../assets/img/needle.png" alt="">
            <div>
                华为邀您绣一针
            </div>
        </div>
        <div class="content">
            <table>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress " :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
                <tr>
                    <td class="firstTd">阿里巴巴</td>
                    <td class="secondTd">
                        656815
                        <div class="progress" :style="{'width':divWidth}"></div>
                        <span>|</span>
                    </td>
                    <td class="thirdTd">
                        <button type="button" class="btn btn-primary btn-sm">为他助威</button>
                    </td>
                </tr>
               
            </table>
        </div>
  </div>
</template>

<script>
export default {
  name: 'enterprise',
  data () {
    return {
        p_demo:'',//获取页面body节点
        start:"",//触摸开始的坐标点
        move:"",//触摸移动实时的坐标点
        num:"",//触摸结束的坐标点
        divWidth:'100px',//列表进度条宽度
    }
  },
  methods:{
    //   滑动页面
    movePage(){
        let _this = this;
        let p_demo = document.getElementsByClassName('enterprise')[0];
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
                        'path':'/congratulation'
                    });
                    
                }else if(_this.num < -100){
                    console.log('跳转热力图页');
                     _this.$router.push({//跳转到热力图页
                        'path':'/statistics'
                    });
                }

        })
    }
  },
  mounted(){
        let _this = this;
        console.log('进入企业信息列表');
        _this.movePage();//添加页面滑动监听跳转页面
  }
}
</script>

<style scoped>
    /* 主体样式 */
    .enterprise{
        width: 100vw;
        height: 100vh;
        background-color: #FFF100;
        font-family: '微软雅黑';
        font-weight: 700;


    }
    /* 顶部 */
    .enterprise>>>.top{
        text-align: center;
        padding-top:3%;
        margin-bottom: 3%;
    }
    /* 针 图片 */
    .enterprise>>>.top img{
        width: 6.25rem;
        height: 6.25rem;
    }
    /* 表格 */
    .enterprise>>>.content table{
        width: 90%;
        margin: 0 auto;
        font-size: .75rem;

    }
    .enterprise>>>.content table td{
        line-height: 2;

    }
    /* 表格第一列 */
    .enterprise>>>.firstTd{
        text-align: left;
    }
    /* 表格第二列 */
    .enterprise>>>.secondTd{
        width: 65%;
        text-align: right;
        color: #FF1600;
        font-weight: 400;
        
    }
    /* 第二列的进度条 */
    .enterprise>>>.secondTd div{
        display: inline-block;
        background: -webkit-gradient(linear,left top, right top,color-stop(30%, #FF1B00),to(#FFF900)) !important;
    }
    /* 第二列的 |  */
    .enterprise>>>.secondTd span{
        color: #FF7100;
        font-weight: 400;
        font-size: .875rem;
        
    }
    /* 第三列的按钮 */
    .enterprise>>>.thirdTd button{
        background-color: #FF0000;
        color: #FFF600;
        font-size: .5rem;
        border: .0625rem solid #000000;
        border-radius: 1.25rem;
        line-height:1;
        margin-left: 10%;
    }
</style>
