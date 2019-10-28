<template>
  <div>
    <HeaderVue :por="tit"></HeaderVue>

      <div class="main">
    <mt-swipe :auto="0" :valshw="valshow" @change="handleChange()">
      <mt-swipe-item>
        <div class="heard">
          <ul class="admval">
            <li><img  width="55px" height="55px" src="../assets/img/身份证.png"></li>
            <li>{{this.$store.state.username}}</li>
          </ul>
          <ul class="val">
            <li>{{points}}</li>
            <li>可用积分</li>
          </ul>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="heard">
          <div  id="myChart" :style="{width: '350px', height: '300px'}"></div>
          <ul class="val2">
            <li>年度积分</li>
            <li>{{yearf}}</li>
          </ul>
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
      <div class="list">
        <div class="tit">
          <ul>
            <li ref="event" :class="valshow? 'wheits':'red'">全部</li>
            <li>已赚积分</li>
            <li>已用积分</li>
          </ul>
        </div>


        <div class="listval1">
          <ul>
            <li v-show="valshow" v-for="(val,index) in jfmx" :key="index">
              <div class="new">
                <p>{{val.cause}}</p>
                <span>{{val.dateline}}</span>
              </div>
             <span class="mx"> {{val.points}}</span>
            </li>
          </ul>
        </div>

        <div v-show="!valshow"  class="listval2">
          <ul>
            <li v-for="(val,index) in yearjf" :key="index">
              <ul class="valli">
                <li>{{val.year}}</li>
                <li>{{val.inPoints}}</li>
                <li>{{val.outPoints}}</li>
              </ul>
            </li>
            <li>

            </li>
          </ul>
        </div>

      </div>



  </div>
</template>

<script>

  export default {
    data () {
      return {
        tit:'积分查询',
        valshow:true,
        data:{
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
                color:"#ffc107"
            }
          }]
        },//可视化资源
        points:'',//当前积分
        jfmx:[

        ],   //积分列表资源
        yearjf:{},//获取年度积分列表
        yearf:''


      }
    }
    ,
    created(){
        //获取查询积分列表
        this.$axios.get('/getPonits',
          {params:{userId:this.$store.state.userId}}
          ).then((res)=>{
//            console.log(res.data.data.points)
          this.points=res.data.data.points
//          console.log(res.data.data)
          this.jfmx=res.data.data.pointsLog
          for(let i=0;i<this.jfmx.length;i++){
              this.jfmx[i].dateline=this.jfmx[i].dateline.slice(0,7)
          }

        })

      //获取年度积分列表
      this.$axios.get('/getPonitsByYears',
        {params:{userId:this.$store.state.userId}}
      ).then((res)=>{
//            console.log(res)
            let  year= new Date()
            year=year.getFullYear()
           this.yearjf=res.data.data
        for(let item in res.data.data){


          this.yearjf[item].year=item

          if(item.toString()===year.toString()){
//              console.log('aaa')
              this.yearf=this.yearjf[item].inPoints
          }


        }


      })


    },
    mounted(){
      this.drawLine();  //调用可视化渲染事件
    },

    methods: {
        //判断当前显示的是可用积分还是年度积分，根据结果渲染相应内容
        handleChange:function () {
           if(this.valshow){
             this.$refs.event.innerText="年度"

             this.valshow=false
           }else {
             this.$refs.event.innerText="全部"
             this.valshow=true
           }

         },
      drawLine(){  //定义可视化渲染事件
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.data);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    padding-top: 40px;
    /*color: #ffc107;*/
    height: 180px;
    background-color: #d11d44;
  }
  #myChart{

    padding-left: 50px;
    zoom: 0.5;
  }
  .heard{
    width: 94%;
    margin: 0px auto;
    height: 150px;
    margin-top: 30px;
    background-color: #f2e3be;
  }

  .admval{
    width:90%;
    height: 55px;
    list-style: none;
    margin: 0px auto;
    padding: 0px;
    padding-top: 10px;
  }
  .admval li{
    width: 32%;
    height: 100%;
    float: left;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    color: #000000;
    line-height: 55px;
    font-size: 18px;
  }
  .admval li:first-child{
    width: 55px;
    background-color: white;
    border-radius: 50%;
  }

  .val{
    list-style: none;
    text-align: left;
    padding-left: 20px;
  }
  .val li:first-child{
  font-size: 22px;
  color: #d11d44;
}
  .val li:last-child{
    font-size: 12px;
    color: #a9acb1;
  }

  .val2{
    list-style: none;
    position: absolute;
    right: 8%;
    top: 20%;
  }
  .val2 li:first-child{
    font-size: 12px;
    color: #a9acb1;
  }
  .val2 li:last-child{
    font-size: 22px;
    color: #d11d44;
    margin-top: 10px;
  }

  .list{
    width: 100%;
    background-color: white;
  }
  .tit{
    width: 100%;
    background-color: #94122e;
    height: 48px;
  }
  .tit ul{
    width: 80%;
    height: 30px;
    margin: 0px;
    padding: 0px;
    margin: 0px auto;
    list-style: none;
    padding-top: 9px;
  }
  .tit ul li{
    float: left;
    color: white;
    width: 33.33%;
    line-height: 30px;;
  }
  /*.tit ul li:first-child{*/
    /*background-color: white;*/
    /*border-radius: 50px;*/
    /*color: #000000;*/
  /*}*/
  .wheits{
    background-color: white;
    border-radius: 50px;
    color: #000000!important;
  }
  .red{

  }

  .listval1{
    width: 100%;

  }
  .listval1 ul{
    list-style: none;
    margin: 0px;
    padding: 0px;

  }
  .listval1 ul li{
    height: 60px;
    border-bottom: 1px solid #a9acb1;
  }
  .new{
    width: 100px;
    height: 100%;
    text-align: center;
    float: left;

  }
  .new p{
    font-size: 14px;
    padding: 0px;
    margin: 0px;
    padding-top: 10px;
    padding-bottom: 5px;

  }
  .new span{
    font-size: 12px;
  }
  .mx{
   float: right;
   line-height: 60px;
   padding-right: 4%;
   font-size: 18px;
 }

  .listval2{
  background-color: white;
    overflow: hidden;
  }
.listval2 ul{

  width: 90%;
  list-style: none;
  margin: 0px auto;
  padding: 0px;
}
  .listval2 ul li{

  }
.valli{
  width: 80%;
  margin: 0px auto;

  padding: 0px;

}
  .valli li{
    width: 33.33%;
    float: left;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #cccccc;
  }

</style>
