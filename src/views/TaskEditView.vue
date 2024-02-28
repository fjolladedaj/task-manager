<template>
    <div class="container">

        <div class="header">
            <router-link to="/tasks" class="back-btn">
                <button>
                    Back
                </button>
                <div class="separator"></div>
            </router-link>
            <div class="bar">

                <h1 class="title">{{ task?.title }}</h1>
                <div class="action-btns">
                    <button @click="saveTask()">
                        Save
                    </button>
                </div>
            </div>

        </div>
        <div class="task-form">
            <label for="title">Title:</label>
            <input type="text" v-model="task.title" id="title">

            <label for="description">Description:</label>
            <textarea v-model="task.description" id="description"></textarea>

            <label for="completeBy">Complete By:</label>
            <input type="date" v-model="task.completeBy" id="completeBy">

            <label for="tags">Tags:</label>
            <input type="text" v-model="tagInput.name" placeholder="Tag name" id="tags">
            <input type="color" v-model="tagInput.color" id="tagColor">
            <button @click="addTag">Add Tag</button>
            <ul>
                <li v-for="(tag, index) in task.tags" :key="index">
                    <span :style="{ color: tag.color }">{{ tag.name }}</span>
                    <button @click="removeTag(index)">Remove</button>
                </li>
            </ul>

            <label for="completed">Completed:</label>
            <input type="checkbox" v-model="task.completed" id="completed">
        </div>
    </div>
</template>
  
<script setup lang="ts">
import type { TaskTag } from '@/models/task';
import { useTaskStore } from '@/stores/task';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tasksStore = useTaskStore();
const task = ref(tasksStore.tasks.find((task) => task.id === Number(route.params.id)));

if (!task.value) {
    // Handle task not found
    // Redirect to tasks page
    router.push('/tasks');
}

const tagInput = ref<TaskTag>({ name: '', color: '#000000' });

function addTag() {
    if (!task.value.tags) {
        task.value.tags = [];
    }
    if (tagInput.value.name.trim() !== '') {
        task.value.tags.push({ name: tagInput.value.name, color: tagInput.value.color });
        tagInput.value = { name: '', color: '#000000' };
    }
}

function removeTag(index: number) {
    if (task.value.tags) {
        task.value.tags.splice(index, 1);
    }
}

function saveTask() {
    if (task.value) {
        tasksStore.updateTask(task.value);
        router.push(`/tasks/${task.value.id}`);
    }
}

onMounted(() => {
    // If editing existing task, fetch task data and assign to task ref
});
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

.container {
    padding: 20px;
}

.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.title {
    font-size: 24px;
}

.action-btns button {
    margin-left: 10px;
}

.separator {
    width: 10px;
    border-right: 1px solid #ccc;
    height: 100%;
    min-height: 50px;
}

.back-btn {
    display: flex;
    align-items: center;
}

.bar {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    width: 100%;
}
</style>
  