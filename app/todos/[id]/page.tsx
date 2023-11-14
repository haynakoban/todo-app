import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Link from 'next/link';

import BackButton from './BackButton';
import DeleteTodo from './DeleteTodo';

interface TodoProps {
  id: string;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const getTodo = async (id: string): Promise<TodoProps | undefined> => {
  try {
    const docRef = doc(db, 'todos', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const todo = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      return todo;
    }

    return undefined;
  } catch (error) {
    console.error(error);
  }
};

export default async function SingleTodo({
  params,
}: {
  params: { id: string };
}) {
  const todo: TodoProps | undefined = await getTodo(params.id);

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5'>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='text-2xl font-medium'>Todos</h1>
      </div>
      <span className='text-sm'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos,
        mollitia magni odio fugit officiis molestias laborum consequuntur
        officia consequatur numquam, minus nisi doloremque corrupti quidem?
        Consectetur sunt asperiores numquam praesentium, necessitatibus officia
        unde, aspernatur illum ab, dolorem laboriosam. Facere tempore dolore
        quas, fugiat sint tenetur provident dolor nisi perspiciatis eos.
      </span>

      <hr className='my-10' />
      <div className='mx-auto max-w-5xl'>
        <div className='flex justify-between my-5'>
          <BackButton />
          <div>
            <Link
              href={`/todos/${params.id}/edit`}
              className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Update
            </Link>
            <DeleteTodo id={todo?.id || ''} />
          </div>
        </div>
        <div className='relative mx-auto w-[100%] sm:max-w-5xl p-8 bg-white border border-gray-200 rounded-lg shadow'>
          <h5 className='mb-2 text-2xl font-medium text-gray-900'>
            {todo?.title}
          </h5>
          <p className='font-normal'>{todo?.description}</p>
          <div
            className={`${
              !todo?.isCompleted ? 'bg-red-500' : 'bg-green-500'
            } absolute top-0 right-0 w-auto text-sm tracking-wide text-white py-1 px-4 rounded-tr-lg`}
          >
            {!todo?.isCompleted ? 'To Do' : 'Completed'}
          </div>
        </div>
      </div>
    </main>
  );
}
