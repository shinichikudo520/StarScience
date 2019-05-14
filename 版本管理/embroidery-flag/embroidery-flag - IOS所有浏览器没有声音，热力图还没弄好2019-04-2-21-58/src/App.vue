<template>
  <div id="app">
    <router-view/>
    <div :class="{'music':true,'dis':isDis}" >
        <!-- <bg-music></bg-music> -->
    </div>
  </div>
</template>

<script>
import bgMusic from './components/bgMusic.vue'
// import soundBuffer from '../static/js/soundBuffer.js';
// console.log(soundBuffer);
export default {
  name: 'App',
  data(){
      return{
        isDis:true,//隐藏music组件
        // soundBuf:{},//存储音乐
      }
  },
  mounted(){
      let _this = this;
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
            var context = new window.AudioContext();;
            var source = null;
            var audioBuffer = null;
            function stopSound() {
                if (source) {
                source.stop(0); //立即停止
                }
            }
            function playSound() {
                source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;
                source.connect(context.destination);
                source.start(0); //立即播放
            }
            function initSound(arrayBuffer) {
                context.decodeAudioData(arrayBuffer, function (buffer) { //解码成功时的回调函数
                audioBuffer = buffer;
                playSound();
                }, function (e) { //解码出错时的回调函数
                console.log('Error decoding file', e);
                });
            }
            function loadAudioFile(url) {
                var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function (e) { //下载完成
                initSound(this.response);
                };
                xhr.send();
            }
            loadAudioFile('../static/music/彭丽媛 - 绣红旗.mp3');
            $("#stop").click(function () {
            stopSound();
            });
        } catch (e) {
            console.log('!Your browser does not support AudioContext');
        }
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
    overflow: hidden;
}
/* 背景音乐 */
#app .music{
    position: absolute;
    bottom: 5%;
    left: 5%;
    z-index: -10000;
}
#app .dis{
    opacity: 0;
}
</style>
