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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Not found");

    const article = await res.json();

    const cleanDescription =
      article.content
        ?.replace(/[#_*>\[\]()`]/g, "")
        .slice(0, 150)
        .trim() || "Learn DevOps Now";

    const title = article.title || "Learn DevOps Now";
    const combinedTitle = `${title} - ${cleanDescription}`;

    let image =
      article.cover_image ||
      "https://www.learndevopsnow.it.com/images/mylogo.jpg";

    if (image && !image.startsWith("http")) {
      image = `https://www.learndevopsnow.it.com${
        image.startsWith("/") ? "" : "/"
      }${image}`;
    }

    return {
      title: combinedTitle,
      description: cleanDescription,
      openGraph: {
        title: combinedTitle,
        description: "",
        type: "article",
        url: `https://www.learndevopsnow.it.com/articles/${slug}`,
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title: combinedTitle,
        description: "",
        images: [image],
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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

  // Prepare combined metadata strings here for <Head>
  const cleanDescription =
    article.content
      ?.replace(/[#_*>\[\]()`]/g, "")
      .slice(0, 150)
      .trim() || "Learn DevOps Now";

  const combinedTitle = `${article.title} - ${cleanDescription}`;

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
        <title>{combinedTitle}</title>
        <meta name="description" content={cleanDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={combinedTitle} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={image} />
        <meta
          property="og:url"
          content={`https://www.learndevopsnow.it.com/articles/${slug}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={combinedTitle} />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content={image} />
      </Head>

      <div className="min-h-screen bg-white/95 relative overflow-x-hidden">
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