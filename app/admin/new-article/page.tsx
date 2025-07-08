"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function NewArticlePage() {
  const [form, setForm] = useState({
    title: "",
    category: "1",
    tags: "",
    author: "1",
    featured: false,
    published_at: new Date().toISOString().slice(0, 10),
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)
      .map(Number);

    const payload = {
      title: form.title,
      category: Number(form.category),
      tags: tagsArray,
      author: Number(form.author),
      featured: form.featured,
      published_at: form.published_at,
      content: form.content,
    };

    try {
      const res = await fetch("http://localhost:8000/api/articles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Article submitted successfully!");
        setForm({
          title: "",
          category: "1",
          tags: "",
          author: "1",
          featured: false,
          published_at: new Date().toISOString().slice(0, 10),
          content: "",
        });
      } else {
        const errorData = await res.json();
        setMessage("Failed to submit article: " + JSON.stringify(errorData));
      }
    } catch (error) {
      setMessage("Error submitting article: " + String(error));
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Article Editor</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category (ID)</label>
          <input
            type="number"
            min={1}
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <small className="text-gray-500">Enter category ID</small>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-1">Tags (comma separated IDs)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => handleChange("tags", e.target.value)}
            placeholder="e.g. 1,2,3"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold mb-1">Author (ID)</label>
          <input
            type="number"
            min={1}
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center space-x-2">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
            className="h-5 w-5"
          />
          <label htmlFor="featured" className="font-semibold">
            Featured Article
          </label>
        </div>

        {/* Published At */}
        <div>
          <label className="block font-semibold mb-1">Published Date</label>
          <input
            type="date"
            value={form.published_at}
            onChange={(e) => handleChange("published_at", e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Content - Markdown Editor */}
        <div>
          <label className="block font-semibold mb-1">Content (Markdown)</label>
          <MDEditor
            value={form.content}
            onChange={(val) => handleChange("content", val || "")}
            height={300}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Article"}
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}