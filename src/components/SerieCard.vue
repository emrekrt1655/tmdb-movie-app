<script setup lang="ts">
const props = defineProps(['serie', 'isName']);
</script>

<template>
    <div class="flex w-full">
        <RouterLink class='mr-4' :style="{ height: props.isName ? '400px' : 'auto' }"
            :to="props.serie ? `/serie/${props.serie.name.replace(/ /g, '-')}/${props.serie.id}` : ''">
            <div class="relative flex h-full">
                <img class="h-full" v-if="props.serie && props.serie.poster_path" :src="`${props.serie.poster_path}`"
                    :alt="props.serie.title">
                <p v-else>No backdrop path available for this serie.</p>
            </div>
        </RouterLink>
        <h2 class="title text-xl align-middle" v-if="props.isName"> {{ props.serie?.name }} </h2>
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
