<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <!-- Título -->
    <h2 class="mt-10">Clientes</h2>

    <!-- Registro rápido -->
    <QuickClientRegister @registered="onRegistered" />

    <!-- Lista de clientes -->
    <v-card
      v-if="clients.length > 0"
      class="mt-6 pa-4"
      elevation="4"
      max-width="400"
    >
      <div class="text-subtitle-1 mb-2 text-center">Clientes registrados</div>
      <v-list dense>
        <v-list-item
          v-for="(c, idx) in clients"
          :key="idx"
          class="justify-center"
        >
          <v-list-item-content class="text-center">{{ c }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import QuickClientRegister from "../components/QuickClientRegister.vue"
import { ref } from "vue"

const clients = ref([])

function onRegistered(name) {
  clients.value.push(name)
}
</script>

