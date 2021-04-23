<template>
  <div class='mv'>
      <video controls :src="url"></video>
  </div>
</template>

<script>
import { mvUrl } from '@/api/music'
export default {
  data () {
    return {
      url: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id || ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
  methods: {
    getData () {
      mvUrl({ id: this.id }).then(res => {
        console.log(res)
        this.url = res.data.url
      })
    }
  }
}
</script>
<style lang='scss' scoped>
video {
    width: 50%;
}
</style>
