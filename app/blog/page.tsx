import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-thin">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300"
          >
            <ChevronLeft size={20} />
            <span className="font-light tracking-wide">Back to Portfolio</span>
          </Link>
          <div className="font-light text-xl tracking-wide">UuU</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-thin tracking-wider mb-16 text-center">Blog Posts</h1>

        <div className="space-y-12">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group hover:bg-gray-50 p-6 rounded-lg transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-light mb-2 group-hover:text-gray-600 transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm text-gray-500 font-light mb-3">
                  {post.frontmatter.date}
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  {post.frontmatter.excerpt}
                </p>
              </Link>
            </article>
          ))}
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
