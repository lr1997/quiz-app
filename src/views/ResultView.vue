<template>
  <div class="result-view">
    <h1>学习完成</h1>

    <div class="score-summary">
      <div class="score-card basic">
        <h3>基础得分</h3>
        <p class="score">{{ store.scoring.basicScore.current }}</p>
        <p class="detail">答对 {{ store.scoring.basicScore.correctCount }} 题</p>
      </div>
      <div class="score-card bonus">
        <h3>速度奖励</h3>
        <p class="score">{{ store.scoring.timeScore.current - store.scoring.basicScore.current }}</p>
        <p class="detail">快速答对 {{ store.scoring.timeScore.fastAnswers }} 题</p>
      </div>
      <div class="score-card total">
        <h3>总计得分</h3>
        <p class="score">{{ store.scoring.timeScore.current }}</p>
        <p class="detail">基础得分 + 奖励得分</p>
      </div>
    </div>

    <div class="time-info">
      <p>开始时间：{{ formatTime(store.startTime) }}</p>
      <p>结束时间：{{ formatTime(store.endTime) }}</p>
      <p>总用时：{{ calculateDuration(store.startTime, store.endTime) }}</p>
    </div>

    <div class="answer-details">
      <div class="details-header" @click="toggleDetails">
        <h2>答题详情</h2>
        <span class="toggle-icon">{{ showDetails ? '↑' : '↓' }}</span>
      </div>
      <div v-show="showDetails" class="answers-list">
        <div
          v-for="(answer, index) in store.answers"
          :key="index"
          class="answer-item"
          :class="{ correct: answer.isCorrect, wrong: !answer.isCorrect }"
        >
          <div class="answer-header">
            <span class="unit">单元{{ answer.unitId }}</span>
            <span class="result-info">
              <span class="status">{{ answer.isCorrect ? '✓ 正确' : '✗ 错误' }}</span>
              <span class="time">{{ formatAnswerTime(answer.answerTime) }}秒</span>
              <span v-if="answer.isQuick" class="bonus">+5分</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  <div class="export-section">
    <button class="export-btn" @click="exportResults"> 导出学习记录
    </button>
  </div>
    <button class="restart-btn" @click="restartLearning">重新开始</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'
import { exportResults } from '../../utils/export'; // 使用相对路径导入

const store = useQuizStore()
const router = useRouter()
const showDetails = ref(false)

const toggleDetails = () => {
showDetails.value = !showDetails.value
}

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
router.push('/') // 通常重新开始会回到首页填写信息
}

// 删除这里原来的 exportResults 函数定义！
/*
function exportResults() {
// ... 这里的代码应该被删除
}
*/
</script>

<style scoped>
/* Style remains the same */
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
padding: 1.5rem;
border-radius: 8px;
text-align: center;
position: relative;
}

.score-card.basic {
background: #f8f9fa;
}

.score-card.bonus {
background: #fff3e0;
}

.score-card.total {
background: #e8f5e9;
}

.score-card.bonus::before {
content: '+';
position: absolute;
left: -15px;
top: 50%;
transform: translateY(-50%);
font-size: 24px;
color: #666;
}

.score-card.total::before {
content: '=';
position: absolute;
left: -15px;
top: 50%;
transform: translateY(-50%);
font-size: 24px;
color: #666;
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
background: #fff;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.details-header {
padding: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;
transition: background-color 0.3s;
}

.details-header:hover {
background-color: #f8f9fa;
}

.details-header h2 {
margin: 0;
font-size: 1.2rem;
color: #2c3e50;
}

.toggle-icon {
font-size: 1.2rem;
color: #666;
}

.answers-list {
padding: 0 1rem 1rem;
max-height: 400px;
overflow-y: auto;
}

.answer-item {
padding: 0.8rem;
margin-bottom: 0.5rem;
border-radius: 4px;
background: #f8f9fa;
border-left: 4px solid #ddd;
}

.answer-item.correct {
border-left-color: #42b983;
background: #f1f9f5;
}

.answer-item.wrong {
border-left-color: #ff6b6b;
background: #fff5f5;
}

.answer-header {
display: flex;
justify-content: space-between;
align-items: center;
}

.result-info {
display: flex;
align-items: center;
gap: 1rem;
}

.unit {
font-weight: 500;
color: #2c3e50;
}

.status {
font-weight: 500;
}

.time {
color: #666;
}

.bonus {
color: #42b983;
font-weight: 500;
}

.answer-item.correct .status {
color: #42b983;
}

.answer-item.wrong .status {
color: #ff6b6b;
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

.score-card.bonus::before,
.score-card.total::before {
  display: none;
}

.result-info {
  gap: 0.5rem;
}
}

.export-section {
display: flex;
justify-content: center;
margin: 2rem 0;
}

.export-btn {
padding: 1rem 2rem;
background-color: #4a90e2;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 1rem;
transition: background-color 0.3s;
}

.export-btn:hover {
background-color: #357abd;
}

@media (max-width: 600px) {
.export-btn {
  width: 100%;
  max-width: 200px;
}
}
</style>