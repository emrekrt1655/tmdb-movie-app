import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import('../views/TrendingView.vue'),
      props: (route) => ({ active: route.query.active || 'day' })
    },
    {
      path: '/upcoming/:page',
      name: 'upcoming',
      component: () => import('../views/UpcomingView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    },
    {
      path: '/popular/:page',
      name: 'popular',
      component: () => import('../views/PopularMoviesView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    },
    {
      path: '/movie/:title/:id',
      name: 'movie-detail',
      component: () => import('../views/MovieDetail.vue')
    },
    {
      path: '/serie/:title/:id',
      name: 'serie-detail',
      component: () => import('../views/SerieDetail.vue')
    },
    {
      path: '/movies/:page',
      name: 'movies',
      component: () => import('../views/MoviesView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    },
    {
      path: '/animes/:page',
      name: 'animes',
      component: () => import('../views/AnimeView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    },
    {
      path: '/series/:page',
      name: 'series',
      component: () => import('../views/SeriesView.vue'),
      props: (route) => ({ page: route.query.page || 1 })
    }
  ]
})

export default router
