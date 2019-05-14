<template>
  <div class="index">
      <div class="creatEthWallet">
          <el-input v-model="num" placeholder="请输入数量" class="getEthWalletNum"></el-input>
          <el-button type="primary" @click="getEthAdress">批量生成</el-button>
      </div>
      <div>
          <el-table :data="walletList" style="width: 100%">
                <el-table-column
                    prop="normAddress"
                    label="钱包地址"
                    width="440">
                </el-table-column>
                <el-table-column
                    prop="publicKey"
                    label="公钥"
                    width="440">
                </el-table-column>
                <el-table-column
                    prop="privateKey"
                    label="私钥">
                </el-table-column>
            </el-table>
      </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
        num:"",//指定钱包的个数
        secp256k1:"",
        createKeccakHash:"",
        crypto:"",
        walletList:[],//生成的钱包地址列表
    }
  },
  methods:{
      toChecksumAddress(address){
          let _this = this;
            address = address.toLowerCase().replace('0x', '');
            var hash = _this.createKeccakHash('keccak256').update(address).digest('hex'); 
            var ret = '0x'; 
            for (var i = 0; i < address.length; i++) {   
                if (parseInt(hash[i], 16) >= 8) {     
                    ret += address[i].toUpperCase();   
                } else {     
                    ret += address[i];   
                } 
            } 
            return ret;
        },
        getEthAdress(){
            let _this = this;
            for (var i = 0; i < _this.num; i++) {
                let obj = {
                    privateKey:"",//私钥
                    publicKey:"",//公钥
                    normAddress:"",//钱包地址
                }
                // 生成私钥
                obj.privateKey = _this.crypto.randomBytes(32);
                // 生成公钥
                obj.publicKey = _this.secp256k1.publicKeyCreate(obj.privateKey, false).slice(1);
                //公钥、私钥转为字符串
                obj.privateKey = obj.privateKey.toString('hex');
                obj.publicKey = obj.publicKey.toString('hex');
                // 生成地址
                const address = _this.createKeccakHash("keccak256").update(obj.publicKey).digest().slice(-20);
                obj.normAddress = _this.toChecksumAddress(address.toString('hex'));

                // 查看结果
                // console.log('obj.privateKey',obj.privateKey.toString('hex'));
                // console.log(normAddress);

                _this.walletList.push(obj);
                // console.log("_this.walletList",_this.walletList);
            }
        }
  },
  mounted(){
      let _this = this;
      'use strict';
        // console.log('Generator Start..............');
        _this.secp256k1 = require("secp256k1/elliptic");
        _this.createKeccakHash = require("keccak");
        _this.crypto = require('crypto');
    }
}
</script>
<style scoped>
.getEthWalletNum{
    width: 12.5rem;
    float: left;
}
button{
    float: left;
    margin-left: 1.25rem;
}
</style>
