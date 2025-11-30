import { apiClient } from './client';
import type { Post, PaginatedResponse, PostFormData } from './types';

export const postsApi = {
  getAll: (page = 1) =>
    apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}`),

  getOne: (id: number) =>
    apiClient.get<Post>(`/posts/${id}`),

  create: (data: PostFormData, token: string) =>
    apiClient.post<{ message: string; post: Post }>('/posts', data, token),

  update: (id: number, data: Partial<PostFormData>, token: string) =>
    apiClient.put<{ message: string; post: Post }>(`/posts/${id}`, data, token),

  delete: (id: number, token: string) =>
    apiClient.delete<{ message: string }>(`/posts/${id}`, token),
};
