export default {
  data () {
    return {
      imgWidth: '16.6%'
    }
  },
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
    this.$bus.$on('search-tab', (value) => {
      if (value === '1004' && this.mvData.length === 0) {
        this.getData()
      }
    })
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
