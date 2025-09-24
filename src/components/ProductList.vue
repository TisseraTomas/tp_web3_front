<!-- src/components/ProductList.vue -->
<template>
  <div>
    <v-text-field
      v-model="query"
      label="Buscar producto"
      placeholder="Ej: leche"
      clearable
      class="mb-4"
    />

    <div v-if="filtered.length === 0">
      <v-alert type="warning">No se encontraron productos.</v-alert>
    </div>

    <div v-else>
      <ProductItem
        v-for="p in filtered"
        :key="p.id"
        :product="p"
        @add-to-cart="forwardAdd"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductItem from './ProductItem.vue'
import products from '../data/products.js'
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return products
  return products.filter(p => p.name.toLowerCase().includes(q))
})

const emit = defineEmits(['add-to-cart'])
function forwardAdd(id) {
  emit('add-to-cart', id) // reemit para que la vista superior la escuche
}
</script>
