<template>
  <div class="w-80 flex flex-col items-center justify-center gap-3">
    <h1 class="text-4xl font-bold text-red-200 mb-5">Banco Integrador</h1>
    <div class="w-full flex flex-row">
      <router-link
        to="/signup"
        class="w-1/2 p-2 text-center rounded hover:bg-purple-800 text-red-200"
      >
        Registrar-se
      </router-link>
      <router-link
        to="/login"
        class="w-1/2 p-2 text-center rounded hover:bg-purple-800 text-red-200"
      >
        Entrar
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
