<template>
  <div>

    <div class="main" ref="list">
      <div class="box" v-for="(val,index) in date" :key="index">
        <div class="inp">
            <div class="inpj" @click="plays(index)">
              <img v-show="val.shows" src="../assets/img/对勾1.png" alt="">
            </div>
        </div>
        <div class="imgs">
          <img :src="val.goodsImage" alt="">
        </div>
        <div class="tit">
            <p>{{val.goodsName}}</p>

        </div>
        <div class="btns">
          <span>￥{{val.nowPrice}}</span>
          <ul class="shul" >
            <li @click="reduc(index)">-</li>
            <li>{{val.goodsQty}}</li>
            <li @click="add(index)">+</li>
          </ul>
        </div>
      </div>

    </div>

    <div class="jies">
      <div class="jies2">
        <div class="inpj2" @click="playall">
          <img v-show="showall"  src="../assets/img/对勾1.png" alt="">
        </div>
        <span>全选</span>
        <span ref="pri">￥{{price.price}}</span>
        <button @click="jies">去结算</button>
      </div>
    </div>



    <FlootVue :bar="bar"></FlootVue>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        bar:'shop',
        value:true,
        showall:false,
        date:[],
        datalist:[]
      }
    },
    created(){
      document.title="购物车";
        this.$axios.get('/getCart',{params:{userId:this.$store.state.userId}})
          .then((res)=>{
            this.date=res.data.data
            for(let i=0;i<this.date.length;i++){
              this.date[i].goodsImage=this.$store.state.pathimg+this.date[i].goodsImage
              this.$set(this.date[i],'shows',false)
            }
          })
    },
    methods:{

        //选中全部按钮
        playall:function () {
          this.showall=!this.showall
          for(let i=0;i<this.date.length;i++){
            if(this.showall){
            this.date[i].shows=true
            }else {
              this.date[i].shows=false
            }
          }

      },
      //单个选中按钮
        plays:function (index) {
              console.log(this.date[index])
              if(!this.date[index].shows){
                this.date[index].shows=true
              }else {
                this.date[index].shows=false
              }

        },
      //加数量
        add:function (index) {
            if(this.date[index].goodsQty<10){
              this.date[index].goodsQty++
            }else {
              this.date[index].goodsQty=10
            }

        },
      //减数量
        reduc:function (index) {
            if(this.date[index].goodsQty>0){
              this.date[index].goodsQty--
            }else {
              this.date[index].goodsQty=0
            }

      },
      //结算
        jies:function () {


          //判断当前用户有没有选择商品
          if(this.$refs.pri.innerText.slice(1)>0){
                //循环变量选择商品的id和数量
            for(let i=0;i<this.date.length;i++){
              if(this.date[i].shows){
                this.datalist.push(this.date[i].goodId+','+this.date[i].goodsQty)
              }
            }
            let date={
              userId:this.$store.state.userId,
              goodsList:this.datalist
            }
            date=JSON.stringify(date)

            //提交订单接口
            this.$axios.post('/setOrder',date,
              {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
              .then((res)=>{

                //判断是否成功生成订单
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

          }else {
              window.alert('您还没有选择商品')
          }




        }
    },
    computed:{
      price() {
        let that=this
        let price=0
        for(let i=0;i<that.date.length;i++){
            if(that.date[i].shows){
                price+=that.date[i].nowPrice*that.date[i].goodsQty
            }
        }
        return {
          price
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
  width: 100%;
  background-color: white;
  margin-top: 15px;
}
  .box{
    width: 92%;
    height: 100px;
    margin: 0px auto;
    padding-bottom: 15px;
    background-color: white;
  }
  .inp{
    width: 10%;
    height: 100px;
    float: left;
    padding-top: 42px;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    /*background-color: #ffc107;*/
  }
  .inpj{
    width: 18px;
    height: 18px;
    border: 1px solid #a9acb1;
    border-radius: 50%;
  }
  .inpj img{
    width: 100%;
    height: 100%;
  }


  .imgs{
    float: left;
    height: 100%;
    width: 27%;
  }
  .imgs img{
    width: 100%;
    height: 100%;
  }

  .tit{
    width: 60%;
    height: 50px;
    float: right;
  }
  .tit p{
    text-align: left;
    font-size: 17px;
    margin-top: 0px;
  }
  .btns{
    width: 60%;
    float: right;
  }
  .btns span{
    float: left;
    position: relative;
    top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #d11d44;
  }

  .shul{
    list-style: none;
    width: 40%;
    float: right;
    margin: 0px;
    padding: 0px;
    margin-top: 13px;
    border: 1px solid #a9acb1;

  }
  .shul li{
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    width: 33%;
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 22px;
  }
  .shul li:nth-child(2){
    border-left: 1px solid #a9acb1;
    border-right: 1px solid #a9acb1;
  }

  .jies{
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 55px;
    background-color: white;
  }
  .jies2{
    width: 92%;
    height: 55px;
    margin: 0px auto;

  }
  .inpj2{
  width: 18px;
  height: 18px;
  border: 1px solid #a9acb1;
  border-radius: 50%;
  position: relative;
  top: 18px;
}
  .inpj2 img{
  width: 100%;
  height: 100%;
}
  .jies2 span{
    float: left;
    margin-left: 10%;
    margin-top: -3px;
    font-size: 17px;
    color: #999999;
  }
  .jies2 span:nth-child(3){
    float: left;
    margin-left: 32%;
    margin-top: -6px;
    font-size: 22px;
    font-weight: bold;
    color: #d11d44;
}
  .jies2 button{
    width: 70px;
    height: 30px;
    background-color: white;
    border: 1px solid #999999;
    border-radius: 15px;
    margin-top: -6px;
}
</style>
