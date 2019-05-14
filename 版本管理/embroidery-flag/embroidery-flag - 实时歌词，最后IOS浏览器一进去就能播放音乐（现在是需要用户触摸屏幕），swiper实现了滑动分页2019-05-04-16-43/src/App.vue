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
  methods:{
        audioAutoPlay() {
            var audio = document.getElementById('audio');
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        },
        autoPlayMusic() { 
            let _this = this;
            /* 自动播放音乐效果，解决浏览器或者APP自动播放问题 */   
            function musicInBrowserHandler() {   
                _this.musicPlay(true);   
                document.body.removeEventListener('touchstart', musicInBrowserHandler);   
            }   
            document.body.addEventListener('touchstart', musicInBrowserHandler);   
            /* 自动播放音乐效果，解决微信自动播放问题 */   
            function musicInWeixinHandler() {   
                _this.musicPlay(true);   
                document.addEventListener("WeixinJSBridgeReady", function () {   
                    _this.musicPlay(true);   
                }, false);   
                document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);   
            }   
            document.addEventListener('DOMContentLoaded', musicInWeixinHandler);   
        },
        musicPlay(isPlay) {   
            var media = document.getElementById('audio');   
            if (isPlay && media.paused) {   
                media.play();   
            }   
            if (!isPlay && !media.paused) {   
                media.pause();   
            }   
        }  
  },
  mounted(){
      let _this = this;
      _this.autoPlayMusic();
      _this.audioAutoPlay();
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
    z-index: -10000;
}
#app .dis{
    opacity: 0;
}
</style>
