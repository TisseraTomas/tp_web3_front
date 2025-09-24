<!-- src/views/Clients.vue -->
<template>
  <v-container>
    <h2>Clientes</h2>

    <QuickClientRegister @registered="onRegistered" />

    <v-card class="mt-6 pa-4" v-if="clients.length > 0">
      <div class="text-subtitle-1">Clientes registrados</div>
      <v-list dense>
        <v-list-item v-for="(c, idx) in clients" :key="idx">
          <v-list-item-content>{{ c }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import QuickClientRegister from '../components/QuickClientRegister.vue'
import { ref } from 'vue'

const clients = ref([])

// Si preferís que QuickClientRegister emita un evento 'registered', podrías escucharlo:
// en el ejemplo anterior no emitimos, así que podés modificar el componente si querés.
// Aquí dejo un handler vacío por si lo adaptás:
function onRegistered(name) {
  clients.value.push(name)
}
</script>
