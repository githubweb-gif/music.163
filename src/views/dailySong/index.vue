<template>
  <div class="dailySong scroll-list">
    <header>
      <div class="date">27</div>
      <div class="right">
        <h4>每日歌曲推荐</h4>
        <p>根据你的音乐口味生成，每天6：00更新</p>
      </div>
    </header>
    <song-list :view-port-height="800" :songs="songs"></song-list>
  </div>
</template>

<script>
import { dailySong } from '@/api/music'
import songList from '@/components/playList/list.vue'
export default {
  components: {
    songList
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      dailySong().then(res => {
        this.filterMusic(res.data.dailySongs)
      })
    },
    filterMusic (data) {
      data.forEach((x, index) => {
        const singername = []
        const { ar } = x
        ar.forEach((i) => {
          singername.push(i.name)
        })
        this.songs.push({
          id: x.id,
          album: { id: x.al.id },
          albumName: x.al.name,
          name: x.name,
          singerName: singername.join('/'),
          duration: x.dt,
          // 版权 st<0无版权
          copyright: 0,
          index: index
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.dailySong {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  header {
    padding: 30px 0;
    display: flex;
    align-items: center;
    .date {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      border: 1px solid rgb(206, 206, 206);
      margin-right: 25px;
      font-size: 50px;
      color: rgb(194, 12, 12);
    }
    .right {
      h4 {
        font-size: 20px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
