import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
    // hidden表示当前路由项在项目导航条中是否隐藏
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    //重定向，在element-admin会出现以下问题：element-admin里默认规定根路径是Dashboard，就是头部的那个显示路径的条条的根路径是Dashboard，
    // 你需要在路由中加上name属性，才能在点击头部Dashboard的时候不报404(找不到Dashboard对应的模块)，而加上name之后你点击头部Dashboard的时候会跳至你当前的
    // path路径，在这里跳到的studentCaozuo只是一个父路由并没有对应模块展示的作用，加上重定向是为了让点击头部Dashboard的时候不会显示一个没有对应模块的空白页
    children: [
      //子路由只有一项左侧导航就只显示一项，有两项以上就显示为下拉导航菜单形式
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/home"),
        meta: { title: "首页", icon: "example" }
      }
    ]
  }

]
export const asyncRoutes = [
  {
    path: '/createuser',
    component: Layout,
    meta: {
      roles: ['vvv'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        name: 'Createuser',
        component: () => import('@/views/createuser/index'),
        meta: { roles: ['vvv'], title: '创建用户', icon: 'form' }
      }
    ]
  },

  {
    path: "/studCaozuo",
    component: Layout,
    redirect: "/studCaozuo/dashboard",
    meta: { title: "学生操作", icon: "example" },
    children: [
      {
        path: "/dashboard",
        name: "All",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "所有学生", icon: "dashboard" }
      },
      {
        path: "/addstudent",
        name: "Add",
        component: () => import("@/views/AddAllStudents/index"),
        meta: { roles: ['vvv'], title: "添加学生", icon: "table" }
      }
    ]
  },
  {
    path: '/class',
    component: Layout,
    redirect: "/class/classList",
    meta: { title: '班级', icon: 'form' },
    children: [
      {
        path: 'classList',
        name: 'Class',
        component: () => import('@/views/class/index'),
        meta: { title: '班级列表', icon: 'form' }
      },
      {
        path: 'createClass',
        name: 'CreateClass',
        component: () => import('@/views/class/createClass'),
        meta: { roles: ['vvv'], title: '创建班级', icon: 'form' }
      }
    ]
  },
  {
    path: '/headTeacher',
    component: Layout,
    redirect: "/headTeacher/headTeacherList",
    meta: { title: '班主任', icon: 'form' },
    children: [
      {
        path: 'headTeacherList',
        name: 'HeadTeacher',
        component: () => import('@/views/headTeacher/index'),
        meta: { title: '班主任列表', icon: 'form' }
      },
      {
        path: 'addHeadTeacher',
        name: 'AddHeadTeacher',
        component: () => import('@/views/headTeacher/addHeadTeacher'),
        meta: { roles: ['vvv'], title: '添加班主任', icon: 'form' }
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    meta: {
      roles: ['vvv']
    },
    children: [
      {
        path: 'index',
        name: 'Market',
        component: () => import('@/views/market/index'),
        meta: { roles: ['vvv'], title: '市场部', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
