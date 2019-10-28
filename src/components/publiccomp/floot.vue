<template>
  <div class="flootbig">
    <div class="flootbox">
      <ul class="floot">
        <li ref="home" @click="home">
          首页
        </li>
        <li ref="shop" @click="shop">
          购物车
        </li>
        <li ref="admin" @click="admin">
          我的
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          selected:'',
      }

    },
    methods: {
      home: function () {
          //根据点击事件跳转页面
          this.$router.push({name:'home'})
//        this.$refs.home.style.backgroundColor = "#d11d44"
//        this.$refs.home.style.color = "#ffffff"
//
//        this.$refs.shop.style.backgroundColor = ""
//        this.$refs.shop.style.color = ""
//
//        this.$refs.admin.style.backgroundColor = ""
//        this.$refs.admin.style.color = ""
      },
      shop: function () {
          this.$router.push({name:'shopcar'})
      },
      admin: function () {
        this.$router.push({name:'admin'})
      }
    },

    //根据props传值判断当前页面，改变相应按钮样式
    props:['bar'],
    mounted(){
      if(this.bar==="home"){
        this.$refs.home.style.backgroundColor = "#d11d44"
        this.$refs.home.style.color = "#ffffff"
      }else if(this.bar==="shop"){
        this.$refs.shop.style.backgroundColor = "#d11d44"
        this.$refs.shop.style.color = "#ffffff"
      }else if(this.bar==="admin"){
        this.$refs.admin.style.backgroundColor = "#d11d44"
        this.$refs.admin.style.color = "#ffffff"
      }
    }
  }
</script>

<style scoped>
.flootbox{
  width: 100%;
  position: absolute;
  background-color: white;

}
  .floot{
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid #dedede;
    position: fixed;
    bottom: 0px;
    z-index: 999;
    background-color: white;
  }
  .floot li{
    width: 33.33%;
    float: left;
    height: 55px;
    font-size: 19px;
    line-height: 55px;
  }
</style>
