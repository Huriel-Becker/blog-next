import { MainContainer } from '../../components/MainContainer';
import { PostData } from '../../domain/posts/post';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Heading } from '../../components/Heading';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '../../components/PostDetails';
import { PostContainer } from '../../components/PostContainer';
import { markdownToHtml } from '../../utils/markdown-to-html';
import { useEffect, useState } from 'react';
import { Comments } from '@/Comments';

export type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const content = await markdownToHtml(post.attributes.content);
      setHtmlContent(content);
    };

    convertMarkdownToHtml();
  }, [post.attributes.content]);

  return (
    <>
      <Header />
      <MainContainer>
        <Heading>{post.attributes.title}</Heading>
        <PostCover
          coverUrl={post.attributes.cover.data.attributes.formats.large.url}
          alt={post.attributes.title}
        />
        <PostDetails
          author={post.attributes.author.data.attributes.name}
          category={post.attributes.category.data.attributes.name}
          date={post.attributes.createdAt}
        />
        <PostContainer content={htmlContent} />
        <Comments title={post.attributes.title} slug={post.attributes.slug} />
      </MainContainer>
      <Footer />
    </>
  );
};
