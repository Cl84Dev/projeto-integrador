<template>
  <div
    class="w-screen h-screen backdrop-blur-sm bg-black/30 fixed top-0 left-0 flex justify-center items-center"
    v-if="toggleModal"
    @click="closeModal"
  >
    <div
      class="w-1/2 min-h-80 bg-slate-100 p-8 rounded select-none"
      @click="(e) => e.stopPropagation()"
    >
      <div v-if="tab === 'accounts'">
        <h3 class="text-purple-700 text-lg font-bold mb-5">
          Procurar contas...
        </h3>
        <label for="account" class="text-neutral-600 font-bold"
          >Conta:
          <input
            type="text"
            placeholder="Ex: 123456"
            class="p-1 mx-2 mb-5 w-32 bg-purple-300 outline-purple-400 outline-offset-0 text-neutral-700 rounded"
            v-model="account"
            @input="getAccounts"
          />
        </label>
        <div
          class="text-neutral-700 py-1 w-full flex justify-between cursor-pointer"
          v-for="account in accounts"
          :key="account.account_id"
          @click="chooseAccount(account)"
        >
          <span>{{ account.name }}</span>
          <span>{{ account.account_number }}</span>
        </div>
      </div>
      <div v-if="tab === 'transfer'" class="w-full flex flex-col items-center">
        <h3 class="text-purple-700 text-lg font-bold mb-5">Transferência</h3>
        <label for="value" class="text-neutral-600 font-bold">
          Valor:
          <input
            type="text"
            class="p-2 mx-2 mb-5 w-32 bg-purple-300 outline-purple-400 outline-offset-0 text-neutral-700 rounded"
            :class="!hasBalance ? 'outline-red-500' : ''"
            v-model="value"
          />
        </label>

        <div class="text-neutral-600 font-bold">
          Nome: {{ accountSelected.name }}
        </div>
        <div class="text-neutral-600 font-bold">
          Conta: {{ accountSelected.account_number }}
        </div>
        <div class="flex flex-row gap-3 mt-5">
          <div
            class="p-2 rounded bg-red-500 text-white text-sm font-bold select-none cursor-pointer"
            @click="tab = 'accounts'"
          >
            Voltar
          </div>
          <div
            class="p-2 bg-purple-700 rounded text-white text-sm font-bold select-none cursor-pointer"
            @click="transfer"
          >
            Transferir
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCustomerStore } from "../../store";
import { storeToRefs } from "pinia";
import api from "../../api";

const props = defineProps(["toggleModal"]);
const emit = defineEmits(["closeModal", "refreshAccount"]);

const customerStore = useCustomerStore();

const { name, account_number, account_id, balance } =
  storeToRefs(customerStore);

const tab = ref("accounts");
const value = ref("");
const account = ref("");
const accounts = ref([]);
const accountSelected = ref({});

const hasBalance = computed(() => {
  return Number(balance.value) >= Number(value.value);
});

const isNumber = computed(() => {
  return !isNaN(Number(value.value));
});

const closeModal = () => {
  emit("closeModal", false);
};

const chooseAccount = (account) => {
  accountSelected.value = account;
  tab.value = "transfer";
};

const getAccounts = async () => {
  try {
    const response = await api.get(`/account/${account.value}`);
    accounts.value = response.data.accounts;
  } catch (error) {
    console.error(error.data.message);
  }
};

const transfer = async () => {
  if (!isNumber.value || value.value === "") {
    alert("Valor inválido");
    return;
  }
  if (!hasBalance.value) {
    alert("Saldo insuficiente");
    return;
  }
  try {
    const response = await api.post("/transaction", {
      origin_account_id: account_id.value,
      target_account_id: accountSelected.value.account_id,
      value: value.value,
    });
    alert(response.data.message);
    closeModal();
    emit("refreshAccount");
    tab.value = "accounts";
    accounts.value = [];
    account.value = "";
  } catch (error) {
    alert(error.data.message);
  }
};
</script>
