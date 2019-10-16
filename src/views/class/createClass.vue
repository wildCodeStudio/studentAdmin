<template>
  <div class="demo-input-size"
       v-show="addshow">
    <div class="demo-input-smallsize">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="80px"
               label-position="left"
               class="demo-ruleForm">
        <el-form-item label="班级名称"
                      prop="classname">
          <el-input v-model="ruleForm.classname"></el-input>
        </el-form-item>
        <el-form-item label="创建时间"
                      required>
          <el-col :span="11">
            <el-form-item prop="createDate">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.createDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="讲师"
                      prop="lecturer">
          <el-input v-model="ruleForm.lecturer"></el-input>
        </el-form-item>
        <el-form-item label="班主任"
                      prop="headteacher">
          <el-input v-model="ruleForm.headteacher"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>
<script>
import { createClass } from "@/api/api";
export default {
  data() {
    return {
      addshow: true, //添加模块是否显示
      ruleForm: {
        classname: "",
        createDate: "",
        lecturer: "",
        headteacher: ""
      },
      rules: {
        classname: [
          { required: true, message: "请输入班级名称", trigger: "blur" }
        ],
        createDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        lecturer: [{ required: true, message: "请输入讲师", trigger: "blur" }],
        headteacher: [
          { required: true, message: "请输入班主任", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { data } = await createClass(this.ruleForm);
          if (data.code === 203) {
            return this.$message.error(data.message);
          }
          this.$message.success(data.message);
          setTimeout(() => {
            this.resetForm(formName);
          }, 500);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  padding: 30px 30px 0;
}
.el-form-item {
  width: 80%;
}
</style>