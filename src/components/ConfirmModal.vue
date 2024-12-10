<!-- components/ConfirmModal.vue -->
<template>
    <div v-if="show" class="confirm-modal">
      <div class="confirm-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="confirm-buttons">
          <button class="cancel-btn" @click="$emit('cancel')">重新学习</button>
          <button class="confirm-btn" @click="$emit('confirm')">开始答题</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: '确认',
  },
  message: {
    type: String,
    default: '确认继续操作？',
  },
})

defineEmits(['confirm', 'cancel'])
</script>
  
  <style scoped>
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirm-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

p {
  margin: 0 0 20px 0;
  color: #666;
}

.confirm-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background: #42b983;
  color: white;
}

.cancel-btn:hover {
  background: #e8e8e8;
}

.confirm-btn:hover {
  background: #3aa876;
}
</style>