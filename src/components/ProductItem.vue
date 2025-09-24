<!-- src/components/ProductItem.vue -->
<template>
  <v-card class="pa-3 mb-3">
    <v-row align="center">
      <v-col cols="8">
        <div :class="{ 'out-of-stock': product.stock === 0 }">
          <div class="text-subtitle-1 font-weight-medium">{{ product.name }}</div>
          <div class="text-body-2"> {{ formatPrice(product.price) }} </div>
          <div class="text-caption">Stock: {{ product.stock }}</div>
        </div>
      </v-col>

      <v-col cols="4" class="text-right">
        <v-btn small @click="goDetail">Detalle</v-btn>
        <v-btn small color="primary" :disabled="product.stock === 0" @click="onAdd">
          Agregar
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ product: Object })
const emit = defineEmits(['add-to-cart'])
const router = useRouter()

function onAdd() {
  emit('add-to-cart', props.product.id) // emito id (requisito)
}

function goDetail() {
  router.push({ name: 'ProductoDetalle', params: { id: props.product.id } })
}

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n)
}
</script>

<style scoped>
.out-of-stock {
  opacity: 0.6;
  border-left: 4px solid #ff6b6b;
  padding-left: 8px;
}
</style>
