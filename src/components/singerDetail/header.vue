<template>
  <div class="header">
    <p class="title">
      歌手
    </p>
    <main>
      <div class="left">
        <img :src="`${detail.cover}?param=200y200`" alt="">
      </div>
      <div class="right">
        <div class="name">{{detail.name}}</div>
        <ul>
          <li class="musicSize">
            单曲数：<span>{{detail.musicSize}}</span>
          </li>
          <li>
            专辑数：<span>{{detail.albumSize}}</span>
          </li>
          <li>MV数：<span>{{detail.mvSize}}</span></li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
p.title {
  font-size: 13px;
  margin-bottom: 15px;
}
main {
  display: flex;
}
.left {
  width: 23%;
  max-width: 160px;
  margin-right: 20px;
  img {
    width: 100%;
  }
}
.right {
  .name {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
  }
  ul {
    li {
      font-size: 13px;
      margin-bottom: 10px;
      span {
        color: rgb(158, 158, 158);
      }
    }
  }
}
</style>
