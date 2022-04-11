import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    meta: {
      auth: true
    },
    children: [{
      path: '/index',
      name: 'control',
      component: () => import('@/views/control/index'),
      meta: {
        title: '控制台',
        icon: 'dashboard',
        auth: true //表示是否需要权限
      }
    }]
  },
  {
    path: '/mainTitle',
    component: Layout,
    meta: {
      auth: true
    },
    children: [{
      path: 'index',
      name: 'mainTitle',
      component: () => import('@/views/mainTitle/index'),
      meta: {
        title: '首页标题',
        icon: 'dashboard',
        auth: true
      }
    }]
  },
  {
    path: '/item',
    component: Layout,
    meta: {
      title: '项目管理',
      icon: 'tree'
    },
    children: [{
        path: '/addItem',
        name: 'itemAdd',
        component: () => import('@/views/itemManage/addItem/index'),
        meta: {
          title: '添加项目',
          icon: 'table',
          auth: true
        }
      },
      {
        path: '/listItem',
        name: 'itemList',
        component: () => import('@/views/itemManage/itemList/index'),
        meta: {
          title: '项目列表',
          icon: 'tree',
          auth: true
        }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    meta: {
      title: '文章管理',
      icon: 'tree'
    },
    children: [{
        path: '/add',
        name: 'articleAdd',
        component: () => import('@/views/articleManage/addArticle/index'),
        meta: {
          title: '添加文章',
          icon: 'table',
          auth: true
        }
      },
      {
        path: '/list',
        name: 'articleList',
        component: () => import('@/views/articleManage/articleList/index'),
        meta: {
          title: '文章列表',
          icon: 'tree',
          auth: true
        }
      },
      {
        path: '/kind',
        name: 'articleKind',
        component: () => import('@/views/articleManage/kindAriticle/index'),
        meta: {
          title: '文章分类',
          icon: 'tree',
          auth: true
        }
      },
      {
        path: '/editBlog/:id',
        name: 'editBlog',
        hidden: true,
        component: () => import('@/views/articleManage/editBlog'),
        meta: {
          title: '文章编辑',
          icon: 'tree',
          auth: true
        }
      }
    ]
  },
  {
    path: '/aboutMe',
    component: Layout,
    children: [{
      path: 'index',
      name: 'aboutMe',
      component: () => import('@/views/aboutMe/index'),
      meta: {
        title: '关于我',
        icon: 'form',
        auth: true
      }
    }]
  },

  {
    path: '/leave',
    component: Layout,
    children: [{
      path: 'index',
      name: "leave",
      component: () => import('@/views/leaveWord/index'),
      meta: {
        title: '留言板',
        icon: 'link',
        auth: true
      }
    }]
  }, {
    path: '/set',
    component: Layout,
    children: [{
      path: 'index',
      name: "set",
      component: () => import('@/views/set/index'),
      meta: {
        title: '设置',
        icon: 'link',
        auth: true
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
