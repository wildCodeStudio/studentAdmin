<template>
  <div>
    <el-table v-loading="listLoading"
              :data="tableData"
              style="width: 150%">
      <el-table-column label="名称"
                       prop="classname"></el-table-column>
      <el-table-column label="创建时间"
                       prop="createDate"></el-table-column>
      <el-table-column label="讲师"
                       prop="lecturer">

        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{scope.row.lecturer}}</div>
          <el-input v-show="isUpdate===scope.row._id"
                    size="mini"
                    style="width:70%"
                    v-model="update.lecturer" />
        </template>
      </el-table-column>
      <el-table-column label="班主任"
                       prop="headteacher">
        <template slot-scope="scope">
          <div v-show="isUpdate!==scope.row._id">{{scope.row.headteacher}}</div>
          <el-input v-show="isUpdate===scope.row._id"
                    size="mini"
                    style="width:70%"
                    v-model="update.headteacher" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header"
                  v-if="power">
          <el-button size="mini"
                     type="primary">查询</el-button>
        </template>
        <template slot-scope="scope"
                  v-if="power">
          <el-button size="mini"
                     type="primary"
                     v-show="isUpdate===scope.row._id"
                     @click="updateClassCancel()">取消</el-button>
          <el-button size="mini"
                     type="success"
                     v-show="isUpdate===scope.row._id"
                     @click="updateClassSucess(scope.row._id)">确定</el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="isUpdate!==scope.row._id"
                     @click="updateClass(scope.row)">修改</el-button>
          <el-button size="mini"
                     type="danger"
                     v-show="isUpdate!==scope.row._id"
                     @click="handleDelete(scope.row._id)">销毁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getClass, delClass, updateClass } from "@/api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      listLoading: true, //加载状态
      isUpdate: "",
      tableData: [], //所有学生数据
      update: {
        lecturer: "",
        headteacher: ""
      },
      search: "", //搜索的model绑定值
      power: false
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (this.roles.includes("vvv")) {
      this.power = true;
    }
  },
  async mounted() {
    let { data } = await getClass();
    this.tableData = data.data;
    if (data.code === 200) {
      this.listLoading = false;
    }
  },
  methods: {
    async handlegetHeadTeacher() {
      let { data } = await getClass();
      this.tableData = data.data;
      if (data.code === 200) {
        this.listLoading = false;
      }
    },
    // 删除一项
    handleDelete(id) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async res => {
          let { data } = await delClass(id);
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
    },
    // 修改一项
    updateClass(row) {
      this.update.lecturer = row.lecturer;
      this.update.headteacher = row.headteacher;
      this.isUpdate = row._id;
    },
    // 取消修改
    updateClassCancel() {
      this.isUpdate = "";
    },
    // 确定修改
    async updateClassSucess(id) {
      this.update["_id"] = id;
      if (this.update.lecturer === "" || this.update.headteacher === "") {
        return this.$message.error("更新信息中不能为空");
      }
      let { data } = await updateClass(this.update);
      if (data.code === 200) {
        this.$message.success(data.msg);
        this.updateClassCancel();
        this.handlegetHeadTeacher();
      } else {
        this.$message.error(data.msg);
      }
    },

    openDetails(row) {
      console.log(row);
    }
  }
};
</script>
<style scoped>
</style>
