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

    <!-- 成绩弹窗 -->
    <ScoreModal
      v-if="quizStore.showScoreModal && quizStore.modalType === 'default'"
      v-bind="modalProps"
      @continue="quizStore.continueToNextUnit"
    />

    <ScoreModalA v-if="quizStore.showScoreModal && quizStore.modalType === 'typeA'" v-bind="modalAProps" @continue="handleContinue"/>
  

    <ScoreModalB v-if="quizStore.showScoreModal && quizStore.modalType === 'typeB'" v-bind="modalBProps" @continue="handleContinue"/>

    <ScoreModalC v-if="quizStore.showScoreModal && quizStore.modalType === 'typeC'" v-bind="modalBProps" :previous-rank="previousRank" @continue="handleContinue" @update-previous-rank="updatePreviousRank"/>
    
      <!-- 开始答题确认 -->
      <ConfirmModal
        :show="showStartQuizConfirm"
        title="视频学习完成"
        message="你已完成本单元的视频学习，准备好开始答题了吗？"
        confirm-text="开始答题"
        cancel-text="重看视频"
        @confirm="startQuiz"
        @cancel="replayVideo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ScoreModal from '@/components/ScoreModal.vue'
import ScoreModalA from '@/components/ScoreModalA.vue'
import ScoreModalB from '@/components/ScoreModalB.vue'
import ScoreModalC from '@/components/ScoreModalC.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'
import QuizQuestion from '@/components/QuizQuestion.vue'

const quizStore = useQuizStore()
const router = useRouter()
const showStartQuizConfirm = ref(false)
const previousRank = ref(null)

// 在每次完成单元后，需要更新 previousRank
const updatePreviousRank = (newRank) => {
  previousRank.value = newRank
}

// 将所有 props 组合成一个对象，使模板更简洁
const modalProps = computed(() => ({
  show: quizStore.showScoreModal,
  unitId: quizStore.currentUnitScores?.unitId,
  basicScore: quizStore.currentUnitScores?.basicScore,
  basicTotal: quizStore.currentUnitScores?.basicTotal,
  timeScore: quizStore.currentUnitScores?.timeScore,
  timeTotal: quizStore.currentUnitScores?.timeTotal,
  correctCount: quizStore.currentUnitScores?.correctCount,
  totalAnswered: quizStore.currentUnitScores?.totalAnswered,
  fastAnswers: quizStore.currentUnitScores?.fastAnswers,
}))

// 为 ModalA 创建单独的 props
const modalAProps = computed(() => ({
  show: quizStore.showScoreModal,
  unitId: quizStore.currentUnitScores?.unitId,
  basicScore: quizStore.currentUnitScores?.basicScore,
  basicTotal: quizStore.currentUnitScores?.basicTotal,
  timeScore: quizStore.currentUnitScores?.timeScore,
  timeTotal: quizStore.currentUnitScores?.timeTotal,
  correctCount: quizStore.currentUnitScores?.correctCount,
  totalAnswered: quizStore.currentUnitScores?.totalAnswered,
  fastAnswers: quizStore.currentUnitScores?.fastAnswers,
}))

const modalBProps = computed(() => ({
  show: quizStore.showScoreModal,
  unitId: quizStore.currentUnitScores?.unitId,
  totalScore: quizStore.scoring.basicScore.current, // 累计基础得分
  totalCorrect: quizStore.scoring.basicScore.correctCount, // 累计答对题数
  totalQuestions: quizStore.totalQuestions, // 总题目数
}))

// 视频完成处理
const onVideoComplete = () => {
  showStartQuizConfirm.value = true
}

// 修改 handleContinue
const handleContinue = () => {
  const isCompleted = quizStore.continueToNextUnit()
  if (isCompleted) {
    router.push('/result')
  }
}

// 开始答题
const startQuiz = () => {
  showStartQuizConfirm.value = false
  quizStore.markVideoComplete()
}

// 重看视频
const replayVideo = () => {
  showStartQuizConfirm.value = false
  // 重置视频到开始位置
  const videoElement = document.querySelector('video')
  if (videoElement) {
    videoElement.currentTime = 0
    videoElement.play()
  }
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