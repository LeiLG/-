<template>
  <div class="box">
    <HeaderVue :por="tit"></HeaderVue>


    <div class="main">
      <ul>
        <li><img :src="data.goodsImage"></li>
        <li>
          <div style="width: 70%;text-align: left;margin-left: 3%">
            {{data.goodsName}}

          </div>
        </li>
        <li><p>￥{{data.nowPrice}}</p></li>
        <li class="imgss" style="zoom: 0.3;overflow: hidden" ref="pops"></li>

      </ul>
    </div>


<div class="floot">
  <ul>
    <li @click="addcar">加入购物车</li>
    <li @click="playpop">立即兑换</li>
  </ul>
</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tit:"商品详情",
        data:{}
      }
    },
    created(){
      let id=this.$route.query.id
//      console.log(id)

      this.$axios.get('/goods/id/'+id)
        .then((res)=>{
//          console.log(res.data.data)
          this.data=res.data.data
          this.data.goodsImage=this.$store.state.pathimg+this.data.goodsImage


          this.$refs.pops.innerHTML=this.data.goodsContent

        })
    },
    mounted(){
//    console.log(this.data)


    },
    methods:{
        addcar:function () {
            let data={
                userId:this.$store.state.userId,
              goodsList:[
                this.data.goodId+',1'
              ]
            }

            this.$axios.get('getCart',{params:{userId:this.$store.state.userId}})
              .then((res)=>{

                console.log(res.data)
                for(let i=0;i<res.data.data.length;i++){
                    data.goodsList.push(res.data.data[i].goodId+','+res.data.data[i].goodsQty)
                  console.log(data.goodsList)

//                  data.goodsList=new Set(data.goodsList)
                }

                this.$axios.post('/saveCart',data,{
                  headers: {'Content-Type': 'application/json;charset=UTF-8'}
                })
                  .then((res)=>{
                    console.log(res.data)
                    if(res.data.code===0){
                      window.alert('加入购物车成功')
                    }
                  })
              })


        },
        playpop:function () {
              let data={
                userId:this.$store.state.userId,
                goodsList:[
                  this.data.goodId+',1'
                ]
              }

          this.$axios.post('/setOrder',data,{
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          })
            .then((res)=>{
              let dd=res.data.data.orderId

              if(res.data.code===0){

                this.$axios.get('/pay', {
                  params: {
                    userId: this.$store.state.userId,
                    orderId: dd
                  }
                }).then((res)=>{
                  console.log(res)
                  if(res.data.code===0){
                    window.alert('支付/兑换成功')
                  }
                })

              }
            })
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    background-color: white;
  }
.main{
  margin-top: 40px;
  padding-bottom: 100px;
}
.main ul {
  width: 100%;
  margin: 0px auto;
  list-style: none;
  padding: 0px;
}
.main ul li img{
  width: 100%;
  height: 100%;
}
.main ul li p{
  width: 70%;
  text-align: left;
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 3%;
  color: red;
  font-size: 20px;
}

.floot{
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid #cccccc;
  z-index: 999;
}
 .floot ul{
   width: 100%;
   height: 100%;
   list-style: none;
   margin: 0;
   padding: 0;
 }
  .floot ul li{
    width: 50%;
    float: left;
    line-height: 55px;
    font-size: 19px;
  }
.floot ul li:last-child{
  background-color: #d11d44;
  color: white;
}


  </style>
