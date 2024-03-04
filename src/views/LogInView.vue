<template>
  <div class="flex justify-center mt-20">
    <form class="space-y-6 p-12 bg-blue-100 rounded-lg" @submit.prevent="logIn">
      <AppTitle>Log In</AppTitle>
      <FormInput v-model="email" name="email" type="email" placeholder="Email" required />
      <FormInput
        v-model="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />

      <div class="flex items-center space-x-4">
        <AppPrimaryButton>Submit</AppPrimaryButton>
        <div v-if="errorAlertVisible" class="text-red-500">An error occurred when logging in.</div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '@/components/forms/FormInput.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppTitle from '@/components/AppTitle.vue'
import { mockSignIn, mockGetCurrentUser, mockGetIdToken } from '@/helpers/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const store = useAuthStore()

const { setUserAndUserToken } = store

const email = ref('')
const password = ref('')
const errorAlertVisible = ref(false)

const showErrorAlert = () => {
  errorAlertVisible.value = true
}

const resetForm = () => {
  email.value = ''
  password.value = ''
}

const logIn = async () => {
  try {
    await mockSignIn(email.value, password.value)
    const user = mockGetCurrentUser()

    let token = null
    try {
      token = await mockGetIdToken()
    } catch (error) {
      token = null
    }
    setUserAndUserToken(user, token)
    router.push('/tasks')
    resetForm()
  } catch (error) {
    showErrorAlert()
  }
}
</script>
