<!-- src/components/ScoreModal.vue -->
<template>
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <h2>单元{{ unitId }}完成！</h2>
        
        <div class="score-info">
          <div class="score-item">
            <h3>分数A (普通)</h3>
            <p>{{ basicScore }}/{{ basicTotal }}</p>
          </div>
          
          <div class="score-item">
            <h3>分数B (计时)</h3>
            <p>{{ timeScore }}/{{ timeTotal }}</p>
          </div>
  
          <div class="stats">
            <p>正确题数: {{ correctCount }}/{{ totalAnswered }}</p>
            <p>快速答对: {{ fastAnswers }} 题</p>
          </div>
        </div>
  
        <button class="continue-btn" @click="onContinue">继续学习</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const router = useRouter()
const store = useQuizStore()

defineProps({
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

const onContinue = () => {
  const isCompleted = store.continueToNextUnit()
  if (isCompleted) {
    router.push('/result')
  } else {
    emit('continue')
  }
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
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.score-info {
  margin: 1.5rem 0;
}

.score-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.score-item h3 {
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.score-item p {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: bold;
}

.stats {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e9ecef;
  border-radius: 4px;
}

.stats p {
  margin: 0.5rem 0;
  color: #666;
}

.continue-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.continue-btn:hover {
  background-color: #3aa876;
}
</style>