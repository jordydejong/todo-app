'use client';

import { useState } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTodoAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Todo List</h1>
          <p className="text-gray-600 mt-2">Keep track of your tasks</p>
        </header>

        <AddTodo onAdd={handleTodoAdded} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TodoList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}