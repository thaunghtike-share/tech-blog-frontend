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

async function fetchAuthor(id: number): Promise<Author | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/authors/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

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

  const sorted = allArticles.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const currentIndex = sorted.findIndex((a) => a.id === article.id);
  const prevArticle = sorted[currentIndex + 1] || null;
  const nextArticle = sorted[currentIndex - 1] || null;

  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5);
  const publishDate = new Date(article.published_at).toLocaleDateString();

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

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Article Content */}
        <article className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow border border-white/50 prose prose-lg max-w-full overflow-x-auto">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 italic mb-3">Published on {publishDate}</p>
          <p className="text-gray-600 italic mb-8">
            Written By{" "}
            <span className="ml-2 font-medium not-italic text-gray-800">
              {author?.name || "Unknown author"}
            </span>
          </p>

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
                <p className="mb-3 text-base leading-relaxed text-gray-800" {...props}>
                  {children}
                </p>
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

          {/* Share Buttons */}
          <ShareButtons articleId={article.id} title={article.title} />

          {/* Comments */}
          <GiscusComments />

          {/* Prev / Next Navigation */}
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
        <aside className="lg:col-span-1 space-y-12">
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