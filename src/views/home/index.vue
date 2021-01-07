<template>
  <div ref="home" class="home">
    <el-carousel ref="carousel" :interval="4000" type="card" height="100%">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img ref="img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="expand" ref="expand">
      <div class="expandChild" ref="expandChild"></div>
    </div>
    <div class="shrink" ref="shrink">
      <div class="shrinkChild" ref="shrinkChild"></div>
    </div>
  </div>
</template>

<script>
import { banner } from '@/api/music'
export default {
  data () {
    return {
      banners: [],
      imgList: null
    }
  },
  created () {
    this.banner()
  },
  mounted () {
    // 不支持火狐安卓
    // 监听home内容宽高变化
    const resizeObserver = new ResizeObserver(entries => {
      this.changeImgWidth()
    })
    resizeObserver.observe(document.querySelector('.home'))
  },
  watch: {
    imgList () {
      this.$nextTick(() => {
        const carousel = this.$refs.carousel.$el
        carousel.style.height = this.imgList[0].offsetHeight + 'px'
      })
    }
  },
  methods: {
    banner () {
      banner().then((res) => {
        this.banners = res.banners
        this.$nextTick(() => {
          this.imgList = this.$refs.img
        })
      })
    },
    changeImgWidth () {
      if (!this.imgList) {
        return
      }
      this.$nextTick(() => {
        if (!this.$refs.carouse) {
          return
        }
        const carousel = this.$refs.carousel.$el
        carousel.style.height = this.imgList[0].offsetHeight + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px 20px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.el-carousel__item img {
  width: 100%;
}
.expand,
.shrink {
  position: absolute;
  inset: 0px;
  overflow: hidden;
  visibility: hidden;
  width: 100%;
  height: 100%;
}
.expandChild,
.shrinkChild {
  transition: 0s;
  animation: none;
}
</style>
