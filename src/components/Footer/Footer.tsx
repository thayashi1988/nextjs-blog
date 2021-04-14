import type { VFC } from 'react';
import 'tailwindcss/tailwind.css';

export const Footer: VFC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-300 p-2">
      <p className="text-center text-sm">&copy; 2021~{currentYear}</p>
    </footer>
  );
};
