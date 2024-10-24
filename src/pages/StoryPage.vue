<template>
  <div class="flex justify-center">
    <Loading text="Load..." v-if="isLoad && !dataNews" />
    <div v-else class="flex flex-col items-center w-full">
      <LinkPreview :url="dataNews.url" v-if="dataNews" :canOpenLink="false">
        <template v-slot:loader>
          <div />
        </template>
        <template v-slot:default="preview">
          <div class="story">
            <div class="story__container">
              <img v-if="preview.img" :src="preview.img">
              <div class="story__container__info">
                <div class="space-y-2">
                  <a 
                    target="_blank" 
                    :href="'https://'+preview.domain" 
                    class="inline-block text-2xl font-semibold sm:text-3xl">{{ preview.title }}</a>
                </div>
                <div class="dark:text-gray-800">
                  <p>{{ preview.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </LinkPreview>
      <div v-if="dataNews" class="flex flex-col gap-3 pb-3 w-[80%]">
        <div>
          <UserName v-if="dataNews.by" :userName="dataNews?.by" />
          <DateCreate :date-time="dataNews.time * 1000" />
        </div>
        <h2 v-html="dataNews?.title" />
        <div v-html="dataNews?.text"/>
      </div>
      <div class="flex flex-col gap-5 w-full">
        <Comment 
          v-for="comm in commentsData" 
          :key="comm.id" :kids="comm.child" 
          :userName="comm.by" :datePublic="comm.time * 1000" 
          :message="comm.comment" 
        />
      </div>
    </div>
  </div>
  <!-- {{ commentsData }} -->
</template>

<script lang="ts" setup>
import { useStoriesStore } from '@/app/stores/storiesStore'
import { useCommentsStore } from '@/app/stores/commentsStore'
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { type Comment as CommentsType, type Story } from '@/app/types';
import { UserName, DateCreate, Loading } from '@/shared'
import Comment from '@/widgets/Comment.vue'
// @ts-ignore
import LinkPreview from "@ashwamegh/vue-link-preview";
const route = useRoute()

const storiesStore = useStoriesStore()
const commentsStore = useCommentsStore()



const dataNews = ref<Story>()
const isLoad = computed<boolean>(() => storiesStore.isLoadOnceStory)
const commentsData = computed<CommentsType[]>(() => commentsStore.comments)

onMounted(async () => {
  commentsStore.clear()
  const storyFromStore = storiesStore.stories.find((el) => el.id === Number(route.params.id))
  if (storyFromStore) {
    dataNews.value = storyFromStore
    commentsStore.buildCommentsTree(storyFromStore.kids)
  } else { 
    dataNews.value = await storiesStore.fetchOnceStory(Number(route.params.id))
    commentsStore.buildCommentsTree(dataNews.value.kids)
  }
})
</script>

<style lang="scss" scoped>
.story {
  @apply p-5 mx-auto sm:p-10 md:p-16  dark:text-gray-800;
  &__container {
    @apply flex flex-col max-w-3xl mx-auto overflow-hidden rounded;
    img {
      @apply w-full h-60 sm:h-96 dark:bg-gray-500;
    }
    &__info {
      @apply p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50;
    }
  }
}
</style>
