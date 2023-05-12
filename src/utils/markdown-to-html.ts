import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

export const markdownToHtml = async (content: string): Promise<string> => {
  const processor = unified().use(remarkParse).use(remarkHtml);
  const result = await processor.process(content);
  return String(result);
};
