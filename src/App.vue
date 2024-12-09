<template>
  <div class="app">
    <header class="header">
      <h1>答题系统</h1>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

.app {
  min-height: 100vh;
}

.header {
  background-color: #fff;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>