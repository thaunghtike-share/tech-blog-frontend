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

// Local storage key constants
const DRAFT_KEY = "new-article-draft";
const SAVE_INTERVAL = 5000; // 5 seconds

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
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load token and draft on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);

      if (savedToken) {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
          try {
            const parsedDraft = JSON.parse(draft);
            setForm(parsedDraft);
            setMessage({ text: "Draft loaded automatically", type: "success" });
          } catch (error) {
            console.error("Error parsing draft:", error);
          }
        }
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (!token) return;

    const saveDraft = () => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const interval = setInterval(saveDraft, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [form, token]);

  // Fetch categories and tags
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

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    setForm({
      title: "",
      category: "",
      tags: [],
      featured: false,
      published_at: new Date().toISOString().slice(0, 10),
      content: "",
    });
    setMessage({ text: "Draft cleared", type: "success" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setMessage({
        text: "You must be logged in to submit an article.",
        type: "error",
      });
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
        setMessage({
          text: "Article submitted successfully!",
          type: "success",
        });
        clearDraft(); // Clear draft on successful submission
      } else {
        const errorData = await res.json();
        setMessage({
          text: "Failed to submit article: " + JSON.stringify(errorData),
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Error submitting article: " + String(error),
        type: "error",
      });
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
          {!token ? (
            <div className="max-w-2xl mx-auto">
              {/* Invitation-only Notice - Only shows before login */}
              <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 flex items-start gap-2 text-sm">
                🛂{" "}
                <span>
                  <strong>
                    Writing articles is currently by invitation only.
                  </strong>
                  <br />
                  If you'd like access, please{" "}
                  <a
                    href="https://m.me/learndevopsnowbytho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    contact the admin via Messenger
                  </a>
                  .
                </span>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h1 className="text-xl font-bold text-center mb-4">Login</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-sm text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-sm text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  {loginError && (
                    <p className="text-red-600 text-sm">{loginError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    New Article Editor
                  </h1>
                  <p className="text-sm text-gray-500">
                    {lastSaved && `Draft auto-saved at ${lastSaved}`}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                {message && (
                  <div
                    className={`mb-4 p-3 rounded-md text-sm ${
                      message.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-sm text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-sm text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          handleChange("category", e.target.value)
                        }
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                      <label className="block font-medium text-sm text-gray-700 mb-1">
                        Published Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={form.published_at}
                        onChange={(e) =>
                          handleChange("published_at", e.target.value)
                        }
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-sm text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const selected = form.tags.includes(tag.id);
                        return (
                          <button
                            type="button"
                            key={tag.id}
                            onClick={() => toggleTag(tag.id)}
                            className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                              selected
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        handleChange("featured", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="featured"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Featured Article
                    </label>
                  </div>

                  <div>
                    <label className="block font-medium text-sm text-gray-700 mb-1">
                      Content (Markdown) <span className="text-red-500">*</span>
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
                            "text-sm leading-relaxed bg-white text-gray-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-400",
                        }}
                        previewOptions={{
                          className:
                            "bg-white text-gray-900 rounded-lg p-4 shadow-sm border border-gray-200",
                        }}
                        className="rounded-md border border-gray-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={clearDraft}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                      Clear Draft
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Article"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}