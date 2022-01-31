import { NextLink } from '@/components/Link/Link';
import { useRouter } from 'next/router';
import type { VFC } from 'react';
import React from 'react';

const NavItems = [
  {
    href: '/qin/posts',
    txt: 'Posts',
    current: false,
  },
  {
    href: '/qin/users',
    txt: 'Users',
    current: false,
  },
  {
    href: '/qin/comments',
    txt: 'Comments',
    current: false,
  },
];

export const Nav: VFC = () => {
  const router = useRouter();
  NavItems.forEach((item) => {
    if (item.href === router.asPath) {
      item.current = true;
    } else {
      item.current = false;
    }
  });
  console.log('router.asPath:', router.asPath);

  return (
    <nav className="w-3/5 mx-auto">
      <ul className="flex items-center justify-between">
        {NavItems.map((item) => {
          return (
            <li key={item.href} className={item.current ? 'bg-yellow-300' : ''}>
              <NextLink href={item.href} class="text-2xl font-bold">
                {item.txt}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
