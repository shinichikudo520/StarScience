<template>
  <div class="statistics">
    <div class="main">
        <!-- <div >
            <img src="../assets/img/up.svg" alt="" class="up" @click="prePage">
        </div> -->
        <!-- 顶部 红旗 统计数值 -->
      <div class="top">
           <div class="redFlag">
                <img src="../assets/img/redFlag.png" alt="">
            </div>
            <div class="statisticsValue">
                目前累计
                <span>0</span><span>0</span><span>0</span><span>0</span><span>0</span><span>0</span><span>0</span><span>0</span><span>0</span><span>0</span>
                针
            </div>
      </div>
      <!-- 中部 热力图 -->
      <div class="middle">
          <div class="thermodynamicChart" id="container" ></div>
            <!-- <img src="../assets/img/map.png" alt="" srcset=""> -->
          <p>绣红旗热力图</p>
      </div>
      <!-- 底部音乐和文字 -->
      <div class="bottom">
        <div class="left">
            <img src="../assets/img/pengliyuan.jpg" alt=""  @click="playMusic">
            <img :src="playOrPause" alt="" class="playOrPause" @click="playMusic">
            <div class="progressDiv">
                    <div class="progress" style="height: 3px;">
                        <div class="progress-bar" role="progressbar" :style="{'width': $store.state.timeProgress+'%'}" :aria-valuenow="$store.state.timeProgress" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class='MusicText'>《绣红旗》 演唱者：彭丽媛</div>
            </div>
            <div class="singTime">
                {{$store.state.realMusicTime}}/{{musicTime}}
            </div>
        </div>
        <!-- <div class="right">
            <ul style="list-style:none;">
                <li></li>
            </ul>
        </div> -->
      </div>
      <!-- <div >
            <img src="../assets/img/down.svg" alt="" class="down" @click="nextPage">
        </div> -->
    </div>
  </div>
</template>
<script> 

export default {
  name: 'statistics',
  data () {
    return {
        playOrPause:require('../assets/img/pause.svg'),//背景音乐是播放还是暂停
        playState:true,//背景音乐播放状态
        musicTime:'00:00',//音乐总时长
        map:"",//地图的实例
    }
  },
  methods:{
    // //添加touch监听 让向下的箭头出现
    // movePage(){
    //     let _this = this;
    //     //向上箭头
    //     let p_demo_up = document.getElementsByClassName('top')[0];
    //     p_demo_up.addEventListener("touchstart", function (e){        /*触摸开始*/
    //             console.log("触摸开始")
    //             // console.log(e)
    //             let upDisplay = document.getElementsByClassName('up')[0].style.display ;
    //             console.log(upDisplay);
    //             if(upDisplay == '' || upDisplay == 'none'){
    //                 document.getElementsByClassName('up')[0].style.cssText = 'display:inline-block;';
    //             }
    //             // else{
    //             //     document.getElementsByClassName('down')[0].style.cssText = 'display:none;';
    //             // }
    //     })

    //     //向下箭头
    //     let p_demo = document.getElementsByClassName('middle')[0];
    //     p_demo.addEventListener("touchstart", function (e){        /*触摸开始*/
    //             console.log("触摸开始")
    //             // console.log(e)
    //             let downDisplay = document.getElementsByClassName('down')[0].style.display ;
    //             console.log(downDisplay);
    //             if(downDisplay == '' || downDisplay == 'none'){
    //                 document.getElementsByClassName('down')[0].style.cssText = 'display:inline-block;';
    //             }
    //             // else{
    //             //     document.getElementsByClassName('down')[0].style.cssText = 'display:none;';
    //             // }
    //     })
    // },
    // //进入上一页
    // prePage(e){
    //     let _this = this;
        
	// 	// e.stopPropagation();
    //     _this.$router.push({//跳转到热力图页
    //         'path':'/'
    //     });
    // },
    // //进入下一页
    // nextPage(e){
    //     let _this = this;
        
	// 	// e.stopPropagation();
    //     _this.$router.push({//跳转到热力图页
    //         'path':'/enterprise'
    //     });
    // },
    // 监听音乐播放状态：改变播放或暂停按钮
    watchMusicState(){
        let _this = this;
        let $audio = document.getElementsByTagName('audio')[0];
        let playOrPause = document.getElementsByClassName('playOrPause')[0];
        // console.log($audio);
        $audio.addEventListener("playing", function(){		//播放状态
                playOrPause.src = require('../assets/img/pause.svg')//背景音乐是播放还是暂停
                _this.playState = true;//播放状态
        });$audio.addEventListener("pause", function(){
                playOrPause.src = require('../assets/img/play.svg')//背景音乐是播放还是暂停
                _this.playState = false;//暂停状态

        });
    },
    //点击播放/暂停音乐
    playMusic(){
        let _this = this;
        let $audio = document.getElementsByTagName('audio')[0];
        if(_this.playState){//播放状态
            $audio.pause();//暂停播放

        }else{
            $audio.play();//因为source标签不能直接更改路径，所以整个audio标签必须重新加载一次
        }
        _this.playState = !_this.playState;//改变播放状态
    },
    //创造热力图
    creatThermodynamicChart(){
        let _this = this;
        var dataMap =[  
            {name: '北京',value: 500 },{name: '天津',value: 400 },  
            {name: '上海',value: 500 },{name: '重庆',value: 350 },  
            {name: '河北',value: 100 },{name: '河南',value: 200 },  
            {name: '云南',value: 180 },{name: '辽宁',value: 100 },  
            {name: '黑龙江',value: 100 },{name: '湖南',value: 300 },  
            {name: '安徽',value: 330 },{name: '山东',value: 200 },  
            {name: '新疆',value: 10 },{name: '江苏',value: 340 },  
            {name: '浙江',value: 400 },{name: '江西',value: 360 },  
            {name: '湖北',value: 300 },{name: '广西',value: 400 },  
            {name: '甘肃',value: 100 },{name: '山西',value: 100 },  
            {name: '内蒙古',value: 100 },{name: '陕西',value: 100 },  
            {name: '吉林',value: 100 },{name: '福建',value: 350 },  
            {name: '贵州',value: 100 },{name: '广东',value: 500 },  
            {name: '青海',value: 100 },{name: '西藏',value: 100 },  
            {name: '四川',value: 300 },{name: '宁夏',value: 100 },  
            {name: '海南',value: 100 },{name: '台湾',value: 100 },  
            {name: '香港',value: 300 },{name: '澳门',value: 200 },
            {name: '南海诸岛',value: 100 }
        ];
        // 需要在页面上直接标记出来的城市
        
        var specialMap = [];
        // 对dataMap进行处理，使其可以直接在页面上展示
        for (var i = 0; i < specialMap.length; i++) {
            for (var j = 0; j < dataMap.length; j++) {
                if (specialMap[i] == dataMap[j].name) {
                    dataMap[j].selected = true;
                    break;
                }
    
            }
        }
        
        var option = {
            tooltip: {
                formatter: function (params) {
                    var info = '<p style="font-size:18px">' + params.name + '</p>'
                    // var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>'
                    return info;
                },
                backgroundColor: "#ff7f50",//提示标签背景颜色
                textStyle: { color: "#fff" } //提示标签字体颜色
            },
            //左侧小导航图标
            visualMap: {  
                show : true,  
                x: 'left',  
                // y: 'center',
                bottom:"0%",                              //组件离容器下侧的距离,'20%'
                itemWidth:5,                           //图形的宽度，即长条的宽度。
                itemHeight:5,                         //图形的高度，即长条的高度。            
                textGap:5,                              //两端文字主体之间的距离，单位为px
                textStyle:{                             //文本样式
                                fontSize: 10,
                        },              
                itemGap:4,                          //每两个图元之间的间隔距离，单位为px        
                splitList: [   
                    {start: 500, end:600},{start: 400, end: 500},  
                    {start: 300, end: 400},{start: 200, end: 300},  
                    {start: 100, end: 200},{start: 0, end: 100},  
                ],  
                color: ['#663366', '#990033', '#ff0033','#99cccc', '#cccc00', '#ffcc99']  
            }, 
            series: [
                {
                    name: '中国',
                    type: 'map',
                    zoom: 1.2,   //这里是关键，一定要放在 series中
                    mapType: 'china',
                    
                    label: {
                        normal: {
                            show: false,//显示省份标签
                            textStyle: {
                                fontSize: 10,
                                color: '#6c6a6a'
                            }
                        },
                        // emphasis: {
                        //     show: true,//对应的鼠标悬浮效果
                        // }
                    },
        
                    data: dataMap
                }
            ]
        };
        //初始化echarts实例
        var myChart = echarts.init(document.getElementById('container'));
        //使用制定的配置项和数据显示图表
        myChart.setOption(option);
    }

  },
  mounted(){
      let _this = this;
        console.log('进入数据统计页');
      let musicDom = document.getElementsByClassName('music')[0];
      console.log(musicDom);
    //   musicDom.classList.remove("dis");//移除隐藏控件的类名，显示音乐控件

    //   _this.movePage();//添加页面滑动监听跳转页面
      _this.watchMusicState();//监听音乐播放状态
      _this.musicTime = _this.$store.state.musicTime;//获取音乐总时长


        _this.creatThermodynamicChart();//创建热力图
  },
  
}
</script>

<style scoped>
    /* 主体样式 */
    .statistics{
        /* width: 100vw; */
        height: 100vh;
        background-color: #FFF100;
        padding: 1rem 0;
        text-align: center;
        color: #4C4800;

    }
    /* 红旗 */
    .statistics>>>.redFlag{

    }
    .statistics>>>.redFlag img{
        width: 90%;
        height: 30vh;
    }
    /* 统计值 */
    .statistics>>>.statisticsValue{
        padding: 4% 0;
        border-bottom:1px solid #FF7100;
        margin: 0 1.25rem; 
        line-height: 1.875rem;
        
    }
    /* 统计数值 */
    .statistics>>>.statisticsValue span{
        font-size: 1.5rem;
        color: #E00000;
        border: 1px solid #333000;
        padding: .1875rem;
    }
    /* 热力图 */
    .statistics>>>.thermodynamicChart{
        width: 90%;
        height: 30vh;
        background-color: white;
        margin: 0 auto;
        margin-top: 2%;
    }
    /* 隐藏百度地图的logo */
    /* .statistics>>>.anchorBL{
        display:none;
    } 
     */
    /* 热力图文字 */
    .statistics>>>.middle p{
        margin:.625rem 1.25rem;
        border-bottom:1px solid #FF7100;
    }
    /* 背景音乐 */
    .music{
        opacity: 1 !important;
    }
    /* 处理音乐控件 */
    .statistics>>>.bottom .left{
        display: flex;
        margin-left:6%; 
        margin-top: 8%;
        position: relative;
    }
    /* 彭丽媛图片 */
    .statistics>>>.bottom .left img{
        width: 5rem;
        height: 5rem;  
        border-radius: 2.5rem        
    }
    /* 暂停或播放按钮 */
    .statistics>>>.playOrPause{
        width: 2.5rem !important;
        height: 2.5rem  !important;
        position: absolute;
        left: 1.375rem;
        top:1.375rem;
    }
    /* 进度条 */
    /* 进度条整体div */
    .statistics>>>.progressDiv{
        /* line-height: 5rem; */
    }
    .statistics>>>.progress{
        margin-top: 13%;
        margin-left: 10%;
        background-color:transparent;
        border: .025rem solid #FF0000;
    }
    .statistics>>>.progress-bar{
        background-color:#FF0000;
    }
    /* 进度条下的文字 */
    .statistics>>>.progressDiv .MusicText{
        line-height: 3.75rem;
        margin-left: .6875rem;
        color: #FF0000;
        font-size: .6875rem

    }
    /* 进度条时间 */
    .statistics>>>.singTime{
        font-size: .875rem;
        color: #FF0000;
        margin-top: 4%;
        margin-left: 3%;
    }
    /* 向上箭头 */
    /* .statistics>>>.up{
        width: 3.125rem;
        height: 3.125rem;
        position: absolute;
        top: 1%;
        left: 45%;
        display: none;
    } */
    /* 向下箭头 */
    /* .statistics>>>.down{
        width: 3.125rem;
        height: 3.125rem;
        position: absolute;
        bottom: 1%;
        left: 45%;
        display: none;
    } */
</style>
