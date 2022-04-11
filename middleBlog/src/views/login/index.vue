<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">后台管理系统登录</h3>
      </div>

      <!-- 一项el-form-item就是一个表单组件 -->
      <el-form-item prop="loginId">
        <!-- 图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- input组件 type 表示类型-->
        <el-input
          ref="username"
          v-model="loginForm.loginId"
          placeholder="请输入用户名"
          name="loginName"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          key="password"
          ref="password"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入口令"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div class="capture">
        <el-form-item prop="capture">
          <span class="svg-container">
            <svg-icon icon-class="tree" />
          </span>

          <el-input
            ref="capture"
            v-model="loginForm.capture"
            placeholder="请输入验证码"
            name="capture"
            type="text"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <div class="captureImg" v-html="svg" @click="getNewcapture"></div>
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import getcapture from "@/api/getCapture.js";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {//收集用户数据
        loginId: "book",
        loginPwd: "bookbags",
        capture: "",
      },
      loginRules: {//验证规则，属性名对应ele-form-item的prop属性，value is Array，每一项是一个对象，对象就是规则
      //复杂的规则可以写成函数，传入validator属性，默认传参的第二个参数为对应表单的值，调用callback返回提示信息，如果验证识别，callback
      //需要传入一个错误对象
        loginId: [{ required: true, trigger: "blur" }],
        loginPwd: [
          { required: true, trigger: "blur" }, //validator: validatePassword检验函数
        ],
        capture: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      svg: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        // vue-element-adming会给loginForm注入一个方法validate，参数为一个回调函数，
        // 回调函数的第一个参数为boolean，表示表单验证是否通过
        if (valid) {
          this.loading = true; //触发加载指令,开始旋转
          
          this.$store //在仓库中获取远程数据
            .dispatch("user/login", this.loginForm) 
            .then((res) => {//输入的用户名和密码，验证码正确
              //localStorage在axious中的响应拦截中加入
              //vuex在vuex的action中加入
               this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
                this.loading = false;
                this.$router.push("/index");
            })
            .catch((err) => {
              //密码，用户，captch错误
              if (typeof(err) !== "object") {
                this.$message({
                  showClose: true,
                  message: "验证码错误",
                  type: "error",
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "密码或者用户名错误",
                  type: "error",
                });
              }
              this.loading = false;
              this.getNewcapture();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getNewcapture() {
      const data = await getcapture();
      this.svg = data;
    },
  },
  created() {
    this.getNewcapture();
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
<style lang="scss" scoped>
.capture {
  display: flex;
  .el-form-item {
    flex: 6 0 auto;
  }
  .captureImg {
    flex: 4 0 auto;
    height: 52px;
  }
}
</style>