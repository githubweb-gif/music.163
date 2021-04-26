<template>
  <div class="ff">
    <el-carousel
      :autoplay="false"
      :interval="4000"
      :type="card"
      :height="height + 'px'"
    >
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img ref="image" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <scroll @scroll="scroll"></scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll/index.vue'
export default {
  name: 'carrousel',
  components: {
    scroll
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      height: 0,
      card: 'card'
    }
  },
  computed: {},
  watch: {
    images () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scroll()
        }, 100)
      })
    }
  },
  methods: {
    scroll (value) {
      if (this.$refs.image) {
        console.log(this.$refs.image[0].offsetHeight)
        this.height = this.$refs.image[0].offsetHeight
      }
    }
  },
  mounted () {
    if (document.body.offsetWidth <= 700) {
      this.card = ''
    } else {
      this.card = 'card'
    }
    window.addEventListener('resize', () => {
      if (document.body.offsetWidth <= 700) {
        this.card = ''
      } else {
        this.card = 'card'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 700px) {
  .el-carousel__item {
    transform: scale(1) !important;
  }
}
/deep/ .el-carousel__button {
  width: 16px !important;
}
/deep/ .el-carousel__indicator {
  padding: 20px 2px !important;
}
/deep/ .el-carousel__indicators--outside button  {
  background-color: #a9aaac !important;
  opacity: 1 !important;
}
/deep/ .is-active button {
  background-color: #c20c0c !important;
}
img {
  width: 100%;
}
</style>
