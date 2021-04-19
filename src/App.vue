<template>
  <div id="app">
    <router-view class="box" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  overflow: hidden;
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
