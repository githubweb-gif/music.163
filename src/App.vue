<template>
  <div id="app">
   <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="box" />
   </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="box" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
