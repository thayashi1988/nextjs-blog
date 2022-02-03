import { memo, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from 'src/components/Header/Header';
import { Footer } from 'src/components/Footer/Footer';
import { Btn } from 'src/components/Button/Btn';
import styles from 'src/components/Layout/layout.module.scss';

export const siteSettings = {
  siteTitle: 'ログイン | Next.jsアプリ',
  siteDescription: 'Next.js Sample Website',
  siteUrl: 'https://nextjs-sample-app.vercel.app',
};

export const Layout = ({ children }) => {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerElem = useRef();

  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === '/';

  useEffect(() => {
    const target: any = footerElem.current;
    const getHeight = target.getBoundingClientRect();
    console.log('footerHeight:', footerHeight);
    setFooterHeight((prev) => getHeight.height);
  }, [footerHeight]);
  return (
    <>
      <Head>
        <meta name="description" content={siteSettings.siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteSettings.siteTitle} />
        <meta property="og:url" content={siteSettings.siteUrl} />
        <meta
          property="og:description"
          content={siteSettings.siteDescription}
        />
        <meta property="og:site_name" content={siteSettings.siteTitle} />
        <meta property="og:image" content={`${siteSettings.siteUrl}/ogp.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <div
        className="flex flex-col min-h-screen"
        style={{ minHeight: `calc(100vh - ${footerHeight}px)` }}>
        <Header />
        <main className="flex-1 my-6 px-2">{children}</main>
        {!isHome ? (
          <div className={styles.backToHome}>
            <Btn link href="/">
              TOPへ戻る
            </Btn>
          </div>
        ) : null}
      </div>
      <div ref={footerElem}>
        <Footer />
      </div>
    </>
  );
};
export default memo(Layout);
