<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6" elevation="8" width="400">
      <v-card-title class="text-h5">Iniciar Sesión</v-card-title>

      <v-card-text>
        <v-form v-model="valid" @submit.prevent="login">
          <v-text-field
            hide-details="auto"
            v-model="email"
            label="Email"
            :rules="[rules.required, rules.email]"
            prepend-icon="mdi-email"
            required
          />
          <v-text-field
            hide-details="auto"
            v-model="password"
            label="Contraseña"
            :rules="[rules.required, rules.min]"
            prepend-icon="mdi-lock"
            type="password"
            required
          />
          <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
          <v-btn
            class="mt-4"
            :disabled="!valid || loading"
            :loading="loading"
            color="primary"
            type="submit"
            block
          >
            Ingresar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";

const router = useRouter();
const auth = useAuth();

const email = ref("");
const password = ref("");
const valid = ref(false);
const loading = ref(false);
const error = ref("");

const rules = {
  required: v => !!v || "Campo requerido",
  email: v => /.+@.+\..+/.test(v) || "Email inválido",
  min: v => (v && v.length >= 6) || "Mínimo 6 caracteres",
};

const login = async () => {
  loading.value = true;
  error.value = "";
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};
</script>
