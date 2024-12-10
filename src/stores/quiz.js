// stores/quiz.js
import { defineStore } from 'pinia'
import { quizData, MODAL_CONFIG } from '@/data/quiz-data'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    // 所有学习单元数据
    units: quizData.units,
    modalType: MODAL_CONFIG.type,

    // 当前进度状态
    progress: {
      currentUnitIndex: 0,
      videoCompleted: false,
      currentQuestionIndex: 0,
      isCompleted: false,
    },

    // 答题记录
    answers: [],

    // 计分相关配置和记录
    scoring: {
      timeLimit: 10, // 快速答题时间限制（秒）
      points: {
        basic: 10, // 普通答对分数
        fast: 15, // 快速答对分数
        overtime: 10, // 超时答对分数
      },
      basicScore: {
        current: 0,
        correctCount: 0,
      },
      timeScore: {
        current: 0,
        correctCount: 0,
        fastAnswers: 0,
      },
    },

    // 当前题目开始时间
    currentQuestionStartTime: null,

    // 学习时间记录
    startTime: null,
    endTime: null,

    showScoreModal: false,
    currentUnitScores: null,
  }),

  getters: {
    // 获取当前单元
    currentUnit: (state) => {
      return state.units[state.progress.currentUnitIndex]
    },

    // 获取当前视频
    currentVideo: (state) => {
      return state.currentUnit?.video
    },

    // 获取当前问题
    currentQuestion: (state) => {
      return state.currentUnit?.questions[state.progress.currentQuestionIndex]
    },

    // 检查是否还有下一个单元
    hasNextUnit: (state) => {
      return state.progress.currentUnitIndex < state.units.length - 1
    },

    // 获取总体进度信息
    totalProgress: (state) => {
      return {
        currentUnit: state.progress.currentUnitIndex + 1,
        totalUnits: state.units.length,
        currentQuestion: state.progress.currentQuestionIndex + 1,
      }
    },

    // 计算总题目数
    totalQuestions: (state) => {
      return state.units.length * 3 // 每单元3题
    },

    // 计算两种方式的总分
    totalPossibleScores: (state) => {
      const totalQuestions = state.units.length * 3
      return {
        basic: totalQuestions * state.scoring.points.basic,
        time: totalQuestions * state.scoring.points.fast,
      }
    },

    // 获取学习统计信息
    statistics: (state) => {
      const totalQuestions = state.units.length * 3
      const totalScores = {
        basic: totalQuestions * state.scoring.points.basic,
        time: totalQuestions * state.scoring.points.fast,
      }

      return {
        totalQuestions,
        answeredQuestions: state.answers.length,
        basicScore: {
          current: state.scoring.basicScore.current,
          total: totalScores.basic,
          correctCount: state.scoring.basicScore.correctCount,
        },
        timeScore: {
          current: state.scoring.timeScore.current,
          total: totalScores.time,
          correctCount: state.scoring.timeScore.correctCount,
          fastAnswers: state.scoring.timeScore.fastAnswers,
        },
      }
    },
  },

  actions: {
    // 初始化学习
    initLearning() {
      this.startTime = new Date()
      this.resetProgress()
      this.startQuestion()
    },

    // 开始计时新题目
    startQuestion() {
      this.currentQuestionStartTime = new Date()
    },

    // 标记视频完成
    markVideoComplete() {
      this.progress.videoCompleted = true
      this.startQuestion() // 开始第一题计时
    },

    // 获取单个单元的得分数据
    // stores/quiz.js
    // 修改这些获取单个单元得分的方法

    getUnitBasicScore(unitId) {
      // 只获取当前这一轮的本单元答题记录
      const currentUnitAnswers = this.answers.slice(-3) // 每单元3题，所以取最后3条记录
      return (
        currentUnitAnswers.filter((answer) => answer.isCorrect).length * this.scoring.points.basic
      )
    },

    getUnitTimeScore(unitId) {
      const currentUnitAnswers = this.answers.slice(-3)
      return currentUnitAnswers.reduce((total, answer) => {
        if (answer.isCorrect) {
          return total + (answer.isQuick ? this.scoring.points.fast : this.scoring.points.overtime)
        }
        return total
      }, 0)
    },

    getUnitCorrectCount(unitId) {
      const currentUnitAnswers = this.answers.slice(-3)
      return currentUnitAnswers.filter((answer) => answer.isCorrect).length
    },

    getUnitFastAnswers(unitId) {
      const currentUnitAnswers = this.answers.slice(-3)
      return currentUnitAnswers.filter((answer) => answer.isQuick).length
    },

    // 提交答案
    submitAnswer(answerId) {
      const question = this.currentQuestion
      const isCorrect = question.correctAnswer === answerId
      const answerTime = (new Date() - this.currentQuestionStartTime) / 1000

      // 记录答案
      this.answers.push({
        unitId: this.currentUnit.id,
        questionId: question.id,
        answerId: answerId,
        isCorrect: isCorrect,
        answerTime: answerTime,
        isQuick: isCorrect && answerTime <= this.scoring.timeLimit,
        timestamp: new Date(),
      })

      // 计算得分
      if (isCorrect) {
        // 计分方式A：答对得基础分
        this.scoring.basicScore.current += this.scoring.points.basic
        this.scoring.basicScore.correctCount++

        // 计分方式B：根据答题时间给分
        if (answerTime <= question.timeLimit) {
          // 使用题目自身的时间限制
          this.scoring.timeScore.current += this.scoring.points.fast
          this.scoring.timeScore.fastAnswers++
        } else {
          this.scoring.timeScore.current += this.scoring.points.overtime
        }
        this.scoring.timeScore.correctCount++
      }

      // 更新进度
      if (this.progress.currentQuestionIndex < 2) {
        this.progress.currentQuestionIndex++
        this.startQuestion() // 开始下一题计时
      } else {
        // 根据 modalType 设置不同的得分数据
        if (this.modalType === 'typeA') {
          this.currentUnitScores = {
            unitId: this.currentUnit.id,
            basicScore: this.getUnitBasicScore(this.currentUnit.id),
            basicTotal: 30, // 单个单元总分：3题 x 10分
            timeScore: this.getUnitTimeScore(this.currentUnit.id),
            timeTotal: 45, // 单个单元总分：3题 x 15分
            correctCount: this.getUnitCorrectCount(this.currentUnit.id),
            totalAnswered: 3,
            fastAnswers: this.getUnitFastAnswers(this.currentUnit.id),
          }
        } else {
          this.currentUnitScores = {
            unitId: this.currentUnit.id,
            basicScore: this.scoring.basicScore.current,
            basicTotal: this.totalPossibleScores.basic,
            timeScore: this.scoring.timeScore.current,
            timeTotal: this.totalPossibleScores.time,
            correctCount: this.scoring.basicScore.correctCount,
            totalAnswered: this.answers.length,
            fastAnswers: this.scoring.timeScore.fastAnswers,
          }
        }
        this.showScoreModal = true

        // 如果是最后一个单元，设置完成状态
        if (!this.hasNextUnit) {
          this.progress.isCompleted = true
          this.endTime = new Date()
          this.saveToLocalStorage()
        }
      }
    },

    // 进入下一个单元
    nextUnit() {
      if (this.hasNextUnit) {
        if (this.modalType === 'typeA') {
          this.currentUnitScores = {
            unitId: this.currentUnit.id,
            basicScore: this.getUnitBasicScore(this.currentUnit.id),
            basicTotal: 30,
            timeScore: this.getUnitTimeScore(this.currentUnit.id),
            timeTotal: 45,
            correctCount: this.getUnitCorrectCount(this.currentUnit.id),
            totalAnswered: 3,
            fastAnswers: this.getUnitFastAnswers(this.currentUnit.id),
          }
        } else {
          this.currentUnitScores = {
            unitId: this.currentUnit.id,
            basicScore: this.scoring.basicScore.current,
            basicTotal: this.totalPossibleScores.basic,
            timeScore: this.scoring.timeScore.current,
            timeTotal: this.totalPossibleScores.time,
            correctCount: this.scoring.basicScore.correctCount,
            totalAnswered: this.answers.length,
            fastAnswers: this.scoring.timeScore.fastAnswers,
          }
        }
        this.showScoreModal = true
      }
    },

    continueToNextUnit() {
      this.showScoreModal = false
      this.currentUnitScores = null

      if (this.hasNextUnit) {
        this.progress.currentUnitIndex++
        this.progress.videoCompleted = false
        this.progress.currentQuestionIndex = 0
        this.startQuestion()
        return false // 继续学习
      } else {
        this.progress.isCompleted = true
        this.endTime = new Date()
        this.saveToLocalStorage()
        return true // 学习完成，需要跳转到结果页
      }
    },

    // 完成整个学习过程
    completeLearning() {
      this.progress.isCompleted = true
      this.endTime = new Date()
      this.saveToLocalStorage()
    },

    // 重置进度
    resetProgress() {
      this.progress = {
        currentUnitIndex: 0,
        videoCompleted: false,
        currentQuestionIndex: 0,
        isCompleted: false,
      }
      this.answers = []
      this.scoring.basicScore = {
        current: 0,
        correctCount: 0,
      }
      this.scoring.timeScore = {
        current: 0,
        correctCount: 0,
        fastAnswers: 0,
      }
      this.startTime = new Date()
      this.endTime = null
      this.currentQuestionStartTime = null
    },

    // 获取某个单元的答题情况
    getUnitResults(unitId) {
      return this.answers.filter((answer) => answer.unitId === unitId)
    },

    // 保存学习记录到本地存储
    saveToLocalStorage() {
      const learningRecord = {
        startTime: this.startTime,
        endTime: this.endTime,
        answers: this.answers,
        scoring: this.scoring,
        statistics: this.statistics,
      }
      localStorage.setItem('learningRecord', JSON.stringify(learningRecord))
    },

    // 从本地存储加载学习记录
    loadFromLocalStorage() {
      const record = localStorage.getItem('learningRecord')
      if (record) {
        const data = JSON.parse(record)
        this.startTime = new Date(data.startTime)
        this.endTime = data.endTime ? new Date(data.endTime) : null
        this.answers = data.answers
        this.scoring = data.scoring
      }
    },
  },
})
