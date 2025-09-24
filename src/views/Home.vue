<template>
  <v-container class="text-center mt-10">
    <h1>Bienvenido a la Tienda</h1>
    <p>Seleccione una opción para comenzar:</p>

    <div class="mt-6">
      <v-btn color="primary" class="mr-4" to="/productos">
        Ver Productos
      </v-btn>
      <v-btn color="secondary" to="/clientes">
        Registrar Cliente
      </v-btn>
    </div>
  </v-container>
</template>
