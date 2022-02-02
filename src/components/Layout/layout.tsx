import { memo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from 'src/components/Header/Header';
import { Footer } from 'src/components/Footer/Footer';
import { Btn } from 'src/components/Button/Btn';
import styles from 'src/components/Layout/layout.module.scss';

export const siteTitle: string = 'Next.jsアプリ';
export const siteDescription: string = 'Next.js Sample Website';
export const siteUrl: string = 'http://localhost:3000/';

export const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={styles.container}>
        <Head>
          <meta name="description" content={siteDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:description" content={siteDescription} />
          <meta property="og:site_name" content={siteTitle} />
          <meta property="og:image" content={`${siteUrl}/ogp.png`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
        <main className="mt-5">{children}</main>
        {!isHome ? (
          <div className={styles.backToHome}>
            <Btn link href="/">
              TOPへ戻る
            </Btn>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};
export default memo(Layout);
