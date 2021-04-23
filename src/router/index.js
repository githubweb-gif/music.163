import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        hidden: false,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '发现音乐',
          icon: 'el-icon-user-solid',
          keepAlive: true
        }
      },
      {
        path: 'MV',
        name: 'MV',
        hidden: false,
        component: () => import('@/views/video/index.vue'),
        meta: {
          title: 'MV',
          icon: 'el-icon-s-goods'
        }
      },
      {
        path: 'LocalMusic',
        name: 'LocalMusic',
        hidden: false,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '本地音乐',
          class: 'MyMusic',
          icon: 'el-icon-paperclip'
        }
      },
      {
        path: 'DownloadManagement',
        name: 'DownloadManagement',
        hidden: false,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '下载管理',
          class: 'MyMusic',
          icon: 'el-icon-headset'
        }
      },
      {
        path: 'RecentlyPlayed',
        name: 'RecentlyPlayed',
        hidden: false,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '最近播放',
          class: 'MyMusic',
          icon: 'el-icon-headset'
        }
      },
      {
        path: 'songListDetail/:id',
        name: 'songListDetail',
        hidden: true,
        component: () => import('@/components/songlist/index.vue'),
        meta: {
          title: '歌单详细内容'
        }
      },
      {
        path: 'albumDetail/:id',
        name: 'albumDetail',
        hidden: true,
        component: () => import('@/components/album/index.vue'),
        meta: {
          title: '专辑详细内容'
        }
      },
      {
        path: 'singerDetail/:id',
        name: 'singerDetail',
        hidden: true,
        component: () => import('@/components/singerDetail/index.vue'),
        meta: {
          title: '歌手详细内容'
        }
      }
    ]
  },
  {
    path: '/MV/:id',
    name: 'MV',
    hidden: true,
    component: () => import('@/components/MV/index.vue'),
    meta: {
      title: 'MV'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
