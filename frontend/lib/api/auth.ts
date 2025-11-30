import { apiClient } from './client';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from './types';

export const authApi = {
  register: (data: RegisterCredentials) =>
    apiClient.post<AuthResponse>('/register', data),

  login: (data: LoginCredentials) =>
    apiClient.post<AuthResponse>('/login', data),

  logout: (token: string) =>
    apiClient.post<{ message: string }>('/logout', undefined, token),

  me: (token: string) =>
    apiClient.get<{ user: User }>('/me', token),
};
