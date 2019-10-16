<template>
  <div>
    <el-table v-loading="listLoading"
              :data="tableData"
              style="width: 150%">
      <el-table-column label="姓名"
                       prop="headname"></el-table-column>
      <el-table-column label="性别"
                       prop="headsex"></el-table-column>
      <el-table-column label="学院"
                       prop="college"></el-table-column>
      <el-table-column label="入职日期"
                       prop="entryDate"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     style="margin-top:3px;"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHeadTeacher, delHeadTeacher } from "@/api/api";
import UploadExcelComponent from "../../components/UploadExcel/index";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      listLoading: true, //加载状态
      tableData: [], //所有学生数据
      search: "" //搜索的model绑定值
    };
  },
  async mounted() {
    let { data } = await getHeadTeacher();
    this.tableData = data.data;
    if (data.code === 200) {
      this.listLoading = false;
    }
  },
  methods: {
    async handlegetHeadTeacher() {
      let { data } = await getHeadTeacher();
      this.tableData = data.data;
      if (data.code === 200) {
        this.listLoading = false;
      }
    },
    // 删除一项
    handleDelete(index) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async res => {
          let Id = this.tableData[index]._id;
          let { data } = await delHeadTeacher(Id);
          if (data.code === 200) {
            this.handlegetHeadTeacher();
            return this.$message.success(data.msg);
          }
          this.$message({
            message: data.msg,
            type: "error"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>
