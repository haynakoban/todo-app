'use client';

import React from 'react';
import Links from './Links';

export default function Mobiles() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <div
        className={`burger navbar-toggler sm:hidden ${toggle && 'toggle'}`}
        onClick={() => setToggle((toggle) => !toggle)}
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
      <div
        className={`${
          !toggle && 'hidden'
        } sm:hidden absolute top-16 right-[-0.5rem] h-[calc(100vh-4rem)] w-[50vw] bg-gray-900 text-right`}
      >
        <Links setToggle={setToggle} />
      </div>
    </>
  );
}
