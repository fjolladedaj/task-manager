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

                <h1 class="title">{{ taskTitle }}</h1>
                <div class="action-btns">
                    <button @click="saveTask()">
                        Save
                    </button>
                </div>
            </div>

        </div>
        <div class="task-form">
            <label for="title">Title:</label>
            <input type="text" v-model="taskTitle" id="title">

            <label for="description">Description:</label>
            <textarea v-model="taskDescription" id="description"></textarea>

            <label for="completeBy">Complete By:</label>
            <input type="date" v-model="taskCompleteBy" id="completeBy">

            <label for="tags">Tags:</label>
            <input type="text" v-model="tagInput.name" placeholder="Tag name" id="tags">
            <input type="color" v-model="tagInput.color" id="tagColor">
            <button @click="addTag">Add Tag</button>
            <ul>
                <li v-for="(tag, index) in taskTags" :key="index">
                    <span :style="{ color: tag.color }">{{ tag.name }}</span>
                    <button @click="removeTag(index)">Remove</button>
                </li>
            </ul>

            <label for="completed">Completed:</label>
            <input type="checkbox" v-model="taskCompleted" id="completed">
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TaskTag } from '@/models/task';
import { useTaskStore } from '@/stores/task';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tasksStore = useTaskStore();
const task = ref(tasksStore.tasks.find((task) => task.id === Number(route.params.id)));
const taskToEdit = ref({});

const taskTitle = computed({
    get: () => {
        return taskToEdit.value.title;
    },
    set: (value) => {
        taskToEdit.value.title = value;
    }
});

const taskDescription = computed({
    get: () => {
        return taskToEdit.value.description;
    },
    set: (value) => {
        taskToEdit.value.description = value;
    }
});

const taskCompleteBy = computed({
    get: () => {
        return taskToEdit.value.completeBy;
    },
    set: (value) => {
        taskToEdit.value.completeBy = value;
    }
});

const taskCompleted = computed({
    get: () => {
        return taskToEdit.value.completed;
    },
    set: (value) => {
        taskToEdit.value.completed = value;
    }
});

const taskTags = computed(() => taskToEdit.value.tags);

const tagInput = ref<TaskTag>({ name: '', color: '#000000' });


if (!task.value) {
    // Handle task not found
    // Redirect to tasks page
    router.push('/tasks');
}

function addTag() {
    if (!taskToEdit.value.tags) {
        taskToEdit.value.tags = [];
    }
    if (tagInput.value.name.trim() !== '') {
        taskToEdit.value = {
            ...taskToEdit.value,
            tags: [...taskToEdit.value.tags, { name: tagInput.value.name, color: tagInput.value.color }]
        }
        tagInput.value.name = '';
        tagInput.value.color = '#000000'
    }
}

function removeTag(index: number) {
    if (taskToEdit.value.tags) {
        taskToEdit.value.tags.splice(index, 1);
    }
}

function saveTask() {
    if (taskToEdit.value) {
        tasksStore.updateTask(taskToEdit.value);
        router.push(`/tasks/${task.value.id}`);
    }
}

onMounted(() => {
    // If editing existing task, fetch task data and assign to task ref
    taskToEdit.value = JSON.parse(JSON.stringify(task.value));
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