"use client";

import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";

interface Category {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function NewArticlePage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: [] as number[],
    author: "",
    featured: false,
    published_at: new Date().toISOString().slice(0, 10),
    content: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, authorRes, tagRes] = await Promise.all([
          fetch("http://localhost:8000/api/categories"),
          fetch("http://localhost:8000/api/authors"),
          fetch("http://localhost:8000/api/tags"),
        ]);
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        if (!authorRes.ok) throw new Error("Failed to fetch authors");
        if (!tagRes.ok) throw new Error("Failed to fetch tags");

        const catData = await catRes.json();
        const authorData = await authorRes.json();
        const tagData = await tagRes.json();

        setCategories(Array.isArray(catData) ? catData : catData.results || []);
        setAuthors(Array.isArray(authorData) ? authorData : authorData.results || []);
        setTags(Array.isArray(tagData) ? tagData : tagData.results || []);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
        setCategories([]);
        setAuthors([]);
        setTags([]);
      }
    }
    fetchData();
  }, []);

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Toggle tag selection
  function toggleTag(id: number) {
    setForm((prev) => {
      const isSelected = prev.tags.includes(id);
      if (isSelected) {
        return { ...prev, tags: prev.tags.filter((tagId) => tagId !== id) };
      } else {
        return { ...prev, tags: [...prev.tags, id] };
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: form.title,
      category: Number(form.category),
      tags: form.tags,
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
          category: "",
          tags: [],
          author: "",
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-16">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 space-y-6 bg-white p-6 rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6">New Article Editor</h1>

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

          {/* Category Dropdown */}
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags as buttons */}
          <div>
            <label className="block font-semibold mb-2">Tags (select one or more)</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const selected = form.tags.includes(tag.id);
                return (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-1 rounded-full border ${
                      selected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    } focus:outline-none`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Author Dropdown */}
          <div>
            <label className="block font-semibold mb-1">Author</label>
            <select
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
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
              height={350}
              preview="edit"
              textareaProps={{
                placeholder: "Write your article content here...",
                className:
                  "border border-gray-300 rounded p-3 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black",
              }}
              previewOptions={{
                className: "bg-white text-black rounded p-3",
              }}
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

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <MinimalSidebar />
        </aside>
      </main>

      <MinimalFooter />
    </div>
  );
}