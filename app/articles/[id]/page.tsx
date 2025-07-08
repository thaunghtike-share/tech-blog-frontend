import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";

interface Article {
  id: number;
  title: string;
  content: string;
  published_at: string;
  category: number;
  tags: number[];
  author: number;
  featured: boolean;
}

interface Author {
  id: number;
  name: string;
}

interface ArticlePageProps {
  params: { id: string };
}

// Fetch a single author
async function fetchAuthor(id: number): Promise<Author | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/authors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Fetch all articles
async function fetchAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch("http://localhost:8000/api/articles/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const id = parseInt(params.id);

  const res = await fetch(`http://localhost:8000/api/articles/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Article not found or failed to load.</p>
      </div>
    );
  }

  const article: Article = await res.json();
  const author = await fetchAuthor(article.author);
  const allArticles = await fetchAllArticles();

  const sorted = allArticles.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const currentIndex = sorted.findIndex((a) => a.id === article.id);
  const prevArticle = sorted[currentIndex + 1] || null;
  const nextArticle = sorted[currentIndex - 1] || null;

  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5);
  const publishDate = new Date(article.published_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Article Content */}
        <article className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow border border-white/50 prose prose-lg max-w-full overflow-x-auto">
          <h1 className="text-5xl font-extrabold mb-4">{article.title}</h1>
          <p className="text-gray-500 italic mb-2">Published on {publishDate}</p>
          <p className="text-gray-600 italic mb-8">By {author?.name || "Unknown author"}</p>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl font-bold my-6" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-semibold my-5" {...props} />
              ),
              p: ({ node, children, ...props }) => (
                <div className="mb-4 text-lg leading-relaxed" {...props}>
                  {children}
                </div>
              ),
              code: ({ inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code className="bg-gray-200 rounded px-1" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-4" {...props}>
                    <code className={className}>{children}</code>
                  </pre>
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img
                  {...props}
                  className="max-w-full rounded-lg shadow-md my-6 mx-auto"
                  alt={props.alt || "Article image"}
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>

          {/* Prev / Next Navigation */}
          <div className="mt-12 flex justify-between items-center text-sm text-blue-600 font-medium">
            {prevArticle ? (
              <a href={`/articles/${prevArticle.id}`} className="hover:underline">
                ← {prevArticle.title}
              </a>
            ) : <span />}

            {nextArticle ? (
              <a href={`/articles/${nextArticle.id}`} className="hover:underline text-right">
                {nextArticle.title} →
              </a>
            ) : <span />}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-12">
          <MinimalSidebar />

          {/* Recent Articles */}
          <div className="bg-white/80 border border-white/50 shadow-sm rounded-xl p-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4">📚 Recent Articles</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              {recentArticles.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/articles/${item.id}`}
                    className="hover:underline block truncate"
                  >
                    • {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      <MinimalFooter />
    </div>
  );
}