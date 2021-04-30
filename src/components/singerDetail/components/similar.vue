<template>
  <div ref="box" class='similar'>
    <div :style="{width: imgWidth}" @click="toSingerDetail(item.id)" v-for="item in singers" :key="item.id" class="item">
      <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
      <div class="name"></div>
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { similarSinger } from '@/api/music'
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
      singers: [],
      imgWidth: '12.5%',
      noOffset: true
    }
  },
  watch: {
    id () {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      similarSinger({ id: this.id }).then((res) => {
        this.singers = res.artists
      })
    },
    toSingerDetail (id) {
      this.$router.push(`/singerDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.similar {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 10%;
    padding-right: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
  }
  img {
    margin-bottom: 5px;
  }
}
</style>
