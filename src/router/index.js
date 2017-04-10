import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/MovieList'
import comingSoon from '@/components/comingSoon'
import MovieDetail from '@/components/MovieDetail'
import smallcomment from '@/components/smallcomment'
import actors from '@/components/actors'
import search from '@/components/search'
import searchResult from '@/components/searchResult'

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
      path: '/actors/:id',
      name: 'actors',
      component: actors
    },
    {
      path: '/comingSoon',
      name: 'comingSoon',
      component: comingSoon
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult
    }
  ]
})
