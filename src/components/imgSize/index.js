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
      const detail = document.querySelector('.detail')
      if (!detail) {
        return
      }
      detail.addEventListener('scroll', (e) => {
        if (!this.bol) {
          return
        }
        const target = e.target
        if (Math.ceil(target.scrollTop + target.clientHeight) >= target.scrollHeight) {
          this.offset += 30
          this.bol = false
          this.getData()
        }
      })
    }
  },
  methods: {
    resize (boxWidth) {
      switch (true) {
        case boxWidth > 998:
          this.imgWidth = '12.5%'
          break
        case boxWidth <= 998 && boxWidth > 840 :
          this.imgWidth = '14.2%'
          break
        case boxWidth <= 856 && boxWidth > 714:
          this.imgWidth = '16.6%'
          break
        case boxWidth <= 714 && boxWidth > 572:
          this.imgWidth = '20%'
          break
        case boxWidth <= 572 && boxWidth > 430:
          this.imgWidth = '25%'
          break
        case boxWidth <= 430:
          this.imgWidth = '33.3%'
      }
    }
  }
}
