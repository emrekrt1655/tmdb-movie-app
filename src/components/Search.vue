<template>
    <div class="search-movie w-full h-96 mt-6">
        <div class="image-box w-4/5 h-96 m-auto flex flex-col justify-center items-center bg-no-repeat bg-cover grayscale"
            :style="{
                backgroundImage: `url(${baseUrl}${moviePopularStore.popularMoviesInfoList[randomNumber]?.backdrop_path})`
            }">
            <input v-model="searchMovieStore.searchInput" @input="handleInput" class="search-input h-16 w-1/2 text-lg"
                type="text" placeholder="Search..." />
            <p class="movie-info mt-6 text-white font-bold text-lg">
                The Movie in the Picture: <strong class="font-black">{{
                    moviePopularStore.popularMoviesInfoList[randomNumber]?.title
                }} </strong>
            </p>
            <ul class="search-results mt-6 text-white w-1/2 bg-gray-800 rounded-lg overflow-hidden">
                <li v-for="(movie, index) in searchMovieStore.fiveElementsOfList" :key="movie.id"
                    class="px-4 py-2 border-b border-gray-700 cursor-pointer">
                    <RouterLink :to="`/movie/${movie.id}`"> {{ index + 1 }}. {{ movie.name }} </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMoviePopularStore } from '@/stores/moviePopular'
import { useSearchMovieStore } from '@/stores/search'
const moviePopularStore = useMoviePopularStore()
const searchMovieStore = useSearchMovieStore()
const baseUrl = import.meta.env.VITE_BASE_IMAGE_URL
const handleInput = () => {
    searchMovieStore.initSearchMovies()
};

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
