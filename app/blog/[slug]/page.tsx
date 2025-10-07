import { getPostSlugs, getPostBySlugWithHtml } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = getPostSlugs().map((s) => s.replace(/\.md$/, ""));
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlugWithHtml(slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-thin">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300"
          >
            <ChevronLeft size={20} />
            <span className="font-light tracking-wide">Back to Blog</span>
          </Link>
          <Link
            href="/"
            className="font-light text-xl tracking-wide hover:text-gray-600 transition-colors"
          >
            UuU
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Article Header */}
        <header className="mb-16 text-center">
          <h1 className="text-3xl font-thin tracking-wider mb-4">
            {post.frontmatter.title}
          </h1>
          <p className="text-sm text-gray-500 font-light">
            {post.frontmatter.date}
          </p>
        </header>

        {/* Article Content */}
        <article
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-light prose-headings:tracking-wide
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            prose-p:font-light prose-p:leading-relaxed prose-p:text-gray-600
            prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300
            hover:prose-a:decoration-gray-600 prose-a:transition-colors
            prose-strong:font-normal prose-strong:text-gray-900
            prose-code:font-light prose-code:text-gray-800 prose-code:bg-gray-50
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
            prose-blockquote:font-light prose-blockquote:border-gray-300
            prose-ul:font-light prose-ol:font-light
            prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300"
          >
            <ChevronLeft size={18} />
            <span className="font-light tracking-wide">Back to Blog</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 font-thin tracking-wide">
            © 2025 Akira Murakami. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
