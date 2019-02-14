import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      { path: 'dashboard', component: () => import('@/views/dashboard/index') }
    ]
  },
  {
    path: '/prods',
    component: Layout,
    redirect: 'noredirect',
    name: 'Prods',
    meta: { title: '商品', icon: 'form' },
    children: [
      {
        path: 'prod_manage',
        name: 'prod_manage',
        component: () => import('@/views/prods/prod_manage'),
        meta: { title: '商品管理', icon: 'form' }
      },
      {
        path: 'prod_add',
        name: 'prod_add',
        component: () => import('@/views/prods/prod_add'),
        meta: { title: '添加商品' },
        hidden: true
      },
      {
        path: 'prod_update/:prodID',
        name: 'prod_update',
        component: () => import('@/views/prods/prod_update'),
        meta: { title: '修改产品' },
        hidden: true
      },
      {
        path: 'prod_detail/:prodID',
        name: 'prod_detail',
        component: () => import('@/views/prods/prod_detail'),
        meta: { title: '商品详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/point_prods',
    component: Layout,
    redirect: 'noredirect',
    name: 'Point_prods',
    children: [
      {
        path: 'point_manage',
        name: 'point_manage',
        component: () => import('@/views/point_prods/point_manage'),
        meta: { title: '积分商品管理', icon: 'point' }
      },
      {
        path: 'point_add',
        name: 'point_add',
        component: () => import('@/views/point_prods/point_add'),
        meta: { title: '添加积分商品' },
        hidden: true
      },
      {
        path: 'point_detail/:prodID',
        name: 'point_detail',
        component: () => import('@/views/point_prods/point_detail'),
        meta: { title: '积分商品详情' },
        hidden: true
      },
      {
        path: 'point_update/:prodID',
        name: 'point_update',
        component: () => import('@/views/point_prods/point_update'),
        meta: { title: '修改积分商品' },
        hidden: true
      }
    ]
  },
  {
    path: '/market',
    component: Layout,
    redirect: 'noredirect',
    name: 'market',
    meta: { title: '市场管理', icon: 'market' },
    children: [
      {
        path: 'recommend_prods',
        name: 'recommend-prods',
        component: () => import('@/views/market/recommend_prods'),
        meta: { title: '推荐商品管理' }
      },
      {
        path: 'banner_manage',
        name: 'banner_manage',
        component: () => import('@/views/market/banner_manage'),
        meta: { title: '横幅管理' }
      },
      {
        path: 'add_banner',
        name: 'add_banner',
        component: () => import('@/views/market/add_banner'),
        meta: { title: '添加横幅' },
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    name: 'order',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'order_list',
        name: 'order_list',
        component: () => import('@/views/order/order_list'),
        meta: { title: '订单列表' }
      },
      {
        path: 'order_detail/:OrderID',
        name: 'order_detail',
        component: () => import('@/views/order/order_detail'),
        meta: { title: '订单详情' },
        hidden: true
      },
      {
        path: 'send_list',
        name: 'send_list',
        component: () => import('@/views/order/send_list'),
        meta: { title: '待发货列表' }
      },
      {
        path: 'shipped_list',
        name: 'shipped_list',
        component: () => import('@/views/order/shipped_list'),
        meta: { title: '已发货列表' }
      }
    ]
  },
  {
    path: '/after_sale',
    component: Layout,
    children: [
      {
        path: 'refund_list',
        name: 'refund_list',
        component: () => import('@/views/after_sale/refund_list'),
        meta: { title: '退款管理', icon: 'sale' }
      },
      {
        path: 'refund_detail/:RefundID',
        name: 'refund_detail',
        component: () => import('@/views/after_sale/refund_detail'),
        meta: { title: '退款详情' },
        hidden: true
      }
    ]
  }
];

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  // 用户管理
  {
    path: '/client_manage',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'admin_list',
        name: 'Client',
        component: () => import('@/views/client/admin_list'),
        meta: {
          title: '管理员列表',
          roles: ['adminSuper']
        }
      },
      {
        path: 'add_admin',
        name: 'add_admin',
        component: () => import('@/views/client/add_admin'),
        meta: {
          title: '添加管理员'
        },
        hidden: true
      },
      {
        path: 'admin_edit',
        name: 'admin_edit',
        component: () => import('@/views/client/admin_edit'),
        meta: {
          title: '管理员修改'
        }
      }
    ]
  },
  // 404错误页面
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];
