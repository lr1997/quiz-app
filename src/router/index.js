import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useQuizStore } from '../stores/quiz' // 添加这行导入
import LearningView from '../views/LearningView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/learning',
      name: 'learning',
      component: LearningView,
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
    },
  ],
})

// 可选：添加路由守卫，确保进入学习页面时初始化学习状态
router.beforeEach((to, from, next) => {
  if (to.name === 'learning') {
    const quizStore = useQuizStore()
    quizStore.initLearning()
  }
  next()
})

export default router
