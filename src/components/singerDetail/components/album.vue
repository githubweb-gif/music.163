<template>
  <div ref="box" class='singerAblum'>
      <ul>
          <li :style="{width: imgWidth}" @click="toAlbum(item.id)" v-for="item in albums" :key="item.id">
              <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
              <p>{{item.name}}</p>
              <span class="title">{{item.publishTime | filterTime}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
import { singerAblum } from '@/api/music'
import resize from '@/components/imgSize/index'
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      albums: [],
      bol: true,
      offset: 0,
      imgWidth: '12.5%'
    }
  },
  watch: {
    id () {
      this.albums = []
      this.bol = true
      this.offset = 0
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      singerAblum({ id: this.id, limit: 30, offset: this.offset }).then(data => {
        if (data.hotAlbums.length === 0) {
          return
        }
        this.albums.push(...data.hotAlbums)
        this.bol = true
      })
    },
    toAlbum (id) {
      this.$router.push(`/albumDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    li {
        margin-bottom: 20px;
        padding-right: 10px;
        img {
            width: 100%;
        }
        p {
            font-size: 13px;
            margin-top: 5px;
        }
        span {
            font-size: 12px;
            color: rgb(143, 143, 143);
        }
    }
}
</style>
