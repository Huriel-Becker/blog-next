import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import HomePage from '../../containers/HomePage';
import { getAllPosts } from '../../data/posts/get-all-posts';
import { PostData } from '../../domain/posts/post';
import { ParsedUrlQuery } from 'querystring';

export type CategoryProps = {
  posts: PostData[];
  category: string;
};

export default function Category({ posts, category }: CategoryProps) {
  return <HomePage category={category} posts={posts} />;
}

export const getServerSideProps: GetServerSideProps<CategoryProps> = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) => {
  const category = ctx.query.category as string;
  const urlQuery = `sort=id:desc&pagination[start]=0&pagination[limit]=10&sort=id:DESC&filters[$and][0][category][name][$eq]=${category}`;
  const posts = await getAllPosts(urlQuery);

  return {
    props: { posts, category },
  } as GetServerSidePropsResult<CategoryProps>;
};
