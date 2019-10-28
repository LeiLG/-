<template>
  <div class="admin">
    <div class="head">

      <ul class="admval">
        <li><img  width="65px" height="65px" src="../assets/img/身份证.png"></li>
        <li>{{$store.state.username}}</li>
        <li>
          <img style="float: right;padding-top: 15px"  width="32px" height="32px" src="../assets/img/全局设置_o.png">
        </li>
      </ul>

      <ul class="admval2">
        <li>{{points}}</li>
        <li>{{data.dept}}</li>
        <li>{{data.position}}</li>
      </ul>

    </div>
    <div class="main">
      <p>我的服务</p>
      <div class="mainlist">
        <ul>

          <router-link  :to="{name:'wages'}">
               <li>
                  <div>
                    <img width="35px" height="35px" src="../assets/img/钱包.png">
                    <p>工资条</p>
                  </div>
               </li>
          </router-link>

          <router-link  :to="{name:'intquery'}">
             <li>
                <div>
                  <img width="35px" height="35px" src="../assets/img/搜索2.png">
                  <p>积分查询</p>
                </div>
             </li>
          </router-link>

          <router-link  :to="{name:'home'}">
              <li>
                  <div>
                    <img width="35px" height="35px" src="../assets/img/商店.png">
                    <p>积分商城</p>
                  </div>
              </li>
          </router-link>

          <router-link  :to="{name:'shopcar'}">
              <li>
                <div>
                  <img width="35px" height="35px" src="../assets/img/购物车2.png">
                  <p>购物车</p>
                </div>
              </li>
          </router-link>

          <router-link  :to="{name:'order'}">
              <li>
                <div>
                  <img width="35px" height="35px" src="../assets/img/订单.png">
                  <p>我的订单</p>
                </div>
              </li>
          </router-link>

        </ul>
      </div>
    </div>


    <FlootVue :bar="bar"></FlootVue>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        bar:'admin',
        data:{},
        points:0
      }
    }
    ,
    created(){
      document.title="个人中心";


      },
    mounted(){
        //个人中心接口
      this.$axios.get('/person',
        {params:{userId:this.$store.state.userId}
        })
        .then((ret)=>{
//          console.log(ret.data.data)
          this.data=ret.data.data
        })

      //获取当前用户积分
      this.$axios.get('/getPonits',
        {params:{userId:this.$store.state.userId}
        })
        .then((ret)=>{
//          console.log(ret.data.data)
          this.points=ret.data.data.points
        })

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin{

}
a{
  text-decoration: none;
  color: #2c3e50;
}
  .head{
    width: 100%;
    height: 175px;
    background-color: #d11d44;
    padding-top: 15px;
  }
  .admval{
    width:90%;
    height: 65px;
    list-style: none;
    margin: 0px auto;
    padding: 0px;
  }
.admval li{
  width: 32%;
  height: 100%;
  float: left;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  color: white;
  line-height: 65px;
  font-size: 18px;
}
.admval li:first-child{
  width: 65px;
  background-color: white;
  border-radius: 50%;
}
.admval li:last-child{
  float: right;
}

.admval2{
  width:80%;
  height: 50px;
  position: relative;
  bottom: -55px;
  list-style: none;
  margin: 0px auto;
  padding: 0px;
  /*background-color: #4caf50;*/
}
.admval2 li{
  float: left;
  width: 33.33%;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  font-size: 18px;
  color: white;
  margin-top: 19px;
  /*line-height: 65px;*/
}
.admval2 li:nth-child(2){
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.admval2 li:first-child{
  margin-top: 20px;
}

  .main{
    width: 92%;
    height: 300px;
    margin: 0px auto;
    margin-top: 30px;
    background-color: white;
    border-radius: 5px;
  }
  .main p{
    text-align: left;
    padding-top: 15px;
    margin-left: 20px;
    font-size: 19px;

  }
  .mainlist{
    width: 100%;
    height: 220px;
    margin: 0px auto;
    margin-top: -10px;
    /*background-color: #4caf50;*/
  }
  .mainlist ul{
    list-style: none;
    margin: 0px;
    padding: 0px;

  }
.mainlist ul li{
  width: 25%;
  float: left;
  margin-top: 20px;

}
.main .mainlist p{
margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 15px;
}
</style>
