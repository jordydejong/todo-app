import { getApiUrl } from './config';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private async fetcher<T>(path: string, options?: RequestInit): Promise<T> {
    const url = getApiUrl(path);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTodos(): Promise<Todo[]> {
    return this.fetcher<Todo[]>('/todos');
  }

  async getTodo(id: string): Promise<Todo> {
    return this.fetcher<Todo>(`/todos/${id}`);
  }

  async createTodo(data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    return this.fetcher<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTodo(id: string, data: Partial<Todo>): Promise<Todo> {
    return this.fetcher<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return this.fetcher<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();