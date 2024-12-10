<!-- components/ScoreModalA.vue -->
<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <h2>单元 {{ unitId }} 完成！</h2>
        
        <div class="scores-container">
          <div class="score-item">
            <h3>基础得分</h3>
            <p class="score">{{ basicScore }}</p>
            <p class="detail">答对 {{ correctCount }}/3 题</p>
          </div>
          
          <div class="score-item">
            <h3>速度奖励</h3>
            <p class="score">{{ timeScore - basicScore }}</p>
            <p class="detail">快速答对 {{ fastAnswers }} 题</p>
          </div>
          
          <div class="score-item">
            <h3>总计得分</h3>
            <p class="score">{{ timeScore }}</p>
            <p class="detail">基础得分 + 速度奖励</p>
          </div>
        </div>
  
        <button class="continue-btn" @click="handleContinue">继续学习</button>
      </div>
    </div>
  </template>
  
  <script setup>
const props = defineProps({
  show: Boolean,
  unitId: Number,
  basicScore: Number,
  basicTotal: Number,
  timeScore: Number,
  timeTotal: Number,
  correctCount: Number,
  totalAnswered: Number,
  fastAnswers: Number,
})

const emit = defineEmits(['continue'])

const handleContinue = () => {
  emit('continue')
}
</script>
  
  <style scoped>
/* 样式与原 ScoreModal 完全相同 */
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

.scores-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.score-item {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.score-item h3 {
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

  .scores-container {
    grid-template-columns: 1fr;
  }

  .score {
    font-size: 1.5rem;
  }
}
</style>