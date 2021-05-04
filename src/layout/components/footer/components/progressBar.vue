<template>
  <div @mousedown="jumpbar($event)" class="progress-bar">
    <div ref="bar" class="bar">
      <div :style="{left: percentage + '%'}" ref="radio" @mousedown.stop="change($event)" class="radio"></div>
      <div :style="{width: percentage + '%'}" ref="schedule" class="schedule"></div>
    </div>
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
      drag: false,
      radio: null,
      bar: null
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
    this.radio = this.$refs.radio
    this.bar = this.$refs.bar
  },
  methods: {
    // 点击进度条
    jumpbar (e) {
      const left = e.offsetX
      this.percentage = left / this.bar.offsetWidth * 100
      this.$emit('percentageChange', this.percentage / 100)
    },
    // 拖拽进度条
    change (e) {
      const x = e.clientX - this.radio.offsetLeft
      document.onmousemove = (e) => {
        this.drag = true
        let left = e.clientX - x
        if (left < 0) {
          left = 0
        } else if (left >= this.bar.offsetWidth) {
          left = this.bar.offsetWidth
        }
        this.radio.style.left = left + 'px'
        this.$refs.schedule.style.width = left + 'px'
        this.percentage = left / this.bar.offsetWidth * 100
        // 防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        // 下面时禁止选择文字
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty()
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        this.$emit('percentageChange', this.percentage / 100)
        this.drag = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  padding: 8px 0;
  position: relative;
  .bar {
    width: 100%;
    height: 2px;
    background-color: rgb(201, 201, 201);
    position: relative;
    .radio {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: #fff;
      z-index: 9999;
      border: 1px solid rgb(165, 165, 165);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .radio::after {
      content: "";
      display: block;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background-color: red;
    }
    .schedule {
      height: 100%;
      width: 0;
      background-color: rgb(194, 12, 12);
    }
  }
}
</style>
