<template>
    <div v-if="detailedSerieStore.detailedSerie" class="serie-details text-white container mx-auto w-4/5 mt-6">
        <h1 class="text-3xl mb-6">{{ detailedSerieStore.detailedSerie.name }}</h1>
        <div class="poster container mx-auto w-full mb-6">
            <img :src="`${detailedSerieStore.serieImage}`" class="w-full h-full" alt="Movie Poster">
        </div>
        <div class="details flex flex-row">
            <div class="details-left flex flex-col flex-2.5 mt-4">
                <p>
                    {{ detailedSerieStore.detailedSerie.overview }}
                </p>
                <h1>
                    Seasons
                </h1>
                <section class="seasons-grid" v-if="detailedSerieStore.detailedSerie.seasons.length > 0">
                    <div v-for="(season, index) in detailedSerieStore.detailedSerie.seasons.filter(season => season.name !== 'Specials')"
                        :key="season.id" class="season-card">
                        <div class="border rounded-lg p-4 mb-4 flex items-start">
                            <img :src="`${baseImgUrl}${season.poster_path}`" class="w-[4rem] h-[6rem] mr-5"
                                alt="Movie Poster">
                            <div>
                                <p class="text-xl">{{ season.name }}</p>
                                <p class="text-left">{{ season.air_date }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="details-right flex flex-col flex-1.5 ml-2">
                <p><strong>Status:</strong> <span
                        :class="detailedSerieStore.detailedSerie.status === 'Ended' ? 'text-red-600' : 'text-green-600'">
                        {{ detailedSerieStore.detailedSerie.status }} </span>
                </p>
                <p><strong>Release Date:</strong> {{ detailedSerieStore.detailedSerie.first_air_date }}</p>
                <p><strong>Last Air Date:</strong> {{ detailedSerieStore.detailedSerie.last_air_date }}</p>
                <p><strong>Genres:</strong> {{ getGenres(detailedSerieStore.detailedSerie.genres) }}</p>
                <p><strong>Season:</strong> {{ detailedSerieStore.detailedSerie.number_of_seasons }} seasons</p>
                <p><strong>Episodes:</strong> {{ detailedSerieStore.detailedSerie.number_of_episodes }} episodes</p>
                <p><strong>Production Companies:</strong> {{
                    getProductionCompanies(detailedSerieStore.detailedSerie.production_companies) }}</p>
                <p><strong>Original Language:</strong> {{ detailedSerieStore.detailedSerie.original_language }}</p>
                <p><strong>Vote Average:</strong> {{ detailedSerieStore.detailedSerie.vote_average }}</p>
                <p><strong>Vote Count:</strong> {{ detailedSerieStore.detailedSerie.vote_count }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDetailedSerie } from '@/stores/detailedSerie';
const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL
const route = useRoute();
const id = ref(route.params.id);

const detailedSerieStore = useDetailedSerie();

onMounted(() => {
    detailedSerieStore.fetchDetailedSerie(id.value);
});

watch(() => route.params.id, async (newId) => {
    id.value = newId;
    detailedSerieStore.fetchDetailedSerie(id.value);
});

function getGenres(genres: { name: string }[]): string {
    return genres.map(genre => genre.name).join(', ');
}

function getProductionCompanies(companies: { name: string }[]): string {
    return companies.map(company => company.name).join(', ');
}
</script>
  
<style scoped>
.serie-details {
    display: flex;
    flex-direction: column;
}

.poster {
    margin-right: 20px;
}

.details h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.details p {
    margin-bottom: 5px;
}

.details-right {
    min-width: 300px;
}

.seasons-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.season-card {
    flex: 1 1 calc(40% - 16px);
    box-sizing: border-box;
}
</style>
  