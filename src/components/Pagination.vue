<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{ currentPage: number; totalPages: number }>();
const emit = defineEmits(['page-change']);

const currentPage = ref(props.currentPage);
const totalPages = ref(props.totalPages);

watch(
    () => props.currentPage,
    (newVal) => {
        currentPage.value = newVal;
    }
);

watch(
    () => props.totalPages,
    (newVal) => {
        totalPages.value = newVal;
    }
);

const pageNumbers = computed(() => {
    const maxPageButtons = 5;
    if (totalPages.value <= maxPageButtons) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1);
    } else {
        const halfMaxButtons = Math.floor(maxPageButtons / 2);
        const firstPage = Math.max(1, currentPage.value - halfMaxButtons);
        const lastPage = Math.min(totalPages.value, currentPage.value + halfMaxButtons);

        if (currentPage.value <= halfMaxButtons) {
            return Array.from({ length: maxPageButtons }, (_, i) => i + 1);
        } else if (currentPage.value >= totalPages.value - halfMaxButtons) {
            return Array.from({ length: maxPageButtons }, (_, i) => totalPages.value - maxPageButtons + i + 1);
        } else {
            return Array.from({ length: maxPageButtons }, (_, i) => firstPage + i);
        }
    }
});

const setPage = (value: number) => {
    currentPage.value = value;
    emit('page-change', value);
    router.push({ params: { page: value } });
};
</script>

<template>
    <div class="flex justify-center mt-6 w-3/5 m-auto">
        <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-1 text-white mr-2">Before</button>
        <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="setPage(pageNumber)"
            :class="{ 'bg-red-700': pageNumber === currentPage }" class="px-3 py-1 text-white mr-2">
            {{ pageNumber }}
        </button>
        <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-1 text-white mr-2">Next</button>
    </div>
</template>
