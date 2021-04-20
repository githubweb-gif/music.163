import _ from 'lodash'
export default {
  data () {
    return {
      renderItems: 0,
      // tabel高度
      height: 0,
      // 每行高度
      itemHeight: 48,
      // tabel表格上方区域歌单信息高度
      headHeight: 280,
      // 上下可视区外保留的数量
      remain_count: 3,
      // 可视区外的高度
      remainHeight: 0,
      // 可视区加上可视区外的总高度
      renderItemsHeight: 0,
      // 可视区数据
      renderData: [],
      minItemHeight: -1,
      maxItemHeight: -1
    }
  },
  mounted () {
    // window.requestAnimationFrame = window.webkitRequestAnimationFrame
    this.$nextTick(() => {
      if (this.songs) {
        const element = document.querySelector('#to-top') || document.querySelector('.home')
        element.onscroll = () => {
          this.onVirtualScroll()
        }
      }
    })
  },
  watch: {
    songs: {
      handler (val) {
        if (val) {
          this.legitimateData = this.songs.filter((x) => {
            return x.copyright >= 0
          })
          this.renderData = []
          const renderItems = Math.ceil(this.viewPortHeight / this.itemHeight) + 2 * this.remain_count
          this.renderItems = renderItems
          this.renderItemsHeight = renderItems * this.itemHeight
          this.remainHeight = this.remain_count * this.itemHeight
          if (val && val.length > 0) {
            this.height = val.length * 48 + 'px'
            this.refreshRenderData()
            return
          }
          this.height = 0
        }
      },
      immediate: true,
      deep: true
    },
    renderData (val) {
    }
  },
  methods: {
    rowStyle (record) {
      return {
        transform: `translateY(${record.translateY})`,
        color: record.copyright < 0 ? '#939292' : ''
      }
    },
    buildRenderData (minHeight, maxHeight) {
      const minItemKey = minHeight / this.itemHeight
      const maxItemKey = maxHeight / this.itemHeight
      const startIndex = minItemKey > 0 ? minItemKey : -1
      const endIndex = maxItemKey > this.songs.length ? this.songs.length : maxItemKey
      const renderData = []
      for (let index = startIndex + 1; index < endIndex; index++) {
        const item = this.songs[index]
        const recordIndexHight = `${index * this.itemHeight}`
        item.__vkey = item.id
        item.translateY = `${recordIndexHight}px`
        renderData.push(item)
      }
      return renderData
    },
    buildNewItems (newData) {
      const newItems = []
      for (const newRecord of newData) {
        if (_.findIndex(this.renderData, { __vkey: newRecord.__vkey }) < 0) {
          newItems.push(newRecord)
        }
      }
      return newItems
    },
    buildOutDateItems (newData) {
      const replaceItemsIndex = []
      for (let index = 0; index < this.renderData.length; index++) {
        const record = this.renderData[index]
        if (_.findIndex(newData, { __vkey: record.__vkey }) < 0) {
          replaceItemsIndex.push(index)
        }
      }
      return replaceItemsIndex
    },
    refreshVirtualItems (newItems, replaceItemsIndex) {
      if (newItems.length === this.renderData.length) {
        this.renderData = newItems
        return
      }
      for (let index = 0; index < newItems.length; index++) {
        if (index < replaceItemsIndex.length) {
          this.$set(this.renderData, replaceItemsIndex[index], newItems[index])
          continue
        }
        this.renderData.push(newItems[index])
      }
    },
    updateRenderData (newData) {
      if (this.renderData.length === 0) {
        this.renderData = newData
        return
      }
      const newItems = this.buildNewItems(newData)
      const replaceItemsIndex = this.buildOutDateItems(newData)
      this.refreshVirtualItems(newItems, replaceItemsIndex)
    },
    refreshRenderData () {
      const head = document.querySelector('#to-top') || document.querySelector('.home')
      const scrollTop = (head ? head.scrollTop : 0) - this.headHeight
      const [minItemHeight, maxItemHeight] = this.calDomItemsHeight(this.itemHeight, this.remainHeight, this.viewPortHeight, this.renderItemsHeight, scrollTop)
      console.log(minItemHeight)
      this.updateRenderData(this.buildRenderData(minItemHeight, maxItemHeight))
    },
    onVirtualScroll () {
      window.requestAnimationFrame(this.refreshRenderData)
      //   this.getBodyContainerStyle()
    },
    calDomItemsHeight (itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop) {
      const minHeight = this.calculateDomItemsMinHeight(itemHeight, remainHeight, scrollTop)
      const maxHeight = this.calculateDomItemsMaxHeight(itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop)
      return [
        minHeight,
        maxHeight
      ]
    },
    calculateDomItemsMinHeight (itemHeight, remainHeight, scrollTop) {
      return scrollTop > remainHeight ? Math.floor((scrollTop - remainHeight) / itemHeight) * itemHeight : 0
    },
    calculateDomItemsMaxHeight (itemHeight, remainHeight, viewPortHeight, renderItemsHeight, scrollTop) {
      return scrollTop > remainHeight ? Math.ceil((scrollTop + remainHeight + viewPortHeight) / itemHeight) * itemHeight : renderItemsHeight
    }
  }
}
