import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes'; // ダークモードのプラグイン
import '@/styles/global.css';
import Layout from 'src/components/Layout/layout';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class">
      <Layout home={false}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
