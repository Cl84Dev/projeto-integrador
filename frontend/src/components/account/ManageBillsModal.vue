<template>
  <div
    class="w-screen h-screen backdrop-blur-sm bg-black/30 fixed top-0 left-0"
    v-if="toggleModal"
    @click="closeModal"
  ></div>
</template>

<script setup>
const props = defineProps(["toggleModal"]);
const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal", false);
};
</script>
