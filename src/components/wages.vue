<template>
  <div>
    <HeaderVue :por="tit"></HeaderVue>

    <mt-datetime-picker
      v-model="dateValue"
      type="date"
      ref="datePicker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :endDate="new Date()"
      @confirm="handleConfirm">
    </mt-datetime-picker>

    <div class="main">
        <div class="mtime">
          <span>{{time}}</span>
          <span>
            <img @click="selectYear" style="width: 20px;height: 20px;position: relative;top: 3px" src="../assets/img/日期.png">
          </span>

        </div>
      <div>
        <ul class="money">
          <li>实发工资</li>
          <li><p>{{data2}}</p></li>
        </ul>
      </div>
      <div class="tit">
        <p>工资细明</p>
      </div>
    </div>
    <div class="moneylist">
      <ul>
        <li>基本工资：<span>{{data.basePay}}</span></li>
        <li>岗位工资：<span>{{data.positionPay}}</span></li>
        <li>加班工资：<span>{{data.extraPay}}</span></li>
        <li>应发工资：<span>{{data.realPay}}</span></li>
        <li>代扣社保：<span>{{data.costPay}}</span></li>
        <li>......<span>......</span></li>
      </ul>
    </div>
    <div class="message">
        <p>留言</p>
      <textarea v-model="data.remark"></textarea>
    </div>


  </div>
</template>

<script>
  export default {
    data () {
      return {
          tit:'工资条',
        time:'',
        year:'',
        month:'',
        date:'',
        isClicked:false,
        dateValue:'',

        data:{},
        data2:''


      }
    }
    ,
    created(){
      let Mydate=new Date()
      let monthn=Mydate.getMonth()+1
      let year=Mydate.getFullYear()
      this.year=year
      this.month=monthn
      this.time=year+"年"+monthn+"月"

    },
    mounted(){
        //查询工资条信息
      let times=this.year+'-'+this.month
//      console.log(this.month)

      this.$axios.get('/getPayByMonth',
        {params:{userId:this.$store.state.userId,month:times}
        })
        .then((res)=>{
          console.log(res.data.data[0])
          this.data=res.data.data[0]
          this.data2=this.data.realPay-this.data.costPay
        })
    },
    methods:{
      selectYear () {
        this.$refs.datePicker.open();
      },
      handleConfirm (value) {

        this.year = value.getFullYear();
        this.month = value.getMonth() + 1;
        this.isClicked = true;
        this.time=this.year+"年"+this.month+"月"
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin: 0px auto;
    margin-top: 65px;
    width: 90%;
    height: 130px;
    background-color: #dedede;
    border-radius: 8px;
    text-align: left;


  }
.mtime span{
  text-align: left;
  padding-top: 8px;
  margin-left: 10px;
}
.money{
  margin: 0px auto;
  padding: 0px;
  list-style: none;

}
  .money li{
    text-align: center;
    color: #a9acb1;

  }
  .money li p{
    font-size: 28px;
    color: #d11d44;
    font-weight: bold;
    margin-top: 15px;
  }

  .tit{
    width: 90%;
    height: 60px;
    margin-top: 50px;
    color: #a9acb1;
  }
  .moneylist{
    width: 100%;
    margin: 0px auto;
    padding: 0px;
    background-color: white;
    margin-top: 50px;

  }
  .moneylist ul{
    width: 100%;
    margin: 0px;
    padding: 0px;
    list-style: none;


  }
  .moneylist ul li{
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    width: 100%;
    height: 45px;
    text-align: left;
    text-indent: 3%;
    font-size: 18px;
    border-top: 1px solid #a9acb1;
    line-height: 45px;

  }
  .moneylist ul li:first-child{
    border-top: 0px;
  }
  .moneylist ul li span{
     float: right;
    margin-right: 3%;
    color: #d11d44;
  }


.message{
  width: 100%;
}
  .message p{
    text-align: left;
    margin-left: 5%;
    color: #a9acb1;
  }
  .message textarea{
    border: 0px;
    width: 92%;
    height: 100px;
  }
</style>
