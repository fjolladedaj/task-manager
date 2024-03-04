<template>
  <div class="chip" :style="`background-color: ${tag.color}`">
    <span class="chip-text">{{ tag.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { TaskTag } from '@/models/task'
import type { PropType } from 'vue'

defineProps({
  tag: {
    type: Object as PropType<TaskTag>,
    required: true
  }
})
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 16px;
  padding: 4px 8px;
  margin-right: 8px;
}

.chip-text {
  margin-right: 4px;
}
</style>
