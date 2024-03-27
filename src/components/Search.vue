<template>
    <div class="search-movie w-full h-96 mt-6">
        <div class="image-box w-4/5 h-96 m-auto flex flex-col justify-center items-center bg-no-repeat bg-cover grayscale"
            :style="{
                backgroundImage: `url(${baseUrl}${moviePopularStore.popularMoviesInfoList[randomNumber]?.backdrop_path})`
            }">
            <input class="search-input h-16 w-1/2 text-lg" type="text" placeholder="Search..." />
            <p class="movie-info mt-6 text-white font-bold text-lg">
                The Movie in the Picture: <strong class="font-black">{{
                    moviePopularStore.popularMoviesInfoList[randomNumber]?.title
                }} </strong>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMoviePopularStore } from '@/stores/moviePopular'
const moviePopularStore = useMoviePopularStore()
const baseUrl = import.meta.env.VITE_BASE_IMAGE_URL

const randomNumber = Math.floor(Math.random() * 20)
</script>

<style>
.search-input {
    background-color: rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    color: white
}

.search-input::placeholder {
    color: white;
    opacity: 1;
}
</style>
@/stores/moviePopular