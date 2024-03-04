<template>
  <router-link :to="to">
    <AppSecondaryButton> Back </AppSecondaryButton>
  </router-link>
</template>

<script setup lang="ts">
import AppSecondaryButton from '@/components/AppSecondaryButton.vue'

withDefaults(
  defineProps<{
    to?: string
  }>(),
  {
    to: '/tasks'
  }
)
</script>
