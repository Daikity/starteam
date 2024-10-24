<template>
  <div class="w-full flex flex-col gap-3 items-center">
    <div class="comment-container">
      <div class="flex justify-between p-4">
        <div class="flex space-x-4">
          <div class="flex gap-2">
            <UserName v-if="userName" :user-name="userName" showIcon /> | 
            <DateCreate v-if="datePublic" :date-time="datePublic" showTime />
          </div>
        </div>
      </div>
      <div class="p-4 space-y-2 flex flex-col gap-4 text-sm dark:text-gray-600">
        <ExpandableText :text="message" />
        <div 
          class="font-bold pt-6 cursor-pointer uppercase text-gray-500 hover:text-gray-300" 
          v-if="kids && kids.length > 0" @click="openAnswer = !openAnswer"
        >{{openAnswer ? 'Hide answers' : 'Show answers'}}</div>
      </div>
    </div>
    <Comment 
      class="w-[90%] flex flex-col gap-3 items-end"
      v-if="kids && kids.length > 0 && openAnswer" 
      v-for="kid in kids"  
      :userName="kid.by" 
      :kids="kid.child" 
      :datePublic="kid.time * 1000" 
      :message="kid.comment"
    />
    <div class="flex flex-col items-end w-[80%]">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DateCreate, UserName } from '@/shared'
import Comment from '@/widgets/Comment.vue'
import ExpandableText from '@/shared/UI/ExpandableText.vue'
import { type Comment as CommentsType } from '@/app/types';
import { ref } from 'vue';

interface Props {
  userName?: string, 
  datePublic?: number, 
  message?: string, 
  kids?: CommentsType[]
}

const { 
  userName, 
  datePublic, 
  message,
  kids
} = defineProps<Props>()

const openAnswer = ref<boolean>(false)
const showMore = ref<boolean>(false)
</script>

<style lang="scss">
  .comment-container {
    @apply bg-gray-50 flex flex-col w-[80%] p-3 rounded-lg divide-y dark:divide-gray-300 dark:text-gray-800;
  }
</style>
