import { getCollection } from "astro:content";
import { postFilter } from "./postFilter";

/**
 * 统计一段文本的字数：中文按单字计数，英文/数字按单词计数。
 * 忽略代码块、图片、Markdown 语法符号。
 */
function countWords(text: string): number {
  const clean = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`~_|]/g, " ");
  const cjk = clean.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latin = clean.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  return cjk + latin;
}

/**
 * 统计本站所有已发布文章的总字数。
 */
export async function getSiteWordCount(): Promise<number> {
  const posts = await getCollection("posts");
  return posts
    .filter(postFilter)
    .reduce((sum, post) => sum + countWords(post.body ?? ""), 0);
}
