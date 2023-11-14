import TodoForm from './TodoForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

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

export default async function EditTodo({ params }: { params: { id: string } }) {
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
        <h1 className='text-2xl mb-2'>Edit Your Todo</h1>

        <TodoForm todo={todo} />
      </div>
    </main>
  );
}
