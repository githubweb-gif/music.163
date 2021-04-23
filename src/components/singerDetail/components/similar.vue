<template>
  <div class='similar'>
    <div @click="toSingerDetail(item.id)" v-for="item in singers" :key="item.id" class="item">
      <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
      <div class="name"></div>
      {{item.name}}
    </div>
  </div>
</template>

<script>
import { similarSinger } from '@/api/music'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      singers: []
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
        console.log(res)
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
@media only screen and (max-width: 1300px) {
  .item {
    width: 14% !important;
  }
}

@media only screen and (max-width: 1000px) {
  .item {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
  .item {
    width: 33% !important;
  }
}
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
