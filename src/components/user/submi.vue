<template>
  <div>


    <div class="main">
      <img style="width: 55px;height: 55px;margin-top: 125px" src="../../assets/img/正品保障-对勾.png" alt="">
      <p>已经提交成功，等待审核...</p>
    </div>


    <div class="btn">
      <router-link  :to="{name:'admin'}">
      <button>返回</button>
      </router-link>
    </div>


  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
    ,
    created(){
      document.title="提交审核"
    },
    methods:{

    },

    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    background-color: white;
    height: 736px;
  }

.btn{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 150px;

}
.btn button{
  width: 85px;
  height: 45px;
  background-color: white;
  border: 1px solid #2c3e50;
  font-size: 17px;
  border-radius: 25px;
}
  @media screen and (max-width: 325px){
    .main{
      background-color: white;
      height: 667px;
    }
  }

</style>
