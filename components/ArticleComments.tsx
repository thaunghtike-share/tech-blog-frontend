"use client";

import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://192.168.100.7:8000/api";

interface Comment {
  id: number;
  name: string;
  content: string;
  rating?: number | null;
  created_at: string;
}

interface ArticleCommentsProps {
  articleId: number;
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [showAll, setShowAll] = useState(false);

  async function fetchComments() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments/`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      const commentsArray = Array.isArray(data) ? data : data.results || [];
      setComments(commentsArray);
    } catch (err: any) {
      setError(err.message || "Error loading comments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setSubmitError("Please fill in both name and comment.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${articleId}/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), content: content.trim(), rating }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to submit comment");
      }

      setName("");
      setContent("");
      setRating(null);
      fetchComments();
    } catch (err: any) {
      setSubmitError(err.message || "Error submitting comment");
    } finally {
      setSubmitting(false);
    }
  }

  const displayedComments = showAll ? comments : comments.slice(0, 3);

  // Helper to render stars for rating display (read-only)
  function renderStars(count: number | null | undefined) {
    if (!count) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`inline-block text-yellow-400 ${
            i <= count ? "opacity-100" : "opacity-30"
          }`}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return stars;
  }

  return (
    <section className="mt-10 max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h2>
        {comments.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showAll ? "Show less" : `Show all`}
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 border-2 border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mb-4 px-3 py-2 bg-red-50 rounded">{error}</p>
      )}

      {!loading && !error && comments.length === 0 && (
        <p className="text-sm text-gray-500 italic py-4">No comments yet. Be the first to comment!</p>
      )}

      <div className="space-y-6 mb-6">
        {displayedComments.map(({ id, name, content, rating, created_at }) => (
          <div key={id} className="pb-4 border-b border-gray-100 last:border-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-900">{name}</span>
              <span className="text-xs text-gray-400">
                {new Date(created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center mb-1 space-x-2">
              {renderStars(rating)}
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3 text-gray-800">Add your comment</h3>

        {submitError && (
          <p className="text-xs text-red-600 mb-3">{submitError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Write your comment..."
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Your rating:
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= (rating ?? 0) ? "text-yellow-400" : "text-gray-300"
                  } focus:outline-none`}
                  aria-label={`${star} Star${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
              {rating !== null && (
                <button
                  type="button"
                  onClick={() => setRating(null)}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Clear rating"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 px-4 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-400 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post comment"}
          </button>
        </form>
      </div>
    </section>
  );
}