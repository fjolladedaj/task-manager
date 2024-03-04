<template>
  <button
    :disabled="disabled"
    class="bg-primary hover:bg-blue-700 disabled:bg-gray-400 text-white border-2 border-black font-bold py-2 px-4 rounded-lg"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

// TODO: make props typescript-friendly
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
