<!-- src/components/Cart.vue -->
<template>
  <v-card class="mt-6 pa-4" elevation="3" max-width="600">
    <div class="d-flex justify-space-between">
      <div class="text-h6">Carrito</div>
      <div v-if="items.length === 0" class="text-caption">Vacío</div>
    </div>

    <div v-if="items.length === 0" class="mt-4">
      <v-alert type="info">El carrito está vacío.</v-alert>
    </div>

    <div v-else class="mt-4">
      <v-list dense>
        <v-list-item v-for="it in items" :key="it.id">
          <v-list-item-content>
            <div class="font-weight-medium">{{ it.name }}</div>
            <div class="text-caption">
              {{ formatPrice(it.price) }} x {{ it.qty }} =
              {{ formatPrice(it.price * it.qty) }}
            </div>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon small @click="decrease(it.id)">−</v-btn>
            <v-btn
              icon
              small
              :disabled="getStock(it.id) === 0"
              @click="increase(it.id)"
              >+</v-btn
            >
            <v-btn icon small color="error" @click="remove(it.id)">x</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <div class="mt-4 text-right">
        <div class="text-subtitle-1">Total: {{ formatPrice(total) }}</div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import cartStore from "../stores/cart.js";
import { computed } from "vue";
import productsStore from '../stores/products.js'

const items = cartStore.state.items;
const total = cartStore.total;

function getStock(id) {
  const p = productsStore.state.products.find(pr => pr.id === id)
  return p ? p.stock : 0
}
function increase(id) {
  cartStore.increaseQty(id);
}
function decrease(id) {
  cartStore.decreaseQty(id);
}
function remove(id) {
  cartStore.removeItem(id);
}

function formatPrice(n) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(n);
}
</script>
