<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['page']);
const isHovered = ref(false);
</script>

<template>
    <div class="w-full bg-slate-950">
        <div class="container mx-auto w-4/5">
            <nav class="flex justify-between items-center menu p-2">
                <ul class="flex items-center text-white">
                    <li class="relative">
                        <RouterLink
                            class="text-red-500 bg-white px-4 py-2 rounded-lg hover:text-red-600 hover:bg-gray-200 transition duration-300 ease-in-out"
                            to="/" @mouseover="isHovered = true" @mouseleave="isHovered = false">
                            M
                        </RouterLink>
                        <span v-if="isHovered" class="tooltip">
                            MoviePal
                        </span>
                    </li>
                    <RouterLink class="items-center flex ml-5 cursor-pointer" :to="`/movies/${props.page}`">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>
                        Movies
                    </RouterLink>
                    <RouterLink class="items-center flex ml-5 cursor-pointer" :to="`/series/${props.page}`">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>
                        Series
                    </RouterLink>
                    <RouterLink class="items-center flex ml-5 cursor-pointer" :to="`/animes/${props.page}`">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>
                        Animes
                    </RouterLink>
                </ul>
                <div>
                    <RouterLink
                        class="text-red-500 bg-white px-4 py-2 rounded-lg cursor-pointer hover:text-red-600 hover:bg-gray-200 transition duration-300 ease-in-out"
                        to="/login"> Login
                    </RouterLink>
                </div>
            </nav>
        </div>
    </div>
</template>

<style>
.menu {
    width: 100%;
    margin: auto;
}

.menu li {
    display: flex;
    margin-left: 20px;
    cursor: pointer;
}

.tooltip {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.2rem;
    padding: 0.2rem;
    background-color: #2d3748;
    color: white;
    border-radius: 0.375rem;
    white-space: nowrap;
}
</style>
