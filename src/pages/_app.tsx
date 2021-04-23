import { ThemeProvider } from 'next-themes'; // ダークモードのプラグイン
import '@/styles/global.css';
import Layout from 'src/components/Layout/layout';

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <ThemeProvider attribute="class">
      <Layout home={false}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
