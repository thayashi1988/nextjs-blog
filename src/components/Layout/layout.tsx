import { memo } from 'react';
import Head from 'next/head';
import { NextImg } from 'src/components/Img/Img';
import { NextLink } from 'src/components/Link/Link';
import { Header } from 'src/components/Header/Header';
import { Footer } from 'src/components/Footer/Footer';
import { Btn } from 'src/components/Button/Btn';
import styles from 'src/components/Layout/layout.module.scss';
import utilStyles from '@/styles/utils.module.css';

export const siteTitle: string = 'Next.jsアプリ';
export const siteDescription: string = 'Next.js Sample Website';
export const siteUrl: string = 'http://localhost:3000/';

export const Layout = ({ children, home }) => {
  // home = false;
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
        <div className="flex flex-col items-center mt-5">
          {
            home ? (
              <>
                <NextImg
                  src="/images/profile.jpg"
                  class={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                  alt={siteTitle}
                />
                <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
              </>
            ) : null
            // (
            // <>
            //   <NextLink href="/">
            //     <NextImg
            //       src="/images/profile.jpg"
            //       class={`${styles.headerImage} ${utilStyles.borderCircle}`}
            //       alt={name}
            //     />
            //   </NextLink>
            //   <h2 className={utilStyles.headingLg}>
            //     <NextLink href="/">{name}</NextLink>
            //   </h2>
            // </>
            // )
          }
        </div>
        <main className="mt-5">{children}</main>
        {!home ? (
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
