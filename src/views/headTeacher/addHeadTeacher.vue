<template>
  <!-- 添加的显示模块 -->
  <div class="demo-input-size"
       v-show="addshow">
    <div class="demo-input-smallsize">
      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;">
        <div>姓名：</div>
        <el-input size="mini"
                  placeholder="姓名"
                  v-model="newName"></el-input>
      </div>
      <div style="margin-left:15px;margin-top:30px;">
        <!-- 性别模块 -->
        <span style="margin-right:50px;">性别：</span>
        <el-radio v-model="sex"
                  label="男">男</el-radio>
        <el-radio v-model="sex"
                  label="女">女</el-radio>
      </div>

      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:30px;">
        <div>学院：</div>
        <el-select v-model="collegeCenter"
                   size="mini"
                   placeholder="学院">
          <el-option size="mini"
                     v-for="item in collegeCenters"
                     :key="item.value"
                     :value="item.value"></el-option>
        </el-select>
      </div>
      <div style="margin-left:15px;width:70%;display:flex;justify-content: space-between;margin-top:20px;">
        <div>入职日期：</div>
        <el-input size="mini"
                  type="date"
                  placeholder="入职日期"
                  v-model="entryDate"></el-input>
      </div>
      <div>
        <el-button type="primary"
                   style="width:90px;height:38px;line-height:0;margin-left:500px;margin-top:50px;"
                   @click="addAllstudent">确定</el-button>
        <el-button type="warning"
                   style="width:90px;height:38px;line-height:0;margin-left:10px;margin-top:50px;"
                   @click="clearList">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addHeadTeacher } from "@/api/api";
export default {
  data() {
    return {
      addshow: true, //添加模块是否显示
      newName: "", //姓名
      sex: "", //性别单选框
      collegeCenter: "", //市场部选项
      entryDate: "",
      // select中value才是选中的那个值
      collegeCenters: [
        //市场部选项
        {
          value: "数字媒体"
        },
        {
          value: "软工学院"
        },
        {
          value: "建工学院"
        },
        {
          value: "移动学院"
        },
        {
          value: "大数据学院"
        },
        {
          value: "计算机学院"
        }
      ]
    };
  },
  methods: {
    async addAllstudent() {
      //添加一项
      let obj = {
        headname: this.newName,
        headsex: this.sex,
        college: this.collegeCenter,
        entryDate: this.entryDate
      };
      if (obj.headname === "" || obj.headsex === "" || obj.college === "")
        return this.$message.error("提交信息中存在空项");
      let { data } = await addHeadTeacher(obj);
      if (data.code === 200) {
        this.$message.success(data.message);
        setTimeout(() => {
          this.clearList();
        }, 500);
        return;
      }
      this.$message.error(data.message);
    },
    // 清空信息
    clearList() {
      (this.newName = ""),
        (this.sex = ""),
        (this.collegeCenter = ""),
        (this.entryDate = "");
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