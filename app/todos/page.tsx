import Link from 'next/link';
import { getDocs, collection, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';

const getTodos = async (maxResults: number = 20) => {
  try {
    const q = query(
      collection(db, 'todos'),
      orderBy('updatedAt', 'desc'),
      limit(maxResults)
    );

    const todos = await getDocs(q);
    interface Todo {
      id: string;
      title: string;
      description: string;
      isCompleted: boolean;
      createdAt: Date;
      updatedAt: Date;
    }

    const parseFirebaseDate = (dateString?: string): Date | null => {
      if (!dateString) {
        return null;
      }

      const parsedDate = Date.parse(dateString.replace(/ at/, ''));
      return isNaN(parsedDate) ? null : new Date(parsedDate);
    };

    const filteredTodos: Todo[] = todos.docs.map((doc) => ({
      id: doc.id,
      title: doc.data()?.title,
      description: doc.data().description,
      isCompleted: doc.data().isCompleted,
      createdAt: parseFirebaseDate(doc.data().createdAt) || new Date(),
      updatedAt: parseFirebaseDate(doc.data().updatedAt) || new Date(),
    }));

    return filteredTodos;
  } catch (error) {
    console.error(error);
  }
};

export default async function TodosPage() {
  const todos = await getTodos(50);

  return (
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5'>
      <div className='flex justify-between items-center mb-3'>
        <h1 className='text-2xl font-medium'>Todos</h1>
        <Link href='/todos/create'>
          <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none'>
            Create Todo
          </button>
        </Link>
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
      <div className='mx-auto max-w-5xl mt-10'>
        <h4 className='text-base tracking-wide font-normal border-b-gray-500 border-b w-36 text-center'>
          Results: <span className='font-medium'>{todos?.length}</span> Todos
        </h4>
      </div>
      <div className='mt-5 flex justify-center flex-wrap gap-5 px-2 mb-20'>
        {todos?.map((todo) => {
          return (
            <Link
              href={`/todos/${todo.id}`}
              key={todo.id}
              className='relative w-[100%] sm:max-w-[100%] md:max-w-sm lg:max-w-md xl:max-w-lg p-8 bg-white border border-gray-200 rounded-lg shadow'
            >
              <span className='text-xs font-light italic tracking-wide'>
                {moment(todo.updatedAt).format('dddd, MMMM D, YYYY')}
              </span>
              <h5 className='mb-2 text-2xl font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis'>
                {todo.title}
              </h5>
              <p className='font-normal overflow-hidden whitespace-nowrap overflow-ellipsis'>
                {todo.description}
              </p>
              <div
                className={`${
                  !todo.isCompleted ? 'bg-red-500' : 'bg-green-500'
                } absolute top-0 right-0 w-auto text-sm tracking-wide text-white py-1 px-4 rounded-tr-lg`}
              >
                {!todo.isCompleted ? 'To Do' : 'Completed'}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
