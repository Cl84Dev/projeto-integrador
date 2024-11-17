<template>
  <div class="w-80 flex flex-col items-center justify-center gap-3">
    <h1 class="text-4xl font-bold text-red-200 mb-5">Banco Integrador</h1>

    <label class="flex flex-col w-full text-red-200"
      >Nome
      <input
        type="text"
        v-model="name"
        class="p-2 mt-2 bg-purple-400 outline-purple-500 outline-offset-0 text-neutral-700 rounded"
      />
    </label>

    <label class="flex flex-col w-full text-red-200"
      >CPF
      <input
        type="text"
        v-model="cpf"
        class="p-2 mt-2 bg-purple-400 outline-purple-500 outline-offset-0 text-neutral-700 rounded"
      />
    </label>

    <label class="flex flex-col w-full text-red-200"
      >Senha
      <input
        type="password"
        v-model="password"
        class="p-2 mt-2 bg-purple-400 outline-purple-500 outline-offset-0 text-neutral-700 rounded"
      />
    </label>

    <label class="flex flex-col w-full text-red-200"
      >Repita a Senha
      <input
        type="password"
        v-model="repeatedPassword"
        class="p-2 mt-2 bg-purple-400 outline-purple-500 outline-offset-0 text-neutral-700 rounded"
      />
    </label>

    <button
      class="rounded m-3 p-3 bg-purple-800 hover:bg-purple-900 active:bg-purple-950 text-red-200"
      @click="signup"
    >
      Registre-se
    </button>

    <span class="text-red-200"
      >Já possui conta?
      <router-link to="/login" class="text-red-300 hover:underline"
        >Entre</router-link
      ></span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api.js";
import { useRouter } from "vue-router";

const name = ref("");
const cpf = ref("");
const password = ref("");
const repeatedPassword = ref("");
const router = useRouter();

const signup = () => {
  api
    .post("/signup", {
      name: name.value,
      cpf: cpf.value,
      password: password.value,
    })
    .then((res) => {
      router.push("/login");
      console.log("Sucesso ao registrar", res.data);
    })
    .catch((err) => console.log(err));
};
</script>
