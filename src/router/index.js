import { createRouter, createWebHashHistory } from 'vue-router'

import Cookies from 'js-cookie'

// 定義路由
const routes = [
  {
    path: '/login',
    name: 'MyLogin',
    component: () => import('../views/MyLogin.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashBoard.vue'),
    meta: { requiresAuth: true },
    children:[
      {
        path:'products',
        name:'MyProducts',
        meta: { requiresAuth: true },
        component: () => import('../views/MyProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/MyOrder.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/MyCoupon.vue'),
      },
      ]
  },
  {
    path:'/user',
    component: () => import('../views/UserBoard.vue'),
    children:[
      {
        path:'cart',
        component:() => import('../views/UserCart.vue')
      },
      {
        path:'product/:productId',
        component:() => import('../views/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/UserCheckout.vue'),
      },
    ]
  }
]

// 建立 router

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

// 全域路由守衛
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token"); // 與登入 cookie 名稱一致
  if (to.meta.requiresAuth && !token) {
    alert("請先登入");
    next("/login");
  } else {
    next();
  }
});

export default router;
