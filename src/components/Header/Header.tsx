import type { VFC } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export const Header: VFC = () => {
  return (
    <header className="bg-blue-300">
      <div className="max-w-4xl mx-auto p-4">
        <h1>
          <Link href="/">
            <a className="no-underline hover:no-underline hover:opacity-50">
              ヘッダー
            </a>
          </Link>
        </h1>
      </div>
    </header>
  );
};