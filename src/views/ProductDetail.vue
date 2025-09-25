<!-- src/views/ProductDetail.vue -->
<template>
  <v-container>
    
    <v-btn class= "mt-10" variant="text" @click="$router.back()">
      ← Volver
    </v-btn>

    <div v-if="!product">
      <v-alert type="error">Producto no encontrado.</v-alert>
    </div>

    <div v-else>
      <v-card class="pa-4">
        <div class="text-h5">{{ product.name }}</div>
        <div class="text-subtitle-1">{{ formatPrice(product.price) }}</div>
        <div class="mt-2">{{ product.description }}</div>
        <div class="mt-2">Stock: {{ product.stock }}</div>
        <v-btn class="mt-4" :disabled="product.stock === 0" @click="add">Agregar al carrito</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
import productsStore from '../stores/products.js'
import cartStore from '../stores/cart.js'

const route = useRoute()
const id = Number(route.params.id)
const product = productsStore.state.products.find(p => p.id === id)

function add() {
  if (product && product.stock > 0) {
    cartStore.addToCart(product)
  }
}

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}
</script>
