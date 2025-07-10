"use client";

import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function NewArticlePage() {
  // --- Auth state ---
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  // --- Article form state ---
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: [] as number[],
    featured: false,
    published_at: new Date().toISOString().slice(0, 10),
    content: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch categories & tags once
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch("http://localhost:8000/api/categories/"),
          fetch("http://localhost:8000/api/tags/"),
        ]);
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        if (!tagRes.ok) throw new Error("Failed to fetch tags");

        const catData = await catRes.json();
        const tagData = await tagRes.json();

        setCategories(Array.isArray(catData) ? catData : catData.results || []);
        setTags(Array.isArray(tagData) ? tagData : tagData.results || []);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
        setCategories([]);
        setTags([]);
      }
    }
    fetchData();
  }, []);

  // Login handler
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setLoginError("Invalid username or password");
        return;
      }
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUsername("");
      setPassword("");
    } catch (error) {
      setLoginError("Login failed");
    }
  }

  // Logout handler
  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    setMessage(null);
  }

  // Article form change handler
  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Toggle tags
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

  // Submit article
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setMessage("You must be logged in to submit an article.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const payload = {
      title: form.title,
      category: Number(form.category),
      tags: form.tags,
      featured: form.featured,
      published_at: form.published_at,
      content: form.content,
    };

    try {
      const res = await fetch("http://localhost:8000/api/articles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Article submitted successfully!");
        setForm({
          title: "",
          category: "",
          tags: [],
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

  // Render login form or article form depending on token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h1 className="text-xl font-bold mb-4">Login</h1>

          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />

          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />

          {loginError && (
            <p className="text-red-600 mb-4">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // Logged in: show article form
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-6 gap-16">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-4 space-y-6 bg-white p-6 rounded-xl shadow-lg"
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
                  "border border-gray-300 rounded-lg p-4 text-base leading-relaxed focus:outline-none focus:ring-4 focus:ring-blue-400 bg-white text-gray-900 shadow-sm transition-shadow",
              }}
              previewOptions={{
                className:
                  "bg-white text-gray-900 rounded-lg p-4 shadow-sm border border-gray-200",
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
        <aside className="lg:col-span-2">{/* Add your sidebar here */}</aside>
      </main>
    </div>
  );
}