import TodoDetails from '@/components/TodoDetails';

export default function TodoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todo Details</h1>
        </header>

        <TodoDetails id={params.id} />
      </div>
    </div>
  );
}