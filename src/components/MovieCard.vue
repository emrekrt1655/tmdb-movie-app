<script setup lang="ts">
const props = defineProps(['movie', 'trending', 'index', 'isName']);
const baseUrl = import.meta.env.VITE_BASE_IMAGE_URL;
</script>

<template>
    <div class="flex">
        <RouterLink :class="[props.isName ? 'w-2/5' : 'w-3/5', 'movie-card', 'mr-4']"
            :to="props.movie ? `/movie/${props.movie.id}` : ''">
            <div class="flex h-full">
                <span v-if="props.trending" class="index-label">{{ props.index }}</span>
                <img class="h-full" :class="{ 'w-3/4': props.trending }" v-if="props.movie && props.movie.backdrop_path"
                    :src="`${baseUrl}${props.movie.backdrop_path}`" :alt="props.movie.title">
                <p v-else>No backdrop path available for this movie.</p>
            </div>
        </RouterLink>
        <h2 class="title text-xl allign-middle" v-if="props.isName"> {{ props.movie?.title }} </h2>
    </div>
</template>

<style>
.movie-card {
    height: 200px;
}

.title {
    line-height: 200px;
}

.index-label {
    font-size: 200px;
    color: gray;
    margin-right: -30px;
    align-self: center;
    z-index: 999;
}
</style>
