import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Btn } from '@/components/Button/Btn';
import { Heading1 } from '@/components/Heading/Heading1';
import Date from '@/components/date';
import utilStyles from '@/styles/utils.module.css';
import { getAllPostIds, getPostData } from '@/lib/posts';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const Index: InferGetStaticPropsType<typeof getStaticProps> = ({
  postData,
}) => {
  return (
    <>
      <Head>
        <title>{postData.title} | Next.js チュートリアル | Next.jsアプリ</title>
      </Head>
      <article>
        <Heading1 class={utilStyles.headingXl}>{postData.title}</Heading1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <Btn link href="/tutorial" margin="text-center mt-5">
          マークダウン記事一覧へ戻る
        </Btn>
      </article>
    </>
  );
};
export default Index;
