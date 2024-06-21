<script setup lang="ts">
const props = defineProps(['movie', 'trending', 'index', 'isName']);
</script>

<template>
    <div class="flex">
        <RouterLink class='mr-4' :class="{ 'w-full': !props.isName }" :style="{ height: props.isName ? '400px' : 'auto' }"
            :to="props.movie ? `/movie/${props.movie.title.replace(/ /g, '-')}/${props.movie.id}` : ''">
            <div class="relative flex h-full">
                <span v-if="props.trending" class="index-label">{{ props.index }}</span>
                <img class="h-full" :class="props.trending ? 'w-3/4' : props.isName ? '' : 'w-full'"
                    v-if="props.movie && props.movie.poster_path" :src="`${props.movie.poster_path}`"
                    :alt="props.movie.title">
                <p v-else>No backdrop path available for this movie.</p>
            </div>
        </RouterLink>
        <h2 class="title text-xl align-middle" v-if="props.isName"> {{ props.movie?.title }} </h2>
    </div>
</template>

<style>
.title {
    line-height: 400px;
    margin-left: 10px;
}

.index-label {
    font-size: 200px;
    color: gray;
    margin-right: -30px;
    align-self: center;
    z-index: 999;
}
</style>
