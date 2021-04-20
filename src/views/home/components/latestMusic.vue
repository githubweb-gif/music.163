<template>
    <div class="latestMusic">
        <div class="title">
            <span>新歌速递</span>
            <span>新碟上架</span>
        </div>
        <div class="new-music">
            <new-music :view-port-height="800" v-if="musics" :songs="musics"></new-music>
        </div>
    </div>
</template>

<script>
import newMusic from '@/components/songListDetail/songList.vue'
// api
import { getNewMusic } from '@/api/music'
export default {
  components: {
    newMusic
  },
  data () {
    return {
      musics: [],
      element: null
    }
  },
  created () {
    getNewMusic({ type: 0 }).then(res => {
      const { data } = res
      console.log(data)
      data.forEach((x, index) => {
        const singername = []
        const { artists } = x
        artists.forEach(i => {
          singername.push(i.name)
        })
        this.musics.push({
          id: x.id,
          album: { id: x.album.id },
          albumName: x.album.name,
          name: x.name,
          cover: x.album.picUrl,
          singerName: singername.join('/'),
          duration: x.duration,
          // 版权 st<0无版权
          copyright: 0,
          index: index
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.latestMusic {
    .title {
        span {
            display: inline-block;
            font-size: 12px;
            padding: 3px 5px;
            border: 1px solid #6e6e6d;
            color: #6e6e6d;
            cursor: pointer;
        }
        span:nth-child(2) {
            color: #fff;
            background-color: #6e6e6d;
        }
    }
}
</style>
