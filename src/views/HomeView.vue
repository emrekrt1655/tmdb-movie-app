<script setup lang="ts">
import Search from '@/components/Search.vue'
import { useMovieStore } from '@/stores/movie';
import { onMounted } from 'vue';

const movieStore = useMovieStore()

onMounted(async () => {
    await movieStore.initPopularMovies()
})

</script>

<template>
    <Search />
</template>
