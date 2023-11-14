'use client';

import { useRouter } from 'next/navigation';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function DeleteTodo({ id }: { id: string }) {
  const router = useRouter();

  const deleteTodo = async () => {
    try {
      const docRef = doc(db, 'todos', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    } finally {
      router.push(`/todos`);
      router.refresh();
    }
  };

  return (
    <button
      onClick={deleteTodo}
      className='ml-3 text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
    >
      Delete
    </button>
  );
}
