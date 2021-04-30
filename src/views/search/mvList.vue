<template>
  <div ref="box" class="mvList">
    <ul>
      <li :style="{width: imgWidth}" v-for="(item, index) in mvData" :key="index">
        <router-link :to="`/MvDetail/${item.id}`">
          <div class="cover">
            <img :src="`${item.cover}?param=200y100`" alt="" />
            <div class="time">{{ item.duration / 1000 | formatTime }}</div>
            <div class="playCount">{{ item.playCount | count }}</div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="singername">{{ item.artistName }}</div>
        </router-link>
        {{imgWidth}}
      </li>
    </ul>
  </div>
</template>

<script>
import { searchMusic } from '@/api/search'
import resize from './resize'
export default {
  mixins: [resize],
  props: {
    keyWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mvData: []
    }
  },
  watch: {
    keyWord () {
      this.mvData = []
    }
  },
  methods: {
    getData (type = '1004') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        if (data.code === 200) {
          this.mvData = data.result.mvs
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.mvList {
  width: 100%;
    margin-top: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  padding-right: 15px;
  margin-bottom: 15px;
}
li a {
  width: 100%;
  display: block;
  cursor: pointer;
  .cover {
    width: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
    }
    .time,
    .playCount {
      font-size: 13px;
      color: #fff;
      position: absolute;
    }
    .time {
      bottom: 5px;
      left: 5px;
    }
    .playCount {
      top: 5px;
      right: 5px;
    }
  }
  .name {
    padding: 7px 0;
    width: 100%;
  }
  .singername {
    font-size: 13px;
    color: rgb(141, 141, 141);
  }
}
</style>
