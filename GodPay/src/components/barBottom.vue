<template>
  <div class="barBottom">
        <mt-tabbar v-model="barBottom">
            <mt-tab-item class="rightToRecognize" id="rightToRecognize" @click.native="showPopup">
                认权
            </mt-tab-item>
            <mt-tab-item class="crowdfunding" id="crowdfunding" @click.native="showPopup">
                众筹
            </mt-tab-item>
            <mt-tab-item class="information" id="information" @click.native="showPopup">
                资讯
            </mt-tab-item>
            <mt-tab-item class="personalcenter" id="personalcenter" @click.native="showPopup">
                个人中心
            </mt-tab-item>
        </mt-tabbar>
        <!-- 模态框 -->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="popup">
            <!-- 认权     子菜单浮标 -->
            <template v-if="icon.rightIcon">
                <div class="right-icon">
                    <!-- 认权 -->
                    <div class="right-Crowdfunding">
                        <img src="../assets/img/众筹1.png" alt="">
                        <p>众筹</p>
                    </div>
                    <div class="right-EMT">
                        <img src="../assets/img/EMT.png" alt="">
                        <p>EMT</p>
                    </div> 
                </div>
            </template>
            <!-- 众筹     子菜单浮标 -->
            <template v-if="icon.crowdIcon">
                <div class="crowd-icon">
                    <!-- 众筹 -->
                    <div class="crowd-Crowdfunding">
                        <img src="../assets/img/众筹1.png" alt="">
                        <p>众筹</p>
                    </div>
                    <div class="crowd-EMT">
                        <img src="../assets/img/EMT.png" alt="">
                        <p>EMT</p>
                    </div> 
                </div>
            </template>
            <!-- 资讯     子菜单浮标 -->
            <template v-if="icon.infoIcon">
                <div class="info-icon">
                    <!-- 众筹 -->
                    <div class="info-Crowdfunding">
                        <img src="../assets/img/众筹1.png" alt="">
                        <p>众筹</p>
                    </div>
                    <div class="info-EMT">
                        <img src="../assets/img/EMT.png" alt="">
                        <p>EMT</p>
                    </div> 
                </div>
            </template>
            <!-- 个人     子菜单浮标 -->
            <template v-else-if="icon.personIcon">
                <div class="person-icon">
                    <!-- 众筹 -->
                    <div class="person-Crowdfunding">
                        <img src="../assets/img/众筹1.png" alt="">
                        <p>众筹</p>
                    </div>
                    <div class="person-EMT">
                        <img src="../assets/img/EMT.png" alt="">
                        <p>EMT</p>
                    </div> 
                </div>
            </template>
        </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'rightToRecognize',
  data () {
    return {
        barBottom:"",//底部导航选中的选项
        popupVisible:false,//模态框显示
        icon:{
            "rightIcon":false,//显示认权
            "crowdIcon":false,//显示众筹
            "infoIcon":false,//显示资讯子菜单图标
            "personIcon":false,//显示个人资讯下的子菜单图标
        }
    }
  },
  methods:{
        //显示模态框
        showPopup(){
            let _this = this;
            _this.popupVisible = true;
            if(_this.barBottom == "rightToRecognize"){//选择认权
                _this.choosePart("rightIcon");
            }
            else if(_this.barBottom == "crowdfunding"){//选择众筹
                _this.choosePart("crowdIcon");
            }
            else if(_this.barBottom == "information"){//选择资讯
                _this.choosePart("infoIcon");
            }
            else if(_this.barBottom == "personalcenter"){//选择个人
                _this.choosePart("personIcon");
            }
        },
        //选择模态框哪个部分下的子图标
        choosePart(target){
            let _this = this;
            Object.keys(_this.icon).forEach(item=>{
                if(item==target){
                    _this.icon[target] = true;
                }else{
                    _this.icon[item] = false;
                }
            });
        },
  }
}
</script>
<style scoped>
/* 底部导航条样式 */
.barBottom>>>.mint-tabbar,.mint-tabbar > .mint-tab-item.is-selected{
    background-color: #00A4EA;
    color: white;
}
/* 设置每个tab */
.barBottom>>>.mint-tab-item-label{
    padding-top: 28px;
}
/* 设置背景图icon */
/* 认权 */
.barBottom>>>.rightToRecognize{
    background: url("../assets/img/认权1.png") 33px 5px no-repeat;
    background-size: 1.25rem;
}
/* 选中认权 */
.barBottom>>>.rightToRecognize.is-selected{
    background: url("../assets/img/认权2.png") 33px 5px no-repeat;
    background-size: 1.25rem;
}
/* 众筹 */
.barBottom>>>.crowdfunding{
    background: url("../assets/img/众筹1.png") 33px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 选中众筹 */
.barBottom>>>.crowdfunding.is-selected{
    background: url("../assets/img/众筹2.png") 33px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 资讯 */
.barBottom>>>.information{
    background: url("../assets/img/资讯1.png") 33px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 选中资讯 */
.barBottom>>>.information.is-selected{
    background: url("../assets/img/资讯2.png") 33px 7px no-repeat;
    background-size: 1.4375rem;
}
/* 个人 */
.barBottom>>>.personalcenter{
    background: url("../assets/img/个人1.png") 33px 7px no-repeat;
    background-size: 1.25rem;
}
/* 选中个人 */
.barBottom>>>.personalcenter.is-selected{
    background: url("../assets/img/个人2.png") 33px 7px no-repeat;
    background-size: 1.25rem;
}
/* 模态框整体样式 */
.barBottom>>>.popup{
    background-color: transparent;
    color: white;
    font-size: .875rem;
}
/* 模态框子菜单小图标图片的大小 */
.barBottom>>>.popup img{
    width: 1.875rem;
    height:1.875rem; 
}
/* 模态框图标下文字的样式 */
.barBottom>>>.popup p{
    margin: .5rem 0;
}
/* 模态框认权下图标的定位 */
.barBottom>>>.right-icon{
    position: absolute;
    top: 9.1875rem;
    right: 8.125rem;
}
/* 模态框众筹下图标的定位 */
.barBottom>>>.crowd-icon{
    position: absolute;
    top: 9.1875rem;
    right: 2.125rem;
}
/* 模态框资讯下图标的定位 */
.barBottom>>>.info-icon{
    position: absolute;
    top: 9.1875rem;
    left: 1.875rem;
}
/* 模态框资讯下图标的定位 */
.barBottom>>>.person-icon{
    position: absolute;
    top: 9.1875rem;
    left: 7.6875rem;
}
</style>
