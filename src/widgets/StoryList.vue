<template>
  <div class="flex flex-col p-5 gap-3 max-w-[900px] items-center">
    <Loading text="Load news..." v-if="isLoad && !stories.length" />
    <h2 v-else-if="!stories.length">No data</h2>
    <div v-else>
      <div class="story__container">
        <div 
          v-for="story in paginateStories" 
          :key="story.id"
          @click="moveToNewsPage(story.id)"
          class="story__container__card">
          <div class="flex flex-col gap-2">
            <h2 class="mb-1 text-xl font-semibold">{{ story.title }}</h2>
            <UserName showIcon :user-name="story.by" />
            <DateCreate showIcon :date-time="story.time * 1000" />
          </div>
          <div class="flex flex-wrap justify-between">
            <CommentsCounter :comments="story.kids?.length" />
            <Likes :likes="story.score" @on-click-like="console.log('like')" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import type { Story } from '@/app/types';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { DateCreate, UserName, Likes, CommentsCounter, Loading } from '@/shared'

type Props = {
  isLoad: boolean
  stories: Story[]
}
const { stories, isLoad } = defineProps<Props>()
const router = useRouter()
const maxItems = ref<number>(100)
const currentPage = ref<number>(1)

const countPages = computed<number>(() =>  stories.length > maxItems.value ? Math.ceil(stories.length / maxItems.value) : 1)

const paginateBtn = computed<number[]>(() => {
  const result: number[] = []
  for (let i = 0; i < countPages.value; i++) {
    result.push(i + 1)
  }
  return result
})

const paginateStories = computed(() => {
  const start = (currentPage.value - 1) * (maxItems.value || 1)
  const end = start + (maxItems.value || 1)
  return stories.slice(start, end)
})

const moveToNewsPage = (id: number): void => {
  router.push('story/' + id)
}

watch(maxItems, () => currentPage.value = 1)
</script>

<style lang="scss" scoped>
.story__container {
  @apply flex gap-6 flex-wrap items-stretch w-full justify-center;
  &__card {
    @apply flex flex-col p-2 pb-1 min-h-[250px] w-[250px] justify-between;
    @apply  space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800;
  }
}
</style>
