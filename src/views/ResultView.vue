<!-- ResultView.vue -->
<template>
    <div class="result-view">
      <h1>学习完成</h1>
      
      <!-- 总体得分 -->
      <div class="score-summary">
        <div class="score-card">
          <h3>基础得分</h3>
          <!-- <p class="score">{{ store.scoring.basicScore.current }} / {{ store.totalPossibleScores.basic }}</p> -->
          <p class="score">{{ store.scoring.basicScore.current }}</p>

          <p class="detail">答对 {{ store.scoring.basicScore.correctCount }} 题</p>
        </div>
        <div class="score-card">
            <h3>速度奖励</h3>
            <p class="score">{{ store.scoring.timeScore.current -  store.scoring.basicScore.current}}</p>
          <p class="detail">快速答对 {{ store.scoring.timeScore.fastAnswers }} 题</p>
        </div>
        <div class="score-card">
          <h3>总计得分</h3>
          <!-- <p class="score">{{ store.scoring.timeScore.current }} / {{ store.totalPossibleScores.time }}</p> -->
          <p class="score">{{ store.scoring.timeScore.current }} </p>

          <!-- <p class="detail">快速答对 {{ store.scoring.timeScore.fastAnswers }} 题</p> -->
          <p class="detail">基础得分 + 奖励得分</p>
        </div>
      </div>
  
      <!-- 学习时间 -->
      <div class="time-info">
        <p>开始时间：{{ formatTime(store.startTime) }}</p>
        <p>结束时间：{{ formatTime(store.endTime) }}</p>
        <p>总用时：{{ calculateDuration(store.startTime, store.endTime) }}</p>
      </div>
  
      <!-- 答题详情 -->
      <div class="answer-details">
        <h2>答题详情</h2>
        <div class="answers-list">
          <div 
            v-for="(answer, index) in store.answers" 
            :key="index"
            class="answer-item"
            :class="{ correct: answer.isCorrect, wrong: !answer.isCorrect }"
          >
            <div class="answer-header">
              <span class="unit">单元 {{ answer.unitId }}</span>
              <span class="time">用时: {{ formatAnswerTime(answer.answerTime) }}秒</span>
              <span class="status">{{ answer.isCorrect ? '✓ 正确' : '✗ 错误' }}</span>
            </div>
            <div class="answer-time-status">
              {{ answer.isQuick ? '快速答对' : '' }}
            </div>
          </div>
        </div>
      </div>
  
      <!-- 返回按钮 -->
      <button class="restart-btn" @click="restartLearning">重新开始</button>
    </div>
  </template>
  
  <script setup>
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'

const store = useQuizStore()
const router = useRouter()

// 格式化时间
function formatTime(date) {
  if (!date) return '--'
  return new Date(date).toLocaleString()
}

// 格式化答题时间
function formatAnswerTime(time) {
  return time.toFixed(1)
}

// 计算持续时间
function calculateDuration(start, end) {
  if (!start || !end) return '--'
  const duration = new Date(end) - new Date(start)
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.floor((duration % 60000) / 1000)
  return minutes + '分' + seconds + '秒'
}

// 重新开始学习
function restartLearning() {
  store.resetProgress()
  router.push('/learning')
}
</script>
  
  <style scoped>
.result-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.score-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.score-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.score-card h3 {
  color: #666;
  margin-bottom: 0.5rem;
}

.score {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0;
}

.detail {
  color: #666;
}

.time-info {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.time-info p {
  margin: 0.5rem 0;
  color: #666;
}

.answer-details {
  margin-bottom: 2rem;
}

.answer-item {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.answer-item.correct {
  border-left: 4px solid #42b983;
}

.answer-item.wrong {
  border-left: 4px solid #ff6b6b;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.unit {
  font-weight: bold;
}

.time {
  color: #666;
}

.status {
  font-weight: bold;
}

.answer-time-status {
  color: #42b983;
  font-size: 0.9rem;
}

.restart-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.restart-btn:hover {
  background-color: #3aa876;
}

@media (max-width: 600px) {
  .result-view {
    padding: 1rem;
  }

  .score-summary {
    grid-template-columns: 1fr;
  }

  .answer-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>