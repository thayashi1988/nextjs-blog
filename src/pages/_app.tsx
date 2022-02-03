import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'; // ダークモードのプラグイン
import '@/styles/global.css';
import Layout from '@/components/Layout/layout';
import 'tailwindcss/tailwind.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
