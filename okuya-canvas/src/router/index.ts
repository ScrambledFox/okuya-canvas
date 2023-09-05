import { createRouter, createWebHistory } from 'vue-router'
import PlanView from '../views/PlanView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'plan',
      component: PlanView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }
  ]
})

export default router
