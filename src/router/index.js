// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Products from '../views/products.vue'
import ProductDetail from '../views/productDetail.vue'
import Clients from '../views/clients.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/productos', name: 'Productos', component: Products },
  { path: '/productos/:id', name: 'ProductoDetalle', component: ProductDetail, props: true },
  { path: '/clientes', name: 'Clientes', component: Clients },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } // restaura scroll al navegar
  }
})

export default router
