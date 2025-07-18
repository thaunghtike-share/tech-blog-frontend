"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";

const API_BASE_URL = "http://192.168.1.131:8000/api";

interface Article {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  read_count: number;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  job_title: string;
  company: string;
  linkedin?: string;
  articles: Article[];
}

export default function AuthorDetailPage() {
  const { slug } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const res = await fetch(`${API_BASE_URL}/authors/${slug}/details`);
        if (!res.ok) throw new Error("Failed to load author details");
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    if (slug) fetchAuthor();
  }, [slug]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>Error loading author: {error}</p>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>Loading author info...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-24 h-24 rounded-full object-cover border shadow-md mx-auto"
          />
          <h1 className="text-2xl font-bold text-gray-900">{author.name}</h1>
          <p className="text-sm text-gray-600">
            {author.job_title} at {author.company}
          </p>
          <p className="text-gray-700 max-w-xl mx-auto whitespace-pre-line">
            {author.bio}
          </p>
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              Connect on LinkedIn
            </a>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Articles by {author.name}
          </h2>
          <ul className="space-y-3">
            {author.articles.map((article) => (
              <li key={article.id} className="border-b pb-2">
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {article.title}
                </Link>
                <div className="text-sm text-gray-500">
                  Published:{" "}
                  {new Date(article.published_at).toLocaleDateString()} •{" "}
                  {article.read_count} reads
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
}
