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
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../views/MovieDetail.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue')
    }
  ]
})

export default router
