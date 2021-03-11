import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function test() {
  return (
    <Layout>
      <Head>
        <title>test page</title>
      </Head>
      <h1>これはテストページです。</h1>
      <h2>
        <Link href="/">
          <a>Topへ戻る</a>
        </Link>
      </h2>
      </Layout>
  )
}

