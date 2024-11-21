<template>
  <div class="max-w-[800px] w-full flex flex-col m-5 h-screen bg-slate-100">
    <div class="w-full h-[100px] p-5 flex flex-row bg-purple-500 text-white">
      <div class="w-3/4">
        <span
          >Seja bem vindo, <span class="font-bold text-wrap">{{ name }}</span
          >!</span
        >
        <br />
        <span
          >Conta:
          <span class="font-bold text-wrap">{{ account_number }}</span></span
        >
      </div>
      <div class="w-1/4 flex flex-row justify-end items-start">
        <div
          class="min-w-24 text-center rounded p-1 bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-red-200 select-none cursor-pointer"
          @click="logout"
        >
          Sair
        </div>
      </div>
    </div>
    <div class="w-full p-5 text-start">
      <span class="text-neutral-600 text-xl">Saldo: R${{ balance }}</span>
    </div>
    <div class="w-full p-5 flex flex-row gap-5">
      <div
        class="min-w-40 text-center border-2 border-purple-700 text-purple-700 p-2 rounded select-none cursor-pointer"
        @click="toggleTransferModal = true"
      >
        Transferir
      </div>
      <div
        class="min-w-40 text-center border-2 border-purple-700 text-purple-700 p-2 rounded select-none cursor-pointer"
        @click="toggleManageBillsModal = true"
      >
        Gerenciar Contas
      </div>
    </div>
    <TransactionsList
      :account_id="account_id"
      :account_number="account_number"
    />
    <TransferModal
      :toggleModal="toggleTransferModal"
      @closeModal="(v) => (toggleTransferModal = v)"
      @refreshAccount="getAccount"
    />
    <ManageBillsModal
      :account_id="account_id"
      :balance="balance"
      :toggleModal="toggleManageBillsModal"
      @refreshAccount="getAccount"
      @closeModal="(v) => (toggleManageBillsModal = v)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";
import { useCustomerStore } from "../store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import TransferModal from "../components/account/TransferModal.vue";
import ManageBillsModal from "../components/account/ManageBillsModal.vue";
import TransactionsList from "../components/account/TransactionsList.vue";

const router = useRouter();

const customerStore = useCustomerStore();

const { name, account_number, account_id, balance } =
  storeToRefs(customerStore);

const toggleTransferModal = ref(false);
const toggleManageBillsModal = ref(false);

const getAccount = async () => {
  // Zera o account_id para que o TransactionList seja renderizado novamente
  account_id.value = 0;
  try {
    const response = await api.get(`/account`);
    name.value = response.data.account.name;
    account_number.value = response.data.account.account_number;
    account_id.value = response.data.account.account_id;
    balance.value = response.data.account.balance;
  } catch (error) {
    if (error.status === 400) {
      router.push("/create-account");
    }
    console.error(error.data.message);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push("/");
  }
  getAccount();
});
</script>
