<template>
  <div class="progress-bar" @click="jumpbar($event)">
    <el-progress
      ref="progress"
      color="#c20c0c"
      :show-text="false"
      :percentage="percentage"
    />
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      percentage: 0,
      // 拖动
      drag: false
    }
  },
  watch: {
    percent (value) {
      if (this.drag) {
        return
      }
      if (value > 100) {
        this.percentage = 100
        return
      }
      this.percentage = value
    }
  },
  mounted () {
    this.createbar()
  },
  methods: {
    createbar () {
      const progressOuter = this.$refs.progress.$el.querySelector(
        '.el-progress-bar__outer'
      )
      const progress = this.$refs.progress.$el.querySelector(
        '.el-progress-bar__inner'
      )
      progress.style.transition = 'none'
      let left = 0
      const bar = document.createElement('div')
      bar.className = 'circular'

      const _this = this

      bar.addEventListener('mousedown', function (e) {
        clearMouse()
        _this.drag = true
        const X = e.clientX - this.offsetLeft

        document.onmousemove = function (e) {
          left = e.clientX - X
          if (left < 0) {
            left = 0
          } else if (left > progressOuter.offsetWidth) {
            left = progressOuter.offsetWidth
          }

          const bizhi = (left / progressOuter.offsetWidth) * 100
          _this.percentage = bizhi

          // 防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty()
        }
      })

      function clearMouse () {
        document.onmouseup = function (e) {
          const bizhi = left / progressOuter.offsetWidth
          _this.drag = false

          _this.$emit('percentageChange', bizhi)

          document.onmousemove = null
          document.onmouseup = null
        }
      }
      progress.appendChild(bar)
    },
    // 点击进度条
    jumpbar (e) {
      const progress = this.$refs.progress.$el
      const { left } = progress.getBoundingClientRect()
      let bizhi = (e.clientX - left) / progress.offsetWidth
      if (bizhi > 1) {
        bizhi = 1
      }
      this.percentage = bizhi * 100
      this.$emit('percentageChange', bizhi)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  padding: 8px 0;
}
</style>
