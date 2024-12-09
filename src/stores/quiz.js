// stores/quiz.js
import { defineStore } from 'pinia'
import { quizData } from '@/data/quiz-data'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    // 所有学习单元数据
    units: quizData.units,

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

      console.log('当前分数情况：')
      console.log(
        '分数A (普通):',
        this.scoring.basicScore.current + '/' + this.totalPossibleScores.basic,
      )
      console.log(
        '分数B (计时):',
        this.scoring.timeScore.current + '/' + this.totalPossibleScores.time,
      )
      console.log(
        '本题答题时间:',
        answerTime.toFixed(2) + '秒',
        '是否在时限内:',
        answerTime <= question.timeLimit ? '是' : '否',
      )

      // 更新进度
      if (this.progress.currentQuestionIndex < 2) {
        this.progress.currentQuestionIndex++
        this.startQuestion() // 开始下一题计时
      } else {
        // 设置当前单元的得分数据
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
        // 设置当前单元的得分数据
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
        this.showScoreModal = true
      }
    },

    continueToNextUnit() {
      console.log('=== continueToNextUnit start ===')
      console.log('Current unit index:', this.progress.currentUnitIndex)
      console.log('Current unit:', this.units[this.progress.currentUnitIndex])

      this.showScoreModal = false
      this.currentUnitScores = null

      if (this.hasNextUnit) {
        // 检查下一个单元是否存在
        const nextIndex = this.progress.currentUnitIndex + 1
        console.log('Next unit index will be:', nextIndex)
        console.log('Next unit data:', this.units[nextIndex])

        this.progress.currentUnitIndex = nextIndex
        this.progress.videoCompleted = false
        this.progress.currentQuestionIndex = 0
        this.startQuestion()

        console.log('=== continueToNextUnit end ===')
        return false // 继续学习
      } else {
        this.progress.isCompleted = true
        this.endTime = new Date()
        this.saveToLocalStorage()
        console.log('=== Learning completed ===')
        return true // 学习完成
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
