import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomerStore = defineStore("customer", () => {
  const name = ref("");
  const customer_id = ref(null);
  const account_number = ref("");
  const account_id = ref(0);
  const balance = ref(0);

  return {
    name,
    customer_id,
    account_number,
    account_id,
    balance,
  };
});
