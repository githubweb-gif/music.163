<template>
  <div class="singerList">
    <ul>
      <li v-for="(item, index) in songData" :key="index">
        <router-link :to="`/songListDetail/${item.id}`">
          <div class="avatar">
            <img :src="`${item.coverImgUrl}?param=50y50`" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="other count">{{ item.trackCount }}首</div>
          <div class="other creator">{{ item.creator.nickname }}</div>
          <div class="other play">播放: {{ item.playCount }}</div>
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
      songData: []
    }
  },
  watch: {
    keyWord () {
      this.songData = []
    }
  },
  created () {},
  mounted () {
    this.$bus.$on('search-tab', (value) => {
      if (value === '1000' && this.songData.length === 0) {
        this.getData()
      }
    })
  },
  methods: {
    getData (type = '1000') {
      searchMusic({ keywords: this.keyWord, type, limit: 100 }).then((data) => {
        if (data.code === 200) {
          this.songData = data.result.playlists
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 800px) {
  .play {
    display: none;
  }
}

@media only screen and (max-width: 620px) {
  .play,
  .count {
    display: none;
  }
}
li:nth-child(odd) {
  background-color: rgb(243, 243, 243);
}
li a {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .name {
    flex: 1;
  }
  .other {
    flex: 0.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(146, 146, 146);
    font-size: 13px;
  }
}
</style>
