<template>
  <div class="swiper">
    <el-carousel :type="body <= 750 ? '' : 'card'" :height="body <= 750 ? '200px' : body * 0.12 + 'px'">
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <div
          class="img-item"
          :style="`background: url(${item.imageUrl}) no-repeat center;background-size: cover;`"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carrousel',
  props: {
    images: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      body: null
    }
  },
  computed: {},
  mounted () {
    this.body = document.body.clientWidth
    window.onresize = () => {
      this.body = document.body.clientWidth
    }
  },
  methods: {
    prev () {},
    next () {}
  }
}
</script>

<style lang="scss">
@media only screen and (max-width: 750px) {
  .el-carousel__button {
 display: none;
}
}
.img-item {
  width: 100%;
  height: 100%;
}
</style>
