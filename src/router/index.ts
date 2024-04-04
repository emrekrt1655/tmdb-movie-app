import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/trending',
      name: 'trending',
      component: () => import('../views/TrendingView.vue'),
      props: (route) => ({ active: route.query.active || 'day', page: route.query.page || 1 })
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: () => import('../views/UpcomingView.vue')
    },
    {
      path: '/popular',
      name: 'popular',
      component: () => import('../views/PopularMoviesView.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../views/MovieDetail.vue')
    }
  ]
})

export default router
