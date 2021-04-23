<template>
  <div class='singerAblum'>
      <ul>
          <li @click="toAlbum(item.id)" v-for="item in albums" :key="item.id">
              <img v-lazy="`${item.picUrl}?param=130y130`" alt="">
              <p>{{item.name}}</p>
              <span class="title">{{item.publishTime | time}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
import { singerAblum } from '@/api/music'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  filters: {
    time (val) {
      if (val) {
        const date = new Date(val)
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month : month
        // 几日
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        return `${year}-${month}-${d}`
      }
      return ''
    }
  },
  data () {
    return {
      albums: [],
      bol: true,
      offset: 0
    }
  },
  watch: {
    id () {
      this.albums = []
      this.bol = true
      this.offset = 0
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    const singerDetail = document.querySelector('.singerDetail')
    singerDetail.addEventListener('scroll', (e) => {
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
  },
  methods: {
    getData () {
      singerAblum({ id: this.id, limit: 30, offset: this.offset }).then(data => {
        console.log(data)
        if (data.hotAlbums.length === 0) {
          return
        }
        this.albums.push(...data.hotAlbums)
        this.bol = true
      })
    },
    toAlbum (id) {
      this.$router.push(`/albumDetail/${id}`)
    }
  }
}
</script>
<style lang='scss' scoped>
@media only screen and (max-width: 1300px) {
  li {
    width: 14% !important;
  }
}

@media only screen and (max-width: 1000px) {
 li {
    width: 25% !important;
  }
}

@media only screen and (max-width: 700px) {
 li {
    width: 33% !important;
  }
}
ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    li {
        width: 10%;
        margin-bottom: 20px;
        padding-right: 10px;
        img {
            width: 100%;
        }
        p {
            font-size: 13px;
            margin-top: 5px;
        }
        span {
            font-size: 12px;
            color: rgb(143, 143, 143);
        }
    }
}
</style>
