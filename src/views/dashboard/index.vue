<template>
  <div>
    <!-- 查询模块 -->
    <div class="searchbox-bs-002" v-show="searchShow===1">
      <li>根据可选项搜索</li>
      <li>
        <el-input v-model="search.serName" size="mini" placeholder="姓名"></el-input>
      </li>
      <li>
        <el-select v-model="search.serStudy" size="mini" placeholder="学制">
          <el-option size="mini" v-for="item in upstudys" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.serMajor" size="mini" placeholder="专业">
          <el-option size="mini" v-for="item in upmajors" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.serClasses" size="mini" placeholder="班级">
          <el-option size="mini" v-for="item in upclasses" :key="item" :value="item"></el-option>
        </el-select>
      </li>
      <li>
        <el-select v-model="search.sercityCenter" size="mini" placeholder="市场部">
          <el-option size="mini" v-for="item in upcityCenters" :key="item" :value="item"></el-option>
        </el-select>
      </li>
      <li>
        <el-input v-model="search.serchengji" size="mini" placeholder="成绩/门"></el-input>
      </li>
      <li>
        <el-select v-model="search.serFailss" size="mini" placeholder="挂科次数">
          <el-option size="mini" v-for="item in searFail" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li style="display:flex;">
        <el-button size="small" type="success" @click="searchAll">确定</el-button>
        <el-button size="small" type="info" @click="searchQ">清空</el-button>
      </li>
    </div>
    <!-- 显示模块 -->
    <div style="margin-left:95%;" v-if="power">
      <el-button size="small" type="text" @click="chekout">{{chekShow?"取消":"批量删除"}}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 150%"
      @selection-change="checks"
      :row-key="getRowKey"
    >
      <!--@select-all="checkall" === > 选中当前页全部的时候触发的函数-->
      <el-table-column v-if="chekShow" :reserve-selection="true" type="selection" width="80"></el-table-column>
      <!-- 这里用v-if不能用v-show -->
      <!-- 多选框 -->
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <el-input
            v-model="upname"
            size="mini"
            v-if="scope.$index===updateShow"
            placeholder="请输入内容"
          ></el-input>
          <div v-else>{{tableData[scope.$index].name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow" style="display:flex;">
            <el-radio v-model="upsex" label="男">男</el-radio>
            <el-radio style="margin-left:-15px;" v-model="upsex" label="女">女</el-radio>
          </div>
          <div v-else>{{tableData[scope.$index].sex}}</div>
        </template>
      </el-table-column>
      <el-table-column label="年龄">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-input
              v-model="upage"
              size="mini"
              v-if="scope.$index===updateShow"
              placeholder="请输入内容"
            ></el-input>
          </div>
          <div v-else>{{tableData[scope.$index].age}}</div>
        </template>
      </el-table-column>
      <el-table-column label="学制">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upstudy" size="mini" placeholder="学制">
              <el-option size="mini" v-for="item in upstudys" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </div>
          <div v-else>{{tableData[scope.$index].study}}</div>
        </template>
      </el-table-column>
      <el-table-column label="专业">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upmajor" size="mini" placeholder="专业">
              <el-option size="mini" v-for="item in upmajors" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </div>
          <div v-else>{{tableData[scope.$index].major}}</div>
        </template>
      </el-table-column>
      <el-table-column label="班级">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upclass" size="mini" placeholder="班级">
              <el-option size="mini" v-for="item in upclasses" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div v-else>{{tableData[scope.$index].classes}}</div>
        </template>
      </el-table-column>
      <el-table-column label="市场部">
        <template slot-scope="scope">
          <div v-if="scope.$index===updateShow">
            <el-select v-model="upcityCenter" size="mini" placeholder="市场部">
              <el-option size="mini" v-for="item in upcityCenters" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div v-else>{{tableData[scope.$index].citycenter}}</div>
        </template>
      </el-table-column>
      <el-table-column label="成绩/门">
        <template slot-scope="scope">
          <el-input
            v-model="upchengji"
            size="mini"
            v-if="scope.$index===updateShow"
            placeholder="请输入内容"
          ></el-input>
          <div v-else>{{tableData[scope.$index].chengji}}</div>
        </template>
      </el-table-column>
      <el-table-column label="挂科次数/次">
        <template slot-scope="scope">
          <el-input
            v-model="upFail"
            size="mini"
            v-if="scope.$index===updateShow"
            placeholder="请输入内容"
          ></el-input>
          <div v-else>{{tableData[scope.$index].failss}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" v-if="power">
        <template slot="header" slot-scope="scope">操作</template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index===updateShow"
            size="mini"
            type="primary"
            @click="upquxiao()"
          >取消</el-button>
          <el-button v-else size="mini" type="primary" @click="updateList(scope)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button v-if="searchShow===1" type="primary" size="small" @click="quxiaoSearch">返回</el-button>
          <el-button v-else type="success" size="small" @click="searchshow">查询</el-button>
        </template>
        <template slot-scope="scope" v-if="power">
          <el-button
            v-if="scope.$index===updateShow"
            size="mini"
            type="primary"
            @click="upadteStud(scope)"
          >确定</el-button>
          <el-button
            v-else
            size="mini"
            type="danger"
            style="margin-top:3px;"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 批量删除按钮 -->
    <div style="margin-top:20px;margin-left:5px;" v-show="chekShow">
      <el-button size="big" type="danger" @click="pilDelete">批量删除</el-button>
    </div>
    <!-- 分页模块 -->
    <el-pagination
      v-show="pageShow"
      style="position:absolute;top:650px;"
      :current-page="currentPage"
      @current-change="current_change"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
    <div style="position:absolute;right:0;top:521px;right:10px;">
      <el-button size="mini" type="warning" round @click="excelShow">{{excelshow?"取消导入":"导入excel"}}</el-button>
      <el-button
        size="mini"
        :loading="exportLodding"
        type="success"
        round
        @click="outExcel"
      >导出当页excel</el-button>
    </div>
    <!-- 导入Excel模块 -->
    <div class="app-container" v-show="excelshow">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
  </div>
</template>

<script>
import {
  getAllPage,
  inExcel,
  addAllStudent,
  delAllStudent,
  updateAllStudent,
  selectAllstud,
  getMarket,
  getClass
} from "@/api/api";
import UploadExcelComponent from "../../components/UploadExcel/index";
import { mapGetters } from "vuex";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      exportLodding: false,
      listLoading: true, //加载状态
      excelshow: false, //导入Excel模块是否显示
      tableData: [], //所有学生数据
      searchShow: 2, //搜索模块是否显示 不为1就是不显示
      // ··················································分页数据
      total: 1, //数据总条数，默认给1
      pageSize: 7, //每页展示条数 用来让total进行切割，算出来一共的页数
      currentPage: 1, //当前在第几页,默认在第一页
      updateShow: 100000, //当前展示的修改弹出项，给这么大是为了一开始谁也匹配不到
      upname: "", //要修改的name,
      upsex: "", //要修改的性别
      upage: "", //要修改的年龄
      upstudy: "", //要修改的学制
      pageShow: true, //分页是否显示
      daochuexcel: false, //在导出excel的时候需要进行的判断，判断当你是搜索状态时为true(点击了搜索按钮才为true)才能导出
      search: {
        // 搜索的v-model绑定值
        serName: "",
        serStudy: "",
        serMajor: "",
        serClasses: "",
        sercityCenter: "",
        serchengji: "",
        serFailss: ""
      },
      upstudys: [
        //学制选项
        {
          value: "一年"
        },
        {
          value: "两年"
        },
        {
          value: "三年"
        }
      ],
      upmajor: "", //要修改的专业
      upmajors: [
        //专业选项
        {
          value: "web架构"
        },
        {
          value: "视觉设计"
        }
      ],
      upclass: "", //要修改的班级
      upclasses: [],
      upcityCenter: "", //要修改的市场部
      upcityCenters: [],
      upchengji: "", //要修改的成绩
      upFail: "", //要修改的挂科次数
      searFail: [
        //搜索挂科次数选项
        {
          value: "0次"
        },
        {
          value: "1次"
        },
        {
          value: "2次"
        },
        {
          value: "3次及以上"
        }
      ],
      checkeds: [], //批量删除中存放每一项_id的容器
      chekShow: false, //多选框(批量删除)是否显示
      power: false
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  async created() {
    if (this.roles.includes("vvv")) {
      this.power = true;
    }
    let shichang = await getMarket();
    let City = shichang.data.data.map(item => {
      return item["marketname"];
    });
    this.upcityCenters = City;

    let classes = await getClass();
    let Classs = classes.data.data.map(item => {
      return item["classname"];
    });
    this.upclasses = Classs;
    // this.tableData = await getAll()
    if (this.$route.params.maxpage) {
      // 判断有没有增加页面传过来的路由参数
      let allList = await getAllPage(this.$route.params.maxpage); //先根据传过来的路由参数请求一遍数据并赋值
      this.tableData = allList.data.data;
      this.listLoading = false;
      if (Math.ceil(allList.data.total / this.currentPage) > 7) {
        //如果说你拿到的数据总长度除去当前页数得到的值大于7了，就说明当前页数据条数超过7条了，就请求下一页的数据
        getAllPage(this.currentPage + 1).then(ress => {
          this.tableData = ress.data.data;
          this.currentPage = this.currentPage + 1;
          this.total = ress.data.total;
          if (this.currentPage != ress.data.delpage) {
            //如果你下一页的页数还是不等于后端返回给你的总数据的最大页数，就请求总数据的最大页数并且重新给页数赋值
            getAllPage(ress.data.delpage).then(ress => {
              this.tableData = ress.data.data;
              this.currentPage = ress.data.delpage;
              this.total = ress.data.total;
            });
          }
        });
      } else {
        this.tableData = allList.data.data;
        this.currentPage = allList.data.delpage; //拿取到后端传输的最新的currentPage以及总条数tota实现分页的对应
        this.total = allList.data.total;
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
      if (
        this.searchShow === 1 &&
        this.search.serName == "" &&
        this.search.serStudy == "" &&
        this.search.serMajor == "" &&
        this.search.serClasses == "" &&
        this.search.sercityCenter == "" &&
        this.search.serchengji == "" &&
        this.search.serFailss == ""
      ) {
        this.$message.error("您搜索框已打开，请不要为空");
        this.currentPage = 1;
        this.pageShow = false;
        return false;
      } else {
        if (this.searchShow === 1) {
          if (
            this.searchShow === 1 &&
            this.search.serName == "" &&
            this.search.serStudy == "" &&
            this.search.serMajor == "" &&
            this.search.serClasses == "" &&
            this.search.sercityCenter == "" &&
            this.search.serchengji == "" &&
            this.search.serFailss == ""
          ) {
            this.$message.error("您搜索框已打开，请不要为空");
            this.currentPage = 1;
            this.pageShow = false;
            return false;
          } else {
            let obj = {};
            for (let key in this.search) {
              if (this.search.hasOwnProperty(key)) {
                if (this.search[key] != "") {
                  obj[key.slice(3).toLowerCase()] = this.search[key];
                }
              }
            }
            let searchSuc = await selectAllstud(
              currentPage === 1 ? 1 : currentPage,
              obj
            );
            this.pageShow = true;
            this.currentPage = currentPage;
            this.total = searchSuc.data.total;
            if (currentPage > Math.ceil(this.total / this.pageSize)) {
              selectAllstud(Math.ceil(this.total / this.pageSize), obj).then(
                res => {
                  this.currentPage = Math.ceil(this.total / this.pageSize);
                  this.tableData = res.data.data;
                }
              );
            } else {
              this.tableData = searchSuc.data.data;
            }
          }
        } else {
          this.pageShow = true;
          let maxPage = Math.ceil(this.tableData.length / this.pageSize); //向上取整通过总条数拿到最大页数
          if (this.currentPage != maxPage) {
            // 判断当前是否在最后一页
            this.currentPage = currentPage;
            let allList = await getAllPage(currentPage);
            this.tableData = allList.data.data;
            this.excelshow = false; //不在则不显示导入框
          } else {
            this.currentPage = currentPage;
            let allList = await getAllPage(currentPage);
            this.tableData = allList.data.data;
          }
        }
      }
    },
    excelShow() {
      let maxPage = Math.ceil(this.total / this.pageSize); //向上取整通过总条数拿到最大页数
      if (this.searchShow === 1) {
        this.$message.error("不可再搜索状态下进行导入");
        return false;
      } else if (this.currentPage === maxPage) {
        // 判断当前是否在最后一页
        this.excelshow = !this.excelshow;
      } else {
        this.$message.error("请去最后一页操作");
        return false;
      }
    },
    // 删除一项
    async handleDelete(index) {
      if (this.searchShow === 1) {
        if (
          this.search.serName == "" &&
          this.search.serStudy == "" &&
          this.search.serMajor == "" &&
          this.search.serClasses == "" &&
          this.search.sercityCenter == "" &&
          this.search.serchengji == "" &&
          this.search.serFailss == ""
        ) {
          this.$message.error("搜索不能全部为空");
          this.excelshow = false; //不在则不显示导入框
          return false;
        }
      }
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
              if (this.searchShow === 1) {
                let __index = this.tableData.indexOf(
                  this.tableData.find(item => {
                    return this.tableData[index]._id === item._id;
                  })
                );
                this.tableData.splice(__index, 1);
                setTimeout(() => {
                  this.$message.success("根据搜索项自动为您过滤");
                  this.searchAll();
                  this.currentPage = 1;
                }, 500);
              } else {
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
                  this.total = res.data.total;
                });
              }
              // 在二次确认框中无法使用await，要用.then
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
    handleSuccess({ results, header }) {
      let obj;
      let arrs = [];
      results.map(item => {
        obj = {
          name: item["姓名"],
          sex: item["性别"],
          age: item["年龄"],
          study: item["学制"],
          major: item["专业"],
          classes: item["班级"],
          citycenter: item["市场部"],
          chengji: item["成绩"],
          failss: item["挂科次数"]
        };
        arrs.push(obj);
      });
      inExcel(arrs).then(res => {
        if (res.data.code === 201) {
          this.$message.error(res.data.msg);
        } else {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          getAllPage(this.currentPage).then(res => {
            //导入的时候先请求一下实时获取最新的tableData数据进行赋值，再进行判断当前页数是否超过了七条。（防止tableData的值不实时跟新）
            this.tableData = res.data.data;
            if (Math.ceil(res.data.total / this.currentPage) > 7) {
              //如果说你拿到的数据总长度除去当前页数得到的值大于7了，就说明当前页数据条数超过7条了，就请求下一页的数据
              getAllPage(this.currentPage + 1).then(ress => {
                this.tableData = ress.data.data;
                this.currentPage = this.currentPage + 1;
                this.total = ress.data.total;
                if (this.currentPage != ress.data.delpage) {
                  //如果你下一页的页数还是不等于后端返回给你的总数据的最大页数，就请求总数据的最大页数并且重新给页数赋值
                  getAllPage(ress.data.delpage).then(ress => {
                    this.tableData = ress.data.data;
                    this.currentPage = ress.data.delpage;
                    this.total = ress.data.total;
                  });
                }
              });
            } else {
              this.tableData = res.data.data;
              this.currentPage = res.data.delpage; //拿取到后端传输的最新的currentPage以及总条数tota实现分页的对应
              this.total = res.data.total;
            }
          });
        }
      });
    },
    // 修改内容显示函数
    updateList(scope) {
      if (this.searchShow === 1) {
        if (
          this.search.serName == "" &&
          this.search.serStudy == "" &&
          this.search.serMajor == "" &&
          this.search.serClasses == "" &&
          this.search.sercityCenter == "" &&
          this.search.serchengji == "" &&
          this.search.serFailss == ""
        ) {
          this.$message.error("搜索不能全部为空");
          return false;
        } else {
          this.updateShow = scope.$index;
          this.upname = this.tableData[scope.$index].name;
          this.upsex = this.tableData[scope.$index].sex;
          this.upage = this.tableData[scope.$index].age;
          this.upstudy = this.tableData[scope.$index].study;
          this.upmajor = this.tableData[scope.$index].major;
          this.upclass = this.tableData[scope.$index].classes;
          this.upcityCenter = this.tableData[scope.$index].citycenter;
          this.upchengji = this.tableData[scope.$index].chengji;
          this.upFail = this.tableData[scope.$index].failss;
        }
      } else {
        this.updateShow = scope.$index;
        this.upname = this.tableData[scope.$index].name;
        this.upsex = this.tableData[scope.$index].sex;
        this.upage = this.tableData[scope.$index].age;
        this.upstudy = this.tableData[scope.$index].study;
        this.upmajor = this.tableData[scope.$index].major;
        this.upclass = this.tableData[scope.$index].classes;
        this.upcityCenter = this.tableData[scope.$index].citycenter;
        this.upchengji = this.tableData[scope.$index].chengji;
        this.upFail = this.tableData[scope.$index].failss;
      }
    },
    // 确定修改函数
    async upadteStud(scope) {
      if (
        this.upname === this.tableData[scope.$index].name &&
        this.upsex === this.tableData[scope.$index].sex &&
        this.upage === this.tableData[scope.$index].age &&
        this.upstudy === this.tableData[scope.$index].study &&
        this.upmajor === this.tableData[scope.$index].major &&
        this.upclass === this.tableData[scope.$index].classes &&
        this.upcityCenter === this.tableData[scope.$index].citycenter &&
        this.upchengji === this.tableData[scope.$index].chengji &&
        this.upFail === this.tableData[scope.$index].failss
      ) {
        this.$message.error("您没有做任何更改");
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.upchengji)) {
        //判断不带汉字的正则
        this.$message.error("成绩不必带单位");
        return false;
      } else if (/.*[\u4e00-\u9fa5]+.*$/.test(this.upFail)) {
        //判断不带汉字的正则
        this.$message.error("挂科次数不必带单位");
        return false;
      } else {
        let obj = {
          name: this.upname,
          sex: this.upsex,
          age: this.upage,
          study: this.upstudy,
          major: this.upmajor,
          classes: this.upclass,
          citycenter: this.upcityCenter,
          chengji: this.upchengji,
          failss: this.upFail
        };
        let _id = this.tableData[scope.$index]._id;
        let success = await updateAllStudent(_id, obj);
        if (success.data.code === 200) {
          this.$message.success(success.data.msg);
          getAllPage(this.currentPage).then(res => {
            this.tableData = res.data.data;
          });
          this.updateShow = 10000;
        } else {
          this.$message.error("修改失败，请重试");
          return false;
        }
      }
    },
    // 取消修改函数
    upquxiao() {
      this.updateShow = 10000;
    },
    //搜索模块显示
    searchshow() {
      if (this.excelshow) {
        this.excelshow = false;
      }
      this.searchShow = 1;
    },
    // 取消搜索
    async quxiaoSearch() {
      this.searchShow = 2;
      this.daochuexcel = true;
      this.pageShow = true;
      let allList = await getAllPage(1);
      this.tableData = allList.data.data;
      this.total = allList.data.total;
      this.currentPage = 1; //取消的时候默认展示第一页的数据
      this.excelshow = false;
    },
    // 搜索函数
    async searchAll() {
      if (
        this.search.serName == "" &&
        this.search.serStudy == "" &&
        this.search.serMajor == "" &&
        this.search.serClasses == "" &&
        this.search.sercityCenter == "" &&
        this.search.serchengji == "" &&
        this.search.serFailss == ""
      ) {
        this.$message.error("搜索不能全部为空");
        this.excelshow = false; //不在则不显示导入框
        return false;
      }
      if (/.*[\u4e00-\u9fa5]+.*$/.test(this.search.serchengji)) {
        //判断不带汉字的正则
        this.$message.error("成绩不要带单位");
        return false;
      } else {
        this.daochuexcel = true;
        let obj = {};
        for (let key in this.search) {
          if (this.search.hasOwnProperty(key)) {
            if (this.search[key] != "") {
              obj[key.slice(3).toLowerCase()] = this.search[key];
            }
          }
        }
        let searchSuc = await selectAllstud(1, obj);
        this.pageShow = true;
        this.tableData = searchSuc.data.data;
        this.currentPage = 1;
        this.total = searchSuc.data.total;
      }
    },
    // 清空搜索框
    searchQ() {
      this.search.serName = "";
      this.search.serStudy = "";
      this.search.serMajor = "";
      this.search.serClasses = "";
      this.search.sercityCenter = "";
      this.search.serchengji = "";
      this.search.serFailss = "";
    },
    //批量操作显示
    chekout() {
      if (!this.chekShow) {
        if (this.searchShow === 1) {
          //当前在搜索框显示的情况下
          if (
            this.search.serName == "" &&
            this.search.serStudy == "" &&
            this.search.serMajor == "" &&
            this.search.serClasses == "" &&
            this.search.sercityCenter == "" &&
            this.search.serchengji == "" &&
            this.search.serFailss == ""
          ) {
            this.$message.error("搜索不能全部为空");
            return false;
          } else {
            this.$message.success("已根据搜索项为您搜索出对应内容");
            this.searchAll();
            this.chekShow = !this.chekShow;
          }
        } else {
          this.chekShow = !this.chekShow;
        }
      } else {
        this.chekShow = false;
      }
    },
    // 批量选中
    checks(selection) {
      let all_Id = []; //数组用来放最终的条件: [{id:xxx},{id:xxx}]
      for (let i = 0; i < selection.length; i++) {
        all_Id.push(selection[i]._id);
      }
      this.checkeds = all_Id;
    },
    //选中全部
    // checkall(selection) {
    //   console.log(selection);
    // },
    getRowKey(row) {
      return row._id;
      // 保留上一页选中的数据
      // 指定一个key标识这一行的数据
      //至于_id，你可以打印row看看，row就是你的当前条数据
      //       1.  通过type="selection"设置复选框列，重点在于 reserve-selection 属性，设置为true时，数据更新之后保留之前选中的数据。
      // 2. 重点在于需要表格属性“row-key”的配合，在使用 reserve-selection 功能的情况下，该属性是必填的。将row-key设置为表格中唯一的字段名称。这样就实现了后端分页在翻页或切换条数时，记住之前的复选框选项。
    },
    // 批量删除函数
    pilDelete() {
      this.$confirm("此操作将永久删除这几项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAllStudent(this.checkeds).then(res => {
            if (res.data.code === 201) {
              this.$message.error(res.data.msg);
            } else {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              if (this.searchShow === 1) {
                // 如果是在搜索里进行的批量删除
                this.$message.success("根据搜索项自动为您过滤");
                this.searchAll();
                this.updateShow = 10000;
                this.currentPage = 1;
              } else {
                getAllPage(this.currentPage).then(res => {
                  if (res.data.code === 202) {
                    // 如果说删除的是当前页的最后几条数据，那么如果参数还发送currentPage就会走后台配置好的超过当前最大页数的操作，状态码是202，就要重新发送请求并且将参数减一
                    getAllPage(this.currentPage - 1).then(res => {
                      this.tableData = res.data.data;
                      this.currentPage = res.data.delpage;
                      this.total = res.data.total;
                    });
                    return false;
                  } else {
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                  } //否则正常删除、赋值
                });
              }
              // 在二次确认框中无法使用await，要用.then
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
    // 导出Excel
    outExcel() {
      if (this.searchShow === 1) {
        //处于搜索情况下
        if (
          this.search.serName == "" &&
          this.search.serStudy == "" &&
          this.search.serMajor == "" &&
          this.search.serClasses == "" &&
          this.search.sercityCenter == "" &&
          this.search.serchengji == "" &&
          this.search.serFailss == ""
        ) {
          this.$message.error("搜索不能全部为空");
          this.excelshow = false; //不在则不显示导入框
          return false;
        } else if (!this.daochuexcel) {
          this.$message.error("请完成搜索后再进行导出");
        } else {
          this.exportExcel();
        }
      } else {
        this.exportExcel();
      }
    },
    // 导出函数
    exportExcel() {
      this.exportLodding = true;
      import("@/ExoprtExcel/exportExcel").then(excel => {
        const tHeader = [
          "姓名",
          "性别",
          "年龄",
          "学制",
          "专业",
          "班级",
          "市场部",
          "成绩",
          "挂科次数"
        ];
        const filterVal = [
          "name",
          "sex",
          "age",
          "study",
          "major",
          "classes",
          "citycenter",
          "chengji",
          "failss"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "学生信息",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.exportLodding = false;
      });
    },
    // 导出需要配合的函数，进行头部和数据的一一对应赋值
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    }
  }
};
</script>
<style scoped>
.searchbox-bs-002 {
  width: 100%;
  display: flex;
  align-items: center;
}
.searchbox-bs-002 > li {
  width: 10%;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  list-style: none;
}
</style>
