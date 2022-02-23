import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'; // ダークモードのプラグイン
import { memo } from 'react';
import { Layout } from '@/components/Layout/layout';
import '@/styles/global.css';
import 'tailwindcss/tailwind.css';
import { AdminFlagProvoder } from '@/components/Providers/AdminFlagProvoder';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../apollo/client';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <AdminFlagProvoder>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AdminFlagProvoder>
    </ApolloProvider>
  );
};

export default memo(App);
