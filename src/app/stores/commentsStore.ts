import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios';
import type { CommentApi, Comment } from '@/app/types'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])
  const isLoad = ref<boolean>(false)

  const clear = (): void => {
    comments.value = []
  }

  const fetchCommentById = async (commentsId: number): Promise<Comment> => {
    try {
      isLoad.value = true
      const responses: AxiosResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentsId}.json`)
      const data: CommentApi = await responses.data

      const comment: Comment = {
        id: data.id,
        by: data.by,
        time: data.time,
        child: [],
        comment: data.text
      }

      if (Array.isArray(data.kids) && data.kids.length > 0) {
        comment.child = await Promise.all(
          data.kids.map((childId) => fetchCommentById(childId))
        );
      }
      return Promise.resolve(comment)
    } catch (error) {
      console.error('Ошибка при выполнении запросов:', error);
      throw error;
    } finally {
      isLoad.value = false
    }
  }

  const buildCommentsTree = async (commentsIds: number[]): Promise<void> => {
    clear()
    if (commentsIds) {
      const commentsData = await Promise.all(commentsIds.map(comId => fetchCommentById(comId)))
      comments.value = commentsData
    }
  }

  return { comments, isLoad, clear, buildCommentsTree }
})
