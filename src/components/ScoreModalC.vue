

复制
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>单元 {{ unitId }} 完成！</h2>
      
      <div class="main-container">
        <div class="tips-section">
          <h3>学习小贴士</h3>
          <div class="tip-item">
            <div class="tip-icon">🎯</div>
            <p>当前排名：第 {{ currentRank }} 名</p>
          </div>
          <div class="tip-item">
            <div class="tip-icon">⭐️</div>
            <p>距离上一名还差 {{ pointsToNext }} 分</p>
          </div>
        </div>
        
        <div class="rank-list">
          <h3>总分排行榜</h3>
          <div class="rank-item" v-for="(score, index) in rankList" :key="index"
               :class="{ 'current-user': score.isCurrentUser }">
            <span class="rank-number" :class="{'top-three': index < 3}">{{ index + 1 }}</span>
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

// 添加获取当前排名和距离上一名分差的计算
const currentRank = computed(() => {
  return rankList.value.findIndex((item) => item.isCurrentUser) + 1
})

const pointsToNext = computed(() => {
  const currentIndex = rankList.value.findIndex((item) => item.isCurrentUser)
  if (currentIndex <= 0) return 0
  return rankList.value[currentIndex - 1].score - rankList.value[currentIndex].score
})

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
  padding: 1.2rem;
  border-radius: 12px;
  width: 560px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.main-container {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.tips-section {
  background: #f8f9fa;
  padding: 0.8rem;
  border-radius: 8px;
  border-left: 4px solid #42b983;
  height: fit-content;
}

.tips-section h3 {
  color: #2c3e50;
  margin-bottom: 0.6rem;
  font-size: 0.95rem;
  text-align: center;
}

.tip-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
  padding: 0.4rem 0.6rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.tip-item:last-child {
  margin-bottom: 0;
}

.tip-icon {
  font-size: 0.9rem;
  margin-right: 0.4rem;
  min-width: 18px;
}

.tip-item p {
  color: #666;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.3;
}

.rank-list {
  background: #f8f9fa;
  padding: 0.8rem;
  border-radius: 8px;
}

.rank-list h3 {
  margin-bottom: 0.6rem;
  text-align: center;
  color: #2c3e50;
  font-size: 0.95rem;
}

.rank-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.6rem;
  padding: 0.35rem 0.5rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.rank-item:last-child {
  border-bottom: none;
}

.rank-number {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #42b983;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
}

.rank-number.top-three {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}

.current-user {
  background: #e8f5e9;
  border-radius: 6px;
}

.user-name {
  color: #2c3e50;
  font-size: 0.85rem;
}

.user-score {
  font-weight: 500;
  color: #42b983;
  font-size: 0.85rem;
}

.continue-btn {
  display: block;
  width: 100%;
  max-width: 160px;
  margin: 0.8rem auto 0;
  padding: 0.6rem 1.2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.continue-btn:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.25);
}

@media (max-width: 600px) {
  .modal-content {
    width: 90%;
    padding: 1rem;
    margin: 1rem;
  }

  .main-container {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .tips-section {
    margin-bottom: 0;
  }
}
</style>