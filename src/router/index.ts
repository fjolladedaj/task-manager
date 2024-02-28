import { createRouter, createWebHistory } from 'vue-router';
import TasksList from '../views/TasksList.vue';
import TaskView from '@/views/TaskView.vue';
import TaskEditView from '@/views/TaskEditView.vue';
import NewTaskView from '@/views/NewTaskView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksList
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: TaskView
    },
    {
      path: '/tasks/:id/edit',
      name: 'taskEdit',
      component: TaskEditView
    },
    {
      path: '/tasks/new',
      name: 'newTask',
      component: NewTaskView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'tasks' }
    }
  ]
});

export default router;
