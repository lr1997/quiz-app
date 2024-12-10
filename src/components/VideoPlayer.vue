<template>
    <div class="video-player">
      <h2 v-if="video?.title">{{ video.title }}</h2>
      <div class="video-container">
        <video
          ref="videoRef"
          class="video-element"
          :poster="video?.thumbnail"
          @ended="handleVideoEnd"
          @timeupdate="updateProgress"
          @loadedmetadata="onVideoLoaded"
          @play="isPlaying = true"
          @pause="isPlaying = false"
        >
          <source :src="video?.url" type="video/mp4">
          Your browser does not support the video tag.
        </video>
  
        <div v-if="video" class="video-controls">
          <!-- 进度条 -->
          <div class="progress-bar">
            <div class="progress-background"></div>
            <div class="progress-current" :style="{ width: `${progress}%` }"></div>
            <input 
              type="range" 
              class="progress-slider"
              :value="progress" 
              @input="handleSeek"
              min="0" 
              max="100"
              step="0.1"
            >
          </div>
  
          <!-- 控制按钮区 -->
          <div class="controls-bar">
            <!-- 左侧播放控制 -->
            <div class="left-controls">
              <button class="control-btn play-btn" @click="togglePlay">
                <div :class="['btn-icon', isPlaying ? 'pause-icon' : 'play-icon']"></div>
              </button>
              
              <!-- 音量控制 -->
              <div class="volume-control">
                <button class="control-btn volume-btn" @click="toggleMute">
                  <div :class="['btn-icon', 'volume-icon', { 'muted': volume === 0 }]"></div>
                </button>
                <input 
                  type="range" 
                  class="volume-slider"
                  :value="volume" 
                  @input="handleVolumeChange"
                  min="0" 
                  max="100"
                >
              </div>
              
              <!-- 时间显示 -->
              <span class="time-display">
                {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
              </span>
            </div>
  
            <!-- 右侧控制 -->
            <div class="right-controls">
              <select v-model="playbackRate" class="playback-rate" @change="changePlaybackRate">
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      url: '',
      thumbnail: '',
    }),
    validator(value) {
      return value && value.url
    },
  },
})

const emit = defineEmits(['complete'])
const videoRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const volume = ref(100)
const playbackRate = ref('1')

// 视频加载完成
const onVideoLoaded = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
    volume.value = videoRef.value.volume * 100
  }
}

// 播放/暂停切换
const togglePlay = () => {
  if (!videoRef.value) return

  if (videoRef.value.paused) {
    videoRef.value.play()
  } else {
    videoRef.value.pause()
  }
}

// 更新进度
const updateProgress = () => {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
    progress.value = (currentTime.value / duration.value) * 100
  }
}

// 进度跳转
const handleSeek = (event) => {
  if (!videoRef.value) return

  const newTime = (event.target.value / 100) * duration.value
  videoRef.value.currentTime = newTime
  currentTime.value = newTime
}

// 音量控制
const handleVolumeChange = (event) => {
  if (!videoRef.value) return

  volume.value = event.target.value
  videoRef.value.volume = volume.value / 100
}

// 静音切换
const toggleMute = () => {
  if (!videoRef.value) return

  if (volume.value === 0) {
    volume.value = 100
  } else {
    volume.value = 0
  }
  videoRef.value.volume = volume.value / 100
}

// 播放速度控制
const changePlaybackRate = () => {
  if (!videoRef.value) return
  videoRef.value.playbackRate = parseFloat(playbackRate.value)
}

// 时间格式化
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// 视频结束处理
const handleVideoEnd = () => {
  isPlaying.value = false
  emit('complete')
}

// 组件销毁时清理
onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.removeEventListener('timeupdate', updateProgress)
  }
})
</script>
  
  <style scoped>
.video-player {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.video-container {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-element {
  width: 100%;
  display: block;
}

.video-controls {
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  color: white;
}

.progress-bar {
  position: relative;
  height: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

.progress-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
}

.progress-current {
  position: absolute;
  height: 100%;
  background: #42b983;
  transition: width 0.1s;
}

.progress-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.left-controls,
.right-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 按钮图标样式 */
.btn-icon {
  width: 24px;
  height: 24px;
  position: relative;
}

/* 播放按钮 */
.play-icon {
  border-style: solid;
  border-width: 12px 0 12px 20px;
  border-color: transparent transparent transparent #fff;
}

/* 暂停按钮 */
.pause-icon::before,
.pause-icon::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 24px;
  background: #fff;
  top: 0;
}

.pause-icon::before {
  left: 4px;
}

.pause-icon::after {
  right: 4px;
}

/* 音量按钮 */
.volume-icon {
  position: relative;
}

.volume-icon::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  width: 6px;
  height: 8px;
  background: #fff;
}

.volume-icon::after {
  content: '';
  position: absolute;
  left: 10px;
  top: 4px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 8px 8px 0;
  border-color: transparent #fff transparent transparent;
}

/* 静音状态 */
.volume-icon.muted::after {
  opacity: 0.5;
}

/* 控制按钮基础样式 */
.control-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

/* 音量控制 */
.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  /* -webkit-appearance: none; */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}

/* 播放速度选择器 */
.playback-rate {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.playback-rate:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 时间显示 */
.time-display {
  color: #fff;
  font-size: 14px;
  margin: 0 12px;
}
</style>