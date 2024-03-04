<template>
  <div class="flex flex-col justify-center items-center space-y-6 mt-20">
    <div>
      <AppTitle class="font-bold">Welcome to your Task Manager!</AppTitle>
      <AppTitle class="text-sm">Stay organized, stay efficient.</AppTitle>
    </div>
    <AppPrimaryButton v-if="isLoggedIn" @click="router.push('tasks')">View tasks</AppPrimaryButton>
    <AppPrimaryButton v-else @click="router.push('log-in')">Log in</AppPrimaryButton>
  </div>
</template>

<script setup lang="ts">
import AppTitle from '@/components/AppTitle.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

const { isLoggedIn } = storeToRefs(authStore)
const router = useRouter()
</script>
