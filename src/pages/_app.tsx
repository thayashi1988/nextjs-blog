import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'; // ダークモードのプラグイン
import { memo } from 'react';
import { Layout } from '@/components/Layout/layout';
import '@/styles/global.css';
import 'tailwindcss/tailwind.css';
import { AdminFlagProvoder } from '@/components/Providers/AdminFlagProvoder';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AdminFlagProvoder>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AdminFlagProvoder>
  );
};

export default memo(App);
