"use client";
import { useEffect, useState } from "react";
import type React from "react";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function NewArticlePage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
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

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
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

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
    setMessage(null);
  }

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTag(id: number) {
    setForm((prev) => {
      const isSelected = prev.tags.includes(id);
      return {
        ...prev,
        tags: isSelected
          ? prev.tags.filter((tagId) => tagId !== id)
          : [...prev.tags, id],
      };
    });
  }

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
      const res = await fetch(`${API_BASE_URL}/articles/`, {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <MinimalHeader />

      <main className="-mt-10 md:-mt-1 flex-grow max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 relative z-10">
        <section className="lg:col-span-6">
          {/* 🚧 Invitation-only Notice */}
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 flex items-start gap-2 text-sm">
            🛂{" "}
            <span>
              <strong>Writing articles is currently by invitation only.</strong>
              <br />
              If you'd like access, please{" "}
              <a
                href="https://m.me/learndevopsnowbytho"
                target="_blank"
                className="underline text-blue-600 hover:text-blue-800"
              >
                contact the admin via Messenger
              </a>
              .
            </span>
          </div>
          {!token ? (
            <form
              onSubmit={handleLogin}
              className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
            >
              <h1 className="text-xl font-bold text-center">Login</h1>
              <label className="block mb-1 font-semibold text-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm"
              />
              <label className="block mb-1 font-semibold text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mb-5 text-sm"
              />
              {loginError && (
                <p className="text-red-600 mb-3 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Login
              </button>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">New Article Editor</h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                >
                  Logout
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full space-y-6"
              >
                <div>
                  <label className="block font-semibold mb-1 text-sm">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-sm">
                    Tags (select one or more)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      const selected = form.tags.includes(tag.id);
                      return (
                        <button
                          type="button"
                          key={tag.id}
                          onClick={() => toggleTag(tag.id)}
                          className={`px-3 py-1 rounded-full border text-sm ${
                            selected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => handleChange("featured", e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="featured" className="font-semibold text-sm">
                    Featured Article
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={form.published_at}
                    onChange={(e) =>
                      handleChange("published_at", e.target.value)
                    }
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">
                    Content (Markdown)
                  </label>
                  <div data-color-mode="light">
                    <MDEditor
                      value={form.content}
                      onChange={(val) => handleChange("content", val || "")}
                      height={500}
                      preview="live"
                      textareaProps={{
                        placeholder: "Write your article content here...",
                        className:
                          "text-sm leading-relaxed bg-white text-gray-900 transition-shadow focus:outline-none focus:ring-4 focus:ring-blue-400",
                      }}
                      previewOptions={{
                        className:
                          "bg-white text-gray-900 rounded-lg p-4 shadow-sm border border-gray-200",
                      }}
                      className="rounded-md border border-gray-200 shadow-md"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("new-article-draft");
                      setForm((prev) => ({ ...prev, content: "" }));
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                    aria-label="Clear saved draft"
                  >
                    Clear Draft
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    {loading ? "Submitting..." : "Submit Article"}
                  </button>
                </div>

                {message && (
                  <p className="mt-4 text-center text-sm">{message}</p>
                )}
              </form>
            </>
          )}
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}
