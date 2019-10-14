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
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/home"),
        hidden: true
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "所有学生", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/studCaozuo",
    component: Layout,
    redirect: "/studCaozuo/addstudent",
    name: "studCaozuo",
    meta: { title: "学生操作", icon: "example" },
    children: [
      {
        path: "/studCaozuo/addstudent",
        name: "Add",
        component: () => import("@/views/AddAllStudents/index"),
        meta: { title: "添加学生", icon: "table" }
      }
      // {
      //   path: "tree",
      //   name: "Tree",
      //   component: () => import("@/views/tree/index"),
      //   meta: { title: "Tree", icon: "tree" }
      // }
    ]
  },
  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" }
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
