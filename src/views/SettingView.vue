<!-- views/SettingsView.vue -->
<template>
    <div class="settings-view">
      <h1>学习设置</h1>
      
      <div class="settings-section">
        <h2>弹框内容</h2>
        <div class="setting-item">
          <div class="radio-group">
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="tempSettings.modalType" 
                value="typeA"
              >
              <span>基础得分 + 奖励分</span>
              <!-- <div class="description">完成每个单元后显示当前单元的得分情况</div> -->
            </label>
            <label class="radio-label">
              <input 
                type="radio" 
                v-model="tempSettings.modalType" 
                value="typeB"
              >
              <span>整合型排行榜</span>
              <!-- <div class="description">完成每个单元后显示累计的总得分情况</div> -->
            </label>
          </div>
        </div>
      </div>
  
      <div class="buttons">
        <button class="save-btn" @click="saveSettings">保存设置</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/setting'
import { useRouter } from 'vue-router'

const settingsStore = useSettingsStore()
const router = useRouter()

const tempSettings = ref({
  modalType: 'typeA',
})

onMounted(() => {
  settingsStore.loadSettings()
  tempSettings.value = {
    modalType: settingsStore.settings.modalType,
  }
})

const saveSettings = () => {
  settingsStore.updateSettings(tempSettings.value)
  router.push('/')
}
</script>
  
  <style scoped>
.settings-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.settings-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  padding: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.radio-label:hover {
  background-color: #f8f9fa;
}

.radio-label input[type='radio'] {
  margin-right: 1rem;
  margin-top: 0.2rem;
}

.radio-label span {
  font-weight: 500;
  color: #2c3e50;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  margin-left: 1.5rem;
}

.save-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #3aa876;
}

@media (max-width: 600px) {
  .settings-view {
    padding: 1rem;
  }
}
</style>