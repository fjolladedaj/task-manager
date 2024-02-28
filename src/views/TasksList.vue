<template>
    <div class="container">
        <div class="header">
            <h1 class="title">Tasks</h1>
            <button @click="addTask()">
                New Task
            </button>
        </div>
        <div class="list">
            <TaskListItem v-for="task in taskStore.tasks" :key="task.id" :task="task" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/task';
import TaskListItem from '@/components/tasks/TaskListItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const taskStore = useTaskStore();

function addTask() {
    router.push('/tasks/new');
}

</script>

<style scoped>
.container {
    padding: 20px;
    width: 100%;

}

.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.title {
    font-size: 24px;
}

.list {
    margin: 20px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
</style>
