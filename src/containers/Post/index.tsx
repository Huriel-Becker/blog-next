import { MainContainer } from '@/components/MainContainer';
import { PostData } from '../../domain/posts/post';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { markdownToHtml } from '../../utils/markdown-to-html';
import { Footer } from '../../components/Footer';
import { Heading } from '../../components/Heading';
import { PostCover } from '../../components/PostCover';
import { PostDetails } from '@/components/PostDetails';

export type PostProps = {
  post: PostData;
};

export const Post = ({ post }: PostProps) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const convertMarkdownToHtml = async () => {
      const html = await markdownToHtml(post.attributes.content);
      setHtmlContent(html);
    };

    convertMarkdownToHtml();
  }, [post]);

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
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </MainContainer>

      <Footer />
    </>
  );
};
