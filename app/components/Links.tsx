'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Routes {
  name: string;
  path: string;
}

interface LinksProps {
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const routes = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Todos',
    path: '/todos',
  },
];

const Route = ({ routes, path }: { routes: Routes; path: string }) => {
  const active = routes.name === path;

  return (
    <Link
      href={routes.path}
      className={`${active ? 'bg-sky-600' : 'hover:bg-gray-700'}
        ${active ? 'text-white' : 'hover:text-white'}
      text-gray-300 block rounded-md px-3 py-2 text-base sm:text-sm font-medium`}
      aria-current='page'
    >
      {routes.name}
    </Link>
  );
};

export default function Links({ setToggle }: LinksProps) {
  const pathname = usePathname();
  const [active, setActive] = useState('Dashboard');

  useEffect(() => {
    let title = '';
    if (pathname.includes('todos')) {
      title = 'Todos';
    } else {
      title = 'Dashboard';
    }

    document.title = `Resolver | ${title}`;
    setActive(title);

    if (setToggle) setToggle(false);
  }, [pathname, setToggle]);

  return (
    <>
      {routes.map((route) => {
        return <Route key={route.name} routes={route} path={active} />;
      })}
    </>
  );
}
