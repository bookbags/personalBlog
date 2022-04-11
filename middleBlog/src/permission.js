import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] //  whitelist don't need check permission
// 在路由中添加 auth: tur, replace whiteList
// 导航守卫
router.beforeEach(async(to, from, next) => {
  // 进度条开启
  NProgress.start()
  //表示用户处于登录状态
  const loginState = store.getters.user;
  document.title = getPageTitle(to.meta.title);
  if(loginState){
    if(to.path === "/login"){
      next({path: "/"})
    }else{
      next();
    }
  }else{//未登录，判断是否具有cookie
    const cookie = getToken();
    if(cookie){
      let data;
      try{
        await store.dispatch('user/getInfo');
        //如果没报错说明验证成功
        if(to.path === "/login"){
          next({path: "/"})
        }else{
          next();
        }
      }catch(err){
        Message.error(err);
        await store.dispatch('user/resetToken');//清空错误的cookie
        next(`/login?redirect=${to.path}`);//注意必须位于await之后，不然会改变多次路由
      }
      NProgress.done()
    }else{
      if(!to.meta.auth){//表示白名单
        next();
      }else{
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
