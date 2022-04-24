import layout from "@/layout"
import notFind from "@/views/404.vue"
import login from "@/views/login.vue"
import homePage from "@/views/homePage/index.vue"
import project from "@/views/project.vue"
import article from "@/views/article.vue"
import leaveWord from "@/views/leaveWord.vue"
import task from "@/views/task"

export const routes = [
    {
        path: "*",//当所有的路由都匹配不上时，显示404，与路由规则的位置无关
        name: "404",
        component: notFind
    },
    {
        path: "/",
        component:layout,
        name: "layout",
        children:[
            {
               path: "/index",
               name: "homePage",
               component: homePage
            },{
                path: "/project",
                name: "project",
                component: project
            },{
                path: "/article",
                name: "article",
                component: article
            },{
                path: "/leaveWord",
                name: "leaveWord",
                component: leaveWord,
                beforeEnter(to, from, next){
                    if(localStorage.getItem("admin")){
                        next();
                    }else{//没有登录不能留言
                        next({
                            path: "/login"
                        })
                    }
                }
            },{
                path: "/task",
                name: "task",
                component: task
            }
        ]
    },{
        path: "/login",
        component: login
    }
]