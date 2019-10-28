<template>
  <div>
    <HeaderVue :por="tit"></HeaderVue>

    <div class="main">
      <div class="tit">
        <ul>
          <li>我的订单</li>
          <router-link  :to="{name:'orderval',query:{id:0}}">
          <li>全部订单 <img src="../assets/img/箭头右.png" style="width: 15px;height: 15px;position: relative;top: 2px"></li>
          </router-link>
        </ul>
      </div>
      <div class="val">
        <ul>
          <router-link  :to="{name:'orderval',query:{id:1}}">
          <li>
            <p class="len" ref="len1">{{len1}}</p>
            <img src="../assets/img/钱包2.png" style="width: 50px;height: 50px;" alt="">
            <p>待付款</p>
          </li>
          </router-link>

          <router-link  :to="{name:'orderval',query:{id:2}}">
          <li>
            <p class="len2" ref="len2">{{len2}}</p>
            <img src="../assets/img/快递.png" style="width: 50px;height: 50px;" alt="">
            <p>待收货</p>
          </li>
          </router-link>

          <router-link  :to="{name:'orderval',query:{id:3}}">
          <li>
            <p class="len2" ref="len3">{{len3}}</p>
            <img src="../assets/img/完成.png" style="width: 50px;height: 50px;" alt="">
            <p>已完成</p>
          </li>
          </router-link>
        </ul>
      </div>
    </div>

    <div class="list">
      <ul>
        <router-link  :to="{name:'intquery'}">
        <li>
          <span>可用积分</span>
          <span style="position: absolute;left: 74%">{{jf}}</span>
          <img style="width: 18px;height: 18px;float: right;position: relative;top: 14px" src="../assets/img/箭头右.png">
        </li>
        </router-link>

        <router-link  :to="{name:'admin'}">
        <li>
          <span>个人中心</span>
          <img style="width: 18px;height: 18px;float: right;position: relative;top: 14px" src="../assets/img/箭头右.png">
        </li>
        </router-link>

        <router-link  :to="{name:'home'}">
        <li>
          <span>积分商城</span>
          <img style="width: 18px;height: 18px;float: right;position: relative;top: 14px" src="../assets/img/箭头右.png">
        </li>
        </router-link>
      </ul>
    </div>



  </div>
</template>

<script>
  export default {
    data () {
      return {
        tit:'我的订单',
        jf:0,
        len1:0,
        len2:0,
        len3:0


      }
    },
    created(){

        //获取用户当前积分
      this.$axios.get('/getPonits',{
          params:{userId:this.$store.state.userId}
      }).then((res)=>{
//          console.log(res.data.data)
        this.jf=res.data.data.points
      })
//获取用户不同状态的商品数量
      this.$axios.get('/getOrderByUserIdAndStatus',{
        params:{userId:this.$store.state.userId,orderStatus:1}
      }).then((res)=>{
//        console.log(res.data.data.length)
        this.len1=res.data.data.length

        if(this.len1>0){
            this.$refs.len1.className="len"
        }


      })

      this.$axios.get('/getOrderByUserIdAndStatus',{
        params:{userId:this.$store.state.userId,orderStatus:2}
      }).then((res)=>{
//        console.log(res.data.data.length)
        this.len2=res.data.data.length

        if(this.len2>0){
          this.$refs.len2.className="len"
        }

      })

      this.$axios.get('/getOrderByUserIdAndStatus',{
        params:{userId:this.$store.state.userId,orderStatus:3}
      }).then((res)=>{
        console.log(res.data.data.length)
        this.len3=res.data.data.length

        if(this.len3>0){
          this.$refs.len3.className="len"
        }
      })

    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    padding-top: 40px;
    background-color: white;
  }
  a{
    color: #999999;
  }
  .tit ul{
    width: 92%;
    height: 40px;
    margin: 0px auto;
    padding: 0px;
    /*background-color: #4caf50;*/
    list-style: none;
    border-bottom: 1px solid #a9acb1;
  }
  .tit ul li:first-child{
    width: 30%;
    float: left;
    height: 100%;
    line-height: 40px;
    text-align: left;
  }
  .tit ul li:last-child{
    width: 50%;
    float: right;
    text-align: right;
    height: 100%;
    line-height: 40px;
    font-size: 14px;
    color: #cccccc;
  }

  .val{
   width: 100%;
   height: 115px;
 }
  .val ul{
    width: 85%;
    height: 100px;
    padding: 0px;
    margin: 0px auto;
    list-style: none;
    margin-top: 20px;
    /*background-color: #4caf50;*/

  }
  .val ul li{
    width: 33.33%;
    height: 100%;
    float: left;
  }
  .val ul li p{
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 15px;
  }
  .len{
    position: relative;
    left: 68%;
    top: 10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #d11d44;
    color: white;

  }
  .len2{
    visibility: hidden;
    position: relative;
    left: 68%;
    top: 10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #d11d44;
    color: white;
  }

  .list{
    margin-top: 20px;
    width: 100%;

    background-color: white;
  }
  .list ul{
    width: 94%;
    list-style: none;
    margin: 0px auto;
    padding: 0px;
  }
  .list ul li{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #2c3e50;
  }
  .list ul li span{
  float: left;
}

</style>
