<template>
  <div class="statistics">
    <div class="main">
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
          <div class="thermodynamicChart" id="container"></div>
          <p>绣红旗热力图</p>
      </div>
      <!-- 底部音乐和文字 -->
      <div class="bottom">
        <div class="left" @click="playMusic">
            <img src="../assets/img/pengliyuan.jpg" alt="">
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
    </div>
  </div>
</template>
<script> 
export default {
  name: 'statistics',
  data () {
    return {
        p_demo:'',//获取页面body节点
        start:"",//触摸开始的坐标点
        move:"",//触摸移动实时的坐标点
        num:"",//触摸结束的坐标点
        playOrPause:require('../assets/img/pause.svg'),//背景音乐是播放还是暂停
        playState:true,//背景音乐播放状态
        musicTime:'00:00',//音乐总时长
        map:"",//地图的实例
    }
  },
  methods:{
    //   滑动页面
    movePage(){
        let _this = this;
        let p_demo = document.getElementsByClassName('statistics')[0];
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
                if(_this.num>100){
                    console.log('企业信息','>100');
                    _this.$router.push({//跳转到下一页
                        'path':'/enterprise'
                    });
                }
                else if(_this.num< -100){//往上
                    console.log('上一页','<-100');
                    _this.$router.push({//跳转到首页
                        'path':'/'
                    });

                }

        })
    },
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
        if(_this.playState){//播放状态
            _this.$refs.warningMusic.pause();//暂停播放

        }else{
            _this.$refs.warningMusic.load();//因为source标签不能直接更改路径，所以整个audio标签必须重新加载一次
        }
        _this.playState = !_this.playState;//改变播放状态
    },
    //创建热力图
    createThermodynamicChart(){
        let _this = this;
        console.log('百度热力图对象',window.BMap);
 
        var point = new window.BMap.Point(102.045477629,35.0815689782);//陕西汉中坐标，中国中心城市
        _this.map.centerAndZoom(point, 4);             // 初始化地图，设置中心点坐标和地图级别
        _this.map.enableScrollWheelZoom(); // 允许滚轮缩放
        _this.map.disableDragging();//禁止拖动
        _this.map.disableDoubleClickZoom();//禁止双击缩放
        
        //设置样式
        _this.map.setMapStyle({
            styleJson: [
                {//不显示点信息
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": {
                        "color": "#ffffff",
                        "visibility": "off"
                    }
                }
            ]
        });
        
        var points =[//热力图数据
    
        {"lng":"121.487899486","lat":"31.24916171","count":"100"},//lng经度，lat维度,计数
        {"lng":"114.295894","lat":"36.231772","count":"7"},
        {"lng":"116.395645038","lat":"39.9299857781","count":"100"},
        {"lng":"114.395983","lat":"36.201385","count":"19"},
        {"lng":"114.718751","lat":"36.091966","count":"2"},
        {"lng":"114.48261","lat":"36.146032","count":"4"},
        {"lng":"114.037656","lat":"36.276956","count":"1"},
        {"lng":"114.425989","lat":"36.157907","count":"5"},
        {"lng":"114.309662","lat":"36.19489","count":"8"},
        {"lng":"114.008762","lat":"36.162515","count":"11"},
        {"lng":"114.149597","lat":"36.25203","count":"11"},
        {"lng":"114.634489","lat":"36.09711","count":"3"},
        {"lng":"114.035667","lat":"36.042826","count":"5"},
        {"lng":"114.220135","lat":"36.116061","count":"38"},
        {"lng":"114.137829","lat":"36.054525","count":"7"},
        {"lng":"114.137348","lat":"36.136101","count":"55"},
        {"lng":"114.078537","lat":"36.235848","count":"28"},
        {"lng":"114.648979","lat":"36.043749","count":"1"},
        {"lng":"114.104776","lat":"36.124067","count":"12"},
        {"lng":"114.578275","lat":"36.095941","count":"3"},
        {"lng":"114.578275","lat":"36.095941","count":"22"},
        {"lng":"114.578275","lat":"36.095941","count":"4"},
        {"lng":"113.913152","lat":"36.000907","count":"5"},
        {"lng":"113.831853","lat":"35.836377","count":"4"},
        {"lng":"113.825641","lat":"36.072186","count":"16"},
        {"lng":"113.931695","lat":"36.262638","count":"9"},
        {"lng":"113.965077","lat":"35.919748","count":"6"},
        {"lng":"113.830067","lat":"35.932444","count":"1"},
        {"lng":"113.830067","lat":"35.932444","count":"7"},
        {"lng":"113.750022","lat":"35.976316","count":"10"},
        {"lng":"113.934346","lat":"36.166723","count":"6"},
        {"lng":"113.928979","lat":"36.059528","count":"14"},
        {"lng":"113.898287","lat":"35.777936","count":"6"},
        {"lng":"113.867283","lat":"36.134905","count":"29"},
        {"lng":"113.81997","lat":"36.280506","count":"6"},
        {"lng":"113.936795","lat":"35.768474","count":"3"},
        {"lng":"113.818245","lat":"36.183143","count":"107"},
        {"lng":"113.762547","lat":"35.916163","count":"12"},
        {"lng":"113.762547","lat":"35.916163","count":"17"},
        {"lng":"114.309528","lat":"36.098035","count":"12"},
        {"lng":"114.184941","lat":"36.066066","count":"10"},
        {"lng":"114.265651","lat":"36.016851","count":"10"},
        {"lng":"114.794527","lat":"35.889239","count":"4"},
        {"lng":"114.916588","lat":"35.953233","count":"33"},
        {"lng":"114.862802","lat":"36.082315","count":"5"},
        {"lng":"114.821994","lat":"35.940167","count":"7"},
        {"lng":"114.732801","lat":"36.010095","count":"1"},
        {"lng":"114.665014","lat":"35.827956","count":"5"},
        {"lng":"114.687001","lat":"35.926633","count":"4"},
        {"lng":"114.886604","lat":"35.823869","count":"17"},
        {"lng":"114.714493","lat":"35.824384","count":"9"},
        {"lng":"114.838951","lat":"35.714762","count":"8"},
        {"lng":"114.768614","lat":"35.820543","count":"3"},
        {"lng":"114.945903","lat":"36.001222","count":"10"},
        {"lng":"114.814282","lat":"36.05379","count":"1"},
        {"lng":"114.89458","lat":"36.128534","count":"2"},
        {"lng":"114.768884","lat":"36.09376","count":"3"},
        {"lng":"114.891728","lat":"35.996425","count":"9"},
        {"lng":"114.899498","lat":"35.683682","count":"2"},
        {"lng":"114.436397","lat":"35.942211","count":"13"},
        {"lng":"114.537118","lat":"35.959195","count":"5"},
        {"lng":"114.374189","lat":"35.92115","count":"21"},
        {"lng":"114.435536","lat":"35.884432","count":"1"},
        {"lng":"114.434839","lat":"35.885617","count":"23"},
        {"lng":"114.468909","lat":"35.952258","count":"17"},
        {"lng":"114.358104","lat":"35.944822","count":"27"},
        {"lng":"114.647021","lat":"35.968271","count":"6"},
        {"lng":"114.483172","lat":"35.862866","count":"3"},
        {"lng":"114.589631","lat":"35.856694","count":"4"},
        {"lng":"114.37365","lat":"35.930392","count":"1"},
        {"lng":"114.322755","lat":"35.82315","count":"26"},
        {"lng":"114.322755","lat":"35.82315","count":"6"},
        {"lng":"114.376392","lat":"36.013433","count":"3"},
        {"lng":"114.447681","lat":"36.052479","count":"6"},
        {"lng":"114.447681","lat":"36.052479","count":"13"},
        {"lng":"114.31517","lat":"36.117569","count":"5"}
        
        
        ];//这里面添加经纬度
 
 
        if(!isSupportCanvas()){
            alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
        }
        //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
        //参数说明如下:
        /* visible 热力图是否显示,默认为true
        * opacity 热力的透明度,1-100
        * radius 势力图的每个点的半径大小
        * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
        *  {
                .2:'rgb(0, 255, 255)',
                .5:'rgb(0, 110, 255)',
                .8:'rgb(100, 0, 255)'
            }
            其中 key 表示插值的位置, 0~1.
                value 为颜色值.
        */
        let heatmapOverlay = new window.BMapLib.HeatmapOverlay({"radius":10,"visible":true});
        _this.map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data:points,max:100});//计数的最大值
	
     //closeHeatmap();
	
	
 
        //判断浏览区是否支持canvas
        function isSupportCanvas(){
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
 
        // function setGradient(){
        //     /*格式如下所示:
        //     {
        //         0:'rgb(102, 255, 0)',
        //         .5:'rgb(255, 170, 0)',
        //         1:'rgb(255, 0, 0)'
        //     }*/
        //     var gradient = {};
        //     var colors = document.querySelectorAll("input[type='color']");
        //     colors = [].slice.call(colors,0);
        //     colors.forEach(function(ele){
        //         gradient[ele.getAttribute("data-key")] = ele.value;
        //     });
        //     heatmapOverlay.setOptions({"gradient":gradient});
        // }
 
        // function openHeatmap(){
        //     heatmapOverlay.show();
        // }
 
        // function closeHeatmap(){
        //     heatmapOverlay.hide();
        // }
    },
    // //只显示自己需要的区域：没用
    // showNeedArea(){
    //     let _this = this;
    //     var blist = [];
    //     var districtLoading = 0;

    //     function getBoundary() {


    //         addDistrict("北京");
    //         addDistrict("上海");
    //         addDistrict("重庆");
    //         addDistrict("天津");
    //         addDistrict("新疆");
    //         addDistrict("西藏");
    //         addDistrict("宁夏");
    //         addDistrict("内蒙古");
    //         addDistrict("广西");
    //         addDistrict("黑龙江");
    //         addDistrict("吉林");

    //         addDistrict("辽宁");
    //         addDistrict("河北");
    //         addDistrict("山东");
    //         addDistrict("江苏");
    //         addDistrict("安徽");
    //         addDistrict("浙江");
    //         addDistrict("福建");
    //         addDistrict("广东");
    //         addDistrict("海南");
    //         addDistrict("云南");

    //         addDistrict("贵州");
    //         addDistrict("四川");
    //         addDistrict("湖南");
    //         addDistrict("湖北");
    //         addDistrict("河南");
    //         addDistrict("山西");
    //         addDistrict("陕西");
    //         addDistrict("甘肃");
    //         addDistrict("青海");
    //         addDistrict("江西");

    //         addDistrict("台湾");
    //         // addDistrict("香港特别行政区");
    //         // addDistrict("澳门行政区");

    //     }

    //     function addDistrict(districtName) {
    //         //使用计数器来控制加载过程
    //         districtLoading++;
    //         var bdary = new BMap.Boundary();
    //         bdary.get(districtName, function (rs) {       //获取行政区域
    //             var count = rs.boundaries.length; //行政区域的点有多少个
    //             if (count === 0) {
    //                 alert('未能获取当前输入行政区域');
    //                 return;
    //             }
    //             for (var i = 0; i < count; i++) {
    //                 blist.push({ points: rs.boundaries[i], name: districtName });
    //             };
    //             //加载完成区域点后计数器-1
    //             districtLoading--;
    //             if (districtLoading == 0) {
    //                 //全加载完成后画端点
    //                 drawBoundary();
    //             }
    //         });
    //     }


    //     /**
    //      * 各种鼠标事件绑定
    //      */
    //     function click(evt) {
    //         alert(evt.target.name);
    //     }

    //     function mouseover(evt) {
    //         evt.target.label.setZIndex(99);
    //         evt.target.label.setPosition(evt.point);
    //         evt.target.label.show();
    //     }

    //     function mousemove(evt) {
    //         evt.target.label.setPosition(evt.point);
    //     }

    //     function mouseout(evt) {
    //         evt.target.label.hide();
    //     }

    //     function drawBoundary() {
    //         //包含所有区域的点数组
    //         var pointArray = [];

    //         /*画遮蔽层的相关方法
    //         *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
    //         *      这样就做出了一个经过多次西北角的闭合多边形*/
    //         //定义中国东南西北端点，作为第一层
    //         var pNW = { lat: 59.0, lng: 73.0 }
    //         var pNE = { lat: 59.0, lng: 136.0 }
    //         var pSE = { lat: 3.0, lng: 136.0 }
    //         var pSW = { lat: 3.0, lng: 73.0 }
    //         //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
    //         var pArray = [];
    //         pArray.push(pNW);
    //         pArray.push(pSW);
    //         pArray.push(pSE);
    //         pArray.push(pNE);
    //         pArray.push(pNW);
    //         //循环添加各闭合区域
    //         for (var i = 0; i < blist.length; i++) {
    //             //添加显示用标签层
    //             var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, -10) });
    //             label.hide();
    //             _this.map.addOverlay(label);

    //             //添加多边形层并显示
    //             var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 5, strokeColor: "#FF0000", fillOpacity: 0.01, fillColor: " #FFFFFF" }); //建立多边形覆盖物
    //             ply.name = blist[i].name;
    //             ply.label = label;
    //             ply.addEventListener("click", click);
    //             ply.addEventListener("mouseover", mouseover);
    //             ply.addEventListener("mouseout", mouseout);
    //             ply.addEventListener("mousemove", mousemove);
    //             _this.map.addOverlay(ply);

    //             // //添加名称标签层
    //             // var centerlabel = new BMap.Label(blist[i].name, { offset: new BMap.Size(0, 0) });
    //             // centerlabel.setPosition(ply.getBounds().getCenter());
    //             // _this.map.addOverlay(centerlabel);

    //             //将点增加到视野范围内
    //             var path = ply.getPath();
    //             pointArray = pointArray.concat(path);
    //             //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
    //             pArray = pArray.concat(path);
    //             pArray.push(pArray[0]);
    //         }

    //         //限定显示区域，需要引用api库
    //         var boundply = new BMap.Polygon(pointArray);
    //         window.BMapLib.AreaRestriction.setBounds(_this.map, boundply.getBounds());
    //         _this.map.setViewport(pointArray);    //调整视野

    //         //添加遮蔽层
    //         var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "#ffffff", fillOpacity: 0.9 }); //建立多边形覆盖物
    //         _this.map.addOverlay(plyall);
    //     }

    //     getBoundary();
    // }

  },
  created(){
        // //   引入百度热力图所需的js文件
        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=G76hm0ns2IzBkYLiYzG6bNNdDwaA5Dge&services=&t=20190123111209';//需要百度地图开发平台应用的AK码
        // document.body.appendChild(s);


        // const ss = document.createElement('script');
        // ss.type = 'text/javascript';
        // ss.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
        // document.body.appendChild(ss);
  },
  mounted(){
      let _this = this;
        console.log('进入数据统计页');
      let musicDom = document.getElementsByClassName('music')[0];
      console.log(musicDom);
    //   musicDom.classList.remove("dis");//移除隐藏控件的类名，显示音乐控件

      _this.movePage();//添加页面滑动监听跳转页面
    //   _this.watchMusicState();//监听音乐播放状态
      _this.musicTime = _this.$store.state.musicTime;//获取音乐总时长

        _this.map = new window.BMap.Map("container",{ enableMapClick: false });//地图实例
        console.log(_this.map,'地图实例');
        _this.createThermodynamicChart();//加载热力图

        // _this.showNeedArea();//只显示自己想要的元素（中国地图）
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
    .statistics>>>.anchorBL{
        display:none;
    } 
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
        font-size: .875rem

    }
    /* 进度条时间 */
    .statistics>>>.singTime{
        font-size: .875rem;
        color: #FF0000;
        position: absolute;
        right: 2%;
        top: 15%;        
    }
</style>
