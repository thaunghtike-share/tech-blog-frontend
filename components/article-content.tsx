"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-light.css";
import "highlight.js/styles/atom-one-dark.css";
import CountUp from "react-countup";
import React from "react";
import {
  Settings,
  Cloud,
  Bot,
  Building,
  Lock,
  BarChart3,
  Server,
  Code,
  Folder,
  ChevronRight,
  Container,
  GitBranch,
  Terminal,
  Box,
} from "lucide-react";
import { motion } from "framer-motion";
import { CommentsReactions } from "./comment-reactions";
import {
  ArrowRight,
  Linkedin,
  ListOrdered,
  CalendarDays,
  Clipboard,
  Check,
  Eye,
  TrendingUp,
  TagIcon,
  ChevronLeft,
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
      className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-sky-300 dark:border-sky-600 text-sky-700 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-200 hover:bg-white dark:hover:bg-gray-700 hover:border-sky-400 dark:hover:border-sky-500 px-3 py-2 text-xs rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
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

// Floating background elements component
const FloatingBackgroundElements = () => {
  const floatingIconPositions = [
    { left: 5, top: 10 },
    { left: 85, top: 15 },
    { left: 25, top: 25 },
    { left: 70, top: 35 },
    { left: 10, top: 50 },
    { left: 90, top: 45 },
    { left: 40, top: 60 },
    { left: 60, top: 75 },
    { left: 15, top: 80 },
    { left: 80, top: 85 },
    { left: 30, top: 90 },
    { left: 55, top: 20 },
    { left: 20, top: 40 },
    { left: 75, top: 55 },
    { left: 45, top: 30 },
    { left: 65, top: 65 },
    { left: 35, top: 70 },
    { left: 95, top: 25 },
  ];

  const floatingDotPositions = [
    { left: 8, top: 12 },
    { left: 92, top: 18 },
    { left: 22, top: 28 },
    { left: 78, top: 32 },
    { left: 12, top: 48 },
    { left: 88, top: 52 },
    { left: 35, top: 65 },
    { left: 65, top: 72 },
    { left: 18, top: 85 },
    { left: 82, top: 88 },
    { left: 28, top: 95 },
    { left: 58, top: 22 },
    { left: 38, top: 38 },
    { left: 72, top: 58 },
    { left: 48, top: 78 },
    { left: 15, top: 35 },
    { left: 85, top: 42 },
    { left: 32, top: 15 },
    { left: 68, top: 25 },
    { left: 52, top: 45 },
    { left: 25, top: 68 },
    { left: 75, top: 82 },
    { left: 42, top: 92 },
    { left: 62, top: 8 },
    { left: 95, top: 65 },
  ];

  const icons = [
    Server,
    Container,
    GitBranch,
    Terminal,
    Zap,
    Cloud,
    Box,
    Code,
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIconPositions.map((pos, i) => {
        const IconComponent = icons[i % icons.length];
        return (
          <div
            key={`bg-icon-${i}`}
            className="absolute animate-float opacity-10 dark:opacity-5"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${15 + (i % 5) * 2}s`,
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg backdrop-blur-sm border border-blue-200/30 dark:border-blue-800/20 flex items-center justify-center shadow-sm">
              <IconComponent className="w-5 h-5 text-blue-500/40 dark:text-blue-400/20" />
            </div>
          </div>
        );
      })}

      {floatingDotPositions.map((pos, i) => (
        <div
          key={`bg-dot-${i}`}
          className="absolute animate-pulse opacity-15 dark:opacity-10"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full shadow-sm" />
        </div>
      ))}
    </div>
  );
};

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* Main Article Content */}
        <article className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 p-6 md:p-8 lg:p-10">
          {/* Article Header */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-black dark:text-gray-100 mb-6 md:mb-8 leading-tight tracking-tight bg-gradient-to-br from-sky-900 to-blue-900 dark:from-sky-100 dark:to-blue-200 bg-clip-text text-transparent">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
              {/* Date */}
              <div className="flex items-center gap-2 px-3 md:px-4 py-2 hover:shadow-sm rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300 bg-white/50 dark:bg-gray-700/50">
                <CalendarDays className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2">
                <Link href={`/categories/${slugify(categoryName)}`}>
                  <span className="flex items-center hover:shadow-sm gap-2 text-sky-600 dark:text-sky-400 px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm bg-sky-50 dark:bg-sky-900/20">
                    <Folder className="w-4 h-4 text-sky-600 dark:text-sky-400" />
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
                    className="flex items-center gap-2 text-orange-600 dark:text-orange-400 px-3 md:px-4 py-2 rounded-xl text-sm font-medium hover:shadow-md transition-all duration-300 shadow-sm bg-orange-50 dark:bg-orange-900/20"
                  >
                    <TagIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {article.cover_image && (
            <div className="mb-8 md:mb-10 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={article.cover_image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // Headers
                h1: ({ children, ...props }) => {
                  const id = slugify(flattenChildren(children));
                  return (
                    <h1
                      id={id}
                      className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-6 pb-3 border-b-2 border-sky-100 dark:border-sky-900"
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
                      className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-6 pb-2 border-l-4 border-sky-500 dark:border-sky-400 pl-4 bg-gradient-to-r from-sky-50 to-transparent dark:from-sky-900/20 dark:to-transparent rounded-r-lg"
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
                      className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4 pl-3 border-l-2 border-sky-300 dark:border-sky-600"
                      {...props}
                    >
                      {children}
                    </h3>
                  );
                },
                h4: ({ children, ...props }) => {
                  const id = slugify(flattenChildren(children));
                  return (
                    <h4
                      id={id}
                      className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3"
                      {...props}
                    >
                      {children}
                    </h4>
                  );
                },

                // Paragraph
                p: ({ children, ...props }) => (
                  <p
                    className="mb-6 text-base leading-relaxed text-gray-700 dark:text-gray-300"
                    {...props}
                  >
                    {children}
                  </p>
                ),

                // Lists
                ul: ({ children, ...props }) => (
                  <ul
                    className="mb-6 list-disc space-y-3 pl-6 text-gray-700 dark:text-gray-300 text-base"
                    {...props}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol
                    className="mb-6 list-decimal space-y-3 pl-6 text-gray-700 dark:text-gray-300 text-base"
                    {...props}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li
                    className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed"
                    {...props}
                  >
                    {children}
                  </li>
                ),

                // Code blocks
                code: ({ inline, className = "", children, ...props }: any) => {
                  if (inline) {
                    return (
                      <code
                        className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-lg px-2 py-1 text-sm font-mono border border-sky-200 dark:border-sky-800"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  const match = /language-(\w+)/.exec(className || "");
                  const language = match?.[1]?.toLowerCase() || "";
                  const codeString = String(children).replace(/\n$/, '');
                  const lines = codeString.split('\n');
                  const isShellLike = language === "bash" || language === "shell";
                  const startsWithDollar = isShellLike && lines[0]?.trim().startsWith("$");
                  const showCopyButton = ["yaml", "bash", "shell", "hcl", "python", "javascript", "js", "typescript", "ts"].includes(language);

                  return (
                    <div className="relative my-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
                      {language && (
                        <div className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 text-xs font-mono border-b border-gray-300 dark:border-gray-600">
                          {language.toUpperCase()}
                        </div>
                      )}
                      {showCopyButton && <CopyButton code={codeString} />}
                      <pre className="p-4 overflow-x-auto">
                        <code className={`font-mono text-sm block ${language ? 'pt-2' : ''}`}>
                          {lines.map((line, idx) => (
                            <span
                              key={idx}
                              className="block hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1 -mx-1 transition-colors"
                            >
                              {idx === 0 && startsWithDollar && (
                                <span className="text-green-600 dark:text-green-400 font-bold select-none mr-2">
                                  $
                                </span>
                              )}
                              {idx === 0 && startsWithDollar
                                ? line.slice(1).trimStart()
                                : line}
                            </span>
                          ))}
                        </code>
                      </pre>
                    </div>
                  );
                },

                // Keyboard keys
                kbd: ({ children, ...props }: any) => (
                  <kbd
                    className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm text-gray-700 dark:text-gray-300 inline-flex items-center justify-center min-w-[24px] mx-1"
                    {...props}
                  >
                    {children}
                  </kbd>
                ),

                // Blockquotes
                blockquote: ({ children, ...props }) => {
                  const childrenString = flattenChildren(children);
                  const isNote = childrenString.includes('[!NOTE]');
                  const isTip = childrenString.includes('[!TIP]');
                  const isWarning = childrenString.includes('[!WARNING]');
                  
                  let borderColor = "border-blue-500 dark:border-blue-400";
                  let bgColor = "bg-blue-50 dark:bg-blue-900/20";
                  
                  if (isNote) {
                    borderColor = "border-blue-500 dark:border-blue-400";
                    bgColor = "bg-blue-50 dark:bg-blue-900/20";
                  } else if (isTip) {
                    borderColor = "border-green-500 dark:border-green-400";
                    bgColor = "bg-green-50 dark:bg-green-900/20";
                  } else if (isWarning) {
                    borderColor = "border-orange-500 dark:border-orange-400";
                    bgColor = "bg-orange-50 dark:bg-orange-900/20";
                  }
                  
                  if (isNote || isTip || isWarning) {
                    return (
                      <blockquote
                        className={`border-l-4 ${borderColor} pl-6 pr-4 py-4 my-6 text-sm md:text-base ${bgColor} rounded-r-2xl shadow-sm`}
                        {...props}
                      >
                        {children}
                      </blockquote>
                    );
                  }
                  
                  return (
                    <blockquote
                      className="border-l-4 border-sky-500 dark:border-sky-400 pl-6 pr-4 py-4 italic text-gray-700 dark:text-gray-300 my-6 text-sm md:text-base bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-r-2xl shadow-sm"
                      {...props}
                    />
                  );
                },

                // Emphasis
                em: ({ children, ...props }) => (
                  <em className="italic text-gray-800 dark:text-gray-200" {...props}>
                    {children}
                  </em>
                ),

                // Strong
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
                    {children}
                  </strong>
                ),

                // Tables
                table: ({ children, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table
                      className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800"
                      {...props}
                    >
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children, ...props }) => (
                  <thead className="bg-gray-50 dark:bg-gray-700" {...props}>
                    {children}
                  </thead>
                ),
                tbody: ({ children, ...props }) => (
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800" {...props}>
                    {children}
                  </tbody>
                ),
                tr: ({ children, ...props }) => (
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" {...props}>
                    {children}
                  </tr>
                ),
                th: ({ children, ...props }) => (
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                    {...props}
                  >
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600"
                    {...props}
                  >
                    {children}
                  </td>
                ),

                // Horizontal rule
                hr: ({ ...props }) => (
                  <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
                ),

                // Links
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline decoration-2 underline-offset-2 break-words text-base md:text-lg transition-all duration-200 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                ),

                // Images
                img: ({ ...props }) => (
                  <img
                    {...props}
                    className="my-8 max-w-full rounded-2xl shadow-lg mx-auto border border-sky-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    alt={props.alt || "Article image"}
                  />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Comments & Reactions */}
          <div className="mt-12">
            <CommentsReactions
              articleSlug={article.slug}
              currentUser={{
                isAuthenticated: true,
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
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl border border-slate-200 dark:border-gray-600 p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Author Avatar Container */}
                <div className="group relative">
                  <Link href={`/authors/${authorSlug}`} className="block">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-1.5 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={author?.avatar || "/placeholder.svg"}
                          alt={author?.name || "Author"}
                          className="w-full h-full rounded-2xl object-cover border-4 border-white dark:border-gray-800"
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
                      className="absolute -bottom-2 -right-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 p-2.5 rounded-xl shadow-2xl transition-all duration-300 hover:scale-110"
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

                  <h3 className="font-bold text-slate-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                    Written By
                  </h3>

                  <Link
                    href={`/authors/${authorSlug}`}
                    className="group block mb-3"
                  >
                    <p className="text-xl text-sky-700 dark:text-sky-300 font-semibold mb-4">
                      {author?.name}
                    </p>
                  </Link>

                  <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl text-base">
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
                className="group flex items-center gap-3 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 flex-1 min-w-0"
              >
                <div className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                      Previous
                    </span>
                    <span className="text-sm font-medium line-clamp-1 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                      {prevArticle.title}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {nextArticle && (
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="group flex items-center gap-3 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 flex-1 min-w-0 justify-end text-right"
              >
                <div className="flex items-center gap-2 flex-row-reverse">
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wide">
                      Next
                    </span>
                    <span className="text-sm font-medium line-clamp-1 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
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
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100 dark:border-sky-900">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ListOrdered className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-2">
                {headings && headings.length > 0 ? (
                  headings.map(({ id, text, level }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block py-2 px-3 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200 text-sm group ${
                        level === 1
                          ? "text-sky-700 dark:text-sky-300 font-semibold border-l-2 border-sky-500 dark:border-sky-400"
                          : level === 2
                          ? "text-gray-800 dark:text-gray-200 font-medium border-l-2 border-gray-300 dark:border-gray-600"
                          : "text-gray-700 dark:text-gray-300 font-normal border-l-2 border-gray-300 dark:border-gray-600"
                      }`}
                      style={{
                        marginLeft: `${(level - 1) * 12}px`,
                      }}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200 block line-clamp-1">
                        {text}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No headings available
                  </p>
                )}
              </nav>
            </CardContent>
          </Card>

          {/* Article Stats */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100 dark:border-sky-900">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Article Stats
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Published</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(article.published_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reads</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    <CountUp end={readCount || 0} duration={2} />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                  <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                    {categoryName}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100 dark:border-sky-900">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Recent Articles
                </h3>
              </div>
              <div className="space-y-3">
                {recentArticles.slice(0, 5).map((recentArticle) => (
                  <Link
                    key={recentArticle.id}
                    href={`/articles/${recentArticle.slug}`}
                    className="block group"
                  >
                    <div className="p-3 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                        {recentArticle.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(recentArticle.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Articles */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-gray-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100 dark:border-sky-900">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  Popular Articles
                </h3>
              </div>
              <div className="space-y-3">
                {topReadArticles.slice(0, 5).map((popularArticle) => (
                  <Link
                    key={popularArticle.id}
                    href={`/articles/${popularArticle.slug}`}
                    className="block group"
                  >
                    <div className="p-3 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                        {popularArticle.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {popularArticle.read_count} reads
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        /* Force dark mode compatibility */
        .dark .prose {
          color: inherit;
        }
        
        .dark .prose h1,
        .dark .prose h2,
        .dark .prose h3,
        .dark .prose h4,
        .dark .prose strong {
          color: inherit;
        }
        
        .dark .prose code:not(pre code) {
          background: rgb(12 74 110 / 0.3);
          color: rgb(125 211 252);
        }
      `}</style>
    </div>
  );
}