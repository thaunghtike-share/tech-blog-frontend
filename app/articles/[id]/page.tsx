import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";
import { GiscusComments } from "@/components/GiscusComments";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";
import { ShareButtons } from "@/components/share-buttons";
import { MinimalHero } from "@/components/minimal-hero";

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

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ArticlePageProps {
  params: { id: string };
}

async function fetchJSON<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}

async function fetchAuthor(id: number): Promise<Author | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/authors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
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
  const [author, allArticles, tags, categories] = await Promise.all([
    fetchAuthor(article.author),
    fetchJSON<Article>("http://localhost:8000/api/articles/"),
    fetchJSON<Tag>("http://localhost:8000/api/tags/"),
    fetchJSON<Category>("http://localhost:8000/api/categories/")
  ]);

  const sorted = allArticles.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const currentIndex = sorted.findIndex((a) => a.id === article.id);
  const prevArticle = sorted[currentIndex + 1] || null;
  const nextArticle = sorted[currentIndex - 1] || null;

  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5);
  const publishDate = new Date(article.published_at).toLocaleDateString();

  const categoryName = categories.find((c) => c.id === article.category)?.name || "General";
  const tagNames = article.tags.map((id) => tags.find((t) => t.id === id)?.name).filter(Boolean) as string[];

  function excerpt(content: string) {
    const plainText = content
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>\-\[\]\(\)`~]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
    return plainText.length === 80 ? plainText + "..." : plainText;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />
      <MinimalHero />

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Article Content */}
        <article className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow border border-white/50 max-w-full overflow-x-auto">
          <div className="prose prose-lg">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

            <div className="text-gray-600 italic mb-4">
              <p>Published on {publishDate}</p>
              <p>
                Written By{" "}
                <span className="ml-2 font-medium not-italic text-gray-800">
                  {author?.name || "Unknown author"}
                </span>
              </p>
            </div>

            {/* ✅ Category and Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                📂 {categoryName}
              </span>
              {tagNames.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-semibold my-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-semibold my-3" {...props} />
                ),
                p: ({ node, children, ...props }) => (
                  <div className="mb-3 text-base leading-relaxed text-gray-800" {...props}>
                    {children}
                  </div>
                ),
                a: ({ node, href, children, ...props }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
                ),
                code: ({ inline, className = "", children, ...props }: any) => {
                  if (inline) {
                    return (
                      <code className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                        {children}
                      </code>
                    );
                  }

                  const match = /language-(\w+)/.exec(className || "");
                  const language = match?.[1] || "";

                  return (
                    <div className="relative mb-6 rounded-lg bg-white shadow border border-gray-200">
                      {language && (
                        <div className="absolute top-0 right-0 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-bl-md font-mono border-l border-b border-gray-300">
                          {language}
                        </div>
                      )}
                      <pre className="overflow-x-auto p-4 text-sm text-gray-800">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <div className="my-6">
                    <img
                      {...props}
                      className="max-w-full rounded-lg shadow-md mx-auto"
                      alt={props.alt || "Article image"}
                    />
                  </div>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          <ShareButtons articleId={article.id} title={article.title} />
          <GiscusComments />

          <div className="mt-8 flex justify-between items-center text-sm text-blue-600 font-medium border-t pt-6">
            {prevArticle ? (
              <a href={`/articles/${prevArticle.id}`} className="hover:underline">
                ← {prevArticle.title}
              </a>
            ) : (
              <span />
            )}
            {nextArticle ? (
              <a href={`/articles/${nextArticle.id}`} className="hover:underline text-right">
                {nextArticle.title} →
              </a>
            ) : (
              <span />
            )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 space-y-12">
          <MinimalSidebar />

          {/* Recent Articles */}
          <div className="bg-white/90 border border-white/70 shadow rounded-xl p-4">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              📚 Recent Articles
            </h3>
            <ul className="space-y-4">
              {recentArticles.map((item) => {
                const date = new Date(item.published_at).toLocaleDateString();
                return (
                  <li
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow duration-200"
                  >
                    <a href={`/articles/${item.id}`} className="block group">
                      <h4 className="font-semibold text-blue-700 group-hover:text-blue-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{date}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {excerpt(item.content)}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </main>

      <MinimalFooter />
    </div>
  );
}