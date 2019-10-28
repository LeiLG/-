<template>
  <div>
    <mt-header fixed :title="por" >
      <router-link to="" slot="left">
        <mt-button @click="$router.go(-1)" icon="back">返回</mt-button>
      </router-link>
    </mt-header>

  </div>
</template>
<script>
  export default{
    data(){
      return{
      }
    },
    methods:{

    },
    props:['por'],
    mounted(){
//        console.log(this.$route.query.book)
    }
  }
</script>
<style scoped>

</style>
