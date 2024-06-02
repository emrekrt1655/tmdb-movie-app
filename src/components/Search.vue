<template>
    <div class="search-movie w-full h-96 mt-6 relative z-50">
        <div class="image-box w-4/5 h-96 m-auto flex flex-col justify-center items-center bg-no-repeat bg-cover grayscale"
            :style="{
                backgroundImage: `url(${moviePopularStore.popularMovies[randomNumber]?.backdrop_path})`
            }">
            <input v-model="searchInput" @input="handleInput" class="search-input h-16 w-1/2 text-lg" type="text"
                placeholder="Search..." />
            <p class="movie-info mt-6 text-white font-bold text-lg">
                The Movie in the Picture: <strong class="font-black">{{
                    moviePopularStore.popularMoviesInfoList[randomNumber]?.title
                }} </strong>
            </p>
            <ul
                class="search-results mt-2 top-1/2 text-white w-1/2 bg-gray-800 rounded-lg overflow-hidden absolute left-1/2 transform -translate-x-1/2 z-10">
                <li v-for="(movie) in searchInput.trim() ? searchMovieStore.fiveElementsOfList : null" :key="movie.id"
                    class="px-4 py-2 border-b border-gray-700 cursor-pointer">
                    <RouterLink :to="`/movie/${movie.title.replace(/ /g, '-')}/${movie.id}`">
                        <div class="flex">
                            <div>
                                <img class="search-list-image" :src="`${movie.poster_path}`" :alt="`${movie.title}`" />
                            </div>
                            <div class="ml-2">
                                <p>{{ movie.title }}</p>
                                <p class="text-xs">{{ movie.release_date.split('-')[0] }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useMoviePopularStore } from '@/stores/moviePopular'
import { useSearchMovieStore } from '@/stores/search'
import { ref } from 'vue';
const moviePopularStore = useMoviePopularStore()
const searchMovieStore = useSearchMovieStore()
const searchInput = ref('')
const page = ref(1)
const handleInput = () => {
    searchMovieStore.initSearchMovies(searchInput.value, page.value)
};
const randomNumber = Math.floor(Math.random() * 20)
</script>

<style>
.search-input {
    background-color: rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    color: antiquewhite;
    text-shadow: 1px 1px 2px black;
}

.search-input::placeholder {
    color: antiquewhite;
    opacity: 1;
}

.movie-info {
    text-shadow: 1px 1px 2px black;
}

.search-list-image {
    width: 35px;
    height: 50px;
}
</style>
