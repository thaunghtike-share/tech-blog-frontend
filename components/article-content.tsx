"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { CommentsReactions } from "./comment-reactions";
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
  Clock,
  FileText,
  Award,
  Star,
  Trophy,
  Zap,
  Crown,
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
  job_title?: string;
  articles?: Article[];
  featured?: boolean;
  company?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  post_count?: number;
  slug: string;
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
      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-sky-300 text-sky-700 hover:text-sky-800 hover:bg-white hover:border-sky-400 px-3 py-2 text-xs rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
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
      <article className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6 md:p-8 lg:p-10">
        {/* Article Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-black mb-6 md:mb-8 leading-tight tracking-tight bg-gradient-to-br from-sky-900 to-blue-900 bg-clip-text">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
            {/* Date */}
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 hover:shadow-sm rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300">
              <CalendarDays className="w-4 h-4 text-gray-700" />
              <span className="text-sm text-gray-700 font-medium">
                {new Date(article.published_at).toLocaleDateString()}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <Link href={`/categories/${slugify(categoryName)}`}>
                <span className="flex items-center hover:shadow-sm gap-2 text-sky-600 px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm">
                  <Folder className="w-4 h-4 text-sky-600" />
                  {categoryName}
                </span>
              </Link>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {tagNames.map((tag, index) => (
                <Link
                  href={`/articles?tag=${slugify(tag)}`}
                  key={index}
                  className="flex items-center gap-2 text-orange-600 px-3 md:px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md transition-all duration-300 shadow-sm"
                >
                  <TagIcon className="w-4 h-4 text-orange-600" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-8 md:mb-10 rounded-2xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">
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
                    className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-6 pb-3 border-b-2 border-sky-100"
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
                    className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-4 pb-2 border-l-4 border-sky-500 pl-4 bg-gradient-to-r from-sky-50 to-transparent rounded-r-lg"
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
                    className="text-lg md:text-xl font-semibold text-gray-800 mt-6 mb-3 pl-3 border-l-2 border-sky-300"
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
                  className="text-sky-600 hover:text-sky-700 hover:underline decoration-2 underline-offset-2 break-words text-base md:text-lg transition-all duration-200 font-medium"
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
                    <span className="inline-block w-2 h-2 rounded-full bg-sky-500 mt-2 flex-shrink-0 shadow-sm" />
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
                      className="bg-sky-100 text-sky-700 rounded-lg px-2 py-1 text-base font-mono border border-sky-200 shadow-sm"
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
                    className="relative mb-8 rounded-2xl bg-gradient-to-br from-sky-50 to-white text-gray-700 font-mono text-sm shadow-lg border border-sky-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    {...props}
                  >
                    {language && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-t-2xl px-4 py-2 text-xs font-semibold">
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
                          className="flex hover:bg-sky-50/50 rounded-lg px-2 -mx-2 transition-colors"
                        >
                          {idx === 0 && startsWithDollar && (
                            <span className="text-sky-600 font-bold select-none mr-2">
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
                  className="border-l-4 border-sky-500 pl-6 pr-4 py-4 italic text-gray-700 my-6 text-sm md:text-base bg-gradient-to-r from-sky-50 to-blue-50 rounded-r-2xl shadow-sm"
                  {...props}
                />
              ),
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="my-8 max-w-full rounded-2xl shadow-lg mx-auto border border-sky-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  alt={props.alt || "Article image"}
                />
              ),
            }}
          >
            {fixMarkdownSpacing(article.content)}
          </ReactMarkdown>
        </div>

        {/* Comments & Reactions */}
        <div className="mt-12">
          <CommentsReactions
            articleSlug={article.slug}
            currentUser={{
              isAuthenticated: true, // You'll need to pass your auth state here
              authorSlug: author?.slug,
            }}
          />
        </div>

        {/* Updated Author Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 mt-16"
        >
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Author Avatar Container */}
              <div className="group relative">
                <Link href={`/authors/${authorSlug}`} className="block">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-1.5 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={author?.avatar || "/placeholder.svg"}
                        alt={author?.name || "Author"}
                        className="w-full h-full rounded-2xl object-cover border-4 border-white"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                </Link>
                {author?.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 -right-2 bg-sky-600 hover:bg-sky-700 p-2.5 rounded-xl shadow-2xl transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold mb-3 shadow-lg">
                  <Crown className="w-4 h-4" />
                  Author
                </div>

                <h3 className="font-bold text-slate-900 leading-tight mb-2 group-hover:text-sky-600 transition-colors duration-300">
                  Written By
                </h3>

                <Link
                  href={`/authors/${authorSlug}`}
                  className="group block mb-3"
                >
                  <p className="text-xl text-sky-700 font-semibold mb-4">
                    {author?.name}
                  </p>
                </Link>

                <p className="text-slate-700 leading-relaxed mb-6 max-w-2xl text-base">
                  {author?.bio}
                </p>

                {/* View Profile Button */}
                <Link href={`/authors/${authorSlug}`}>
                  <Button className="group bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    View Author Profile
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevArticle && (
            <Link
              href={`/articles/${prevArticle.slug}`}
              className="group flex items-center gap-3 text-sky-600 hover:text-sky-700 transition-all duration-300 flex-1 min-w-0"
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                    Previous
                  </span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-sky-700 transition-colors">
                    {prevArticle.title}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {nextArticle && (
            <Link
              href={`/articles/${nextArticle.slug}`}
              className="group flex items-center gap-3 text-sky-600 hover:text-sky-700 transition-all duration-300 flex-1 min-w-0 justify-end text-right"
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                    Next
                  </span>
                  <span className="text-sm font-medium line-clamp-1 group-hover:text-sky-700 transition-colors">
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
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <ListOrdered className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Table of Contents
              </h3>
            </div>
            <nav className="space-y-2">
              {headings.map(({ id, text, level }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-2 px-3 rounded-xl hover:bg-sky-50 transition-all duration-200 text-sm group ${
                    level === 1
                      ? "text-sky-700 font-semibold border-l-2 border-sky-500"
                      : level === 2
                      ? "text-gray-800 font-medium border-l-2 border-gray-300"
                      : "text-gray-700 font-normal border-l-2 border-gray-300"
                  }`}
                  style={{
                    marginLeft: `${(level - 1) * 12}px`,
                  }}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200 block line-clamp-1">
                    {text}
                  </span>
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Article Stats */}
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <CountUp
                  end={article.read_count || 0}
                  duration={2}
                  separator=","
                  className="text-2xl font-bold text-gray-900 block leading-tight"
                />
                <p className="text-sm text-black-600 font-medium">
                  Article Reads
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Recent Articles
              </h3>
            </div>
            <div className="space-y-4">
              {recentArticles.slice(0, 4).map((article) => {
                const itemAuthor = authors.find((a) => a.id === article.author);
                const coverImage = article.cover_image || "/devops.webp";
                const articleExcerpt = excerpt(article.content || "");

                return (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.id}
                    className="block group"
                  >
                    <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300">
                      {/* Cover Image */}
                      <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={coverImage}
                          alt={article.title}
                          className="w-full h-20 object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 text-sm leading-tight">
                          {article.title}
                        </h4>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {articleExcerpt}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 overflow-hidden border border-white shadow-sm">
                              <img
                                src={itemAuthor?.avatar || "/placeholder.svg"}
                                alt={itemAuthor?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                              {itemAuthor?.name || "Unknown"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 font-medium">
                            <Eye className="w-3 h-3" />
                            <CountUp
                              end={article.read_count || 0}
                              duration={1.5}
                              separator=","
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Featured Authors */}
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Star className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Featured Authors
              </h3>
            </div>
            <div className="space-y-3">
              {authors
                .filter((author) => author.featured)
                .slice(0, 4)
                .map((author) => (
                  <Link
                    href={`/authors/${author.slug}`}
                    key={author.id}
                    className="block group"
                  >
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sky-50 transition-all duration-300">
                      {/* Author Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 overflow-hidden border border-white shadow-sm flex-shrink-0">
                        <img
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                      </div>

                      {/* Author Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-1 text-base">
                          {author.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {author.job_title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Folder className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {categories.slice(0, 4).map((category) => {
                const getCategoryIcon = (categoryName: string) => {
                  const name = categoryName.toLowerCase();
                  if (
                    name.includes("devops") ||
                    name.includes("docker") ||
                    name.includes("kubernetes")
                  )
                    return "⚙️";
                  if (
                    name.includes("cloud") ||
                    name.includes("aws") ||
                    name.includes("azure")
                  )
                    return "☁️";
                  if (name.includes("automation") || name.includes("ci/cd"))
                    return "🤖";
                  if (name.includes("terraform") || name.includes("iac"))
                    return "🏗️";
                  if (name.includes("security") || name.includes("devsecops"))
                    return "🔒";
                  if (
                    name.includes("monitoring") ||
                    name.includes("observability")
                  )
                    return "📊";
                  if (name.includes("linux") || name.includes("ubuntu"))
                    return "🐧";
                  if (name.includes("python") || name.includes("scripting"))
                    return "🐍";
                  return "📁";
                };

                const getCategoryColor = (categoryName: string) => {
                  const name = categoryName.toLowerCase();
                  if (name.includes("devops"))
                    return "from-orange-500 to-red-500";
                  if (name.includes("cloud")) return "from-sky-500 to-blue-500";
                  if (name.includes("automation"))
                    return "from-emerald-500 to-green-500";
                  if (name.includes("terraform"))
                    return "from-purple-500 to-indigo-500";
                  if (name.includes("security"))
                    return "from-rose-500 to-pink-500";
                  if (name.includes("monitoring"))
                    return "from-amber-500 to-yellow-500";
                  return "from-gray-500 to-gray-600";
                };

                return (
                  <Link
                    href={`/categories/${category.slug}`}
                    key={category.id}
                    className="block group"
                  >
                    <div className="text-center p-3 rounded-2xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 bg-white group-hover:bg-sky-50">
                      {/* Circular Icon */}
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(
                          category.name
                        )} flex items-center justify-center shadow-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-lg">
                          {getCategoryIcon(category.name)}
                        </span>
                      </div>

                      {/* Category Name */}
                      <h4 className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors text-xs leading-tight mb-1 line-clamp-2">
                        {category.name}
                      </h4>

                      {/* Article Count */}
                      {category.post_count && (
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                          <span className="text-xs text-gray-600 font-medium">
                            {category.post_count}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* See All Button */}
            <Link
              href="/categories"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/seeall transform hover:scale-[1.02]"
            >
              See All Categories
              <ChevronRight className="w-4 h-4 group-hover/seeall:translate-x-1 transition-transform" />
            </Link>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                Popular Reads
              </h3>
            </div>
            <div className="space-y-3">
              {topReadArticles.map((article) => {
                const itemAuthor = authors.find((a) => a.id === article.author);

                return (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.id}
                    className="block group"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 transition-all duration-300">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors line-clamp-2 text-sm leading-tight mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-gray-600"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
