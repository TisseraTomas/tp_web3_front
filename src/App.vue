<!-- src/App.vue -->
<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Mi Tienda</v-toolbar-title>
      <v-spacer />
      <v-chip v-if="auth.user" color="white" text-color="primary" class="mr-3">
        {{ auth.user.email }}
      </v-chip>
      <v-btn v-if="auth.isAuthenticated" @click="logout" text>Salir</v-btn>
      <v-btn text :disabled="!auth.isAuthenticated" :to="{ name: 'home' }" router>Inicio</v-btn>
      <v-btn text :disabled="!auth.isAuthenticated" :to="{ name: 'productos' }" router>Productos</v-btn>
      <v-btn text :disabled="!auth.isAuthenticated" :to="{ name: 'clientes' }" router>Clientes</v-btn>  
      <v-divider vertical class="mx-3" />
      <v-btn  :disabled="!auth.isAuthenticated" icon @click="toggleCart">
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
import { useAuth } from "./stores/auth";

const auth = useAuth();
const router = useRouter()
const drawer = ref(false)

function logout() {
  auth.logout();
  router.push("/login");
}

function toggleCart() {
  drawer.value = !drawer.value
}

const cartCount = computed(() => cartStore.state.items.reduce((s, i) => s + i.qty, 0))
</script>

