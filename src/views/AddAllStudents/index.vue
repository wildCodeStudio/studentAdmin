<template>
  <!-- 添加的显示模块 -->
  <div class="demo-input-size" v-show="addshow">
    <div class="demo-input-smallsize">
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;"
      >
        <div>姓名：</div>
        <el-input size="mini" placeholder="姓名" v-model="newName"></el-input>
      </div>
      <div style="margin-left:15px;margin-top:30px;">
        <!-- 性别模块 -->
        <span style="margin-right:50px;">性别：</span>
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>年龄：</div>
        <el-input size="mini" placeholder="年龄" v-model="newAge"></el-input>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>学制：</div>
        <el-select v-model="study" size="mini" placeholder="学制">
          <el-option size="mini" v-for="item in studys" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>专业：</div>
        <el-select v-model="major" size="mini" placeholder="专业">
          <el-option size="mini" v-for="item in majors" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>班级：</div>
        <el-select v-model="newclass" size="mini" placeholder="班级">
          <el-option size="mini" v-for="item in classs" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>市场部:</div>
        <el-select v-model="cityCenter" size="mini" placeholder="市场部">
          <el-option size="mini" v-for="item in cityCenters" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>已有成绩：</div>
        <el-input size="mini" placeholder="已有成绩/门" v-model="chengji"></el-input>
      </div>
      <div
        style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;"
      >
        <div>挂科次数：</div>
        <el-input size="mini" placeholder="挂科次数" v-model="Fail"></el-input>
      </div>
      <div>
        <el-button
          type="primary"
          style="width:90px;height:38px;line-height:0;margin-left:500px;margin-top:50px;"
          @click="addAllstudent"
        >确定</el-button>
        <el-button
          type="warning"
          style="width:90px;height:38px;line-height:0;margin-left:10px;margin-top:50px;"
          @click="clearList"
        >清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addAllStudent } from "@/api/api";
export default {
  data() {
    return {
      addshow: true, //添加模块是否显示
      newName: "", //姓名
      sex: "", //性别单选框
      newAge: "", //年龄
      study: "", //学制选项
      major: "", //专业选项
      newclass: "", //班级选项
      cityCenter: "", //市场部选项
      chengji: "", //已有成绩
      Fail: "", //挂科次数
      // select中value才是选中的那个值
      studys: [
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
      majors: [
        //专业选项
        {
          value: "web架构"
        },
        {
          value: "视觉设计"
        }
      ],
      classs: [
        //班级选项
        {
          value: "野码工作室"
        },
        {
          value: "SEEC"
        },
        {
          value: "1612B"
        }
      ],
      cityCenters: [
        //市场部选项
        {
          value: "冀中市场部"
        },
        {
          value: "豫皖市场部"
        }
      ]
    };
  },
  methods: {
    async addAllstudent() {
      //添加一项
      let obj = {
        name: this.newName,
        sex: this.sex,
        age: this.newAge,
        study: this.study,
        major: this.major,
        class: this.newclass,
        cityCenter: this.cityCenter,
        chengji: this.chengji,
        Fail: this.Fail
      };
      let success = await addAllStudent(obj);
      if (success.data.code === 201) {
        this.$message.error(success.data.msg);
      } else {
        (this.newName = ""),
          (this.sex = ""),
          (this.newAge = ""),
          (this.study = ""),
          (this.major = ""),
          (this.newclass = ""),
          (this.cityCenter = ""),
          (this.chengji = ""),
          (this.Fail = "");
        this.$confirm(`${success.data.msg},是否跳转至学生列表页`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              name: "Dashboard",
              params: { maxpage: success.data.maxpages }
            }); //如果想在push里传递params参数，就必须用路由对应的name跳转
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消舔砖"
            });
          });
      }
    },
    clearList() {
      // 清空信息
      (this.newName = ""),
        (this.sex = ""),
        (this.newAge = ""),
        (this.study = ""),
        (this.major = ""),
        (this.newclass = ""),
        (this.cityCenter = ""),
        (this.chengji = ""),
        (this.Fail = "");
    }
  }
};
</script>
<style scoped>
.demo-input-size {
  width: 100%;
  height: 650px;
  margin-top: 15px;
}
.demo-input-smallsize {
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 30px;
}
.el-input--mini {
  width: 600px;
}
.el-radio {
  margin-right: 2px;
}
.el-select {
  width: 600px;
}
</style>