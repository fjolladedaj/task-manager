<template>
  <AppContainer>
    <AppHeader>
      <template v-slot:leftContent>
        <AppTitle>Tasks</AppTitle>
      </template>

      <template v-slot:rightContent>
        <AppPrimaryButton @click="addTask()"> New Task </AppPrimaryButton>
      </template>
    </AppHeader>
    <div class="list">
      <TaskListItem v-for="task in taskStore.tasks" :key="task.id" :task="task" />
    </div>
  </AppContainer>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/task'
import TaskListItem from '@/components/tasks/TaskListItem.vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppContainer from '@/components/AppContainer.vue'

const router = useRouter()
const taskStore = useTaskStore()

function addTask() {
  router.push('/tasks/new')
}
</script>

<style scoped>
.list {
  margin: 20px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
