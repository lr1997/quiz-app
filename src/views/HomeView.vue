<template>
  <div class="home">
    <div class="welcome-card">
      <h2>欢迎来到答题系统</h2>
      <div class="description">
        <p>在这里，您将完成：</p>
        <ul>
          <li>观看教学视频</li>
          <li>回答相关问题</li>
          <li>检验学习成果</li>
        </ul>
      </div>
      <router-link to="/learning" class="start-btn">
        开始学习
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px); /* 减去header的高度 */
  padding: 20px;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2em;
}

.description {
  margin: 30px 0;
  text-align: left;
}

.description p {
  margin-bottom: 15px;
  color: #666;
}

.description ul {
  list-style: none;
  padding: 0;
}

.description li {
  padding: 10px 0;
  color: #666;
  position: relative;
  padding-left: 25px;
}

.description li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b983;
}

.start-btn {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 15px 40px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.1em;
  transition: background-color 0.3s;
}

.start-btn:hover {
  background: #3aa876;
}
</style>