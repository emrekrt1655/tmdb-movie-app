<template>
    <div class="w-full mt-6 ">
        <div class="w-4/5 m-auto">
            <div class="text-white text-2xl flex justify-between">

                <h5 class="mb-6"> {{ props.title }} </h5>
                <RouterLink class="underline" to="#">All</RouterLink>
            </div>
            <div class="movie-list flex ">
                <MovieCard v-for="(movie, index) in trendingList" :movie="movie" :trending="props.trending" :key="movie.id"
                    :index="index + 1" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'trendingList', 'trending'])
import MovieCard from "@/components/MovieCard.vue"
</script>