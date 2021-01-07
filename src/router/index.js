import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        hidden: true,
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '发现音乐',
          icon: 'el-icon-user-solid'
        }
      },
      {
        path: '/MV',
        name: 'MV',
        hidden: true,
        component: () => import('@/views/video/index.vue'),
        meta: {
          title: 'MV',
          icon: 'el-icon-s-goods'
        }
      },
      {
        path: '/people',
        name: 'people',
        hidden: true,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '朋友',
          icon: 'el-icon-help'
        }
      },
      {
        path: '/LocalMusic',
        name: 'LocalMusic',
        hidden: true,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '本地音乐',
          class: 'MyMusic',
          icon: 'el-icon-paperclip'
        }
      },
      {
        path: '/DownloadManagement',
        name: 'DownloadManagement',
        hidden: true,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '下载管理',
          class: 'MyMusic',
          icon: 'el-icon-headset'
        }
      },
      {
        path: '/RecentlyPlayed',
        name: 'RecentlyPlayed',
        hidden: true,
        component: () => import('@/views/FM/index.vue'),
        meta: {
          title: '最近播放',
          class: 'MyMusic',
          icon: 'el-icon-headset'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
