export default {
  computed: {
    main () {
      return this.$store.state.user.resize
    }
  },
  watch: {
    main: {
      handler (val) {
        if (!val) {
          return
        }
        const boxWidth = this.main.offsetWidth
        this.resize(boxWidth)
      },
      immediate: true
    }
  },
  mounted () {
    this.$bus.$on('zoom', (boxWidth) => {
      this.resize(boxWidth)
    })
    if (!this.noOffset) {
      const homeMain = document.querySelector('.home-main')
      console.log(homeMain)
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
  },
  methods: {
    resize (boxWidth) {
      switch (true) {
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
    }
  }
}
