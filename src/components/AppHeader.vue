<template>
  <div class="header">
    <div class="flex items-center justify-center">
      <slot name="leftContent"> </slot>
    </div>
    <div class="flex items-center justify-center">
      <slot name="rightContent"> </slot>
      <div v-if="isLoggedIn" class="ml-8 flex space-x-2 items-center">
        <div>{{ currentUser.name }}</div>
        <AppPrimaryButton @click="logOut">Log out</AppPrimaryButton>
        <div v-if="errorAlertVisible" class="text-red-500">An error occurred when logging out.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockSignOut } from '@/helpers/auth'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/task'

const authStore = useAuthStore()
const tasksStore = useTaskStore()
const { isLoggedIn, currentUser } = storeToRefs(authStore)

const router = useRouter()

const errorAlertVisible = ref(false)

const showErrorAlert = () => {
  errorAlertVisible.value = true

  setTimeout(() => {
    errorAlertVisible.value = false
  }, 7000)
}

const logOut = async () => {
  try {
    await mockSignOut()
    router.replace('/log-in')
    tasksStore.resetTasksToDefault()
    authStore.resetData()
  } catch (error) {
    showErrorAlert()
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
</style>
