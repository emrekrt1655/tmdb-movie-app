<template>
    <div v-if="movie" class="movie-details text-white">
        <div class="poster">
            <img :src="`${baseImgUrl}${movie.backdrop_path}`" alt="Movie Poster">
        </div>
        <div class="details">
            <h1>{{ movie.title }}</h1>
            <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
            <p><strong>Genres:</strong> {{ getGenres(movie.genres) }}</p>
            <p><strong>Overview:</strong> {{ movie.overview }}</p>
            <p><strong>Runtime:</strong> {{ movie.runtime }} minutes</p>
            <p><strong>Production Companies:</strong> {{ getProductionCompanies(movie.production_companies) }}</p>
            <p><strong>Original Language:</strong> {{ movie.original_language }}</p>
            <p><strong>IMDB ID:</strong> <a :href="'https://www.imdb.com/title/' + movie.imdb_id">{{ movie.imdb_id }}</a>
            </p>
            <p><strong>Homepage:</strong> <a :href="movie.homepage">{{ movie.title }} Official Website</a></p>
            <p><strong>Vote Average:</strong> {{ movie.vote_average }}</p>
            <p><strong>Vote Count:</strong> {{ movie.vote_count }}</p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>
  
<script setup lang="ts">
import type { MovieResponse } from '@/types/Movie';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.id);
const movie = ref<MovieResponse | null>(null);

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL;


onMounted(() => {
    const url = `${import.meta.env.VITE_BASE_URL}/movie/${id.value}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => movie.value = json)
        .catch(err => console.error('error:' + err));
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
}

.poster {
    margin-right: 20px;
}

.poster img {
    width: 200px;
    height: auto;
}

.details {
    flex: 1;
}

.details h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.details p {
    margin-bottom: 5px;
}
</style>
  