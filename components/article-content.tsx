"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";
import CountUp from "react-countup";
import { GiscusComments } from "@/components/GiscusComments";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { ShareButtons } from "@/components/share-buttons";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Linkedin,
  ListOrdered,
  UserCircle,
  CalendarDays,
  Folder,
  User,
  Clipboard,
  Check,
  Eye,
  TrendingUp,
  Tag as TagIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  category: number;
  tags: number[];
  author: number;
  featured: boolean;
  image_url?: string;
  author_name?: string;
  category_name?: string;
  read_count?: number;
}

interface Author {
  id: number;
  name: string;
  bio?: string;
  slug: string;
  avatar?: string;
  linkedin?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ArticleContentProps {
  article: Article;
  author: Author | null;
  headings: { text: string; level: number; id: string }[];
  prevArticle: Article | null;
  nextArticle: Article | null;
  recentArticles: Article[];
  sameCategoryArticles: Article[];
  publishDate: string;
  categoryName: string;
  tagNames: string[];
  authors: Author[];
  categories: Category[];
  readCount?: number;
}

function flattenChildren(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(flattenChildren).join("");
  if (children && typeof children === "object" && "props" in children)
    return flattenChildren(children.props.children);
  return "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function excerpt(content: string) {
  const plainText = content
    .replace(/<[^>]+>/g, "")
    .replace(/[#_*>\-[\]$$$$`~]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return plainText.length === 80 ? plainText + "..." : plainText;
}

// CopyButton component for code blocks
const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="sm"
      className="absolute top-2 right-2 text-black hover:bg-gray-200 px-2 py-1 text-xs rounded-md transition-colors duration-200"
    >
      {copied ? (
        <Check className="w-3 h-3 mr-1" />
      ) : (
        <Clipboard className="w-3 h-3 mr-1" />
      )}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function ArticleContent({
  article,
  author,
  headings,
  prevArticle,
  nextArticle,
  recentArticles,
  sameCategoryArticles,
  publishDate,
  categoryName,
  tagNames,
  authors,
  categories,
  readCount,
}: ArticleContentProps) {
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";
  const [topReadArticles, setTopReadArticles] = useState<Article[]>([]);
  const maxReadCount =
    topReadArticles.length > 0
      ? Math.max(...topReadArticles.map((a) => a.read_count || 0))
      : 1;
  const authorSlug = author?.slug || slugify(author?.name || "unknown");

  useEffect(() => {
    const incrementReadCount = async () => {
      try {
        await fetch(`${API_BASE_URL}/articles/${article.id}/increment-read/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
      } catch (error) {
        console.error("Failed to increment read count:", error);
      }
    };
    incrementReadCount();
  }, [article.id]);

  useEffect(() => {
    const fetchTopReadArticles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/articles/top-read/?limit=7`);
        if (!res.ok) throw new Error("Failed to fetch top read articles");
        const data = await res.json();
        console.log("Top Read Response:", data);
        setTopReadArticles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopReadArticles();
  }, []);

  function fixMarkdownSpacing(content: string): string {
    return content
      .replace(/(#{1,6} .+)\n(```)/g, "$1\n\n$2") // Add blank line before code block after headings
      .replace(/([^\n])\n(!\[)/g, "$1\n\n$2") // Add blank line before image if directly after text line
      .replace(/(!\[.*?\]$$.*?$$)\n([^\n])/g, "$1\n\n$2"); // Add blank line after image if directly before text line
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
      <article className="lg:col-span-2 bg-gray-50 md:bg-white/90 backdrop-blur-sm rounded-xl p-6 md:shadow md:border md:border-white/50 max-w-full overflow-x-auto">
        {article.image_url && (
          <img
            src={article.image_url || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
        )}
        <h1 className="text-lg md:text-3xl font-bold mb-2">{article.title}</h1>
        <div className="flex items-center space-x-4 text-gray-600 text-xs md:text-sm mb-6">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>
              {article.author_name || author?.name || "Unknown Author"}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="prose prose-lg">
          <div className="flex flex-wrap gap-2 mb-4">
            <Link href={`/categories/${slugify(categoryName)}`}>
              <span className="flex items-center gap-1 text-yellow-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                <Folder className="w-4 h-4" />
                {categoryName}
              </span>
            </Link>
            {tagNames.map((tag, index) => (
              <Link
                href={`/articles?tag=${slugify(tag)}`}
                key={index}
                className="flex items-center gap-1 text-blue-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <TagIcon className="w-4 h-4" />
                {tag}
              </Link>
            ))}
          </div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children, ...props }) => {
                const id = slugify(flattenChildren(children));
                return (
                  <h1
                    id={id}
                    className="text-xl md:text-2xl font-semibold my-4"
                    {...props}
                  >
                    {children}
                  </h1>
                );
              },
              h2: ({ children, ...props }) => {
                const id = slugify(flattenChildren(children));
                return (
                  <h2
                    id={id}
                    className="text-lg md:text-xl font-semibold my-3"
                    {...props}
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children, ...props }) => {
                const id = slugify(flattenChildren(children));
                return (
                  <h3
                    id={id}
                    className="text-base md:text-lg font-semibold my-2"
                    {...props}
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children, ...props }) => (
                <p
                  className="mb-3 text-sm leading-relaxed text-gray-800"
                  {...props}
                >
                  {children}
                </p>
              ),
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:underline break-words text-sm md:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
              ul: ({ children, ...props }) => (
                <ul
                  className="mb-4 list-none space-y-2 pl-4 text-sm md:text-base"
                  {...props}
                >
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol
                  className="mb-4 list-decimal space-y-2 pl-6 text-gray-800 text-sm md:text-base"
                  {...props}
                >
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li
                  className="flex items-start text-sm text-gray-700 leading-relaxed"
                  {...props}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 mr-2 flex-shrink-0" />
                  {children}
                </li>
              ),
              code: ({ inline, className = "", children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-100 text-gray-800 rounded px-1 py-0.5 text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                const match = /language-(\w+)/.exec(className || "");
                const language = match?.[1]?.toLowerCase() || "";
                const codeString = flattenChildren(children);
                const lines = codeString
                  .split("\n")
                  .filter((line) => line.trim() !== "");
                const isShellLike = language === "bash" || language === "shell";
                const startsWithDollar =
                  isShellLike && lines[0]?.trim().startsWith("$");
                const showCopyButton = [
                  "yaml",
                  "bash",
                  "shell",
                  "hcl",
                ].includes(language);
                return (
                  <div
                    className="relative mb-6 rounded-lg bg-white text-gray-900 font-mono text-sm shadow-sm border border-blue-300"
                    {...props}
                  >
                    {language && (
                      <div className="absolute top-2 left-2 text-blue-700 rounded px-2 py-0.5 text-xs font-semibold">
                        {language.toUpperCase()}
                      </div>
                    )}
                    {showCopyButton && <CopyButton code={codeString} />}
                    <pre className="whitespace-pre-wrap p-4 overflow-x-auto rounded-lg pt-10">
                      {lines.map((line, idx) => (
                        <div key={idx} className="flex">
                          {idx === 0 && startsWithDollar && (
                            <span className="text-blue-600 font-bold select-none mr-2">
                              $
                            </span>
                          )}
                          <span>
                            {idx === 0 && startsWithDollar
                              ? line.slice(1).trimStart()
                              : line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </div>
                );
              },
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4 text-sm md:text-base"
                  {...props}
                />
              ),
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="my-6 max-w-full rounded-lg shadow-md mx-auto"
                  alt={props.alt || "Article image"}
                />
              ),
            }}
          >
            {fixMarkdownSpacing(article.content)}
          </ReactMarkdown>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Share this article
          </h3>
          <ShareButtons
            articleId={article.id}
            title={article.title}
            url={articleUrl}
          />
        </div>
        <GiscusComments />
        <Link href={`/authors/${authorSlug}`} className="hidden md:block">
          <Card className="mt-8 bg-gray-30 border border-blue-100 shadow-lg relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute inset-0 bg-repeat opacity-10 pointer-events-none"></div>

            <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative z-10">
              {author?.avatar ? (
                <img
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-blue-200 flex items-center justify-center border-4 border-white shadow-xl">
                  <UserCircle className="w-14 h-14 sm:w-20 sm:h-20 text-blue-600" />
                </div>
              )}

              <div className="text-center md:text-left flex-1">
                <h4 className="text-sm sm:text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">
                  Written By
                </h4>
                <p className="text-lg sm:text-2xl font-extrabold text-indigo-800 mb-2 leading-tight">
                  {article.author_name || author?.name || "Unknown Author"}
                </p>
                {author?.bio && (
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-sm max-w-prose mx-auto md:mx-0">
                    {author.bio}
                  </p>
                )}
                {author?.linkedin && (
                  <Button
                    variant="outline"
                    className="mt-3 sm:mt-4 text-blue-800 border-blue-300 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200 bg-transparent pointer-events-none"
                  >
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </div>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
        <div className="mt-6 flex justify-between items-center text-sm text-blue-600 font-medium pt-4">
          {prevArticle ? (
            <Link
              href={`/articles/${prevArticle.slug}`}
              className="hover:underline flex items-center gap-1 transition-colors duration-200 hover:text-blue-800 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Article</span>
            </Link>
          ) : (
            <span />
          )}
          {nextArticle ? (
            <Link
              href={`/articles/${nextArticle.slug}`}
              className="hover:underline flex items-center gap-1 text-right transition-colors duration-200 hover:text-blue-800 text-sm"
            >
              <span>Next Article</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
        {/* Recent Articles - Redesigned */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Recent Articles</span>
            </h2>
            <Link
              href="/articles"
              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentArticles.map((item) => {
              const date = new Date(item.published_at).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );
              const itemCategory =
                categories.find((c) => c.id === item.category)?.name ||
                "General";
              const itemAuthor =
                authors.find((a) => a.id === item.author)?.name || "Unknown";
              const itemTags = tagNames.filter((_, index) =>
                item.tags?.includes(index)
              );

              const handleCategoryClick = (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/categories/${slugify(itemCategory)}`;
              };

              const handleTagClick = (e: React.MouseEvent, tag: string) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/articles?tag=${slugify(tag)}`;
              };

              return (
                <Card
                  key={item.id}
                  className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group bg-white relative z-10 transform hover:-translate-y-1"
                >
                  <Link
                    href={`/articles/${item.slug}`}
                    className="block flex-grow flex flex-col"
                  >
                    {item.image_url && (
                      <div className="h-[200px] w-full overflow-hidden bg-gray-50">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5 flex-grow flex flex-col bg-white">
                      {/* Category and Tags - Above Title */}
                      <div className="-mt-5 flex flex-wrap gap-2 mb-2">
                        <span
                          onClick={handleCategoryClick}
                          className="flex items-center gap-1 text-yellow-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Folder className="w-3 h-3" />
                          {itemCategory}
                        </span>
                        {itemTags.map((tag, index) => (
                          <span
                            key={index}
                            onClick={(e) => handleTagClick(e, tag)}
                            className="flex items-center gap-1 text-blue-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            <TagIcon className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h4>

                      <p className="text-sm md:text-sm text-gray-600 line-clamp-3 mt-1 mb-4">
                        {excerpt(item.content)}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <User className="w-3.5 h-3.5 text-gray-500" />
                          <span>{itemAuthor}</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
                          <span>{date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </article>
      {/* Sidebar */}
      <aside className="hidden lg:block lg:col-span-1 space-y-8">
        <MinimalSidebar />
        {/* Table of Contents */}
        <div className="bg-white/90 border border-white/70 shadow rounded-lg p-4 sticky top-4">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg">
              <ListOrdered className="w-4 h-4" />
            </span>
            Table of Contents
          </h3>
          <nav className="space-y-1.5">
            {headings.map(({ id, text, level }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-start gap-2 py-1.5 px-2 rounded-md transition-colors duration-200 hover:bg-blue-50 ${
                  level === 1 ? "font-medium" : "font-normal"
                }`}
                style={{
                  paddingLeft: `${level * 12}px`,
                  borderLeft: level > 1 ? "2px solid #bfdbfe" : "none",
                }}
              >
                {level > 1 && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    level === 1 ? "text-blue-700" : "text-gray-700"
                  } hover:text-blue-900`}
                >
                  {text}
                </span>
              </a>
            ))}
          </nav>
        </div>
        {/* Total Reads - Redesigned */}
        <div className="bg-white/90 border border-blue-100 rounded-xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-repeat opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-4 bg-indigo-600 rounded-full shadow-xl mb-4">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Total Article Views
            </h3>
            <p className="text-4xl md:text-5xl font-extrabold text-indigo-800 leading-none">
              {typeof readCount === "number" ? (
                <CountUp end={readCount} duration={2.5} separator="," />
              ) : (
                "—"
              )}
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-600 font-medium">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1 animate-pulse" />
              <span>Consistently gaining traction</span>
            </div>
          </div>
        </div>
        {/* Top Read Articles - Redesigned (Compact List Style) */}
        <section className="mt-12 bg-white/90 border border-white/70 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Top Read Articles
            </h2>
            <Link
              href="/articles"
              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {topReadArticles.map((article, index) => (
              <Link
                href={`/articles/${article.slug}`}
                key={article.id}
                className="block"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <span className="text-sm font-bold text-indigo-600 w-6 text-center flex-shrink-0">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm md:text-base text-gray-800 hover:text-indigo-700 transition-colors line-clamp-1">
                      {article.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 flex-shrink-0">
                    <Eye className="w-3 h-3 mr-1" />
                    <CountUp
                      end={article.read_count || 0}
                      duration={1.5}
                      separator=","
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}