<template>
    <div class="w-full h-full mt-6 container mx-auto w-4/5">
        <h1 class="text-white text-3xl mb-6">Animes</h1>
        <div class="ml-6 mb-6">
            <select v-model="yearInput" class="text-black border border-gray-300 rounded-md px-3 py-2 w-1/5 mr-6">
                <option :value="0">All Years</option>
                <option v-for="year in discoverMovie.yearList" :key="year" :value="year">{{ year }}</option>
            </select>
            <input v-model="searchInput" @input="searchMovie" placeholder="Search movies"
                class="text-black border border-gray-300 rounded-md w-1/5  px-3 py-2 mr-6">
            <button @click="resetInputs"
                class="text-black border border-gray-300 rounded-md px-3  py-2 w-1/5 mr-6 bg-white"> Reset </button>
        </div>

        <div class="ml-6 w-full flex flex-row flex-wrap">
            <p class="text-white text-xl font-semibold mt-6"
                v-if="(searchInput.trim() && searchMovieStore.searchAnimeMovies.length === 0) || discoverMovie.movies.length === 0">
                There
                is
                no movies!!! </p>
            <div class="mb-3 w-1/5"
                v-for="(movie, index) in searchInput.trim() ? searchMovieStore.searchAnimeMovies : discoverMovie.movies"
                :key="movie.id">
                <MovieCard :isMovies="true" :movie="movie" :index="index + 1" class="mb-3" />
            </div>
        </div>
        <Pagination v-if="!searchInput && discoverMovie.movies.length !== 0" :currentPage="discoverMovie.currentPage"
            :totalPages="discoverMovie.totalPages" />
    </div>
</template>
  
<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useSearchMovieStore } from '@/stores/search';
import { useDiscoverMovieStore } from '@/stores/discoverMovie';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const searchMovieStore = useSearchMovieStore();
const discoverMovie = useDiscoverMovieStore()
const discoverPage = ref<number>(1)
const selectedGenre = ref<number>(16)
const pageSearch = ref<number>(1)
const yearInput = ref<number>(0)
const searchInput = ref('')
const searchMovie = () => {
    searchMovieStore.initSearchMovies(searchInput.value, pageSearch.value)
};

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    discoverPage.value = +newValue || 1
    await discoverMovie.discoverMovies(selectedGenre.value, yearInput.value, discoverPage.value);
    router.push({ params: { page: discoverPage.value } });
});

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    discoverPage.value = +newValue || 1
    await discoverMovie.discoverMovies(selectedGenre.value, yearInput.value, discoverPage.value);
    router.push({ params: { page: discoverPage.value } });
});

onMounted(async () => {
    await discoverMovie.discoverMovies(selectedGenre.value, yearInput.value, discoverPage.value)
});

watch(yearInput, async (newValue) => {
    yearInput.value = newValue
    await discoverMovie.discoverMovies(selectedGenre.value, yearInput.value, discoverPage.value);
});

const resetInputs = () => {
    yearInput.value = 0
    searchInput.value = ""
}
</script>
  