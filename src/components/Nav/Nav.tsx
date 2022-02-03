import React from 'react';
import { BtnInfo } from '@/components/Button/BtnInfo';
import { NextLink } from '@/components/Link/Link';
import { useRouter } from 'next/router';

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

export const Nav: React.VFC = () => {
  const router = useRouter();
  NavItems.forEach((item) => {
    if (item.href === router.asPath) {
      item.current = true;
    } else {
      item.current = false;
    }
  });

  return (
    <nav className="max-w-screen-md w-full mx-auto">
      <BtnInfo
        link
        href="/qin"
        margin="text-cener"
        class="text-center sm:max-w-full">
        動的ルーティング・連続fetchのTOPへ戻る
      </BtnInfo>
      <ul className="flex items-center justify-between">
        {NavItems.map((item) => {
          return (
            <li key={item.href}>
              <NextLink
                href={item.href}
                class={`text-lg sm:text-2xl font-bold p-4 ${
                  item.current ? 'bg-yellow-200' : ''
                }`}>
                {item.txt}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
