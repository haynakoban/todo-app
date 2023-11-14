'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import moment from 'moment';

interface TodoProps {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export default function TodoForm({ todo }: { todo: TodoProps | undefined }) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title);
  const [errorTitle, setErrorTitle] = useState('');
  const [description, setDescription] = useState(todo?.description);
  const [isCompleted, setIsCompleted] = useState(todo?.isCompleted ? 1 : 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title) {
      setErrorTitle('This field is required');
    } else if (title) {
      setIsLoading(true);

      const currentDate = new Date();
      const formattedDate = moment(currentDate).format(
        'MMMM D, YYYY [at] h:mm:ss A [UTC]Z'
      );

      const data = {
        title,
        description,
        isCompleted: isCompleted === 1,
        createdAt: todo?.createdAt,
        updatedAt: formattedDate,
      };

      try {
        const docRef = doc(db, 'todos', todo?.id || '');
        await updateDoc(docRef, data);
      } catch (error) {
        console.error('Error adding document: ', error);
      } finally {
        setIsLoading(false);

        router.push(`/todos/${todo?.id}`);
        router.refresh();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-900 tracking-wide'>
          Title
        </label>
        <input
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 tracking-wide'
          placeholder='Title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errorTitle && (
          <span className='text-xs text-red-500'>{errorTitle}</span>
        )}
      </div>

      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-900 tracking-wide'>
          Description
        </label>
        <textarea
          rows={4}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 tracking-wide'
          placeholder='Leave a description...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className='mb-6'>
        <label className='block mb-2 text-sm font-medium text-gray-900'>
          Progress
        </label>
        <select
          value={isCompleted}
          onChange={(e) => setIsCompleted(parseInt(e.target.value))}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
        >
          <option value={0}>To Do</option>
          <option value={1}>Completed</option>
        </select>
      </div>

      <button
        disabled={isLoading}
        className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
      >
        {isLoading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
