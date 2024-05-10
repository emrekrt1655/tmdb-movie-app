<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Popular Movies</h1>
        <div class="ml-6 mb-6">
            <input v-model="filterText" placeholder="Search movies"
                class="text-black border border-gray-300 rounded-md  px-3 py-2">
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for="(movie, index) in filteredMovies" :key="movie.id">
                <MovieCard :movie="movie" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>
        </div>
        <div class="flex justify-center mt-6 w-3/5">
            <button @click="setPage(popularStore.currentPage - 1)" :disabled="popularStore.currentPage === 1"
                class="px-3 py-1 text-white mr-2">Before</button>
            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="setPage(pageNumber)"
                :class="{ 'bg-red-700': pageNumber === popularStore.currentPage }" class="px-3 py-1 text-white mr-2">{{
                    pageNumber }}</button>
            <button @click="setPage(popularStore.currentPage + 1)"
                :disabled="popularStore.currentPage === popularStore.totalPages"
                class="px-3 py-1  text-white mr-2">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useMoviePopularStore } from '@/stores/moviePopular';
import { ref, computed } from 'vue';
const popularStore = useMoviePopularStore();
const filterText = ref('');
const emit = defineEmits(['page-change']);

const filteredMovies = computed(() => {
    const filterLowerCase = filterText.value.toLowerCase();
    return popularStore.popularMovies.filter(movie => movie.title.toLowerCase().includes(filterLowerCase));
});

const setPage = (value: number) => {
    emit('page-change', value)
}

const pageNumbers = computed(() => {
    const currentPage = popularStore.currentPage;
    const totalPages = popularStore.totalPages;
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        const halfMaxButtons = Math.floor(maxPageButtons / 2);
        const firstPage = Math.max(1, currentPage - halfMaxButtons);
        const lastPage = Math.min(totalPages, currentPage + halfMaxButtons);
        console.log(halfMaxButtons, firstPage, lastPage)
        if (currentPage <= halfMaxButtons) {
            console.log(1)
            return Array.from({ length: maxPageButtons }, (_, i) => i + 1);
        } else if (currentPage >= totalPages - halfMaxButtons) {
            console.log(2)
            return Array.from({ length: maxPageButtons }, (_, i) => totalPages - maxPageButtons + i + 1);
        } else {
            console.log(3)
            return Array.from({ length: maxPageButtons }, (_, i) => firstPage + i);
        }
    }
});
</script>
