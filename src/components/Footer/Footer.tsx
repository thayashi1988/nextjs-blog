import type { VFC } from 'react';

export const Footer: VFC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-300 p-2 mt-auto">
      <p className="text-center text-sm">&copy; 2021~{currentYear}</p>
    </footer>
  );
};
