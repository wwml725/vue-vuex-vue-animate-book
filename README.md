# vuex-book

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

-------

## 脚手架安装
#### 1、全局安装vue-cli脚手架
````
npm install -g @vue/cli 
vue --version
vue -V
````
#### 2、创建项目
```
vue create vue-project
```
如果还想要用老版本到的脚手架
#### 3、拉去2.x模板
```
npm install -g @vue/vli-init
```
这样就能像以前一样安装项目了
```
vue init webpack my-project
```

## 项目环境配置
```
npm install -g @vue/cli 
vue --version
vue -V
npm install -g @vue/vli-init
vue init webpack my-project
```
#### 1、项目所用依赖
前端依赖
```
npm install vuex axios bootstrap --save
npm install less less-loader --save-dev
npm install vue-awesome-swiper --save
```
后端依赖
```
npm install express --save
```

#### 2、项目主要目录
- mock
- src
  - api
  - base :基础组建
  - components：页面级组件
  - router：路由配置
   - App.vue：项目根组件 
   - main.js  主要文件
   
#### 3、组件基本介绍
##### base：基础组建
  - Tab index.vue

##### components：页面级组件
  - 一个页面布局组件
    - Layout index.js

  - 四个主要页面
    - Home  index.vue
    - List  index.vue   
    - collection  index.vue   
    - Add  index.vue   
  
  - 其他页面
    - Details index.vue  

---

## 具体搭建步骤
### 一、后端配置
#### mock
```
npm install express --save
```



### 二、前端配置
#### 1、完成布局组件（Layout）
#### 2、路由（router）配置
```
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

```





