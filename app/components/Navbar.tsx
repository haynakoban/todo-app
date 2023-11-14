import Link from 'next/link';
import Links from './Links';
import Mobiles from './Mobiles';

export default function Navbar() {
  return (
    <nav className='bg-gray-900'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <Link href='/' className='text-white font-semibold tracking-wide'>
            <span className='text-sky-400'>Re</span>
            solver
          </Link>

          <div className='sm:flex hidden'>
            <Links />
          </div>

          <Mobiles />
        </div>
      </div>
    </nav>
  );
}
