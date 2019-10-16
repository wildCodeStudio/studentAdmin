<template>
  <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: [
            "学生人数",
            "web人数",
            "视觉人数",
            "就业人数",
            "教师人数",
            "班主任人数"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            data: [400, 280, 120, 200, 20, 10]
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>