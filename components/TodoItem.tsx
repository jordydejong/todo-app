'use client';

import Link from 'next/link';
import { Todo } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string | number, status: 'TODO' | 'IN_PROGRESS' | 'DONE') => Promise<void>;
  onDelete: (id: string | number) => Promise<void>;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const isCompleted = todo.status === 'DONE';

  const handleStatusToggle = () => {
    const newStatus = isCompleted ? 'TODO' : 'DONE';
    onToggle(todo.id, newStatus);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleStatusToggle}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />

      <Link
        href={`/todos/${todo.id}`}
        className="flex-1 group"
      >
        <h3 className={`text-lg font-medium ${
          isCompleted
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        } group-hover:text-blue-600 transition-colors`}>
          {todo.name || 'Untitled'}
        </h3>
        {todo.description && (
          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
        )}
        <div className="flex gap-4 mt-2 text-xs text-gray-500">
          {todo.date && (
            <span>Due: {formatDate(todo.date)}</span>
          )}
          {todo.assignee && (
            <span>Assigned to: {todo.assignee}</span>
          )}
          <span className={`px-2 py-1 rounded-full ${
            todo.status === 'DONE' ? 'bg-green-100 text-green-700' :
            todo.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {todo.status.replace('_', ' ')}
          </span>
        </div>
      </Link>

      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}