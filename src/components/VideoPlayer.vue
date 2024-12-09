<template>
    <div class="video-player">
      <div class="video-container">
        <!-- 由于没有真实视频，这里用图片模拟 -->
        <img :src="video.thumbnail" alt="视频缩略图" class="video-thumbnail">
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>时长: {{ video.duration }}</p>
        </div>
      </div>
      <button class="complete-btn" @click="completeVideo">完成视频学习</button>
    </div>
  </template>
  
  <script setup>
defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['complete'])

const completeVideo = () => {
  emit('complete')
}
</script>
  
  <style scoped>
.video-player {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.video-container {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.video-thumbnail {
  width: 100%;
  height: auto;
}

.video-info {
  padding: 15px;
}

.complete-btn {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.complete-btn:hover {
  background: #45a049;
}
</style>