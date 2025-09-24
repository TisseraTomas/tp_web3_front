<!-- src/components/QuickClientRegister.vue -->
<template>
  <v-card class="pa-4" max-width="480">
    <v-card-title>Registro rápido de clientes</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="name"
        label="Nombre del cliente"
        :class="{ 'invalid-input': name && name.length < 3 }"
        :counter="50"
        clearable
      />
      <v-btn class="mt-4" :disabled="!valid" color="primary" @click="register">Registrar</v-btn>

      <v-alert v-if="message" class="mt-4" type="success">
        {{ message }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
const name = ref('')
const message = ref('')

const valid = computed(() => name.value.trim().length >= 3)

function register() {
  if (!valid.value) {
    message.value = 'Nombre inválido.'
    return
  }
  console.log('Cliente registrado:', name.value)
  message.value = `🎉 Bienvenido, ${name.value}!`
  // Para simular "guardar", podrías emitir un evento; aquí solo limpiamos
  name.value = ''
}
</script>

<style scoped>
.invalid-input input {
  border: 1px solid #ff6b6b !important;
}
</style>
