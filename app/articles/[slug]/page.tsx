import { notFound } from "next/navigation";
import Head from "next/head";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import type { Metadata } from "next";
import { ArticleContent } from "@/components/article-content";

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
  read_count?: number;
  cover_image?: string;
}

interface Author {
  id: number;
  slug: string;
  name: string;
  bio?: string;
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

export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.learndevopsnow.it.com";

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
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const author: Author = await res.json();
    if (!author.slug) {
      author.slug = `author-${author.id}`;
    }
    return author;
  } catch {
    return null;
  }
}

function extractHeadings(
  markdown: string
): { text: string; level: number; id: string }[] {
  const idCounts: Record<string, number> = {};
  return markdown
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/);
      if (!match) return null;
      const [, hashes, rawText] = match;
      const level = hashes.length;
      let baseId = rawText
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (idCounts[baseId]) {
        idCounts[baseId] += 1;
        baseId = `${baseId}-${idCounts[baseId]}`;
      } else {
        idCounts[baseId] = 1;
      }
      return { text: rawText, level, id: baseId };
    })
    .filter(Boolean) as { text: string; level: number; id: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Not found");

    const article = await res.json();

    const title = article.title || "Learn DevOps Now";
    // Improved content extraction
    const description =
      article.content
        ?.replace(/[#*_\[\]()>`~]/g, "") // Remove markdown formatting
        .replace(/\s+/g, " ") // Collapse whitespace
        .trim()
        .substring(0, 160) + "..." ||
      "Learn DevOps Now - DevOps tutorials and articles";

    // Improved image URL handling
    let imageUrl = article.cover_image || `${SITE_URL}/images/mylogo.jpg`;
    if (imageUrl && !imageUrl.startsWith("http")) {
      imageUrl = imageUrl.startsWith("/")
        ? `${SITE_URL}${imageUrl}`
        : `${SITE_URL}/${imageUrl}`;
    }

    return {
      title,
      description,
      metadataBase: new URL(SITE_URL),
      alternates: {
        canonical: `/articles/${slug}`,
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: `${SITE_URL}/articles/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        publishedTime: article.published_at,
        authors: ["Learn DevOps Now"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Article not found",
      description: "This article does not exist.",
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) notFound();

  const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Article not found or failed to load.</p>
      </div>
    );
  }

  const article: Article = await res.json();

  const [author, allArticles, tags, categories, authors] = await Promise.all([
    fetchAuthor(article.author),
    fetchJSON<Article>(`${API_BASE_URL}/articles/`),
    fetchJSON<Tag>(`${API_BASE_URL}/tags/`),
    fetchJSON<Category>(`${API_BASE_URL}/categories/`),
    fetchJSON<Author>(`${API_BASE_URL}/authors/`),
  ]);

  const description =
    article.content
      ?.replace(/[#_*>\[\]()`]/g, "")
      .slice(0, 150)
      .trim() || "Learn DevOps Now";

  let image =
    article.cover_image ||
    "https://www.learndevopsnow.it.com/images/mylogo.jpg";
  if (image && !image.startsWith("http")) {
    image = `https://www.learndevopsnow.it.com${
      image.startsWith("/") ? "" : "/"
    }${image}`;
  }

  const headings = extractHeadings(article.content);
  const sorted = allArticles.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const currentIndex = sorted.findIndex((a) => a.id === article.id);
  const prevArticle = sorted[currentIndex + 1] || null;
  const nextArticle = sorted[currentIndex - 1] || null;
  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5);
  const sameCategoryArticles = sorted
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 5);

  const publishDate = new Date(article.published_at).toLocaleDateString();
  const categoryName =
    categories.find((c) => c.id === article.category)?.name || "General";
  const tagNames = article.tags
    .map((id) => tags.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="og:url"
          content={`https://www.learndevopsnow.it.com/articles/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        <MinimalHeader />
        <div className="md:-mt-1 -mt-19">
          <ArticleContent
            article={article}
            author={author}
            headings={headings}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            recentArticles={recentArticles}
            sameCategoryArticles={sameCategoryArticles}
            publishDate={publishDate}
            categoryName={categoryName}
            tagNames={tagNames}
            authors={authors}
            categories={categories}
            readCount={article.read_count || 0}
          />
        </div>
        <div className="md:-mt-2 -mt-5">
          <MinimalFooter />
        </div>
      </div>
    </>
  );
}