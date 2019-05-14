<template>
  <div class="enterprise">
        <!-- <div >
            <img src="../assets/img/up.svg" alt="" class="up" @click="prePage">
        </div> -->
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
        <!-- <div >
            <img src="../assets/img/down.svg" alt="" class="down" @click="nextPage">
        </div> -->
  </div>
</template>

<script>
export default {
  name: 'enterprise',
  data () {
    return {
        divWidth:'100px',//列表进度条宽度
    }
  },
  methods:{

  },
  mounted(){
        let _this = this;
        console.log('进入企业信息列表');
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
