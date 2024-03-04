<template>
  <button
    class="bg-white-200 hover:bg-blue-100 text-black border border-black font-medium py-1 px-2 rounded-lg"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
</script>
