<template>
  <div class="introduction">
    <div class="title">
      {{name}}简介
    </div>
    <!-- 生平 -->
    <div class="life">
      <p>{{desc.briefDesc}}</p>
    </div>
    <div v-for="(item, index) in desc.introduction" :key="index">
      <div class="title">{{item.ti}}</div>
      <div class="content">{{item.txt}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(this.desc)
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.introduction {
  margin-top: 20px;
}
p,
.content {
  margin-top: 10px;
  white-space: pre-line;
  font-size: 13px;
  line-height: 20px;
}
.title {
  margin-top: 20px;
}
.content {
  line-height: 30px;
}
</style>
