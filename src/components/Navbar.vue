<script setup lang="ts">
const props = defineProps(['page'])
</script>

<template>
    <div class="w-full  bg-slate-950">
        <container class="container mx-auto w-4/5 ">
            <nav class="flex justify-between items-center menu p-2">
                <ul class="flex items-center text-white">
                    <RouterLink
                        class="text-red-500 bg-white px-4 py-2 rounded-lg hover:text-red-600 hover:bg-gray-200 transition duration-300 ease-in-out"
                        to="/">F</RouterLink>
                    <RouterLink class="items-center flex ml-5 cursor-pointer " :to="`/movies/
                    ${props.page}`">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>
                        Movies
                    </RouterLink>
                    <li class="items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>
                        Series
                    </li>
                    <li class="items-center"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                            class="w-4 h-4 mr-2">
                            <path fill="#fff"
                                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                        </svg>Animes</li>
                </ul>
                <div>
                    <RouterLink
                        class="text-red-500 bg-white px-4 py-2 rounded-lg cursor-pointer hover:text-red-600 hover:bg-gray-200 transition duration-300 ease-in-out"
                        to="/login"> Login
                    </RouterLink>
                </div>
            </nav>
        </container>
    </div>
</template>

<style>
.menu {
    width: 80%;
    margin: auto;


}

.menu li {
    display: flex;
    margin-left: 20px;
    cursor: pointer;

}
</style>
