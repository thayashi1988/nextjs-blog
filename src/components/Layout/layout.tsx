import { memo, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { BtnInfo } from '@/components/Button/BtnInfo';
// import styles from '@/components/Layout/layout.module.scss';
import { auth } from '../../../firebase';

export const siteSettings = {
  siteTitle: 'ログイン | Next.jsアプリ',
  siteDescription: 'Next.js Sample Website',
  siteUrl: 'https://nextjs-sample-app.vercel.app',
};

export const Layout = ({ children }) => {
  // const [footerHeight, setFooterHeight] = useState(0);
  // const footerElem = useRef();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const authProcess = auth.onAuthStateChanged((firebaseDatas: any) => {
      setIsLogin(firebaseDatas);
    });
    return () => authProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === '/';

  // useEffect(() => {
  //   const target: any = footerElem.current;
  //   const getHeight = target.getBoundingClientRect();
  //   // console.log('footerHeight:', footerHeight);
  //   setFooterHeight((prev) => getHeight.height);
  // }, [footerHeight]);

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
        className="flex flex-col"
        // style={{ minHeight: `calc(100vh - ${footerHeight}px)` }}
      >
        <Header />
        <main className="my-6 px-2 w-full max-w-[960px] mx-auto">
          {children}
          {!isHome ? (
            <BtnInfo
              link
              href={isLogin ? `/${isLogin.uid}` : '/'}
              margin="mt-5 text-center">
              アプリTOPへ戻る
            </BtnInfo>
          ) : null}
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default memo(Layout);
