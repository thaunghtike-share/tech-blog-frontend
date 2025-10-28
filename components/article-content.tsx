"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";
import CountUp from "react-countup";
import { GiscusComments } from "@/components/GiscusComments";
import {
  ArrowRight,
  Linkedin,
  ListOrdered,
  CalendarDays,
  Folder,
  Clipboard,
  Check,
  Eye,
  TrendingUp,
  TagIcon,
  ChevronLeft,
  ChevronRight,
  ListTree,
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
  cover_image?: string;
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
  if (children?.props?.children)
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
    .slice(0, 120);
  return plainText.length === 120 ? plainText + "..." : plainText;
}

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
      className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-600 hover:text-gray-800 hover:bg-white hover:border-gray-400 px-3 py-2 text-xs rounded-lg transition-all duration-200 shadow-sm"
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
        const res = await fetch(`${API_BASE_URL}/articles/top-read/?limit=5`);
        if (!res.ok) throw new Error("Failed to fetch top read articles");
        const data = await res.json();
        setTopReadArticles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopReadArticles();
  }, []);

  function fixMarkdownSpacing(content: string): string {
    let fixedContent = content
      .replace(/(#{1,6} .+)\n(```)/g, "$1\n\n$2")
      .replace(/([^\n])\n(!\[)/g, "$1\n\n$2")
      .replace(/(!\[.*?\]$$.*?$$)\n([^\n])/g, "$1\n\n$2");

    fixedContent = fixedContent.replace(/^(- .*?)(?=\n-|\n$)/gm, (match) => {
      return match.replace(/\n/g, " ");
    });

    return fixedContent;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Article Content */}
      <article className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 md:p-8 lg:p-10">
        {/* Article Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-gray-100 bg-gray-50/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
              <CalendarDays className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">
                {new Date(article.published_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/categories/${slugify(categoryName)}`}>
                <span className="flex items-center gap-2 text-gray-700 border border-gray-100 bg-white px-3 md:px-4 py-2 rounded-full text-sm font-medium hover:bg-sky-50 hover:border-sky-300 hover:shadow-md transition-all duration-300 shadow-sm">
                  <Folder className="w-3 h-3" />
                  {categoryName}
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {tagNames.map((tag, index) => (
                <Link
                  href={`/articles?tag=${slugify(tag)}`}
                  key={index}
                  className="flex items-center gap-2 text-gray-700 border border-gray-100 bg-white px-3 md:px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-8 md:mb-10 rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500">
            <img
              src={article.cover_image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children, ...props }) => {
                const id = slugify(flattenChildren(children));
                return (
                  <h1
                    id={id}
                    className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b-2 border-gray-100 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
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
                    className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-100"
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
                    className="text-lg md:text-xl font-semibold text-gray-800 mt-6 mb-3"
                    {...props}
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children, ...props }) => (
                <p
                  className="mb-6 text-base leading-relaxed text-gray-700"
                  {...props}
                >
                  {children}
                </p>
              ),
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-700 hover:underline decoration-2 underline-offset-2 break-words text-base md:text-lg transition-all duration-200 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
              ul: ({ children, ...props }) => (
                <ul
                  className="mb-6 list-none space-y-3 pl-4 text-sm md:text-base"
                  {...props}
                >
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol
                  className="mb-6 list-decimal space-y-3 pl-6 text-gray-700 text-sm md:text-base"
                  {...props}
                >
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => {
                const childrenArray = Array.isArray(children)
                  ? children
                  : [children];

                return (
                  <li
                    className="flex items-start text-base text-gray-700 leading-relaxed gap-3"
                    {...props}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0 shadow-sm" />
                    <span className="flex-1">
                      {childrenArray.map((child, i) => {
                        if (typeof child === "string") {
                          const parts = child.split(/(\*\*.*?\*\*)/g);
                          return (
                            <span key={i}>
                              {parts.map((part, j) => {
                                if (
                                  part.startsWith("**") &&
                                  part.endsWith("**")
                                ) {
                                  return (
                                    <strong
                                      key={j}
                                      className="font-semibold text-gray-900"
                                    >
                                      {part.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                return part;
                              })}
                            </span>
                          );
                        }
                        return child;
                      })}
                    </span>
                  </li>
                );
              },
              code: ({ inline, className = "", children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-100 text-gray-800 rounded-lg px-2 py-1 text-base font-mono border border-gray-200 shadow-sm"
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
                    className="relative mb-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white text-gray-900 font-mono text-sm shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    {...props}
                  >
                    {language && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl px-4 py-2 text-xs font-semibold">
                        {language.toUpperCase()}
                      </div>
                    )}
                    {showCopyButton && <CopyButton code={codeString} />}
                    <pre
                      className={`whitespace-pre-wrap p-6 overflow-x-auto rounded-2xl ${
                        language ? "pt-12" : "pt-6"
                      }`}
                    >
                      {lines.map((line, idx) => (
                        <div
                          key={idx}
                          className="flex hover:bg-blue-50/50 rounded-lg px-2 -mx-2 transition-colors"
                        >
                          {idx === 0 && startsWithDollar && (
                            <span className="text-blue-600 font-bold select-none mr-2">
                              $
                            </span>
                          )}
                          <span className="flex-1">
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
                  className="border-l-4 border-blue-500 pl-6 pr-4 py-4 italic text-gray-700 my-6 text-sm md:text-base bg-gradient-to-r from-blue-50 to-indigo-50 rounded-r-2xl shadow-sm"
                  {...props}
                />
              ),
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="my-8 max-w-full rounded-2xl shadow-lg mx-auto border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  alt={props.alt || "Article image"}
                />
              ),
            }}
          >
            {fixMarkdownSpacing(article.content)}
          </ReactMarkdown>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <GiscusComments />
        </div>

        {/* Author Bio - Removed border line */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 border-white shadow-2xl overflow-hidden group-hover:border-blue-100 group-hover:shadow-2xl transition-all duration-500">
                    <img
                      src={author?.avatar || "/placeholder.svg"}
                      alt={author?.name || "Author"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {author?.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-1 -right-1 bg-[#0077B5] p-1.5 rounded-xl shadow-2xl hover:bg-[#005885] transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    >
                      <Linkedin className="w-3 h-3 text-white" />
                    </a>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sky-600 text-lg leading-tight mb-2 group-hover:text-sky-600 transition-colors duration-300">
                    <Link href={`/authors/${authorSlug}`} className="">
                      {article.author_name || author?.name || "Unknown Author"}
                    </Link>
                  </h3>
                </div>
              </div>

              {author?.bio && (
                <div className="mb-4 md:mb-5 flex-grow">
                  <p className="text-black text-sm leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 md:pt-5 border-t-2 border-gray-100">
                <Link
                  href={`/authors/${authorSlug}`}
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium text-sm group/btn shadow-md"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation - Simplified and Cleaner */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevArticle && (
            <Link
              href={`/articles/${prevArticle.slug}`}
              className="group flex items-center gap-3 text-sky-600 hover:text-sky-600 transition-all duration-300 flex-1 min-w-0"
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Previous
                  </span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-blue-700 transition-colors">
                    {prevArticle.title}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {nextArticle && (
            <Link
              href={`/articles/${nextArticle.slug}`}
              className="group flex items-center gap-3 text-sky-600 hover:text-sky-600 transition-all duration-300 flex-1 min-w-0 justify-end text-right"
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Next
                  </span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-blue-700 transition-colors">
                    {nextArticle.title}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </article>

      {/* Sidebar */}
      <aside className="lg:col-span-1 space-y-6">
        {/* Table of Contents */}
        <Card className="border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-5 md:p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b-2 border-gray-100">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              Contents
            </h3>
            <nav className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-2 px-3 rounded-xl hover:bg-blue-50 hover:shadow-sm transition-all duration-200 text-sm border border-transparent hover:border-blue-200 group ${
                    level === 1
                      ? "text-blue-700 font-semibold"
                      : "text-gray-700 font-normal"
                  }`}
                  style={{
                    paddingLeft: `${level * 12}px`,
                  }}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 block">
                    {text}
                  </span>
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Current Article Read Count */}
        <Card className="border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">
                    Article Views
                  </p>
                  <div className="flex items-center gap-1">
                    <CountUp
                      end={article.read_count || 0}
                      duration={2}
                      separator=","
                      className="text-lg font-bold text-gray-900"
                    />
                    <span className="text-xs text-gray-500"></span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Articles in Sidebar */}
        <Card className="border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <ListTree className="w-4 h-4 text-blue-600" />
                Recent Articles
              </h3>
            </div>
            <div className="space-y-3">
              {recentArticles.slice(0, 5).map((article) => {
                const itemAuthor = authors.find((a) => a.id === article.author);
                const coverImage = article.cover_image || "/devops.webp";

                return (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.id}
                    className="block group"
                  >
                    <div className="flex flex-col gap-3 p-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200">
                      {/* Cover Image */}
                      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <img
                          src={coverImage}
                          alt={article.title}
                          className="w-full h-24 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Title */}
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 text-sm leading-tight">
                        {article.title}
                      </h4>

                      {/* Author and Read Count */}
                      <div className="flex items-center justify-between text-xs text-teal-500">
                        <span className="font-medium">
                          {itemAuthor?.name || "Unknown"}
                        </span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <CountUp
                            end={article.read_count || 0}
                            duration={1.5}
                            separator=","
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Read Articles */}
        <Card className="border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-100">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Popular Articles
              </h3>
            </div>
            <div className="space-y-2">
              {topReadArticles.map((article, index) => (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.id}
                  className="block group"
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200">
                    <span
                      className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-xl flex-shrink-0 shadow-sm transition-all duration-300 ${
                        index === 0
                          ? "text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-200"
                          : index === 1
                          ? "text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200"
                          : index === 2
                          ? "text-white bg-gradient-to-br from-blue-400 to-blue-500 shadow-blue-200"
                          : "text-white bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-200"
                      } group-hover:scale-110`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2 text-sm leading-tight">
                        {article.title}
                      </h4>
                    </div>
                    <div className="flex items-center text-sm text-orange-500 flex-shrink-0">
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
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
