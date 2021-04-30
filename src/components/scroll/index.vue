<template>
  <div ref="scroll" class="scroll">
    <div ref="expand" class="expand">
      <div ref="expandChild" class="expand-child"></div>
    </div>
    <div ref="shrink" class="shrink">
      <div ref="shrinkChild" class="shrink-child"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maxWidth: 0,
      width: 0
    }
  },
  created () {
  },
  watch: {
    $route () {
      this.resize()
    }
  },
  methods: {
    // 监听滚动
    onScroll () {
      const expand = this.$refs.expand
      const shrink = this.$refs.shrink
      expand.scrollLeft = this.maxWidth * 1000
      shrink.scrollLeft = this.maxWidth * 1000
      this.width = this.$refs.scroll.offsetWidth
      this.$emit('scroll', this.width)
    },
    resize () {
      this.width = this.$refs.scroll.offsetWidth
      this.$emit('scroll', this.width)
      const expand = this.$refs.expand
      const shrink = this.$refs.shrink
      const expandChild = this.$refs.expandChild
      const shrinkChild = this.$refs.shrinkChild
      this.maxWidth = expand.offsetWidth * 1000
      expandChild.style.width = this.maxWidth + 'px'
      expandChild.style.height = '10px'
      shrinkChild.style.height = '10px'
      expand.scrollLeft = this.maxWidth
      shrink.scrollLeft = this.maxWidth
      expand.addEventListener('scroll', this.onScroll)
      shrink.addEventListener('scroll', this.onScroll)
    }
  },
  mounted () {
    this.resize()
  }
}
</script>

<style lang="scss" scoped>
.scroll {
    width: 100%;
}
.expand,
.shrink {
  position: absolute !important;
  width: 100%;
  height: 10px;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 0 !important;
  overflow: auto;
}
.shrink {
  top: 10px;
}
.shrink-child {
  width: 250%;
  height: 250%;
}
</style>
