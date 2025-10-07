import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
};

export type PostData = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  contentHtml?: string;
};

const postsDir = path.join(process.cwd(), "content");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): PostData {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDir, `${realSlug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  return {
    slug: realSlug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export async function getPostBySlugWithHtml(slug: string): Promise<PostData> {
  const post = getPostBySlug(slug);
  const processed = await remark().use(html).process(post.content);
  return { ...post, contentHtml: processed.toString() };
}

export function getAllPosts(): PostData[] {
  const slugs = getPostSlugs();
  const posts = slugs.map(getPostBySlug);
  return posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );
}
