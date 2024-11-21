<template>
  <div class="w-full flex flex-col p-5 overflow-y-auto">
    <h3 class="text-neutral-600 text-lg mb-5">Transações</h3>

    <table class="lg:w-2/3 w-full">
      <thead class="text-neutral-600">
        <tr>
          <th class="w-1/4">Data</th>
          <th class="w-2/4">Descrição</th>
          <th class="w-1/4">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactions"
          :key="transaction.transaction_id"
        >
          <!-- Transferência enviada -->
          <td
            class="text-red-600"
            v-if="
              transaction.target_account &&
              transaction.target_account !== props.account_number
            "
          >
            {{ formatDate(transaction.date_time) }}
          </td>
          <td
            class="text-center text-red-600"
            v-if="
              transaction.target_account &&
              transaction.target_account !== props.account_number
            "
          >
            Transferencia para {{ transaction.target_name }}
          </td>
          <td
            class="text-end text-red-600"
            v-if="
              transaction.target_account &&
              transaction.target_account !== props.account_number
            "
          >
            R$ {{ transaction.value }}
          </td>

          <!-- Transferência recebida -->
          <td
            class="text-blue-600"
            v-if="transaction.target_account === props.account_number"
          >
            {{ formatDate(transaction.date_time) }}
          </td>
          <td
            class="text-center text-blue-600"
            v-if="transaction.target_account === props.account_number"
          >
            Transferencia de {{ transaction.target_name }}
          </td>
          <td
            class="text-end text-blue-600"
            v-if="transaction.target_account === props.account_number"
          >
            R$ {{ transaction.value }}
          </td>

          <!-- Pagamento de conta -->

          <td class="text-red-600" v-if="transaction.type === 'pagamento'">
            {{ formatDate(transaction.date_time) }}
          </td>
          <td
            class="text-center text-red-600"
            v-if="transaction.type === 'pagamento'"
          >
            Pagamento de Conta
          </td>
          <td
            class="text-end text-red-600"
            v-if="transaction.type === 'pagamento'"
          >
            R$ {{ transaction.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const props = defineProps(["account_id", "account_number"]);
const emit = defineEmits(["refreshAccount"]);

const transactions = ref([]);

const getTransactions = async () => {
  try {
    const response = await api.get(`/transaction/${props.account_id}`);
    transactions.value = response.data.transactions;
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

watch(
  () => props.account_id,
  () => {
    getTransactions();
  }
);
</script>
