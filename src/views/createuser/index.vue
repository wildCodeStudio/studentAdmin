<template>
  <div class="app-container">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isCarID } from "@/utils/validate";
import { createUser } from "@/api/user";
import { Message } from "element-ui";
import axios from "axios";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账户不能为空"));
      }
      if (
        this.ruleForm.name !== "" &&
        this.ruleForm.pass !== this.ruleForm.name.substring(12)
      ) {
        this.ruleForm.pass = "";
        this.ruleForm.checkPass = "";
      }
      if (isCarID(value) !== true) {
        callback(new Error(isCarID(value)));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        if (this.ruleForm.name.substring(12).length < 6) {
          return callback(new Error("请输入密码"));
        }
        this.ruleForm.pass = this.ruleForm.name.substring(12);
        return callback();
      } else {
        if (value.length < 6) {
          return callback(new Error("密码不小于6位"));
        }
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        if (this.ruleForm.pass === "") {
          return callback(new Error("请先输入密码"));
        }
        if (this.ruleForm.pass === this.ruleForm.name.substring(12)) {
          this.ruleForm.checkPass = this.ruleForm.pass;
          return callback();
        }
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { data } = await createUser(this.ruleForm);
          if (data.code === "200") {
            Message({
              message: data.message,
              type: "success",
              duration: 2 * 1000
            });
            setTimeout(() => {
              this.resetForm(formName);
            }, 1000);
          } else {
            Message({
              message: data.message,
              type: "error",
              duration: 2 * 1000
            });
          }
        } else {
          console.log("error submit!!");
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
.app-container {
  width: 600px;
}
.line {
  text-align: center;
}
</style>

