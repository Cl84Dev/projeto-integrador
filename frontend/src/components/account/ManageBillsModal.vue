<template>
  <div
    class="w-screen h-screen backdrop-blur-sm flex items-center justify-center bg-black/30 fixed top-0 left-0 overflow-y-auto"
    v-if="toggleModal"
    @click="closeModal"
  >
    <div
      class="w-2/3 min-h-80 bg-slate-100 p-8 rounded select-none"
      @click="(e) => e.stopPropagation()"
    >
      <h3 class="text-purple-700 text-lg font-bold mb-5">Contas</h3>

      <div
        class="border-2 rounded w-full flex flex-col items-start justify-between p-8 mb-5"
      >
        <span class="text-bold text-purple-700 mb-3">Adicionar Conta</span>
        <label for="account" class="text-neutral-600"
          >Descrição:
          <input
            type="text"
            placeholder="Ex: Conta de Luz"
            class="p-1 mx-2 mb-5 w-32 bg-purple-300 outline-purple-400 outline-offset-0 text-neutral-700 rounded"
            v-model="description"
          />
        </label>
        <label for="account" class="text-neutral-600"
          >Valor:
          <input
            type="text"
            placeholder="Ex: 123456"
            class="p-1 mx-2 mb-5 w-32 bg-purple-300 outline-purple-400 outline-offset-0 text-neutral-700 rounded"
            v-model="value"
          />
        </label>
        <label for="account" class="text-neutral-600"
          >Vencimento:
          <input
            type="date"
            class="p-1 mx-2 mb-5 w-32 bg-purple-300 outline-purple-400 outline-offset-0 text-neutral-700 rounded"
            v-model="date_due"
          />
        </label>
        <div
          class="p-2 bg-purple-700 rounded text-white text-sm font-bold select-none cursor-pointer"
          @click="addBill"
        >
          Adicionar
        </div>
      </div>

      <table class="w-full" v-if="bills.length > 0">
        <thead class="text-neutral-600">
          <tr>
            <th class="w-1/5">Vencimento</th>
            <th class="w-1/5">Descrição</th>
            <th class="w-1/5">Valor</th>
            <th class="w-1/5">Status</th>
            <th class="w-1/5">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.bill_to_pay_id">
            <!-- Transferência enviada -->
            <td class="text-center">
              {{ formatDate(bill.date_due) }}
            </td>
            <td class="text-center">
              {{ bill.description }}
            </td>
            <td class="text-center text-red-600">R$ {{ bill.value }}</td>
            <td
              class="text-center"
              :class="bill.status === 'pago' ? 'text-blue-600' : 'text-red-600'"
            >
              {{ bill.status === "pago" ? "Paga" : "Em aberto" }}
            </td>
            <td class="text-center flex flex-row gap-1">
              <div
                class="p-1 bg-blue-700 text-white text-xs w-1/2 rounded cursor-pointer"
                v-if="bill.status !== 'pago'"
                @click="
                  payBill(bill.bill_to_pay_id, bill.description, bill.value)
                "
              >
                Pagar
              </div>
              <div
                v-if="bill.status === 'em_aberto'"
                class="p-1 bg-red-700 text-white text-xs w-1/2 rounded cursor-pointer"
                @click="deleteBill(bill.bill_to_pay_id)"
              >
                Excluir
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import api from "../../api";

const props = defineProps(["toggleModal", "account_id", "balance"]);
const emit = defineEmits(["closeModal", "refreshAccount"]);

const bills = ref([]);
const value = ref("");
const description = ref("");
const date_due = ref("");

const closeModal = () => {
  emit("closeModal", false);
};

const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const getBills = async () => {
  try {
    const response = await api.get(`/bill/${props.account_id}`);
    bills.value = response.data.bills;
  } catch (err) {
    console.log(err);
  }
};

const addBill = async () => {
  if (!value.value || !description.value || !date_due.value) {
    alert("Todos os campos são obrigatórios");
    return;
  }

  if (!Number(value.value)) {
    alert("Valor aceita somente números");
    return;
  }
  try {
    const response = await api.post("/bill", {
      account_id: props.account_id,
      value: value.value,
      description: description.value,
      date_due: date_due.value,
    });

    value.value = "";
    description.value = "";
    date_due.value = null;

    alert("Conta adicionada com sucesso!");

    getBills();
  } catch (err) {
    console.log(err);
  }
};

const payBill = async (id, description, value) => {
  if (Number(value) > props.balance) {
    alert("Saldo insuficiente!");
    return;
  }
  try {
    const response = await api.post("/pay-bill", {
      account_id: props.account_id,
      bill_to_pay_id: id,
      value: value,
      description: description,
    });

    alert("Conta paga com sucesso!");

    emit("refreshAccount");

    getBills();
  } catch (err) {
    console.log(err);
  }
};

const deleteBill = async (id) => {
  try {
    const response = await api.delete(`/bill/${id}`);
    alert("Conta excluída com sucesso!");
    getBills();
  } catch (err) {
    console.log(err);
  }
};

watch(
  () => props.account_id,
  () => {
    getBills();
  }
);
</script>
