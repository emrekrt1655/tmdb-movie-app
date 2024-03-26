<template>
    <div class="search-movie w-full h-96 mt-6">
        <div class="image-box w-4/5 h-96 m-auto flex flex-col justify-center items-center bg-no-repeat bg-cover" :style="{
            backgroundImage: `url(${baseUrl}${movieStore.popularMoviesInfoList[randomNumber]?.backdrop_path})`,
            filter: 'grayscale(100%)'
        }">
            <input class="search-input h-16 w-1/2 text-lg rounded-lg" type="text" />
            <p class="movie-info mt-6 text-white font-bold text-lg">
                The Movie in the Picture: {{ movieStore.popularMoviesInfoList[randomNumber]?.title }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
const movieStore = useMovieStore()
const baseUrl = import.meta.env.VITE_BASE_IMAGE_URL
console.log(baseUrl)
const randomNumber = Math.floor(Math.random() * 20)
</script>

<style></style>
