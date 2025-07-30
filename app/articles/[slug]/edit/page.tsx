"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { Loader, Save, Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface ArticleData {
  id: number;
  title: string;
  slug: string;
  category: number;
  tags: number[];
  featured: boolean;
  published_at: string;
  content: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DRAFT_KEY = "edit-article-draft";
const SAVE_INTERVAL = 5000;

export default function EditArticlePage() {
  const { slug } = useParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [form, setForm] = useState<ArticleData | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState({
    page: true,
    submit: false,
    delete: false,
    login: false,
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load token and check authentication
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadArticleData(savedToken);
    } else {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  }, [slug]);

  // Auto-save draft
  useEffect(() => {
    if (!token || !form) return;

    const saveDraft = () => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const interval = setInterval(saveDraft, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [form, token]);

  async function loadArticleData(token: string) {
    try {
      setLoading((prev) => ({ ...prev, page: true }));
      setMessage(null);

      // First find article by slug
      const findRes = await fetch(`${API_BASE_URL}/articles/?slug=${slug}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (!findRes.ok) {
        if (findRes.status === 401) {
          // Token is invalid, force logout
          handleLogout();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to find article");
      }

      const findData = await findRes.json();
      const articles = Array.isArray(findData)
        ? findData
        : findData.results || [];

      if (articles.length === 0) {
        throw new Error("Article not found");
      }

      const articleId = articles[0].id;

      // Load full article data
      const [articleRes, catRes, tagRes] = await Promise.all([
        fetch(`${API_BASE_URL}/articles/${articleId}/`, {
          headers: { Authorization: `Token ${token}` },
        }),
        fetch(`${API_BASE_URL}/categories/`, {
          headers: { Authorization: `Token ${token}` },
        }),
        fetch(`${API_BASE_URL}/tags/`, {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      if (!articleRes.ok) throw new Error("Failed to load article");
      if (!catRes.ok) throw new Error("Failed to load categories");
      if (!tagRes.ok) throw new Error("Failed to load tags");

      const articleData = await articleRes.json();
      const catData = await catRes.json();
      const tagData = await tagRes.json();

      // Check for existing draft
      const draft = localStorage.getItem(DRAFT_KEY);
      const initialForm = draft
        ? JSON.parse(draft)
        : {
            ...articleData,
            published_at:
              articleData.published_at?.slice(0, 10) ||
              new Date().toISOString().slice(0, 10),
          };

      setForm(initialForm);
      setCategories(Array.isArray(catData) ? catData : catData.results || []);
      setTags(Array.isArray(tagData) ? tagData : tagData.results || []);

      if (draft) {
        setMessage({ text: "Draft loaded", type: "success" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Loading failed";
      setMessage({
        text: errorMessage,
        type: "error",
      });
      if (errorMessage.includes("Session expired")) {
        setToken(null);
      }
      setForm(null);
    } finally {
      setLoading((prev) => ({ ...prev, page: false }));
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoading((prev) => ({ ...prev, login: true }));

    try {
      const res = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail ||
            errorData.non_field_errors?.[0] ||
            "Invalid credentials"
        );
      }

      const data = await res.json();
      if (!data.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUsername("");
      setPassword("");
      await loadArticleData(data.token);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem(DRAFT_KEY);
    setToken(null);
    setForm(null);
    setMessage(null);
    router.refresh();
  }

  function handleChange(field: string, value: any) {
    if (!form) return;
    setForm((prev) => ({ ...prev!, [field]: value }));
  }

  function toggleTag(id: number) {
    if (!form) return;
    setForm((prev) => ({
      ...prev!,
      tags: prev!.tags.includes(id)
        ? prev!.tags.filter((tagId) => tagId !== id)
        : [...prev!.tags, id],
    }));
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    if (form) {
      setForm({
        ...form,
        published_at: new Date().toISOString().slice(0, 10),
      });
    }
    setMessage({ text: "Draft cleared", type: "success" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !form) return;

    setLoading((prev) => ({ ...prev, submit: true }));
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/articles/${form.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          throw new Error("Session expired. Please login again.");
        }
        const errorData = await res.json();
        throw new Error(errorData.detail || JSON.stringify(errorData));
      }

      setMessage({ text: "Article updated!", type: "success" });
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Update failed",
        type: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  }

  async function handleDelete() {
    if (!token || !form || !confirm("Delete this article permanently?")) return;

    setLoading((prev) => ({ ...prev, delete: true }));
    setMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/articles/${form.id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to delete");
      }

      setMessage({ text: "Article deleted", type: "success" });
      localStorage.removeItem(DRAFT_KEY);
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Deletion failed",
        type: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  if (loading.page) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MinimalHeader />
        <main className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin h-10 w-10 text-blue-600" />
        </main>
        <MinimalFooter />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-x-hidden">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <MinimalHeader />
        <main className="-mt-10 md:-mt-1 flex-grow max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 relative z-10">
          <section className="lg:col-span-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-6 flex items-start gap-2 text-sm">
                🛂 <span>You need to login to edit this article</span>
              </div>

              <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h1 className="text-xl font-bold text-center mb-4">Login</h1>
                {loginError && (
                  <div className="text-red-600 text-sm mb-4">{loginError}</div>
                )}
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
                  <button
                    type="submit"
                    disabled={loading.login}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading.login ? (
                      <span className="flex items-center justify-center">
                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                        Logging in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MinimalHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-2">
              {message?.type === "error" ? "Error" : "Article Not Found"}
            </h2>
            <p className="mb-4">
              {message?.text || "The article could not be loaded"}
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <MinimalHeader />

      <main className="-mt-10 md:-mt-1 flex-grow max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-10 relative z-10">
        <section className="lg:col-span-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Article</h1>
              {lastSaved && (
                <p className="text-sm text-gray-500">
                  Draft auto-saved at {lastSaved}
                </p>
              )}
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
                      handleChange("category", Number(e.target.value))
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
                  {tags.map((tag) => (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                        form.tags.includes(tag.id)
                          ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
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
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={clearDraft}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    Clear Draft
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading.delete}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {loading.delete ? (
                      <span className="flex items-center">
                        <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" />
                        Deleting...
                      </span>
                    ) : (
                      "Delete Article"
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading.submit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading.submit ? (
                    <span className="flex items-center">
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}