<template>
  <AppContainer>
    <AppHeader>
      <template v-slot:leftContent>
        <BackButton />
        <VerticalSeparator />
        <AppTitle>{{ taskTitle }}</AppTitle>
      </template>

      <template v-slot:rightContent>
        <AppPrimaryButton :disabled="!isValidTitle || isPastDate" @click="saveTask()">
          Save
        </AppPrimaryButton>
      </template>
    </AppHeader>
    <div class="task-form">
      <label for="title">Title:</label>
      <input type="text" v-model="taskTitle" id="title" />
      <p v-if="!isValidTitle" class="text-red-500 mt-2">
        Title should begin with a capital letter and be at least 5 characters long.
      </p>

      <label for="description">Description:</label>
      <textarea v-model="taskDescription" id="description"></textarea>

      <label for="completeBy">Complete By:</label>
      <input type="date" v-model="taskCompleteBy" @input="validateDate" id="completeBy" />
      <p v-if="isPastDate" class="text-red-500 mt-2">Date should be in the future</p>

      <label for="tags">Tags:</label>
      <input type="text" v-model="tagInput.name" placeholder="Tag name" id="tags" />
      <input type="color" v-model="tagInput.color" id="tagColor" />
      <AppSecondaryButton @click="addTag">Add Tag</AppSecondaryButton>
      <ul>
        <li v-for="(tag, index) in taskTags" :key="index">
          <span :style="{ color: tag.color }">{{ tag.name }}</span>
          <AppSecondaryButton @click="removeTag(index)">Remove</AppSecondaryButton>
        </li>
      </ul>

      <label for="completed">Completed:</label>
      <input type="checkbox" v-model="taskCompleted" id="completed" />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import type { TaskTag } from '@/models/task'
import { useTaskStore } from '@/stores/task'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import BackButton from '@/components/BackButton.vue'
import VerticalSeparator from '@/components/VerticalSeparator.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppPrimaryButton from '@/components/AppPrimaryButton.vue'
import AppSecondaryButton from '@/components/AppSecondaryButton.vue'
import AppContainer from '@/components/AppContainer.vue'

const route = useRoute()
const router = useRouter()

const tasksStore = useTaskStore()
const task = ref(tasksStore.tasks.find((task) => task.id === Number(route.params.id)))

const taskToEdit = ref({})
const isPastDate = ref(false)
const tagInput = ref<TaskTag>({ name: '', color: '#000000' })

const taskTitle = computed({
  get: () => {
    return taskToEdit.value.title
  },
  set: (value) => {
    taskToEdit.value.title = value
  }
})

const taskDescription = computed({
  get: () => {
    return taskToEdit.value.description
  },
  set: (value) => {
    taskToEdit.value.description = value
  }
})

const taskCompleteBy = computed({
  get: () => {
    return taskToEdit.value.completeBy
  },
  set: (value) => {
    taskToEdit.value.completeBy = value
  }
})

const taskCompleted = computed({
  get: () => {
    return taskToEdit.value.completed
  },
  set: (value) => {
    taskToEdit.value.completed = value
  }
})

const taskTags = computed(() => taskToEdit.value.tags)

const isValidTitle = computed(() => {
  if (taskToEdit.value.title) {
    const pattern = /^[A-Z].{4,}$/
    return pattern.test(taskToEdit.value.title)
  }
  return false
})

const minimumDate = computed(() => {
  // Local timezone is not taken into account
  const today = new Date().toISOString().split('T')[0]
  return today
})

const validateDate = () => {
  isPastDate.value = taskToEdit.value.completeBy < minimumDate.value
}

if (!task.value) {
  // Handle task not found
  // Redirect to tasks page
  router.push('/tasks')
}

function addTag() {
  if (!taskToEdit.value.tags) {
    taskToEdit.value.tags = []
  }
  if (tagInput.value.name.trim() !== '') {
    taskToEdit.value = {
      ...taskToEdit.value,
      tags: [...taskToEdit.value.tags, { name: tagInput.value.name, color: tagInput.value.color }]
    }
    tagInput.value.name = ''
    tagInput.value.color = '#000000'
  }
}

function removeTag(index: number) {
  if (taskToEdit.value.tags) {
    taskToEdit.value.tags.splice(index, 1)
  }
}

function saveTask() {
  if (taskToEdit.value) {
    tasksStore.updateTask(taskToEdit.value)
    router.push(`/tasks/${task.value.id}`)
  }
}

onMounted(() => {
  taskToEdit.value = { ...task.value }
  // If editing existing task, fetch task data and assign to task ref
})
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 5px;
}
</style>
