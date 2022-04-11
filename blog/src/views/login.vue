<template>
  <div class="login">
    <header>欢迎登陆</header>
    <main>
      <div class="loginId"><span>昵称</span><input type="text" /></div>
      <div class="loginPwd"><span>密码</span><input type="password" /></div>
      <div class="capture"><span>验证码</span><input type="text" /></div>
    </main>
    <footer>
      <button>登录</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  padding: 2rem;
  border-radius: 10px;
  height: 50%;
  header,
  main,
  footer {
    width: 100%;
    text-align: center;
  }
  header {
    font-size: 3rem;
    text-align: center;
  }
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between; 
    font-size: 1.5rem;
    div{
      width: 60%;
      input{
        font-size: 1rem;
        outline: none;
        height: 2rem;
        width: 100%;
        border-radius: 3px;
        padding-left: 1rem;
      }
    }
  }
  footer{
    button{
      width: 10rem;
      font-size: 2rem;
      text-align: center;
    }
  }
}
</style>