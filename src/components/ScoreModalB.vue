<!-- components/ScoreModalB.vue -->
<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <h2>单元 {{ unitId }} 完成！</h2>
        
        <div class="rank-container">
          <div class="current-score">
            <h3>当前累计得分</h3>
            <p class="score">{{ totalScore }}</p>
            <p class="detail">总答对 {{ totalCorrect }}/{{ totalQuestions }} 题</p>
            <p class="progress">完成进度 {{ progressText }}</p>
          </div>
          
          <div class="rank-list">
            <h3>总分排行</h3>
            <div class="rank-item" v-for="(score, index) in rankList" :key="index"
                 :class="{ 'current-user': score.isCurrentUser }">
              <span class="rank-number">{{ index + 1 }}</span>
              <span class="user-name">{{ score.name }}</span>
              <span class="user-score">{{ score.score }}分</span>
            </div>
          </div>
        </div>
  
        <button class="continue-btn" @click="handleContinue">继续学习</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  unitId: Number,
  totalScore: Number,
  totalCorrect: Number,
  totalQuestions: Number,
})

// 计算完成进度文本
const progressText = computed(() => {
  const progress = Math.floor((props.totalCorrect / props.totalQuestions) * 100)
  return `${progress}%`
})

// 模拟排名数据
const mockRankData = {
  rankings: [
    { name: '高手1', scores: [30, 60, 90, 120, 150, 180, 200, 230, 260, 280] },
    { name: '高手2', scores: [30, 60, 80, 110, 140, 170, 200, 230, 250, 270] },
    { name: '普通1', scores: [10, 40, 70, 80, 90, 110, 140, 150, 180, 210] },
    { name: '普通2', scores: [30, 50, 70, 100, 110, 140, 170, 200, 210, 220] },
    { name: '普通3', scores: [30, 50, 60, 90, 110, 140, 170, 190, 200, 230] },
    { name: '普通4', scores: [20, 50, 70, 80, 90, 100, 120, 140, 170, 200] },
    { name: '普通5', scores: [20, 50, 70, 90, 100, 110, 130, 140, 150, 170] },
    { name: '菜鸡1', scores: [20, 20, 40, 50, 60, 60, 60, 80, 80, 80] },
    { name: '菜鸡2', scores: [10, 20, 40, 40, 60, 80, 100, 100, 120, 140] },
  ],
}

// const getRankListByUnit = (currentUnit, currentScore) => {
//   // 1. 获取当前单元的排名数据
//   const unitIndex = currentUnit - 1
//   const rankData = mockRankData.rankings.map((user) => ({
//     name: user.name,
//     score: user.scores[unitIndex],
//   }))

//   // 2. 创建当前用户的分数对象
//   const currentUserScore = {
//     name: '我',
//     score: currentScore,
//     isCurrentUser: true,
//   }

//   // 3. 合并所有分数
//   const allScores = [...rankData, currentUserScore]

//   // 4. 按分数从高到低排序
//   allScores.sort((a, b) => b.score - a.score)

//   // 5. 添加排名信息
//   allScores.forEach((item, index) => {
//     item.rank = index + 1
//   })

//   // 6. 返回前5名
//   return allScores.slice(0, 10)
// }

const getRankListByUnit = (currentUnit, currentScore) => {
  // 1. 获取当前单元的排名数据
  const unitIndex = currentUnit - 1
  const rankData = mockRankData.rankings.map((user) => ({
    name: user.name,
    score: user.scores[unitIndex],
    isCurrentUser: false, // 为其他用户添加标记
  }))

  // 2. 创建当前用户的分数对象
  const currentUserScore = {
    name: '我',
    score: currentScore,
    isCurrentUser: true,
  }

  // 3. 合并所有分数
  const allScores = [...rankData, currentUserScore]

  // 4. 按分数从高到低排序，分数相同时当前用户优先
  allScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score // 分数不同时，按分数降序
    }
    // 分数相同时，当前用户排在前面
    return a.isCurrentUser ? -1 : b.isCurrentUser ? 1 : 0
  })

  // 5. 添加排名信息
  allScores.forEach((item, index) => {
    item.rank = index + 1
  })

  // 6. 返回前10名
  return allScores.slice(0, 10)
}

const rankList = computed(() => {
  return getRankListByUnit(props.unitId, props.totalScore)
})

const emit = defineEmits(['continue'])

const handleContinue = () => {
  emit('continue')
}
</script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.rank-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.current-score {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.current-score h3 {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.score {
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
  margin: 0.5rem 0;
}

.detail {
  color: #666;
  font-size: 0.9rem;
}

.progress {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.rank-list {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.rank-list h3 {
  margin-bottom: 1rem;
  text-align: center;
  color: #666;
  font-size: 1rem;
}

.rank-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.rank-item:last-child {
  border-bottom: none;
}

.rank-item.current-user {
  background: #e8f5e9;
  border-radius: 4px;
  font-weight: bold;
}

.rank-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #42b983;
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
}

.user-name {
  color: #2c3e50;
}

.user-score {
  font-weight: 500;
  color: #42b983;
}

.rank-item.current-user .user-score {
  color: #2c3e50;
}

.continue-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-btn:hover {
  background-color: #3aa876;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }

  .rank-container {
    grid-template-columns: 1fr;
  }

  .rank-list {
    margin-top: 1rem;
  }
}
</style>