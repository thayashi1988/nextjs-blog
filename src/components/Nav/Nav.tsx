import { NextLink } from '@/components/Link/Link';
import type { VFC } from 'react';
import React from 'react';

const NavItems = [
  {
    href: '/qin',
    txt: 'Posts',
  },
  {
    href: '/qin/users',
    txt: 'Users',
  },
  {
    href: '/qin/comments',
    txt: 'Comments',
  },
];

export const Nav: VFC = () => {
  return (
    <nav className="w-3/5 mx-auto">
      <ul className="flex items-center justify-between">
        {NavItems.map((item) => {
          return (
            <li key={item.href}>
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
