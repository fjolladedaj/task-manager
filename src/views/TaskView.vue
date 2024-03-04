<template>
  <AppContainer>
    <AppHeader>
      <template v-slot:leftContent>
        <BackButton />
        <VerticalSeparator />
        <AppTitle>{{ task?.title }} {{ task?.completed ? ' (Completed)' : '' }}</AppTitle>
      </template>

      <template v-slot:rightContent>
        <div class="action-btns">
          <AppSecondaryButton @click="editTask()">Edit</AppSecondaryButton>
          <AppSecondaryButton @click="deleteTask()">Delete</AppSecondaryButton>
          <AppSecondaryButton @click="copyTask()">Copy</AppSecondaryButton>
        </div>
      </template>
    </AppHeader>
    <div>
      <p>ID: {{ route.params.id }}</p>
      <p>Description: {{ task?.description }}</p>
      <p>Complete by: {{ task?.completeBy?.toLocaleString() || 'N/A' }}</p>

      <div v-if="task?.tags?.length">
        <p>Tags:</p>
        <ul>
          <li v-for="tag in task?.tags" :key="tag.name">
            <span :style="{ color: tag.color }">{{ tag.name }}</span>
          </li>
        </ul>
      </div>

      <p>Created At: {{ task?.createdAt.toLocaleString() }}</p>
      <p v-if="task?.updatedAt">Updated At: {{ task?.updatedAt?.toLocaleString() }}</p>
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useRoute, useRouter } from 'vue-router'
import VerticalSeparator from '@/components/VerticalSeparator.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppTitle from '@/components/AppTitle.vue'
import BackButton from '@/components/BackButton.vue'
import AppSecondaryButton from '@/components/AppSecondaryButton.vue'
import AppContainer from '@/components/AppContainer.vue'

const route = useRoute()
const router = useRouter()

const taskStore = useTaskStore()
const task = computed(() => taskStore.tasks.find((task) => task.id === Number(route.params.id)))

function copyTask() {
  if (!task.value) return
  const copiedTask = { ...task.value, title: `${task.value.title} (Copy)` }
  const copyTaskId = taskStore.addTask(copiedTask)
  router.push(`/tasks/${copyTaskId}`)
}

function deleteTask() {
  if (!task.value) return
  taskStore.removeTask(task.value)
  router.push('/tasks')
}

function editTask() {
  if (!task.value) return
  router.push(`/tasks/${task.value.id}/edit`)
}
</script>

<style scoped>
.action-btns button {
  margin-left: 10px;
}
</style>
