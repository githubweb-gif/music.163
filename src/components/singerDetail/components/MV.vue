<template>
  <div ref="box" class='singerMv'>
    <ul>
      <li :style="{width: imgWidth}" @click="toMV(item.id)" class="item" v-for="item in mvs" :key="item.id">
        <img v-lazy="`${item.imgurl}?param=130y130`" alt="">
        <div class="name">{{item.name}}</div>
        <div class="time">{{item.publishTime}}</div>
        <div class="after">{{item.playCount | count}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { singerMv } from '@/api/music'
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
      mvs: [],
      bol: true,
      offset: 0,
      imgWidth: '12.5%'
    }
  },
  watch: {
    id () {
      this.mvs = []
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
      singerMv({ id: this.id, limit: 30, offset: this.offset }).then((data) => {
        if (data.mvs.length === 0) {
          return
        }
        this.bol = true
        this.mvs.push(...data.mvs)
      })
    },
    toMV (id) {
      this.$router.push(`/MvDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.singerMv {
  margin-top: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    padding-right: 10px;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
    }
    .name {
      margin: 5px 0;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: 12px;
      color: rgb(143, 143, 143);
    }
  }
  .after {
      position: absolute;
      top: 2px;
      right: 14px;
      color: #fff;
      font-size: 12px;
  }
}
</style>
