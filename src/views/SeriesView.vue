<template>
    <div class="w-full h-full mt-6 container mx-auto w-4/5">
        <h1 class="text-white text-3xl mb-6">Series</h1>
        <div class="ml-6 mb-6">
            <select v-model="selectedGenre" class="text-black border border-gray-300 rounded-md px-3 py-2 w-1/5 mr-6">
                <option :value="0">All Genres</option>
                <option v-for="genre in discoverStore.genres" :key="genre.id" :value="genre.id">{{ genre.name }}
                </option>
            </select>
            <select v-model="yearInput" class="text-black border border-gray-300 rounded-md px-3 py-2 w-1/5 mr-6">
                <option :value="0">All Years</option>
                <option v-for="year in discoverStore.yearList" :key="year" :value="year">{{ year }}</option>
            </select>
            <input v-model="searchInput" @input="searchSerie" placeholder="Search TV Series"
                class="text-black border border-gray-300 rounded-md w-1/5  px-3 py-2 mr-6">
            <button @click="resetInputs"
                class="text-black border border-gray-300 rounded-md px-3  py-2 w-1/5 mr-6 bg-white"> Reset </button>
        </div>

        <div class="ml-6 w-full flex flex-row flex-wrap">
            <p class="text-white text-xl font-semibold mt-6"
                v-if="(searchInput.trim() && searchStore.searchSeries.length === 0) || discoverStore.series.length === 0">
                There
                is
                no series!!! </p>
            <div class="mb-3 w-1/5"
                v-for="(serie, index) in searchInput.trim() ? searchStore.searchSeries : discoverStore.series"
                :key="serie.id">
                <SerieCard :serie="serie" class="mb-3" />
            </div>
        </div>
        <Pagination v-if="!searchInput" :currentPage="discoverStore.currentPage" :totalPages="discoverStore.totalPages" />
    </div>
</template>
  
<script setup lang="ts">
import SerieCard from '@/components/SerieCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useSearchStore } from '@/stores/search';
import { useDiscoverStore } from '@/stores/discover';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const searchStore = useSearchStore();
const discoverStore = useDiscoverStore()
const discoverPage = ref<number>(1)
const selectedGenre = ref<number>(0)
const yearPage = ref<number>(1)
const pageSearch = ref<number>(1)
const yearInput = ref<number>(0)
const searchInput = ref('')
const searchSerie = () => {
    searchStore.initSearchSeries(searchInput.value, pageSearch.value)
};

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    discoverPage.value = +newValue || 1
    await discoverStore.discoverSeries(selectedGenre.value, yearInput.value, discoverPage.value);
    router.push({ params: { page: discoverPage.value } });
});

watch(() => router.currentRoute.value.params.page, async (newValue) => {
    yearPage.value = +newValue || 1
    await discoverStore.discoverSeries(selectedGenre.value, yearInput.value, discoverPage.value);
    router.push({ params: { page: yearPage.value } });
});

onMounted(async () => {
    await discoverStore.initGenres('tv');
    await discoverStore.discoverSeries(selectedGenre.value, yearInput.value, discoverPage.value)

});
watch(selectedGenre, async (newValue) => {
    selectedGenre.value = newValue
    await discoverStore.discoverSeries(selectedGenre.value, yearInput.value, discoverPage.value);
});

watch(yearInput, async (newValue) => {
    yearInput.value = newValue
    await discoverStore.discoverSeries(selectedGenre.value, yearInput.value, discoverPage.value);
});

const resetInputs = () => {
    yearInput.value = 0
    selectedGenre.value = 0
    searchInput.value = ""
}

</script>
