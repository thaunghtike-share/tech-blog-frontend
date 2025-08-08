"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";

interface AuthorSummary {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  slug: string;
  featured: boolean;
  job_title: string;
  company: string;
  linkedin?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<AuthorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/authors/`);
        if (!res.ok) throw new Error("Failed to fetch authors");
        const data = await res.json();
        if (Array.isArray(data)) {
          setAuthors(data);
        } else if (Array.isArray(data.results)) {
          setAuthors(data.results);
        } else {
          setAuthors([]);
          throw new Error("Unexpected data format from API");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <MinimalHeader />
      <section className="-mt-11 md:-mt-6 bg-gray-50 backdrop-blur-sm py-12 relative z-10">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-relaxed">
            <span className="text-gray-700">Our </span>
            <span className="text-blue-600">Authors</span>
          </h1>
          <p className="text-base md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Discover in-depth articles and expertise from passionate authors who
            are pioneering advancements in DevOps, cloud computing, AI, and
            cutting-edge infrastructure technologies
          </p>
        </div>
      </section>
      <main className="-mt-17 max-w-7xl mx-auto px-4 py-12 relative z-10">
        {loading ? (
          <p className="text-center text-gray-600">Loading authors...</p>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                setAuthors([]);
                fetch(`${API_BASE_URL}/authors/`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (Array.isArray(data)) setAuthors(data);
                    else if (Array.isArray(data.results))
                      setAuthors(data.results);
                  })
                  .catch((e) => setError(e.message))
                  .finally(() => setLoading(false));
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : authors.length === 0 ? (
          <p className="text-center text-gray-600">No authors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <Card
                key={author.id}
                id={`author-${author.slug}`}
                className="border-0 bg-white shadow-sm hover:shadow-md transition cursor-pointer h-full flex flex-col"
              >
                <CardContent className="flex flex-col items-center space-y-4 p-6 flex-grow">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden">
                      <img
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition"
                      >
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                  </div>
                  <div className="text-center space-y-2 w-full">
                    <Link
                      href={`/authors/${author.slug}`}
                      className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                      {author.name}
                    </Link>
                    <p className="text-sm text-gray-600 font-medium">
                      {author.job_title} at {author.company}
                    </p>
                    {author.bio && (
                      <p className="text-gray-500 text-sm line-clamp-3">
                        {author.bio}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <div className="-mt-4 md:-mt-4">
        <MinimalFooter />
      </div>
    </div>
  );
}