<template>
  <AppContainer>
    <AppHeader>
      <template v-slot:leftContent>
        <BackButton />
        <VerticalSeparator />
        <AppTitle>{{ task?.title }}</AppTitle>
      </template>

      <template v-slot:rightContent>
        <div>
          <AppPrimaryButton :disabled="!isValidTitle || isPastDate" @click="saveTask()"
            >Save
          </AppPrimaryButton>
        </div>
      </template>
    </AppHeader>
    <div class="task-form">
      <label for="title">Title:</label>
      <input type="text" v-model="task.title" id="title" />

      <p v-if="!isValidTitle" class="title-error text-red-500 mt-2">
        Title should begin with a capital letter and be at least 5 characters long.
      </p>

      <label for="description">Description:</label>
      <textarea v-model="task.description" id="description"></textarea>

      <label for="completeBy">Complete By:</label>
      <input type="date" v-model="task.completeBy" id="completeBy" @input="validateDate" />
      <p v-if="isPastDate" class="date-error text-red-500 mt-2">Date should be in the future</p>

      <label for="tags">Tags:</label>
      <input type="text" v-model="tagInput" @keydown.enter.prevent="addTag" id="tags" />
      <ul>
        <li v-for="(tag, index) in task.tags" :key="index">
          {{ tag }} <AppSecondaryButton @click="removeTag(index)">Remove</AppSecondaryButton>
        </li>
      </ul>

      <label for="completed">Completed:</label>
      <input type="checkbox" v-model="task.completed" id="completed" />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import type { Task } from '@/models/task'
import { useTaskStore } from '@/stores/task'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import BackButton from '@/components/BackButton.vue'
import VerticalSeparator from '@/components/VerticalSeparator.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppSecondaryButton from '@/components/AppSecondaryButton.vue'
import AppContainer from '@/components/AppContainer.vue'

const router = useRouter()

const tasksStore = useTaskStore()
const task = ref<Task>({})
const tagInput = ref<string>('')

function addTag() {
  if (!task.value) return
  if (!task.value.tags) {
    task.value.tags = []
  }
  if (tagInput.value.trim() !== '' && task.value.tags.indexOf(tagInput.value) === -1) {
    task.value.tags.push(tagInput.value)
    tagInput.value = ''
  }
}

const isValidTitle = computed(() => {
  if (task.value.title) {
    const pattern = /^[A-Z].{4,}$/
    return pattern.test(task.value.title)
  }

  return false
})

const minimumDate = computed(() => {
  // Local timezone is not taken into account
  const today = new Date().toISOString().split('T')[0]
  return today
})

const isPastDate = ref(false)

const validateDate = () => {
  isPastDate.value = task.value.completeBy < minimumDate.value
}

function removeTag(index: number) {
  if (!task.value) return

  if (task.value.tags) {
    task.value.tags.splice(index, 1)
  }
}

function saveTask() {
  if (task.value) {
    tasksStore.addTask(task.value)
    router.push(`/tasks/${task.value.id}`)
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}
</style>
