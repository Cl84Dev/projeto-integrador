<template>
  <div class="w-80 flex flex-col items-center justify-center gap-3">
    <h1 class="text-4xl font-bold text-red-200 mb-5">Banco Integrador</h1>
    <span class="text-red-200 font-bold">Crie sua conta, {{ name }}</span>

    <div class="text-red-200 bg-purple-500 p-10 rounded-lg flex flex-col gap-3">
      <span>Termos de uso:</span>
      <span
        >Compreendo que essa conta não garante nenhum valor monetário real e que
        se trata apenas de um exercício para o Projeto Integrador do curso de
        Análise e Desenvolvimento de Sistemas.</span
      >
    </div>

    <div
      class="bg-blue-600 p-2 hover:bg-blue-700 w-100 text-white rounded-lg cursor-pointer select-none"
      @click="createAccount"
    >
      Criar conta
    </div>
  </div>
</template>

<script setup>
import api from "../api";
import { useCustomerStore } from "../store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

const customerStore = useCustomerStore();

const { name, customer_id } = storeToRefs(customerStore);

const createAccount = async () => {
  try {
    const response = await api.post("/account", {
      customer_id: customer_id.value,
    });
    router.push(`/account`);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

const getAccount = async () => {
  try {
    const response = await api.get(`/account`);
    router.push("/account");
    console.log(response.data);
  } catch (error) {
    if (error.status === 400) {
      console.error(error.data.message);
    }
    console.error(error.response.data.message);
  }
};

onMounted(() => {
  if (!name.value && !customer_id.value) {
    router.push("/login");
  }
  getAccount();
});
</script>
