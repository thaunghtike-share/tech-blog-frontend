import { Metadata } from 'next'

interface ArticleSEOProps {
  article: {
    title: string
    content: string
    published_at: string
    author_name: string
    category_name: string
    tags: string[]
    slug: string
    cover_image?: string
  }
}

export function generateArticleMetadata({ article }: ArticleSEOProps): Metadata {
  const description = article.content.slice(0, 160) + '...'
  
  return {
    title: `${article.title} | Learn DevOps Now - Myanmar`,
    description,
    keywords: [...article.tags, 'devops myanmar', 'burmese tutorial', 'myanmar developers'],
    openGraph: {
      title: `${article.title} | Learn DevOps Now - Myanmar`,
      description,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author_name],
      tags: article.tags,
      images: article.cover_image ? [article.cover_image] : ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | Learn DevOps Now - Myanmar`,
      description,
      images: article.cover_image ? [article.cover_image] : ['/og-image.jpg'],
    },
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
  }
}