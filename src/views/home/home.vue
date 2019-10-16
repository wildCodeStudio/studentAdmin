<template>
  <div class="dashboard-editor-container">
    <!-- <el-row>
      <Echars />
    </el-row>-->
    <el-row style="background:#fff;padding:16px 16px 0;">
      <EcharsZhu />
    </el-row>
  </div>
</template>

<script>
// import Echars from "./echars/echars";
import EcharsZhu from "./echars/echarszhu";
export default {
  components: {
    // Echars,
    EcharsZhu
  }
};
</script>