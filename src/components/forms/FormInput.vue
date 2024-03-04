<template>
  <input
    :type="type"
    :name="name"
    class="bg-white placeholder:text-black placeholder:font-semibold border-2 border-black text-gray-900 rounded-lg focus:border-2 focus:border-primary focus:outline-none w-full p-4"
    :placeholder="placeholder"
    :required="required"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

// TODO: make props typescript-friendly
defineProps({
  modelValue: String,
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  name: {
    type: String,
    required: true
  }
})

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
