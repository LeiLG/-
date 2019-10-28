<template>
  <div>

    <div class="dashboard" ref="test1"></div>




  </div>
</template>

<script>
  export default {
    data () {
      return {
        options1: {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },

          //下面属性才是仪表盘的核心！！反正我是这么认为的！！！
          series: [
            {
              //类型
              type: "gauge",
              min: 0,
              max: 1000,
              //半径
              radius: 150,
              //起始角度。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
              startAngle: 220,
              //结束角度。
              endAngle: -40,
              center: ["50%", "60%"],
              //仪表盘轴线相关配置。
              axisLine: {
                show: true,
                // 属性lineStyle控制线条样式
                lineStyle: {
                  width: 20,
                  color: [[1, "#63869e"]]
                }
              },
              //分隔线样式。
              splitLine: {            // 分隔线样式。
                show: true,             // 是否显示分隔线,默认 true。
                length: 30,             // 分隔线线长。支持相对半径的百分比,默认 30。
                lineStyle: {            // 分隔线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 2,                   //线度,默认 2。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                }
              },
              //刻度样式。
              axisTick: {             // 刻度(线)样式。
                show: true,             // 是否显示刻度(线),默认 true。
                splitNumber: 6,         // 分隔线之间分割的刻度数,默认 5。
                length: 8,              // 刻度线长。支持相对半径的百分比,默认 8。
                lineStyle: {            // 刻度线样式。
                  color: "#eee",              //线的颜色,默认 #eee。
                  opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                  width: 1,                   //线度,默认 1。
                  type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
                  shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                  shadowColor: "#fff",        //阴影颜色。支持的格式同color。
                },
              },
              //刻度标签。
              axisLabel: {
                show: false
              },
              //仪表盘指针。
              pointer: {
                //这个show属性好像有问题，因为在这次开发中，需要去掉指正，我设置false的时候，还是显示指针，估计是BUG吧，我用的echarts-3.2.3；希望改进。最终，我把width属性设置为0，成功搞定！
                show: false,
                //指针长度
                length: "90%",
                width: 0
              },
              //仪表盘标题。
              title: {
                show: true,
                offsetCenter: [0, "-40%"], // x, y，单位px
                textStyle: {
                  color: "#hhh",
                  fontSize: 30
                }
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: true,
                offsetCenter: [0, "-10%"],
                formatter: "风险水平",
                textStyle: {
                  fontSize: 30
                }
              },
              data: [
                {
                  value: 150,
                  name: "中"
                }
              ]
            }
          ]
        },

      }
    }
    ,
    created(){
      document.title="提交审核"
    },
    methods:{
      timeTicket() {
        let myChart = this.$echarts.init(this.$refs.test1);
        //   绘制图表
//        setInterval(() => {
          var random = (Math.random() * 100).toFixed(2);
          // var random = 90;
          var color = [[random / 100, "#bed323"], [1, "#f3f3f3"]];
          this.options1.series[0].axisLine.lineStyle.color = color;
//          this.options1.series[0].data[0].value = random;
//          if (random < 30) {
//            this.options1.series[0].data[0].name = "低";
//          } else if (random < 70) {
//            this.options1.series[0].data[0].name = "中";
//          } else {
//            this.options1.series[0].data[0].name = "高";
//          }
          myChart.setOption(this.options1, true);
//        }, 200);
      },
    },

    mounted() {
      this.timeTicket();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    background-color: white;
    height: 812px;
  }
  @media screen and (max-width: 325px){
    .main{
      background-color: white;
      height: 700px;
    }
  }
  .dashboard {
    height: 20rem;
    background: #4b71fb;
  }
</style>
