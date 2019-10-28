<template>
  <div class="main">

        <div class="logo">
            <h1>logo</h1>
        </div>
        <div class="froms">
          <ul>
            <li>姓名：<input @input="lenfun" v-model="username" type="text" placeholder="请输入您的姓名"></li>
            <li>部门：<input @input="lenfun" v-model="dept" type="text" placeholder="请输入您所在的部门"></li>
            <li>职位：<input @input="lenfun" v-model="position" type="text" placeholder="请输入您所担任的职位"></li>
            <li>入职日期：<input @input="lenfun" v-model="inDate"  type="text" placeholder="请选择入职时间">
              <img @click="selectYear" style="width: 27px;height: 27px;float: right;position: relative;top: 12px" src="../../assets/img/日期.png">
            </li>
            <li>手机号：<input @input="lenfun" v-model="mobile" type="text" placeholder="请输入11位手机号"> <button @click="code">获取验证码</button></li>
            <li>验证码：<input @input="lenfun" v-model="num" type="text" placeholder="请输入短信验证码"></li>
          </ul>
        </div>

    <button :class="showbtn? 'sub' : 'sub2' " @click="subcli">注册</button>

    <p>
      <img style="width: 15px;height: 15px;position: relative;top: 3px" src="../../assets/img/对勾.png" alt="">
    我已阅读《注册协议》并同意
    </p>

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


  </div>
</template>

<script>
  export default {
    data () {
      return {
          showbtn:false,


        year:'',
        month:'',
        date:'',
        dateValue:'',    //以上是定义的时间data
        //以下是表单data
        inDate:'',
        username:'',
        dept:'',
        position:'',
        mobile:'',
        num:''

      }
    }
    ,
    created(){
      document.title="注册"
    },
    methods:{
        //打开时间选择器方法
      selectYear () {
        this.$refs.datePicker.open();
      },
      //获取用户输入的时间
      handleConfirm (value) {

        this.year = value.getFullYear();
        this.month = value.getMonth() + 1;
        this.date = value.getDate();
        this.isClicked = true;
        this.inDate=this.year+"-"+this.month+"-"+this.date
      },
      //判断用户是否填写完整
      lenfun:function () {
        if(this.num!==''&&this.mobile!==''&&this.dept!==''&&this.username!==''&&this.position!==''&&this.inDate!==''){
            this.showbtn=true
        }else {
          this.showbtn=false
        }
      },
      //根据用户是否填写完成判断能否注册
      subcli:function () {
        if(this.showbtn){


          let date={
            username:this.username,
            dept:this.dept,
            position:this.position,
            inDate:this.inDate,
            mobile:this.mobile
          }
          date=JSON.stringify(date)
          this.$axios.post('/reg',date,
            {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then((res)=>{
              console.log(res)
            })

            this.$axios.get('/mobile/'+this.mobile+'/'+this.num)
              .then((res)=>{
                console.log(res.data.code)
                if(res.data.code===0){
                    let date={
                      username:this.username,
                      dept:this.dept,
                      position:this.position,
                      inDate:this.inDate,
                      mobile:this.mobile
                    }
                      date=JSON.stringify(date)
                      this.$axios.post('/reg',date,
                        {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
                        .then((res)=>{
                            console.log(res)
                        })
                      this.$router.push({name:'submi'})


                }else {
                    window.alert('验证码错误')
                }
              })
        }else {
            window.alert('请完整填写信息')
        }
      },
      //点击获取验证码按钮，获取验证码
      code:function () {
        this.$axios.get('/mobile/'+this.mobile)
          .then((res)=>{
            console.log(res)
          })
      }
    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    background-color: white;
    height: 812px;
  }
  .logo{
  width: 100%;
  height: 200px;
  margin: 0px;
  padding: 0px;


}
  .logo h1{
    margin: 0px;
    padding: 0px;
  }
  .froms ul{
    width: 92%;
    list-style: none;
    margin: 0px auto;
    padding: 0px;
    text-align: left;
    padding-bottom: 10px;
  }
  .froms ul li{
    width: 100%;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    border-top: 1px solid #999999;

  }
  .froms ul li:last-child{
    border-bottom: 1px solid #999999;
  }
  input{
    width: 50%;
    margin: 0px auto;
    height: 45px;
    border: 0px;
    text-indent: 8px;
    font-size: 15px;
  }
  @media screen and (max-width: 325px){
    input{
      width: 50%;
      margin: 0px auto;
      height: 45px;
      border: 0px;
      text-indent: 8px;
      font-size: 14px;
    }
    .main{
      background-color: white;
      height: 700px;
    }
  }
  button{
    border: 0px;
    height: 45px;
    background-color: #d11d44;
    color: white;
    float: right;
    margin-top: 0.5px;

  }

  .sub{
    width: 90%;
    margin: 0px auto;
    float: none;
    margin-top: 30px;
    border-radius: 5px;
  }
  .sub2{
    width: 90%;
    margin: 0px auto;
    float: none;
    margin-top: 30px;
    border-radius: 5px;
    background-color: #dedede;
    color: #999999;
  }
  p{
    font-size: 14px;

  }
</style>
