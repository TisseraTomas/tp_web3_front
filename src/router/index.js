// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Clients from '../views/clients.vue'
import { useAuth } from "../stores/auth";

const routes = [
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/productos', name: 'productos', component: Products, meta: { requiresAuth: true } },
  { path: '/productos/:id', name: 'productoDetalle', component: ProductDetail, props: true, meta: { requiresAuth: true } },
  { path: '/clientes', name: 'clientes', component: Clients, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import("../views/LoginView.vue") },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } // restaura scroll al navegar
  }
})

router.beforeEach((to, from, next) => {
  const auth = useAuth();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && auth.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router
