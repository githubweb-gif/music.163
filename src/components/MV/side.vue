<template>
  <div :style="{width: width}" class='mv-side'>
    <div class="title">
      <span>MV介绍</span>
      <span @click="showTitle" :class="['show', icon1 ]"></span>
    </div>
    <div class="publishTime">发布时间：<span>{{detail.publishTime}}</span></div>
    <div ref="desc" class="desc">
      {{detail.desc || '暂无介绍'}}
    </div>
    <div class="simi">
      <h4 class="title">
        <span>相关MV</span>
        <span @click="show" :class="['show', icon ]"></span>
      </h4>
      <div ref="container" class="container">
        <div @click="toMV(item.id)" v-for="item in simiMvs" :key="item.id" class="item">
          <div class="item-left">
            <img :src="item.cover" alt="">
            <div class="duration">{{item.duration / 1000 | formatTime}}</div>
          </div>
          <div class="item-right">
            <div class="name">{{item.name}}</div>
            <div class="singername">{{item.artistName}}</div>
            <div class="count">
              {{item.playCount | count}}次观看
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { simi } from '@/api/music'
export default {
  props: {
    detail: {
      type: Object,
      default: null
    },
    width: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      simiMvs: [],
      icon: 'el-icon-arrow-down',
      icon1: 'el-icon-arrow-down'
    }
  },
  computed: {
    id () {
      return this.$route.params.id || ''
    }
  },
  watch: {
    isShow: {
      immediate: true,
      handler (val) {
        console.log(val)
        this.$nextTick(() => {
          if (val) {
            this.$refs.container.style.height = '500px'
            this.icon = 'el-icon-arrow-down'
          } else {
            this.$refs.container.style.height = '0px'
            this.icon = 'el-icon-arrow-up'
          }
        })
      }
    },
    id () {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // 相似url
      simi({ mvid: this.id }).then((res) => {
        console.log(res)
        this.simiMvs = res.mvs
      })
    },
    show () {
      if (this.$refs.container.style.height !== '0px') {
        this.$refs.container.style.height = '0px'
        this.icon = 'el-icon-arrow-up'
      } else {
        this.$refs.container.style.height = '500px'
        this.icon = 'el-icon-arrow-down'
      }
    },
    showTitle () {
      const style = document.defaultView.getComputedStyle(this.$refs.desc, null)
      console.log(style.maxHeight)
      if (style.maxHeight === '100px') {
        this.$refs.desc.style.maxHeight = '1000px'
        this.icon1 = 'el-icon-arrow-down'
      } else {
        this.$refs.desc.style.maxHeight = '100px'
        this.icon1 = 'el-icon-arrow-up'
      }
    },
    toMV (id) {
      this.$router.push(`/MvDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.mv-side {
  font-size: 14px;
  margin-top: 40px;
  .title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgb(206, 206, 206);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .publishTime {
    margin-bottom: 10px;
    span {
      color: rgb(165, 165, 165);
      font-size: 12px;
    }
  }
  .desc {
    white-space: pre-wrap;
    line-height: 20px;
    margin-bottom: 15px;
    max-height: 100px;
    overflow: hidden;
  }
  .simi {
    position: relative;
    padding: 0 10px;
    .title {
      margin: 0 -10px;
    }
    .show {
      cursor: pointer;
    }
    .container {
      overflow-y: auto;
      height: 500px;
      margin-top: 20px;
      .item {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        cursor: pointer;
        .item-left {
          position: relative;
          margin-right: 15px;
        }
        img {
          width: 200px;
          display: block;
        }
        .duration {
          position: absolute;
          bottom: 4px;
          right: 4px;
          padding: 4px;
          background-color: rgb(19, 28, 29);
          border-radius: 3px;
          color: #fff;
          font-size: 13px;
        }
        .name {
          padding: 5px 0;
        }
        .singername {
          font-size: 12px;
          color: rgb(165, 165, 165);
          margin-bottom: 5px;
        }
        .count {
          color: rgb(165, 165, 165);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
