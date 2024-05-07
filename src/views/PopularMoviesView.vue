<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useMoviePopularStore } from '@/stores/moviePopular';
import { ref, computed } from 'vue';

const popularStore = useMoviePopularStore();
const filterText = ref('');
const emit = defineEmits(['page-change']);
const props = defineProps(['page'])

const filteredMovies = computed(() => {
    const filterLowerCase = filterText.value.toLowerCase();
    return popularStore.popularMovies.filter(movie => movie.title.toLowerCase().includes(filterLowerCase));
});
const setPage = (value: number) => {
    emit('page-change', value)
}
</script>

<template>
    <div class="w-full h-full mt-6 text-white container mx-auto w-4/5">
        <h1 class="ml-6 mb-6 text-3xl">Popular Movies</h1>
        <div class="ml-6 mb-6">
            <input v-model="filterText" placeholder="Search movies"
                class="text-black border border-gray-300 rounded-md  px-3 py-2">
        </div>
        <div class="ml-6">
            <div class="mb-3 w-3/5" v-for=" (movie, index) in filteredMovies" :key="movie.id">
                <MovieCard :movie="movie" :index="index + 1" :isName="true" class="mb-3" />
                <hr>
            </div>
        </div>
        <div class="flex justify-center mt-6 w-3/5">
            <button @click="setPage(props.page - 1)" :disabled="props.page === 1"
                class="px-3 py-1 text-white mr-2">Before</button>
            <button v-for="pageNumber in 5" :key="pageNumber" @click="setPage(pageNumber)"
                :class="{ 'bg-red-700': pageNumber === props.page }" class="px-3 py-1 text-white mr-2">{{
                    pageNumber }}</button>
            <button @click="setPage(props.page + 1)" :disabled="props.page === 5"
                class="px-3 py-1  text-white mr-2">Next</button>
        </div>
    </div>
</template>