<!-- src/App.vue -->
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Mi Tienda</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/">Inicio</v-btn>
      <v-btn text to="/productos">Productos</v-btn>
      <v-btn text to="/clientes">Clientes</v-btn>
      <v-divider vertical class="mx-3" />
      <v-btn icon @click="toggleCart">
        <v-badge :content="cartCount" color="red" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main class="pa-4">
      <router-view />
    </v-main>

    <v-navigation-drawer v-model="drawer" location="end" temporary>
      <Cart />
    </v-navigation-drawer>
    <!-- Drawer opcional para el carrito (si querés mostrarlo en un drawer) -->
    <!-- Acá usamos un componente Cart que ya insertamos en Products view -->
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import cartStore from './stores/cart.js'
import Cart from './components/Cart.vue'


const router = useRouter()
const drawer = ref(false)

function toggleCart() {
  drawer.value = !drawer.value
}

const cartCount = computed(() => cartStore.state.items.reduce((s, i) => s + i.qty, 0))
</script>

