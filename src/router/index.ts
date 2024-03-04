import { createRouter, createWebHistory } from 'vue-router'
import TasksList from '../views/TasksList.vue'
import TaskView from '@/views/TaskView.vue'
import TaskEditView from '@/views/TaskEditView.vue'
import NewTaskView from '@/views/NewTaskView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import LogInView from '@/views/LogInView.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: LogInView
    },
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
      redirect: { name: 'welcome' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { isLoggedIn } = storeToRefs(store)

  const publicPages = ['/', '/log-in']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !isLoggedIn.value) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
