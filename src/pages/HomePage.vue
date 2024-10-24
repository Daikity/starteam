<template>
  <div class="flex justify-center">
    <StoryList :is-load="storiesIsLoad" :stories="stories"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useStoriesStore } from '@/app/stores/storiesStore'
import StoryList from '@/widgets/StoryList.vue';

const storyStore = useStoriesStore()

const storiesIsLoad = computed<boolean>(() => storyStore.isLoadStories)
const stories = computed(() => storyStore.stories.sort((a, b) => b.time - a.time))

onMounted(() => { storyStore.fetchStories(); setInterval(() => storyStore.fetchStories(), 60000) })
</script>

<style>
</style>
