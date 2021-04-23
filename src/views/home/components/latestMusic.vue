<template>
  <div class="latestMusic">
    <div class="title">
      <div class="left">
        <span @click="getData(0)" :class="['newMusic', {selected : value===0}]">新歌速递</span>
        <span @click="getData(1)" :class="['newList', {selected : value===1}]">新碟上架</span>
      </div>
      <div v-show="value === 0" class="right">
        <span :class="type === 7? 'selected' : ''" @click="getNewMusic(7)">华语</span>
        <span :class="type === 96? 'selected' : ''" @click="getNewMusic(96)">欧美</span>
        <span :class="type === 8? 'selected' : ''" @click="getNewMusic(8)">日本</span>
      </div>
    </div>
    <new-music v-show="value === 0" v-if="musics" :view-port-height="800" :songs="musics" />
    <new-list v-show="value === 1" />
  </div>
</template>

<script>
import newMusic from '@/components/playList/list.vue'
import newList from './newList.vue'
// api
import { getNewMusic } from '@/api/music'
export default {
  components: {
    newMusic,
    newList
  },
  data () {
    return {
      musics: [],
      element: null,
      value: '',
      type: 7
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (val = 0) {
      if (val === this.value) {
        return
      }
      this.value = val
      if (val === 0) {
        if (this.musics && this.musics.length === 0) {
          this.getNewMusic()
        }
      } else if (val === 1) {
        this.getNewList()
      }
    },
    getNewMusic (type = 7) {
      this.type = type
      getNewMusic({ type: this.type }).then((res) => {
        this.musics = []
        const { data } = res
        data.forEach((x, index) => {
          const singername = []
          const { artists } = x
          artists.forEach((i) => {
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
    },
    getNewList () {}
  }
}
</script>

<style lang="scss" scoped>
.latestMusic {
  width: 100%;
  height: 100%;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #6e6e6d;
    .left {
      span {
        display: inline-block;
        padding: 3px 5px;
        border: 1px solid #6e6e6d;
        cursor: pointer;
      }
      span.selected {
        color: #fff;
        background-color: #6e6e6d;
      }
    }
    .right {
      margin-right: 8%;
      span.selected {
        color: #000;
      }
      span {
        padding: 0 15px;
        border-right: 1px solid #6e6e6d;
        cursor: pointer;
      }
      span:nth-child(3) {
        border: 0;
      }
    }
  }
}
</style>
