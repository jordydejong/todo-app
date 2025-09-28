'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, Todo } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/utils';

interface TodoDetailsProps {
  id: string;
}

export default function TodoDetails({ id }: TodoDetailsProps) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAssignee, setEditAssignee] = useState('');
  const [editStatus, setEditStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const data = await api.getTodo(id);
      setTodo(data);
      setEditName(data.name);
      setEditDescription(data.description);
      setEditAssignee(data.assignee);
      setEditStatus(data.status);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todo');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    if (!todo) return;

    try {
      const updated = await api.updateTodo(id, { status: newStatus });
      setTodo(updated);
      setEditStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleSave = async () => {
    if (!todo || !editName.trim()) return;

    try {
      const updated = await api.updateTodo(id, {
        name: editName.trim(),
        description: editDescription.trim(),
        assignee: editAssignee.trim(),
        status: editStatus
      });
      setTodo(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      await api.deleteTodo(id);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !todo) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
        <Link
          href="/"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to List
        </Link>
      </div>
    );
  }

  if (!todo) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="text-2xl font-bold w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">{todo.name}</h1>
          )}
        </div>

        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ✕
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-3 text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={todo.status === 'DONE'}
              onChange={(e) => handleStatusChange(e.target.checked ? 'DONE' : 'TODO')}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className={todo.status === 'DONE' ? 'text-green-600' : 'text-gray-500'}>
              {todo.status === 'DONE' ? 'Completed' : todo.status === 'IN_PROGRESS' ? 'In Progress' : 'To Do'}
            </span>
          </label>
        </div>

        {todo.date && (
          <div>
            <span className="font-semibold">Due Date:</span>{' '}
            {formatDate(todo.date)}
          </div>
        )}

        {todo.assignee && (
          <div>
            <span className="font-semibold">Assigned to:</span>{' '}
            {todo.assignee}
          </div>
        )}

        {todo.creator && (
          <div>
            <span className="font-semibold">Created by:</span>{' '}
            {todo.creator}
          </div>
        )}

        <div>
          <span className="font-semibold">ID:</span>{' '}
          <code className="px-2 py-1 bg-gray-100 rounded text-sm">{todo.id}</code>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditName(todo.name);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to List
            </Link>
          </>
        )}
      </div>
    </div>
  );
}