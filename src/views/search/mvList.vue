<template>
  <div class="mvList">
    <ul>
      <li v-for="(item, index) in mvData" :key="index">
        <router-link :to="`/MvDetail/${item.id}`">
          <div class="cover">
            <img :src="`${item.cover}?param=200y100`" alt="" />
            <div class="time">{{ item.duration / 1000 | formatTime }}</div>
            <div class="playCount">{{ item.playCount | count }}</div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="singername">{{ item.artistName }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { searchMusic } from '@/api/search'
export default {
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
  created () {},
  mounted () {
    this.$bus.$on('search-tab', (value) => {
      if (value === '1004' && this.mvData.length === 0) {
        this.getData()
      }
    })
  },
  methods: {
    getData (type = '1004') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        console.log(data)
        if (data.code === 200) {
          this.mvData = data.result.mvs
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 1300px) {
  li {
    width: 20% !important;
  }
}

@media only screen and (max-width: 1000px) {
  li {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
  li {
    width: 33% !important;
  }
}

@media only screen and (max-width: 500px) {
  li {
    width: 50% !important;
  }
}

.mvList {
    margin-top: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 14%;
  padding-right: 15px;
  margin-bottom: 15px;
}
li a {
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
