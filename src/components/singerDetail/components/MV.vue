<template>
  <div class='singerMv'>
    <ul>
      <li @click="toMV(item.id)" class="item" v-for="item in mvs" :key="item.id">
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
export default {
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
      offset: 0
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
  mounted () {
    const singerDetail = document.querySelector('.singerDetail')
    singerDetail.addEventListener('scroll', (e) => {
      if (!this.bol) {
        return
      }
      const target = e.target
      if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
        this.offset += 30
        this.bol = false
        this.getData()
      }
    })
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
@media only screen and (max-width: 1300px) {
  li {
    width: 14% !important;
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
.singerMv {
  margin-top: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 10%;
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
