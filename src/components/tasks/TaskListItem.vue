<template>
  <div :key="task.id" @click="goToTask(task.id)" class="task-item">
    <div class="task-info">
      <p class="task-title">{{ task.title }} {{ task.completed ? ' (Completed)' : '' }}</p>
      <p class="task-subtitle">
        {{ task.createdAt.toLocaleString() }}
      </p>
    </div>
    <div class="task-tags">
      <TaskTag v-for="tag in task.tags" :key="tag.name" :tag="tag" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Task } from '../../models/task'
import { useRouter } from 'vue-router'
import TaskTag from './TaskTag.vue'

defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true
  }
})

const router = useRouter()
function goToTask(taskId: number) {
  console.log('goToTask', taskId)
  router.push({ name: 'task', params: { id: taskId.toString() } })
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
}

.task-item:hover {
  background-color: #f0f0f0;
}

.task-title {
  font-size: 18px;
  font-weight: 450;
  margin: 0;
}

.task-subtitle {
  font-size: 14px;
  margin: 0;
}
</style>
