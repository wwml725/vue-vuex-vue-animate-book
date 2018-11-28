import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
Router.prototype.animate1 = 0

const _import = (file)=>()=>import("../components/"+file+".vue")

export default new Router({
  mode: 'history',
  routes: [
    //路由配置
    {
      path:"/home",
      component:_import("Layout/index"),
      children:[
        {
          path:"/",
          component:_import("Home/index"),
          name:"首页",
          meta:{title:"首页"}
        }
      ]
    },
    {
      path:"/list",
      component:_import("Layout/index"),
      children:[
        {
          path:"/",
          component:_import("List/index"),
          name:"列表",
          meta:{title:"列表"}
        }
      ]
    },
    {
      path:"/collect",
      component:_import("Layout/index"),
      children:[
        {
          path:"/",
          component:_import("Collection/index"),
          name:"收藏",
          meta:{title:"收藏"}
        }
      ]
    },
    {
      path:"/add",
      component:_import("Layout/index"),
      children:[
        {
          path:"/",
          component:_import("Add/index"),
          name:"添加",
          meta:{title:"添加"}
        }
      ]
    },
    {
      path: '/detail/:bid',
      name: 'detail',
      meta: {
        slide: 1,
        title: "详情页"
      },
      component: _import("Detail/index"),
    },
    {
      path:"*",
      redirect:"/home"
    }
]
})
