import { getApiUrl } from './config';

export interface Todo {
  id: number | string;
  name: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  date: string;
  assignee: string;
  creator: string;
}

class ApiClient {
  private async fetcher<T>(path: string, options?: RequestInit): Promise<T> {
    const url = getApiUrl(path);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', { path, data }); // Debug log
      return data;
    } catch (error) {
      console.error('API Request failed:', { url, error });
      throw error;
    }
  }

  async getTodos(): Promise<Todo[]> {
    return this.fetcher<Todo[]>('/todos');
  }

  async getTodo(id: string): Promise<Todo> {
    return this.fetcher<Todo>(`/todos/${id}`);
  }

  async createTodo(data: Partial<Todo>): Promise<Todo> {
    const payload = {
      name: data.name || 'New Todo',
      description: data.description || '',
      status: data.status || 'TODO',
      date: data.date || new Date().toISOString().split('T')[0],
      assignee: data.assignee || '',
      creator: data.creator || 'User'
    };

    return this.fetcher<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(payload),
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