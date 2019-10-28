<template>
  <div>
    <HeaderVue :por="tit"></HeaderVue>

    <div class="main">
       <div class="tit">
         <ul ref="tits">
           <li> <p style="width: 35px">全部</p></li>
           <li> <p>待付款</p></li>
           <li> <p>待收货</p></li>
           <li> <p>已完成</p></li>
         </ul>
       </div>


      <div class="val" v-for="(val,index) in date" :key="index">
          <p class="valtit">订单号：{{val.orderId}} <span>{{val.zt}}</span></p>
          <div class="popval">
            <img class="popimg" :src="dates[index].goodsImage" alt="">
            <div class="poptit">
              <p style="margin-top: 0px;margin-bottom: 40px">{{dates[index].goodsName}}</p>
              <p>￥{{val.goodsAmount}}积分</p>
            </div>
          </div>
        <div class="popjg">
          <p>共{{dates[index].goodsQty}}件&nbsp;&nbsp;&nbsp;合计：&nbsp;<span>￥{{val.orderAmount}}</span></p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
     tit:'全部订单',
        claname:'clip',
        id:0,
        date:[],
        dates:[]
      }
    }
    ,
    created(){
      this.id=this.$route.query.id

    },
    mounted(){

      let that = this
      let child = this.$refs.tits.children
      this.$refs.tits.children[0].children[0].className = "clip"
      for (let i = 0; i < child.length; i++) {
        child[i].onclick = function () {
          for (let i = 0; i < child.length; i++) {
            child[i].children[0].className = ''
          }
          this.children[0].className = "clip"
          //留空，进行接口请求，获取对应状态的数据

          if (this.children[0].innerText === '待付款') {
            that.$axios.get('/getOrderByUserIdAndStatus', {
              params: {userId: that.$store.state.userId, orderStatus: 1}
            }).then((res) => {
              that.date = res.data.data
              that.dates.length = 0
              for (let i = 0; i < that.date.length; i++) {
                that.date[i].zt = '待付款'
                that.dates.push(that.date[i].goodsList[0])
//                    console.log(that.dates)

              }
              for (let i = 0; i < that.dates.length; i++) {
                that.dates[i].goodsImage = that.$store.state.pathimg + that.dates[i].goodsImage
              }
            })


          } else if (this.children[0].innerText === '待收货') {
            that.$axios.get('/getOrderByUserIdAndStatus', {
              params: {userId: that.$store.state.userId, orderStatus: 2}
            }).then((res) => {
              that.date = res.data.data
//                  console.log(that.date)
              that.dates.length = 0
              for (let i = 0; i < that.date.length; i++) {
                that.date[i].zt = '待收货'

                that.dates.push(that.date[i].goodsList[0])

              }
              for (let i = 0; i < that.dates.length; i++) {
                that.dates[i].goodsImage = that.$store.state.pathimg + that.dates[i].goodsImage
              }
            })


          } else if (this.children[0].innerText === '已完成') {
            that.$axios.get('/getOrderByUserIdAndStatus', {
              params: {userId: that.$store.state.userId, orderStatus: 3}
            }).then((res) => {
              that.date = res.data.data
              that.dates.length = 0
              for (let i = 0; i < that.date.length; i++) {
                that.date[i].zt = '已完成'

                that.dates.push(that.date[i].goodsList[0])

              }
              for (let i = 0; i < that.dates.length; i++) {
                that.dates[i].goodsImage = that.$store.state.pathimg + that.dates[i].goodsImage
              }
            })
          } else if (this.children[0].innerText === '全部') {
            that.$axios.get('/getOrderByUserIdAndStatus', {
              params: {userId: that.$store.state.userId, orderStatus: ''}
            }).then((res) => {
              that.date = res.data.data
              console.log(res.data.data)

              that.dates.length = 0
              for (let i = 0; i < that.date.length; i++) {
                that.date[i].zt = '全部'

                that.dates.push(that.date[i].goodsList[0])

              }
              for (let i = 0; i < that.dates.length; i++) {
                that.dates[i].goodsImage = that.$store.state.pathimg + that.dates[i].goodsImage
              }
            })
          }


        }
      }

      if (this.id === 0) {
        this.$axios.get('/getOrderByUserIdAndStatus', {
          params: {userId: this.$store.state.userId, orderStatus: ''}
        }).then((res) => {
          console.log(res.data.data)
          that.date = res.data.data
            this.dates.length=0
            for(let i=0;i<this.date.length;i++){
              this.date[i].zt='全部订单'

              this.dates.push(this.date[i].goodsList[0])

              for(let i=0;i<child.length;i++){
                child[i].children[0].className=""
              }
              child[0].children[0].className="clip"
            }
            for(let i=0;i<this.dates.length;i++){
              this.dates[i].goodsImage=this.$store.state.pathimg+this.dates[i].goodsImage
            }


        })
      } else {
        this.$axios.get('/getOrderByUserIdAndStatus', {
          params: {userId: this.$store.state.userId, orderStatus: this.id}
        }).then((res) => {
          this.date = res.data.data
          if (this.id === 1) {
            this.dates.length = 0
            for (let i = 0; i < this.date.length; i++) {
              this.date[i].zt = '待付款'

              this.dates.push(this.date[i].goodsList[0])
//              console.log(this.dates)


              for (let i = 0; i < child.length; i++) {
                child[i].children[0].className = ""
              }
              child[1].children[0].className = "clip"
            }
            for (let i = 0; i < this.dates.length; i++) {
              this.dates[i].goodsImage = this.$store.state.pathimg + this.dates[i].goodsImage
            }
          } else if (this.id === 2) {
            this.dates.length = 0
            for (let i = 0; i < this.date.length; i++) {
              this.date[i].zt = '待收货'

              this.dates.push(this.date[i].goodsList[0])


              for (let i = 0; i < child.length; i++) {
                child[i].children[0].className = ""
              }
              child[2].children[0].className = "clip"
            }
            for (let i = 0; i < this.dates.length; i++) {
              this.dates[i].goodsImage = this.$store.state.pathimg + this.dates[i].goodsImage
            }
          } else if (this.id === 3) {
            this.dates.length = 0
            for (let i = 0; i < this.date.length; i++) {
              this.date[i].zt = '交易成功'

              this.dates.push(this.date[i].goodsList[0])

              for (let i = 0; i < child.length; i++) {
                child[i].children[0].className = ""
              }
              child[3].children[0].className = "clip"
            }
            for (let i = 0; i < this.dates.length; i++) {
              this.dates[i].goodsImage = this.$store.state.pathimg + this.dates[i].goodsImage
            }
          }

        })

      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    padding-top: 40px;
  }
  .tit{
    width: 100%;
  }
  .tit ul{
    margin: 0px auto;
    padding: 0px;
    width: 94%;
    height: 50px;
    list-style: none;
  }
  .tit ul li{
    float: left;
    width: 25%;
    height: 100%;
    line-height: 35px;
    padding-top: 8px;
  }
  .tit ul li:nth-child(1){
     width: 15%;
   }
  .tit ul li:nth-child(2){
    width: 32%;
  }
  .tit ul li:nth-child(3){
    width: 32%;
  }
  .tit ul li:nth-child(4){
    width: 21%;
  }
  .tit ul li p{
    width: 50px;
    margin: 0px auto;

  }
  .clip{
    border-bottom: 1px solid #d11d44;
    color: #d11d44;
  }



  .val{
    width: 94%;
    height: 225px;
    margin: 0px auto;
    background-color: white;

  }
 .val .valtit{
    font-size: 14px;
   text-align: left;
   padding-top: 8px;
   padding-left: 8px;
  }
  .val .valtit span{
    float: right;
    color: #d11d44;

    padding-right: 8px;
  }
  .popval{
    width: 94%;
    overflow: hidden;
    margin: 0px auto;
    border-bottom: 1px solid #cccccc;
  }
  .popimg{
    width: 100px;
    height: 100px;
    float: left;
    padding-left: 8px;
  }
  .poptit{
    width: 60%;
    float: right;
    text-align: left;
    font-size: 15px;

  }
  .popjg{
    text-align: right;
    padding-right: 15px;
    color: #a9acb1;
  }
  .popjg span{
    font-weight: bold;
    font-size: 18px;
    color: #2c3e50;
  }


</style>
