<template>
  <div class="all" ref="all">

    <div class="tit">
      <p>
        <img style="width:25px;height: 25px;position: relative;top: 5px;right: -4px " src="../assets/img2/定位.png" alt="">
        宁夏回族自治区-吴忠市
      </p>
    </div>
    <div class="header">
      <p>24小时预报</p>
      <ul>
        <li>温度</li>
        <li>风力</li>
      </ul>
    </div>

    <ul class="jtbox">
      <li  @click="bbb">&nbsp;<img  class="jtimg" src="../assets/img2/zuo.png" alt=""></li>
      <li @click="aaa"><img class="jtimg" src="../assets/img2/you.png" alt="">&nbsp;</li>
    </ul>

    <div class="main">


      <div class="mainbox" >

        <ul class="time" ref="list">
          <li>0时</li>
          <li>1时</li>
          <li>2时</li>
          <li>3时</li>
          <li>4时</li>
          <li>5时</li>
          <li>6时</li>
          <li>7时</li>
          <li>8时</li>
          <li>9时</li>
          <li>10时</li>
          <li>11时</li>
          <li>12时</li>
          <li>13时</li>
          <li>14时</li>
          <li>15时</li>
          <li>16时</li>
          <li>17时</li>
          <li>18时</li>
          <li>19时</li>
          <li>20时</li>
          <li>21时</li>
          <li>22时</li>
          <li>23时</li>
        </ul>
        <ul class="weat" ref="list2" >
          <li v-for="(val,index) in date" :key="">
            <img style="width: 23px;height: 23px" :src="val.img" >
            {{val.temp}}°C
            <div class="zhu"></div>
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
        date:[
            {
                weat:'晴',
                temp:'15'
            },
            {
              weat:'晴',
              temp:'18'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'阴',
              temp:'20'
            },
            {
              weat:'晴',
              temp:'23'
            },
            {
              weat:'晴',
              temp:'23'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'阴',
              temp:'24'
            },
            {
              weat:'晴',
              temp:'41'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'晴',
              temp:'30'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'晴',
              temp:'24'
            },
            {
              weat:'晴',
              temp:'27'
            },
            {
              weat:'晴',
              temp:'20'
            },
            {
              weat:'晴',
              temp:'22'
            },
            {
              weat:'晴',
              temp:'27'
            },
            {
              weat:'阴',
              temp:'26'
            },
            {
              weat:'晴',
              temp:'29'
            },
            {
              weat:'晴',
              temp:'26'
            },
            {
              weat:'阴',
              temp:'22'
            },
            {
              weat:'晴',
              temp:'24'
            },
            {
              weat:'晴',
              temp:'18'
            },
          ],
        left:0,
        dist:110,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      }
    }
    ,
    created(){
      for(let i=0;i<this.date.length;i++){
        if(this.date[i].weat==='晴'){

          this.date[i].img=require('../assets/img2/taiyang1.png')
        }else if(this.date[i].weat==='阴'){
          this.date[i].img=require('../assets/img2/云.png')
        }
      }


    },
    methods:{
        aaa:function () {
            let left=this.left+this.dist
            if(this.$refs.list.offsetLeft-110<-990){
                if(this.width<420&&this.width>410){
                  if(left>1065){
                    left=990
                  }
                  left=990
                }else if(this.width<380&&this.width>370){
                  if(left>1065){
                    left=1020
                  }
                  left=1020
                }else if(this.width<325&&this.width>315){
                  if(left>1065){
                    left=1060
                  }
                  left=1060
                }else{
                  if(left>1065){
                    left=1020
                  }
                  left=1020
                }
            }
//            if(left>1065){
//                left=1060
//            }
          this.left=left
          this.$('.weat').animate({left:-left-5+'px'})
          this.$('.time').animate({left:-left-5+'px'})

        },
        bbb:function () {
        let left=this.left-110
        if(left<0){
          left=0
        }
          this.left=left
          this.$('.weat').animate({left:-left-5+'px'})
          this.$('.time').animate({left:-left-5+'px'})
      },
    },
    mounted(){
        let listchid1=this.$refs.list.children
      let listchid2=this.$refs.list2.children
//      console.log(listchid2)



      let times=new Date()
      times=times.getHours()
      this.left=times*55-165

      this.$refs.list.style.left=-this.left-5+'px'
      this.$refs.list2.style.left=-this.left-5+'px'

      for(let i=0;i<listchid1.length;i++){
        listchid1[times].style.color="#ca96de"
        listchid2[times].style.color="#ca96de"
        if(this.date[times].weat==='晴'){
        listchid2[times].children[0].src=require('../assets/img2/taiyang2.png')
//          console.log(this.date[times].weat)
        }else if(this.date[times].weat==='阴'){
          listchid2[times].children[0].src=require('../assets/img2/duoyun.png')
        }


      }


      let listchil=this.$refs.list2.children
        for(let i=0;i<listchil.length;i++){
            let h=this.date[i].temp
            h=h-10;
            h=h*10
          h=h/3
          h=h+80
          h=Math.abs(h)
//          console.log(h)

          listchil[i].children[1].style.height=h+'px'
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .all{
    background-image: url("../assets/img2/bgbj.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-bottom: 180px;

  }

  .tit p{
  font-size: 18px;
  color: white;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
}

  .header{
    margin: 0px auto;
    padding-top: 20px;
    width: 85%;
    text-align: left;
    overflow: auto;
  }
  .header p{
    font-size: 18px;
    text-indent: 10px;
    line-height: 16px;
    color: white;
    border-left: 3px solid white;
    margin-bottom: 15px;
  }
  .header ul{
    margin: 0px auto;
    padding: 0px;
    width: 100%;
    list-style: none;
  }
  .header ul li{
    float: left;
    width: 49%;
    background-color: #713ce7;
    color: white;
    text-align: center;
    border-radius: 3px;
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    font-weight: lighter;
  }
  .header ul li:first-child{
  margin-right: 2%;
}
  .header ul li:last-child{
  background-color: #584790;
}

  .main{
    width: 85%;
    height: 400px;
    margin: 0px auto;
    margin-top: 15px;
    background-color: white;
    border-radius: 5px;
    background-image: url("../assets/img2/bj2.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    -moz-box-shadow: 10px 10px 5px #3a2b76; /* 老的 Firefox */
    box-shadow: 0px 1px 15px #3a2b76;



  }
  .mainbox{
    width: 89.5%;
    /*background-color: #dedede;*/
    margin: 0px auto;
    overflow: hidden;
    position: relative;

  }
  .time{
    width: 1320px;
    height: 45px;
    list-style: none;
    margin: 0px;
    padding: 0px;
    padding-top: 15px;
    position: relative;
    border-bottom: 1px solid #aaaaaa;
  }
  .time li{
    float: left;
    width: 55px;
    height: 100%;
    line-height: 45px;
  }

  .weat{
    width: 1320px;
    list-style: none;
    height: 250px;
    margin: 0px;
    padding: 0px;
    margin-top: 15px;
    position: relative;
    /*background-color: #4caf50;*/


  }
  .weat li{
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    float: left;
    width: 55px;
    height: 100%;
    font-size: 15px;
    position: relative;
    border-right: 1px solid #a9acb1;

  }
  .weat li:last-child{
    border-right:0px;
  }
  .zhu{
  width: 15px;
  height: 100px;
  border-radius: 20px;

  position: absolute;
  left: 20px;
  bottom: 0px;
  background: -webkit-linear-gradient(top, #ca97df,#733ee7 );
}
  .jtbox{
  /*box-sizing:border-box;*/
  /*-moz-box-sizing:border-box; !* Firefox *!*/
  /*-webkit-box-sizing:border-box; !* Safari *!*/
  list-style: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);




}
  .jtbox li:first-child{
    position: absolute;

  }
  .jtbox li:last-child{
    float: right;
  }
  .jtimg{
    width: 20px;
    height: 25px;
  }
</style>
