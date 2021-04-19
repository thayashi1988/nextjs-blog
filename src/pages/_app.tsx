import '@/styles/global.css';
import Layout from 'src/components/Layout/layout';
export default function App({ Component, pageProps }): JSX.Element {
  return (
    <Layout home={false}>
      <Component {...pageProps} />
    </Layout>
  );
}
