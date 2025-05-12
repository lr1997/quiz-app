<template>
  <main class="home-container">
    <div class="welcome-section">
      <h1>欢迎来到问答学习应用</h1>
      <p class="subtitle">请填写您的信息开始学习。</p>
    </div>

    <div class="student-info-section card">
      <h2>学生信息</h2>
      <div class="input-group">
        <label for="studentId">学号:</label>
        <input type="text" id="studentId" v-model="studentId" placeholder="请输入您的学号" />
      </div>
      <div class="input-group">
        <label for="studentName">姓名:</label>
        <input type="text" id="studentName" v-model="studentName" placeholder="请输入您的姓名" />
      </div>
      <button class="start-button" @click="startLearning" :disabled="!studentId || !studentName">开始学习</button>
    </div>

    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';
// import TheWelcome from '../components/TheWelcome.vue'; // 如果使用了这个组件

const studentId = ref('');
const studentName = ref('');
const router = useRouter();
const quizStore = useQuizStore();

const startLearning = () => {
  if (studentId.value && studentName.value) {
    quizStore.setStudentInfo(studentId.value, studentName.value);
    quizStore.initLearning(); // 初始化学习状态
    router.push({ name: 'learning' }); // 跳转到学习页面
  }
};
</script>

<style scoped>
/* 容器基本样式 */
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px; /* 增加整体内边距 */
  min-height: calc(100vh - 40px); /* 确保内容区域至少占满视口高度（减去padding） */
  justify-content: center; /* 垂直居中内容 */
}

/* 欢迎部分 */
.welcome-section {
  text-align: center;
  margin-bottom: 40px; /* 增加底部间距 */
}

.welcome-section h1 {
  color: var(--color-heading);
  font-size: 2.5em; /* 增大标题字号 */
  margin-bottom: 10px;
}

.welcome-section .subtitle {
  color: var(--color-text);
  font-size: 1.1em; /* 调整副标题字号 */
}

/* 学生信息录入卡片 */
.student-info-section {
  width: 100%;
  max-width: 450px; /* 稍微增加最大宽度 */
  padding: 30px; /* 增加卡片内边距 */
  border-radius: 12px; /* 更圆润的边角 */
  background-color: var(--color-background-soft);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  margin-top: 0; /* 移除顶部margin，由home-container的justify-content控制垂直间距 */
}

.student-info-section h2 {
  text-align: center;
  margin-bottom: 25px; /* 增加标题底部间距 */
  color: var(--color-heading);
  font-size: 1.8em; /* 调整卡片标题字号 */
}

/* 输入组 */
.input-group {
  margin-bottom: 20px; /* 增加输入组间距 */
}

.input-group label {
  display: block;
  margin-bottom: 8px; /* 增加label和输入框间距 */
  font-weight: bold;
  color: var(--color-text);
  font-size: 1em;
}

.input-group input[type="text"] {
  width: 100%;
  padding: 12px 15px; /* 增加输入框内边距 */
  border: 1px solid var(--color-border);
  border-radius: 6px; /* 输入框圆角 */
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.input-group input[type="text"]:focus {
  border-color: #007bff; /* 聚焦时改变边框颜色 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2); /* 聚焦时添加阴影 */
  outline: none; /* 移除默认轮廓 */
}

/* 开始学习按钮 */
.start-button {
  display: block;
  width: 100%;
  padding: 12px 15px; /* 调整按钮内边距 */
  background-color: #007bff; /* 蓝色背景 */
  color: white;
  border: none;
  border-radius: 6px; /* 按钮圆角 */
  cursor: pointer;
  font-size: 1.1em; /* 调整按钮字号 */
  font-weight: bold;
  transition: background-color 0.3s ease, opacity 0.3s ease; /* 添加过渡效果 */
}

.start-button:hover:not(:disabled) {
  background-color: #0056b3; /* 鼠标悬停效果 */
}

.start-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7; /* 禁用时降低透明度 */
}

/* 响应式调整 */
@media (max-width: 600px) {
  .home-container {
    padding: 30px 15px;
  }

  .welcome-section h1 {
    font-size: 2em;
  }

  .student-info-section {
    padding: 20px;
  }

  .student-info-section h2 {
    font-size: 1.5em;
  }

  .input-group input[type="text"],
  .start-button {
    padding: 10px 12px;
    font-size: 1em;
  }
}
</style>