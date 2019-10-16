<template>
  <el-transfer v-model="value"
               :data="data"
               :titles="['所有市场部', '当前市场部']"></el-transfer>
</template>

<script>
import { getMarket } from "@/api/api";
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: [],
      value: ["5da56af6593b23d9c924f3bd"]
    };
  },
  async mounted() {
    let { data } = await getMarket();
    const newData = [];
    for (let i = 0; i < data.data.length; i++) {
      newData.push({
        key: data.data[i]._id,
        label: data.data[i].marketname
      });
    }
    this.data = newData;
  }
};
</script>