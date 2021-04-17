<template>
  <div v-show="visible" class="dialog">
    <span :class="icon" />
    <p>
      {{ visible }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {
    visible (val) {
      if (val) {
        setTimeout(() => {
          this.$emit('update:visible', '')
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 250px;
  height: 170px;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343434;
  color: #a5a5a5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
    margin-bottom: 4%;
  }
  p {
      width: 120px;
    text-align: center;
    line-height: 20px;
  }
}
</style>
