import type { VFC } from 'react';

export const Footer: VFC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-300 px-2 py-5">
      <p className="text-center text-sm">
        &copy; Next.jsアプリ 2021~{currentYear}
      </p>
    </footer>
  );
};
