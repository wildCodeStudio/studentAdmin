<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="search?tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())):tableData"
      style="width: 150%"
    >
      <!-- 用filter做了姓名的模糊查询: 如果搜索框有值的话就把列表数据赋值为模糊查询后的数据，没值的话就赋值为分好页的数据 -->

      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="学制" prop="study"></el-table-column>
      <el-table-column label="专业" prop="major"></el-table-column>
      <el-table-column label="班级" prop="class"></el-table-column>
      <el-table-column label="市场部" prop="cityCenter"></el-table-column>
      <el-table-column label="成绩" prop="chengji"></el-table-column>
      <el-table-column label="挂科次数" prop="Fail"></el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="info" round @click="excelShow">{{excelshow?"取消导入":"导入excel"}}</el-button>
        </template>
        <el-button size="mini" type="primary">修改</el-button>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            style="font-size:10px;padding-right:3px;margin-top:8px;"
            placeholder="姓名关键字"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination
      style="position:absolute;top:500px;"
      v-show="search?false:true"
      :current-page="currentPage"
      @current-change="current_change"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
    <!-- 导入Excel模块 -->
    <div class="app-container" v-show="excelshow">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
  </div>
</template>

<script>
import { getAllPage, addAllStudent, delAllStudent } from "@/api/api";
import UploadExcelComponent from "../../components/UploadExcel/index";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      listLoading: true, //加载状态
      excelshow: false, //导入Excel模块是否显示
      tableData: [], //所有学生数据
      search: "", //搜索的model绑定值
      // ··················································分页数据
      total: 1, //数据总条数，默认给1
      pageSize: 7, //每页展示条数 用来让total进行切割，算出来一共的页数
      currentPage: 1 //当前在第几页
    };
  },
  async created() {
    // this.tableData = await getAll()
    if (this.$route.params.maxpage) {
      // 判断有没有增加页面传过来的路由参数
      let allList = await getAllPage(this.$route.params.maxpage); //先根据传过来的路由参数请求一遍数据并赋值
      this.tableData = allList.data.data;
      this.listLoading = false;
      this.total = allList.data.total;
      if (this.tableData.length >= 7) {
        //如果说数据的长度大于等于7则把传过来的路由参数+1作为参数请求一遍数据
        let allList = await getAllPage(this.$route.params.maxpage + 1);
        this.tableData = allList.data.data; //数据重新赋值
        this.listLoading = false;
        this.total = allList.data.total; //总数量重新赋值
        this.currentPage = this.$route.params.maxpage + 1; //页数重新赋值
      } else {
        //否则的说明长度没超过当前页所允许的最大页数7，则正常进行请求赋值
        let allList = await getAllPage(this.$route.params.maxpage);
        this.tableData = allList.data.data;
        this.listLoading = false;
        this.total = allList.data.total;
        this.currentPage = this.$route.params.maxpage;
      }
    } else {
      //没传则默认请求第一页的数据
      let allList = await getAllPage(1);
      this.tableData = allList.data.data;
      this.listLoading = false;
      this.total = allList.data.total;
    }
  },
  methods: {
    // 分页中拿到当前所在页数的函数
    async current_change(currentPage) {
      this.currentPage = currentPage;
      let allList = await getAllPage(currentPage);
      this.tableData = allList.data.data;
    },
    excelShow() {
      let maxPage = Math.ceil(this.total / this.pageSize); //向上取整通过总条数拿到最大页数
      if (this.currentPage === maxPage) {
        // 判断当前是否在最后一页
        this.excelshow = !this.excelshow;
      } else {
        this.$message.error("请去最后一页导入");
        return false;
      }
    },
    // 删除一项
    async handleDelete(index) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let Id = this.tableData[index]._id;
          delAllStudent(Id).then(res => {
            if (res.data.code === 201) {
              this.$message.error(res.data.msg);
            } else {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              // 在二次确认框中无法使用await，要用.then
              getAllPage(this.currentPage).then(res => {
                if (res.data.code === 202) {
                  // 如果说删除的是当前页的最后一条数据，那么如果参数还发送currentPage就会走后台配置好的超过当前最大页数的操作，状态码是202，就要重新发送请求并且将参数减一
                  getAllPage(this.currentPage - 1).then(res => {
                    this.tableData = res.data.data;
                    this.currentPage = res.data.delpage;
                    this.total = res.data.total;
                  });
                  return false;
                } //否则正常删除、赋值
                this.tableData = res.data.data;
                this.currentPage = res.data.delpage;
                this.total = res.data.total;
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // Excel上传方法
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    async handleSuccess({ results, header }) {
      let obj = {
        name: header[0],
        sex: header[1],
        age: header[2],
        study: header[3],
        major: header[4],
        class: header[5],
        cityCenter: header[6],
        chengji: header[7],
        Fail: header[8]
      };
      let success = await addAllStudent(obj);
      if (success.data.code === 201) {
        this.$message.error(success.data.msg);
      } else {
        this.$message({
          message: success.data.msg,
          type: "success"
        });
        if (this.tableData.length >= 7) {
          getAllPage(this.currentPage + 1).then(res => {
            this.tableData = res.data.data;
            this.currentPage = res.data.delpage;
            this.total = res.data.total;
          });
        } else {
          getAllPage(this.currentPage).then(res => {
            this.tableData = res.data.data;
            this.currentPage = res.data.delpage;
            this.total = res.data.total;
          });
        }

        this.excelShow();
      }
    }
  }
};
</script>
<style scoped>
</style>
