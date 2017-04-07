import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/MovieList'
import MovieDetail from '@/components/MovieDetail'
import smallcomment from '@/components/smallcomment'
import allcomment from '@/components/allcomment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/movie/:id',
      name: 'MovieDetail',
      component: MovieDetail
    },
    {
      path: '/smallComment/:id',
      name: 'smallComment',
      component: smallcomment
    },
    {
      path: '/allComment/:id',
      name: 'allComment',
      component: allcomment
    }
  ]
})
