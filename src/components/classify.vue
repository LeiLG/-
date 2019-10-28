<template>
  <div>
    <HeaderVue :por="tit"></HeaderVue>

    <div class="main">
      <div class="leftb">
        <ul ref="list">
          <li @click="playqb">全部</li>
          <li v-for="(val,index) in list" :key="index" @click="play(index,val.cateId)" >{{val.cateName}}</li>
        </ul>
      </div>
      <div class="rightb">
          <!--搜索框-->
        <div class="inpbox">
          <input type="text" placeholder="热门推荐词" />
        </div>
              <!--轮播图-->
        <div class="swipe">
          <div style="width: 95%;margin-right: 5%;height: 100%">
            <mt-swipe :auto="3000">
              <mt-swipe-item v-for="(value,index) in banner" :key="index">
                <img class="banimg" :src="value.value" />
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
          <!--商品列表-->
        <div class="popbox">
          <div style="width: 95%;margin-right: 5%;height: 100%">
            <ul>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tit:"商品分类",
        list:[],
        banner:[],
        claval:[]
      }
    },
    created(){
        this.$axios.get('/getCate')
          .then((res)=>{
            this.list=res.data.data
//            console.log(this.list)

            this.$nextTick(()=>{

              //设置分类按钮的选中样式
              let that=this
              let list=this.$refs.list.children
              for(let i=0;i<list.length;i++){
                //某个li被点击后的点击事件
                list[i].onclick=function () {
                  //循环列表，恢复默认样式
                  for(let i=0;i<list.length;i++){
                    list[i].style.color=""
                    list[i].style.backgroundColor=""
                    list[i].style.borderLeft="0px"
                  }

                  //改变当前被点击的样式
                  this.style.color="red"
                  this.style.backgroundColor="#F5f5f5"
                  this.style.borderLeft="2px solid #d11d44"

                  //根据被点击的类别名称，请求该类别的商品
                }
              }

            })

          });
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
    play:function (index,cateId) {

      //根据类型id获取相关类型的商品
      this.$axios.get('/getGoodsByCate',{params:{cateId:cateId}})
        .then((res)=>{
          this.claval=res.data.data
          console.log(this.claval)
          for(let i=0;i<this.claval.length;i++){
//            console.log(this.poplist[i].goodsImage)
            this.claval[i].goodsImage=this.$store.state.pathimg+this.claval[i].goodsImage
          }
        })
    },
      playqb:function () {
        this.$axios.get('/getGoodHot')
          .then((res)=>{
//        console.log(res.data.data)
            this.claval=res.data.data
            console.log(this.claval)
            for(let i=0;i<this.claval.length;i++){
//            console.log(this.poplist[i].goodsImage)
              this.claval[i].goodsImage=this.$store.state.pathimg+this.claval[i].goodsImage
            }
          })
      }

    },
    mounted(){
      this.$axios.get('/getGoodHot')
        .then((res)=>{
//        console.log(res.data.data)
          this.claval=res.data.data
          console.log(this.claval)
          for(let i=0;i<this.claval.length;i++){
//            console.log(this.poplist[i].goodsImage)
            this.claval[i].goodsImage=this.$store.state.pathimg+this.claval[i].goodsImage
          }
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 100%;
  margin-top: 40px;
  overflow: hidden;
}
  .leftb{
    width: 25%;

    position: fixed;
    top: 40px;
    left: 0px;

  }
  .leftb ul{
    width: 100%;
    list-style: none;
    margin: 0px;
    padding: 0px;
    background-color: white;
  }
  .leftb ul li{
  height: 45px;
  line-height: 45px;
}


  .rightb{
    width: 75%;

    float: right;

  }
.inpbox{
  width: 100%;
  height: 45px;

}
.inpbox input{
  margin-top: 6px;
  border: 0px;
  width: 75%;
  height: 30px;
  border-radius: 25px;
  padding-left: 8px;
  background-image: url("../assets/img/搜索.png");
  background-repeat: no-repeat;
  background-size: 30px;
  background-position:30px;
  background-color: #cccccc;
  font-size: 22px;
  color: white;
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder{
  color:#999999;
  font-size:14px;
  text-align: center;
  vertical-align: middle;
}

.swipe{
  width: 100%;
  height: 185px;
  margin-right: 5%;
  background-color: white;

}
.banimg{
  width: 100%;
  height: 100%;
}

  .popbox{
    width: 100%;
    background-color: white;
    overflow: hidden;
  }
.popbox ul{
  padding: 0px;
  margin: 0px;
  margin-top: 20px;
  list-style: none;
}
.popbox ul li{
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  width: 31%;
  height: 100px;
  float: left;
  margin-left: 1.1%;
  margin-right: 1.1%;
}
</style>
