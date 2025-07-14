import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: 'Home',
          hideHeader: true  
        }
        
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
        ,
        meta: {
          title: 'About',
          hideHeader: true
        }
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
        ,
        meta: {
          title: 'Contact',
          hideHeader: true
        }
      },
      {
        path: 'products',
        name: 'products',
        meta: { title: 'Products' },
        component: () => import('../views/ProductsView.vue')
      }
      ,
      {
        path: 'customers',
        name: 'customers',
        meta: { title: 'Customers' },
        component: () => import('../views/CustomersView.vue')
      },
      {
        path: 'sales',
        name: 'sales',
        meta: { title: 'Sales History' },
        component: () => import('../views/SalesHistoryView.vue')
      }
      ,
      {
        path: 'stock',
        name: 'stock',
        meta: { title: 'Stock' },
        component: () => import('../views/StockView.vue')
      }
      ,
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard' },
        component: () => import('../views/DashboardView.vue')
      }
      ,
      {
        path: 'new-sale',
        name: 'new-sale',
        meta: { title: 'New Sale' },
        component: () => import('../views/NewSaleView.vue')
      }
      ,
      {
        path: 'settings',
        name: 'settings',
        meta: { title: 'Settings' },
        component: () => import('../views/SettingsView.vue')
      }
      ,
      {
        path: 'reports',
        name: 'reports',
        meta: { title: 'Sales Reports' },
        component: () => import('../views/ReportsView.vue')
      }
      ,
      {
        path: 'userprofile',
        name: 'userprofile',
        meta: { title: 'User Profile' },
        component: () => import('../views/auth/UserProfileView.vue')
      }
      // ,
      // {
      //   path: 'pricing',
      //   name: 'pricing',
      //   component: () => import('../views/PricingView.vue')
      //   ,
      //   meta: {
      //     title: 'Pricing',
      //     hideHeader: true
      //   }
      // }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/ErrorLayout.vue'),
    children: [
      {
        path: '',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // Handle scroll behavior with slow network in mind
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 300) // Small delay for smoother transitions
    })
  }
})

export default router