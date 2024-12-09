<template>
    <div class="quiz-question">
      <h3 class="question-text">{{ question.question }}</h3>
      <div class="options">
        <button
          v-for="option in question.options"
          :key="option.id"
          class="option-btn"
          :class="{ selected: selectedOption === option.id }"
          @click="selectOption(option.id)"
        >
          {{ option.text }}
        </button>
      </div>
      <button 
        class="submit-btn"
        :disabled="!selectedOption"
        @click="submitAnswer"
      >
        提交答案
      </button>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['answer'])

const selectedOption = ref(null)

const selectOption = (optionId) => {
  selectedOption.value = optionId
}

const submitAnswer = () => {
  emit('answer', selectedOption.value)
  selectedOption.value = null
}
</script>
  
  <style scoped>
.quiz-question {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.question-text {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  text-align: left;
  font-size: 1em;
}

.option-btn:hover {
  background: #f5f5f5;
}

.option-btn.selected {
  background: #e3f2fd;
  border-color: #2196f3;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  background: #1976d2;
}
</style>