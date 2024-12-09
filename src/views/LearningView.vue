<template>
    <div class="learning-view">
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-text">
          单元 {{ quizStore.totalProgress.currentUnit }}/{{ quizStore.units.length }}
          <template v-if="quizStore.progress.videoCompleted">
            - 题目 {{ quizStore.progress.currentQuestionIndex + 1 }}/3
          </template>
        </div>
      </div>
  
      <!-- 主要内容区域 -->
      <div class="content-area">
        <!-- 视频部分 -->
        <div v-if="!quizStore.progress.videoCompleted" class="section">
          <VideoPlayer 
            :video="quizStore.currentVideo"
            @complete="onVideoComplete"
          />
        </div>
  
        <!-- 答题部分 -->
        <div v-else class="section">
          <QuizQuestion
            :question="quizStore.currentQuestion"
            @answer="onAnswerSubmit"
          />
        </div>

        <ScoreModal
      :show="quizStore.showScoreModal"
      v-if="quizStore.currentUnitScores"
      :unit-id="quizStore.currentUnitScores.unitId"
      :basic-score="quizStore.currentUnitScores.basicScore"
      :basic-total="quizStore.currentUnitScores.basicTotal"
      :time-score="quizStore.currentUnitScores.timeScore"
      :time-total="quizStore.currentUnitScores.timeTotal"
      :correct-count="quizStore.currentUnitScores.correctCount"
      :total-answered="quizStore.currentUnitScores.totalAnswered"
      :fast-answers="quizStore.currentUnitScores.fastAnswers"
      @continue="quizStore.continueToNextUnit"
    />
      </div>
    </div>
  </template>
  
  <script setup>
import { useQuizStore } from '@/stores/quiz'
import ScoreModal from '@/components/ScoreModal.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import QuizQuestion from '@/components/QuizQuestion.vue'

const quizStore = useQuizStore()

// // 初始化学习
// quizStore.initLearning()

// 视频完成处理
const onVideoComplete = () => {
  quizStore.markVideoComplete()
}

// 提交答案处理
const onAnswerSubmit = (answerId) => {
  quizStore.submitAnswer(answerId)
}
</script>
  
  <style scoped>
.learning-view {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.progress-bar {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.progress-text {
  text-align: center;
  font-size: 1.1em;
  color: #333;
}

.content-area {
  margin-top: 20px;
}

.section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
</style>