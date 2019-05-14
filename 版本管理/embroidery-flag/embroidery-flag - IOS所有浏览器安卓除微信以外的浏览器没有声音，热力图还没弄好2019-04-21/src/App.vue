<template>
  <div id="app">
    <router-view/>
    <div :class="{'music':true,'dis':isDis}" >
        <bg-music></bg-music>
    </div>
  </div>
</template>

<script>
import bgMusic from './components/bgMusic.vue'
export default {
  name: 'App',
  data(){
      return{
        isDis:true,//隐藏music组件
      }
  },
  mounted(){
      let _this = this;
  },
  components:{
      bgMusic,

  }
}
</script>

<style>
#app{
    overflow-x: hidden;
    overflow-y: hidden;
}
/* 背景音乐 */
#app .music{
    position: absolute;
    bottom: 7%;
    left: 5%;
}
#app .dis{
    opacity: 0;
}
</style>
