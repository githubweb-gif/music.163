<template>
  <div class="volume">
    <div ref="bar" class="bar">
      <div :style="{left: percentage * 100 + '%'}" ref="radio" @mousedown="change($event)" class="radio"></div>
      <div :style="{width: percentage * 100 + '%'}" ref="schedule" class="schedule"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: null,
      bar: null,
      // 音量比例
      percentage: 0.5
    }
  },
  watch: {
    percentage (val) {
      this.$emit('volume', val)
    }
  },
  mounted () {
    this.radio = this.$refs.radio
    this.bar = this.$refs.bar
    this.$emit('volume', this.percentage)
  },
  methods: {
    // 拖拽进度条
    change (e) {
      const x = e.clientX - this.radio.offsetLeft
      document.onmousemove = (e) => {
        let left = e.clientX - x
        if (left < 0) {
          left = 0
        } else if (left >= this.bar.offsetWidth) {
          left = this.bar.offsetWidth
        }
        this.radio.style.left = left + 'px'
        this.$refs.schedule.style.width = left + 'px'
        this.percentage = (left / this.bar.offsetWidth)
        // 防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        // 下面时禁止选择文字
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty()
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.schedule {
  height: 100%;
  width: 0;
  background-color: red;
}
.bar {
  width: 200px;
  height: 4px;
  z-index: 1000;
  position: relative;
}
.radio {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1000;
  border: 1px solid rgb(165, 165, 165);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.radio::after {
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: red;
}
</style>
