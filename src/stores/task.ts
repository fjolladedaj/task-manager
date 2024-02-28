import type { Task } from "@/models/task";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([{ id: 1, title: 'Placeholder Task', completed: false, createdAt: new Date(), tags: [{ name: 'tag1', color: 'green' }, { name: 'tag2', color: "#ccc" }] }]);
    const completedTasks = computed(() => tasks.value.filter(task => task.completed));
    const pendingTasks = computed(() => tasks.value.filter(task => !task.completed));

    // This function will generate a new task id by adding 1 to the length of the tasks array.
    // Note: this implementation is not safe as deleting tasks will cause the id to be reused.
    function generateNewTaskId() {
        return tasks.value.length + 1;
    }

    function addTask(task: Task): number {
        task.id = generateNewTaskId();
        task.createdAt = new Date();
        tasks.value.push(task);
        return task.id;
    }

    function removeTask(task: Task) {
        const index = tasks.value.indexOf(task);
        if (index !== -1) {
            tasks.value.splice(index, 1);
        }
    }

    function updateTask(task: Task) {
        const index = tasks.value.findIndex(t => t.id === task.id);
        if (index !== -1) {
            task.updatedAt = new Date();
            tasks.value[index] = task;
        }
    }

    return { tasks, completedTasks, pendingTasks, addTask, removeTask, updateTask };

});