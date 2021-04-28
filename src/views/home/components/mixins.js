export default {
  mounted () {
    const box = this.$refs.box
    const boxWidth = box.offsetWidth
    console.log(boxWidth)
    switch (true) {
      // 0可能是刚渲染宽度为0
      case boxWidth > 990 || boxWidth === 0:
        this.imgWidth = '16.6%'
        break
      case boxWidth <= 990 && boxWidth > 840 :
        this.imgWidth = '20%'
        break
      case boxWidth <= 840 && boxWidth > 690:
        this.imgWidth = '25%'
        break
      case boxWidth <= 690:
        this.imgWidth = '33.3%'
    }
    this.$bus.$on('zoom', (boxWidth) => {
      console.log(boxWidth)
      switch (true) {
        case boxWidth > 990:
          this.imgWidth = '16.6%'
          break
        case boxWidth <= 990 && boxWidth > 840 :
          this.imgWidth = '20%'
          break
        case boxWidth <= 840 && boxWidth > 690:
          this.imgWidth = '25%'
          break
        case boxWidth <= 690:
          this.imgWidth = '33.3%'
      }
    })
    if (!this.noOffset) {
      const homeMain = document.querySelector('.home-main')
      homeMain.addEventListener('scroll', e => {
        if (this.$refs.popover) {
          this.$refs.popover.doClose()
        }
        if (!this.bol) {
          return
        }
        const target = e.target
        if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
          if (this.offset || this.offset === 0) {
            this.offset += 50
          } else if (this.options.offset || this.options.offset === 0) {
            this.options.offset += 50
          }
          this.bol = false
          this.getData(this.cat)
        }
      })
    }
  }
}
