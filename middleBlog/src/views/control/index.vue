<template>
  <div class="control" style="margin: 1rem 0 0 1rem">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录Id">
          <el-input v-model="form.loginId"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input v-model="form.oldLoginPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.loginPwd"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">修改</el-button>
  </div>
</template>

<script>
import {setControlApi} from "@/api/control.js"
export default {
  data(){
    return {
      form:{
        name: "",
        oldLoginPwd: "",
        loginPwd: "",
        loginId: ""
      }
    }
  },
  methods:{
    async submit(){
      const data = await setControlApi(this.form);
      console.log(data);
      this.$message.success("修改完成");
    }
  }

}
</script>

<style>

</style>