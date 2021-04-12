import Head from 'next/head';
import { NextLink } from './link/Link';
import { Header } from './Header';
import { Footer } from './Footer';
import { Btn } from './button/Btn';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

const name: string = 'じぃのNext.jsアプリ';
export const siteTitle: string = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <div className="flex flex-col items-center mt-5">
          {home ? (
            <>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <NextLink href="/">
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </NextLink>
              <h2 className={utilStyles.headingLg}>
                <NextLink href="/">{name}</NextLink>
              </h2>
            </>
          )}
        </div>
        <main className="mt-5">{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Btn link href="/">
              TOPへ戻る
            </Btn>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
