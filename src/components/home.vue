<template>
  <div>
    <!--头部搜索框-->
    <div class="header">
      <div class="bgred">
        <input type="text" placeholder="热门推荐词" @input="input"/>
      </div>
      <!--轮播图-->
      <div class="swipe">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(value,index) in banner" :key="index">
            <img class="banimg" :src="value.value" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <!--热门兑换-->
    <div class="popular">
      <span>更多</span>
      <div class="tit">
        <p><img width="18px" height="18px" src="../assets/img/火焰.png"/>&nbsp;&nbsp;热门兑换</p>
      </div>
        <!--热门兑换列表-->
      <div class="popval">
        <ul class="poplist" ref="list">
          <li v-for="(value,index) in poplist" :key="index">
            <router-link  :to="{name:'popvals',query:{id:value.goodId}}">
            <div>
              <img width="100%" height="115px" :src="value.goodsImage">
              <p>{{value.goodsName}}</p>
              <p style="color: red;text-align: left;margin-top: 10px">￥{{value.nowPrice}}<img style="float: right" width="20px" height="20px" src="../assets/img/购物车.png"></p>
            </div>
           </router-link>
          </li>

        </ul>
      </div>
      <!--商品分类列表-->
        <div class="cla">
            <div class="clalist">
              <ul ref="list1">
                <li v-for="(val,index) in list" :key="index" @click="play(index,val.cateId)">{{val.cateName}}</li>


                <router-link  :to="{name:'classify'}">
                <li>
                  <img width="18px" height="18px" style="position: relative;top: 4px" src="../assets/img/折叠.png">
                  分类
                </li>
                </router-link>
              </ul>
            </div>
          <div class="claval">
            <div class="clavallist">
              <ul ref="list2" >
                <li v-for="(value,index) in claval" :key="index">

                  <router-link  :to="{name:'popvals',query:{id:value.goodId}}">
                  <img height="100%" width="100%" :src="value.goodsImage">
                  </router-link>

                </li>
              </ul>
            </div>
          </div>
        </div>



    </div>

    <FlootVue :bar="bar"></FlootVue>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bar:'home',
      banner:[],//轮播图资源
      poplist:[],//热门兑换商品资源
      list:[],//分类
      claval:[]//分类商品列表
    }
  },
  created(){
    document.title="商品首页";
      //热门兑换接口
    this.$axios.get('/getGoodHot')
      .then((res)=>{
//        console.log(res.data.data)
        this.poplist=res.data.data
        for(let i=0;i<this.poplist.length;i++){
//            console.log(this.poplist[i].goodsImage)
          this.poplist[i].goodsImage=this.$store.state.pathimg+this.poplist[i].goodsImage
        }
        })

    //商品分类
    this.$axios.get('/getCate')
      .then((res)=>{
//        console.log(res.data.data)

        this.list=res.data.data.slice(0,4)

//         console.log(this.list)

        this.$nextTick(()=>{
          this.$refs.list1.children[0].style.color="red"
          this.$refs.list1.children[0] .style.borderBottom="1px solid red"
        })

        this.$axios.get('/getGoodsByCate',{params:{cateId:this.list[0].cateId}})
      .then((res)=>{
//        console.log(res.data.data)
        this.claval=res.data.data
        for(let i=0;i<this.claval.length;i++){
//          console.log(this.claval[i].goodsImage)
          this.claval[i].goodsImage=this.$store.state.pathimg+this.claval[i].goodsImage
        }

        })
      })
      //获取轮播图
    this.$axios.get('/names',{params:{names:'banner'}})
      .then((res)=>{
//        console.log(res.data.data.banner)
        this.banner=res.data.data.banner

        for(let i=0;i<this.banner.length;i++){
//          console.log(this.claval[i].goodsImage)
          this.banner[i].value=this.$store.state.pathimg+this.banner[i].value
        }
//        console.log(this.banner)
      })
  },
  methods:{
      input:function () {

      },
    play:function (index,cateId) {

        for (let i = 0; i <this.$refs.list1.children .length; i++) {   //还原样式
          this.$refs.list1.children[i].style.color = ""
          this.$refs.list1.children[i].style.borderBottom = ""
        }

        this.$refs.list1.children[index].style.color="red"
          this.$refs.list1.children[index] .style.borderBottom="1px solid red"

      //根据类型id获取相关类型的商品
      this.$axios.get('/getGoodsByCate',{params:{cateId:cateId}})
        .then((res)=>{
//        console.log(res.data.data)
          this.claval=res.data.data
          for(let i=0;i<this.claval.length;i++){
//          console.log(this.claval[i].goodsImage)
            this.claval[i].goodsImage=this.$store.state.pathimg+this.claval[i].goodsImage
          }
          //

        })

    }
  },
  mounted(){

    //判断该元素是不是每行第一个，如果是第一个，设置特殊的外边距样式
    for(let i=0;i<this.$refs.list.children.length;i++){

        let regex=/^[1-9]\d*$/;
        if(regex.test(i/3)){
          this.$refs.list.children[i].style.marginLeft=4+"px";
        }
    }

    //判断该元素是不是每行第一个，如果是第一个，设置特殊的外边距样式
    for(let i=0;i<this.$refs.list2.children.length;i++){
      let regex=/^[1-9]\d*$/;
      if(regex.test(i/4)){
        this.$refs.list2.children[i].style.marginLeft="1%";
      }

    }




  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #656b79;
  }

  .header{
  width: 100%;
  height: 17rem;
  /*height: 250px;*/
  box-sizing: border-box;
  /*border: 1px solid #000000;*/
}
  .bgred{
    width: 100%;
    height: 68.5%;
    background-color: #d11d44;
  }
  .bgred input{
    margin-top: 13px;
    border: 0px;
    width: 75%;
    height: 35px;
    border-radius: 25px;
    padding-left: 8px;
    background-image: url("../assets/img/搜索.png");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position:30px;
    background-color: #e88ea2;
    font-size: 22px;
    color: white;
  }
  input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
  color:#f4c7d1;
  font-size:14px;
  text-align: center;
  vertical-align: middle;
}


  .swipe{
    width: 90%;
    height: 185px;
    position: absolute;
    top: 95px;
    left: 50%;
    transform: translate(-50%);
    /*border: 1px solid#4caf50;*/
  }
  .banimg{
    width: 100%;
    height: 100%;
  }


  .popular{
    width: 100%;
    position: relative;
  }
  .tit{
    width: 57.5%;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    margin-left: -10px;
    margin-top: 40px;
    border-top: 1px solid #656b79;
  }
  .tit p{
    margin: 0px  auto;
    margin-top: -13px;
    width: 60%;
    background-color: #F5f5f5;
  }
  .popular span{
  position: absolute;
  top: -10px;
  right: 15px;
  font-size: 14px;
}

  .popval{
    width: 100%;
    height: 400px;
    background-color: white;
    margin-top: 20px;
  }
  .poplist{
    width: 94%;
    height: 380px;
    padding: 0;
    margin: 0px auto;

    list-style: none;
    overflow: hidden;
  }
  .poplist li{
    width: 31.3%;
    height: 170px;
    margin-top: 20px;
    background-color: #fafafa;
    float: left;
    margin-left: 2%;
    text-align: left;
  }
  .poplist li p{
    margin: 0px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .poplist li:first-child{
    margin-left: 4px;
  }

  .cla{
    width: 100%;
    margin-top: 10px;
    position: relative;
    height: 440px;
  }
  .clalist{
    width: 94%;
    height: 65px;
    /*background-color: #4caf50;*/
    margin: 0px auto;
    overflow: hidden;
  }
  .clalist ul{
  list-style: none;
    /*height: 65px;*/
    padding: 0px;
  }
  .clalist ul li{
    float: left;
    /*height: 65px;*/
    font-size: 17px;
    line-height: 32.5px;
    margin-left:6.9%;
    color: #999999;
  }
  .clalist ul li:first-child{
    margin-left: 4px;
  }
  .clalist ul li:last-child{
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    width: 60px;
    height: 25px;
    border: 1px solid #999999;
    border-radius: 33px;
    line-height: 25px;
    margin-left: 5.9%;
    margin-top: 3px;
    font-size: 16px;
  }
  @media screen and (max-width: 330px){
    .clalist ul li{
      margin-left: 4%;
    }
  }


  .claval{
    width: 100%;
    height: 260px;
    background-color: white;
    overflow: hidden;
  }
  .clavallist{
    width: 94%;
    margin: 0px auto;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
  }
  .clavallist ul{

    list-style: none;
    margin: 0px auto;
    width: 100%;
    /*background-color: #4caf50;*/
    padding: 0px;
  }

  .clavallist ul li{
    width: 22.5%;
    height: 100px;
    float: left;
    margin-left: 2.5%;
    /*background-color: #4caf50;*/
    margin-top: 15px;
  }
  .clavallist ul li:first-child{
     margin-left: 1%;
   }

</style>
