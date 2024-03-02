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

                <h1 class="title">{{ task?.title }} {{ task?.completed ? ' (Completed)' : '' }}</h1>
                <div class="action-btns">

                    <button @click="editTask()">
                        Edit
                    </button>
                    <button @click="deleteTask()">
                        Delete
                    </button>
                    <button @click="copyTask()">
                        Copy
                    </button>
                </div>
            </div>

        </div>
        <div>
            <p>ID: {{ route.params.id }}</p>
            <p>Description: {{ task?.description }} </p>
            <p>Complete by: {{ task?.completeBy?.toLocaleString() || 'N/A' }} </p>

            <div v-if="task?.tags?.length">
                <p>Tags:</p>
                <ul>
                    <li v-for="tag in task?.tags" :key="tag.name">
                        <span :style="{ color: tag.color }">{{ tag.name }}</span>
                    </li>
                </ul>

            </div>

            <p>Created At: {{ task?.createdAt.toLocaleString() }} </p>
            <p v-if="task?.updatedAt">Updated At: {{ task?.updatedAt?.toLocaleString() }} </p>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Task } from '@/models/task';
import { useTaskStore } from '@/stores/task';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const taskStore = useTaskStore();

const copiedTask = ref<Task>({});

const task = computed(() => taskStore.tasks.find((task) => task.id === Number(route.params.id)));

function copyTask() {
    if (!task.value) return;
    copiedTask.value = { ...task.value, title: `${task.value.title} (Copy)` };
    const copyTaskId = taskStore.addTask(copiedTask.value);
    router.push(`/tasks/${copyTaskId}`);
}

function deleteTask() {
    if (!task.value) return;
    taskStore.removeTask(task.value);
    router.push('/tasks');
}

function editTask() {
    if (!task.value) return;
    router.push(`/tasks/${task.value.id}/edit`);
}
</script>

<style scoped>
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