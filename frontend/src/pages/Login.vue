<template>
  <div class="w-80 flex flex-col items-center justify-center gap-3">
    <h1 class="text-4xl font-bold text-red-200 mb-5">Banco Integrador</h1>

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

    <button
      class="rounded m-3 p-3 bg-purple-800 hover:bg-purple-900 active:bg-purple-950 text-red-200"
      @click="authenticate"
    >
      Entre
    </button>

    <span class="text-red-200"
      >Não possui conta?
      <router-link to="/signup" class="text-red-300 hover:underline"
        >Registre-se</router-link
      ></span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useCustomerStore } from "../store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const customerStore = useCustomerStore();

const { name, customer_id } = storeToRefs(customerStore);

const cpf = ref("");
const password = ref("");

const authenticate = () => {
  api
    .post("/authenticate", {
      cpf: cpf.value,
      password: password.value,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      name.value = res.data.name;
      customer_id.value = res.data.customer_id;
      router.push("/account");
    })
    .catch((err) => console.log(err));
};
</script>
