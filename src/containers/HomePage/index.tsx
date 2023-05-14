import { MainContainer } from '../../components/MainContainer';
import { Header } from '../../components/Header';
import { PostData } from '../../domain/posts/post';
import { Category, Container } from './styles';
import { PostCard } from '../../components/PostCard';
import { Footer } from '../../components/Footer';
import Head from 'next/head';
import { SITE_NAME } from '../../config/app-config';

export type HomePageProps = {
  posts: PostData[];
  category?: string;
};

export default function HomePage({ posts, category }: HomePageProps) {
  return (
    <>
      <Head>
        <title>{category ? `${category} - ${SITE_NAME}` : SITE_NAME}</title>
        <meta name="description" content="Este é meu blog de tecnologa." />
      </Head>
      <Header />
      {category && <Category>Categoria: {category}</Category>}
      <MainContainer>
        <Container>
          {posts &&
            posts.map((post) => (
              <PostCard
                key={post.attributes.slug}
                slug={post.attributes.slug}
                title={post.attributes.title}
                cover={post.attributes.cover.data.attributes.formats.small.url}
              />
            ))}
        </Container>
      </MainContainer>
      <Footer />
    </>
  );
}
