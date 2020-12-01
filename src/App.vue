<template>
  <div id="app">
    <router-view class="box" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .box {
    width: 60%;
    min-width: 850px;
    height: 600px;
    overflow: hidden;
    border: 1px solid #000000;
    box-sizing: border-box;
  }
}
</style>
