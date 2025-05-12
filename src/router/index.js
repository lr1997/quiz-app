// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useQuizStore } from '../stores/quiz'
import LearningView from '../views/LearningView.vue'
import ResultView from '../views/ResultView.vue'
import SettingView from '@/views/SettingView.vue'
// import StudentInfoView from '../views/StudentInfoView.vue' // 不再需要导入这个

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 首页依然是 HomeView
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
    {
      path: '/settings',
      name: 'settings',
      component: SettingView,
    },
  ],
})

// 路由守卫，确保进入学习页面前信息已填写
router.beforeEach((to, from, next) => {
  const quizStore = useQuizStore()
  // 如果目标是学习页面且学生信息未填写，则重定向回首页
  if (to.name === 'learning' && (!quizStore.studentId || !quizStore.studentName)) {
    // 可以选择给用户一个提示，虽然重定向本身就说明问题了
    // alert('请先填写学生信息！');
    next({ name: 'home' }) // 重定向到首页
  } else {
    // 其他情况正常跳转
    next()
  }
})

export default router
