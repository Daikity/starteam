import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios';
import type { Story } from '@/app/types'

export const useStoriesStore = defineStore('stories', () => {
  const storyIds = ref<number[]>([])
  const stories = ref<Story[]>([])
  const isLoadStories = ref<boolean>(false)
  const isLoadStoriesId = ref<boolean>(false)
  const isLoadOnceStory = ref<boolean>(false)

  const filterIds = (arr: number[], filter: number[]): number[] => {
    return filter.filter(item => !arr.includes(item));
  }

  const fetchStoriesIds = async (): Promise<number[]> => {
    try {
      isLoadStoriesId.value = true
      const responseTopStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      const ids: number[] = await responseTopStories.data
      return Promise.resolve(filterIds(storyIds.value, ids))
    } catch (error) {
      return Promise.reject(error)
    } finally {
      isLoadStoriesId.value = false
    }
  }

  const fetchStories = async (): Promise<void> => {
    try {
      const newIds: number[] = await fetchStoriesIds()
      storyIds.value.push(...newIds)
      if(newIds.length) {
        isLoadStories.value = true
        const urls = newIds.map(id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const data = responses.map(response => response.data);
        stories.value.push(...data)
      }
    } catch (error) {
      console.error('Ошибка при выполнении запросов:', error);
      throw error;
    } finally {
      isLoadStories.value = false
    }
  }

  const fetchOnceStory = async (id: number): Promise<Story> => {
    try {
      isLoadOnceStory.value = true
      const response: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      const story: Story = response.data
      return Promise.resolve(story)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      isLoadOnceStory.value = false
    }
  }

  return { stories, isLoadStoriesId, isLoadStories, isLoadOnceStory, fetchStories, fetchOnceStory }
})
