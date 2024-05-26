<template>
    <div v-if="movie" class="movie-details text-white container mx-auto w-4/5 mt-6">
        <h1 class="text-3xl mb-6">{{ movie.title }}</h1>
        <div class="poster container mx-auto w-full mb-6">
            <img :src="`${baseImgUrl}${movie.backdrop_path}`" class="w-full h-full" alt="Movie Poster">
        </div>
        <div class="details flex flex-row">

            <div class="details-left flex flex-col flex-2.5 mt-6">
                <p>
                    {{ movie.overview }}
                </p>
                <h1>
                    Similar Movies
                </h1>
                <div class="w-1/2" v-if="similarMovies && similarMovies.length > 0">
                    <RouterLink v-for="simMov, index in similarMovies" :key="simMov.id"
                        :to="simMov ? `/movie/${simMov.title.replace(/ /g, '-')}/${simMov.id}` : ''" class="block">
                        <div class="border rounded-lg p-4 mb-4 flex items-start">
                            <div class="rounded-full bg-red-700 p-2 mr-4 text-white">{{ index + 1 }}</div>
                            <div>
                                <p class="text-xl">{{ simMov.title }}</p>
                                <p class="text-left">{{ simMov.popularity }}</p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <div v-else>
                    <p>No similar movies found.</p>
                </div>
            </div>
            <div class="details-right flex flex-col flex-1.5 ml-6">
                <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
                <p><strong>Genres:</strong> {{ getGenres(movie.genres) }}</p>
                <p><strong>Runtime:</strong> {{ movie.runtime }} minutes</p>
                <p><strong>Production Companies:</strong> {{ getProductionCompanies(movie.production_companies) }}</p>
                <p><strong>Original Language:</strong> {{ movie.original_language }}</p>
                <p><strong>IMDB ID:</strong> <a :href="'https://www.imdb.com/title/' + movie.imdb_id">{{ movie.imdb_id
                }}</a></p>
                <p><strong>Homepage:</strong> <a :href="movie.homepage">{{ movie.title }} Official Website</a></p>
                <p><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
                <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
            </div>
        </div>

    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

  
<script setup lang="ts">
import type { MovieResponse, PopularMovie } from '@/types/Movie';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
const movie = ref<MovieResponse | null>(null);
const similarMovies = ref<PopularMovie[] | null>(null);
const isLoading = ref(true);
const loadError = ref(false);

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL;

const fetchData = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/movie/${id.value}?language=en-US`;
    const urlSimilar = `${import.meta.env.VITE_BASE_URL}/movie/${id.value}/similar?language=en-US&page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    try {
        const [movieResponse, similarResponse] = await Promise.all([
            fetch(url, options),
            fetch(urlSimilar, options)
        ]);

        if (!movieResponse.ok || !similarResponse.ok) {
            throw new Error('Failed to fetch movie data');
        }

        const [movieData, similarData] = await Promise.all([
            movieResponse.json(),
            similarResponse.json()
        ]);

        movie.value = movieData;
        similarMovies.value = similarData.results.slice(0, 2);
        isLoading.value = false;
    } catch (error) {
        console.error('Error:', error);
        loadError.value = true;
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchData();
});

watch(() => route.params.id, async (newId) => {
    id.value = newId;
    fetchData();
});

function getGenres(genres: { name: string }[]): string {
    return genres.map(genre => genre.name).join(', ');
}

function getProductionCompanies(companies: { name: string }[]): string {
    return companies.map(company => company.name).join(', ');
}
</script>
  
<style scoped>
.movie-details {
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
</style>
  