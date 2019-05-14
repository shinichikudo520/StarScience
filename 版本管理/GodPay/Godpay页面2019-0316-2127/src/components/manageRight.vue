<template>
  <div class="manageRight">
      <!-- 已有产品 -->
      <div class="havedProduct">
            <div class="havedProductItem" v-for="(item,index) in product" :key="index">
                <img :src="item.productImg" @click="updateImg(index)" alt="" class="productImg">
                <div class="productInfo">
                    <p><el-input v-model="item.productName" :disabled="item.readOnly" placeholder="请输入内容" class="product"></el-input> <span>- <el-input class="productType product" :disabled="item.readOnly"  v-model="item.productLevel" placeholder="请输入内容"></el-input></span></p>
                    <p>EMT：<el-input v-model="item.productNum"  :disabled="item.readOnly" placeholder="请输入内容" class="product productNum"></el-input></p>
                </div>
                <div class="operateBtn">
                    <el-button type="primary" @click="compileProduct(index)">{{item.redact}}</el-button>
                        <el-button type="danger">删除</el-button>
                </div>
            </div>
      </div>
      <!-- 添加产品 -->
      <div class="appendProduct" v-if="isAppendProduct">
        <div class="appendProductItem">
            <img :src="modifyImg" alt="" class="productImg" @click="updateImg('append')">
            <div class="productInfo">
                <p><el-input v-model="product[0].productName" :disabled="false" placeholder="请输入内容" class="product"></el-input> <span >- <el-input class="productType product" :disabled="false" v-model="product[0].productLevel" placeholder="请输入内容"></el-input></span></p>
                <p>EMT：<el-input v-model="product[0].productNum" :disabled="false" placeholder="请输入内容" class="product productNum"></el-input></p>
            </div>
            <div class="operateBtn">
                <el-button type="primary" @click="sureAppend">添加</el-button>
                    <el-button type="danger" @click="sureAppend">保存</el-button>
            </div>
        </div>
      </div>
      <!-- 添加按钮 -->
      <div class="appendBtn" v-if="!isAppendProduct">
          <el-button type="primary" @click="appendProduct">添加</el-button>
      </div>
      <div class="fileInput">
          <input type="file" style="display:none;" id="file" @change="ImgChange"/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'manageRight',
  data () {
    return {
        product:[
            {
                productImg:require('../assets/img/product1.jpg'),//产品图片
                productName:'LOUPEDECK',//产品名称
                productLevel:'v1',//产品等级
                productNum:2000.00,//产品数量
                readOnly:true,//只读属性
                redact:"编辑",//
            },
            {
                productImg:require('../assets/img/product2.jpg'),//产品图片
                productName:'小泽玛丽花',//产品名称
                productLevel:'v2',//产品等级
                productNum:4000.00,//产品数量
                readOnly:true,//只读属性
                redact:"编辑",//
            },
            {
                productImg:require('../assets/img/product3.jpg'),//产品图片
                productName:"St Jerome's Laneway Festival",//产品名称
                productLevel:'v3',//产品等级
                productNum:8000.00,//产品数量
                readOnly:true,//只读属性
                redact:"编辑",//
            },
        ],//产品
        isAppendProduct:false,//是否显示添加产品的模板
        imgFile:"",//上传的图片文件
        imgUrl:"",//上传的图片本地预览路径
        preImg:"",//改变内容之前的上次内容
        modifyImg:require('../assets/img/tempImg.jpg'),//添加图片
        needModifyImg:"",//需要修改的图片
    }
  },
  mounted(){
      let _this = this;
  },
  methods:{
      //添加产品
      appendProduct(){
          let _this = this;
          _this.isAppendProduct = true;//添加产品
      },
      //确认添加
      sureAppend(){
          let _this = this;
          _this.isAppendProduct = false;//确认添加后让添加模板消失

        //传图片需要formData数据形式
        //确认添加后让添加模板中的图片恢复初始值
        _this.modifyImg = require('../assets/img/tempImg.jpg');
        _this.imgFile = "";//每次点击保存都要清空上一次的上传的图片文件
        _this.imgUrl = "";//每次点击保存都要清空上一次的上传的图片路径


        //发送请求：
        //传图片需要formData数据形式以及输入的数量只能为数字
      },
      //编辑产品
      compileProduct(index){
          let _this = this;
          let product = _this.product[index];
          if(product.redact == '编辑'){//编辑图片
            //console.log('编辑图片');
            _this.preImg = product.productImg;
            // //console.log(_this.preimg,'图片路径');
            product.productImg = require('../assets/img/tempImg.jpg');
            product.redact = product.redact == '编辑'?'保存':'编辑';//修改编辑按钮内容
            product.readOnly = false;//是否只读
            return
          }else{//保存图片
            if(_this.imgUrl != ''){//修改了产品信息图片
                //console.log('保存图片，有上传图片');
                product.productImg = _this.imgUrl;
            }else{//没有修改产品信息图片
                //console.log(_this.imgUrl);
                //console.log('保存图片，没有上传图片');
                product.productImg  = _this.preImg;
            }

            product.redact = product.redact == '编辑'?'保存':'编辑';//修改编辑按钮内容
            product.readOnly = true;//是否只读
            _this.preImg = "";//每次点击保存都要清空上一次的编辑保存
            _this.imgFile = "";//每次点击保存都要清空上一次的上传的图片文件
            _this.imgUrl = "";//每次点击保存都要清空上一次的上传的图片路径
            //console.log('保存为图片后',_this.imgUrl);

             //发送请求：
            //传图片需要formData数据形式以及输入的数量只能为数字
          }
          
      },
      //上传图片
      updateImg(type){
        let _this = this;
        if(type != 'append'){
            //console.log('编辑图片');
            if(_this.product[type].productImg != require('../assets/img/tempImg.jpg')){//不是上传图片状态
                //console.log('不是上传图片状态');
                return
            }else{
                //console.log('修改图片');
            }
        }else{
            //console.log('添加图片');
            //  _this.needModifyImg = type;//需要修改的图片
        }
        _this.needModifyImg = type;//需要修改的图片
        document.getElementById('file').click();//调用文件传输输入框
      },
      //上传了图片
      ImgChange(e){
          let _this = this;
            // //console.log(e);
          _this.imgFile = e.target.files[0];//获取上传的图片文件
          if(_this.imgFile){
              _this.imgUrl = window.URL.createObjectURL(_this.imgFile);//获取上传的图片本地预览路径
          }
          if(_this.needModifyImg == 'append'){//添加产品的图片预览
            _this.modifyImg = _this.imgUrl
          }else{
              _this.product[_this.needModifyImg].productImg = _this.imgUrl;
          }
          //console.log(_this.needModifyImg);
          //预加载本地图片后需要将保存 需要修改的图片 初始化
          _this.needModifyImg = '';
      },
      //转化为formdata
      toFormData(obj){
          let _this = this;
          let fd = new FormData();
          Object.keys(obj).forEach(item=>{
              fd.append(item,obj[item])
          });
          return fd;
      }

  },
  components:{

  }
}
</script>
<style scoped>
/* 整体样式 */
.manageRight{
    width: 100%;
    height: 92%;
    overflow-y: auto;
}
/* 已有产品、添加产品模板整体 */
.havedProductItem,.appendProductItem{
    display: flex;
    padding: .625rem 1.875rem;
    width: 80%;
    height: 20vh;
    margin: 0 auto;
    align-items: center;
    border-bottom: .0625rem solid rgba(230, 228, 228, 1);
    margin-bottom: 1.25rem
}
/* 产品图片 */
.havedProductItem img,.appendProductItem img{   
    width: 6.25rem;
    height: 6.25rem;
    border-radius: .625rem;
    margin-right: 1.25rem;
}
/* 产品模板下的输入框 */
.havedProductItem .el-input,.appendProductItem .el-input{   
    width: 40%;
    display: inline-block;
    
}
.manageRight>>>.havedProductItem .el-input__inner,.appendProductItem .el-input__inner{   
    border: none !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 产品名称 */
.manageRight>>>.product input{
    -web-kit-appearance:none;
    -moz-appearance: none;
    font-size: 1.125rem;
    font-weight:bold;
    color: rgba(141, 141, 141, 1);
    outline:0;
    background-color: #f5f7fa;
}
/* 产品类型 */
.manageRight>>>.productType input{
    color: rgba(68, 126, 217, 1);
    font-weight: 400;
    font-size: .875rem;
}
/* 产品数量 */
.manageRight>>>.productNum input{
    font-weight: 400;
}
/* 添加按钮 */
.manageRight>>>.appendBtn{
    width: 80%;
    margin: 0 auto;
    text-align: center;
}
.manageRight>>>.appendBtn button{
    padding: .9375rem 5rem;
    margin-bottom: 1.25rem;
    margin-top: 1.25rem;
}
</style>
