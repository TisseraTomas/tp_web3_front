<!-- src/views/Products.vue -->
<template>
  <v-container>
    <h2>Productos</h2>

    <!-- Escucho add-to-cart emitido por ProductList -->
    <ProductList @add-to-cart="handleAddToCart" />

    <!-- Muestro el carrito (componente separado) -->
    <Cart />
  </v-container>
</template>

<script setup>
import ProductList from '../components/ProductList.vue'
import Cart from '../components/Cart.vue'
import products from '../data/products.js'
import cartStore from '../stores/cart.js'

function handleAddToCart(id) {
  // Encuentro el producto por id y lo agrego (simula "guardar")
  const p = products.find(x => x.id === id)
  if (!p) {
    console.warn('Producto no encontrado:', id)
    return
  }
  // Si stock = 0 mostramos aviso y no agregamos
  if (p.stock === 0) {
    // Podés mostrar un toast o console
    console.warn('Producto sin stock:', p.name)
    return
  }
  cartStore.addToCart(p)
  console.log('Añadido al carrito (desde Products):', p.name)
}
</script>
