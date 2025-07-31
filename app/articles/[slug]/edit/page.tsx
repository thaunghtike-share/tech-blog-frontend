"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Local storage key constants
const DRAFT_KEY = (slug: string) => `edit-article-draft-${slug}`;
const SAVE_INTERVAL = 5000; // 5 seconds

interface Category {
  id: number;
  name: string;
}
interface Tag {
  id: number;
  name: string;
}

export default function EditArticlePage() {
  const { slug } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [hasTriedFetch, setHasTriedFetch] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: [] as number[],
    featured: false,
    published_at: "",
    content: "",
  });

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Custom fullscreen handler for MDEditor
  const handleEditorFullscreen = () => {
    if (!editorRef.current) return;

    if (!fullscreen) {
      editorRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Load token and draft on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setAuthenticated(true);

      // Load draft if exists
      const draft = localStorage.getItem(DRAFT_KEY(slug as string));
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
  }, [slug]);

  // Auto-save draft
  useEffect(() => {
    if (!token || !authenticated || !isAuthor) return;

    const saveDraft = () => {
      localStorage.setItem(DRAFT_KEY(slug as string), JSON.stringify(form));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const interval = setInterval(saveDraft, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [form, token, authenticated, isAuthor, slug]);

  // Load article data when authenticated
  useEffect(() => {
    if (!token || !authenticated) return;

    const loadData = async () => {
      try {
        const [catRes, tagRes, articleRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
          fetch(`${API_BASE_URL}/articles/${slug}/`, {
            headers: { Authorization: `Token ${token}` },
          }),
        ]);

        const catData = await catRes.json();
        const tagData = await tagRes.json();

        setCategories(Array.isArray(catData) ? catData : catData.results || []);
        setTags(Array.isArray(tagData) ? tagData : tagData.results || []);

        if (articleRes.ok) {
          const articleData = await articleRes.json();
          setForm({
            title: articleData.title || "",
            category: String(articleData.category || ""),
            tags: articleData.tags || [],
            featured: articleData.featured || false,
            published_at: articleData.published_at?.slice(0, 10) || "",
            content: articleData.content || "",
          });
          setIsAuthor(true);
        } else {
          setIsAuthor(false);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setIsAuthor(false);
      } finally {
        setHasTriedFetch(true);
      }
    };

    loadData();
  }, [token, authenticated, slug]);

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
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setAuthenticated(true);
      setUsername("");
      setPassword("");
    } catch {
      setLoginError("Login failed");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setAuthenticated(false);
    setIsAuthor(false);
    setMessage(null);
    setHasTriedFetch(false);
  }

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY(slug as string));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title: form.title,
      category: Number(form.category),
      tags: form.tags,
      featured: form.featured,
      published_at: form.published_at
        ? new Date(form.published_at).toISOString()
        : null,
      content: form.content,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({ text: "Article updated successfully!", type: "success" });
        clearDraft(); // Clear draft on successful update
      } else {
        const errorData = await res.json();
        setMessage({
          text: "Update failed: " + JSON.stringify(errorData),
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "Update failed: " + String(err), type: "error" });
    }

    setLoading(false);
  }

  function toggleTag(id: number) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(id)
        ? prev.tags.filter((t) => t !== id)
        : [...prev.tags, id],
    }));
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-50 relative ${
        fullscreen ? "overflow-hidden" : ""
      }`}
    >
      {!fullscreen && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
          <div className="relative">
            {" "}
            {/* Wrapper div with relative positioning */}
            <MinimalHeader />
          </div>
        </>
      )}

      <main
        className={`${
          fullscreen
            ? "fixed inset-0 z-50 bg-white"
            : "max-w-4xl mx-auto py-10 px-4 flex-grow relative z-10"
        }`}
      >
        {!authenticated ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Login to Edit
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-red-600 text-sm text-center py-2 bg-red-50 rounded-md">
                    {loginError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        ) : !isAuthor && hasTriedFetch ? (
          <div className="text-center py-20">
            <div className="bg-white p-6 max-w-md mx-auto rounded-lg shadow border border-gray-200">
              <p className="text-red-600 font-medium">
                You are not authorized to edit this article.
              </p>
            </div>
          </div>
        ) : isAuthor ? (
          <div
            className={`bg-white ${
              fullscreen
                ? "h-full"
                : "p-8 rounded-lg shadow-md border border-gray-200"
            }`}
          >
            {!fullscreen && (
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Article
                  </h2>
                  <p className="text-sm text-gray-500">
                    {lastSaved && `Draft auto-saved at ${lastSaved}`}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-sm bg-blue-700 hover:bg-black text-white px-4 py-2 rounded-md transition"
                >
                  Logout
                </button>
              </div>
            )}

            {!fullscreen && message && (
              <div
                className={`p-4 mb-6 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleUpdate}
              className={`space-y-6 ${
                fullscreen ? "h-full flex flex-col" : ""
              }`}
            >
              {!fullscreen && (
                <>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="Article title"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="published_at"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Publish Date
                    </label>
                    <input
                      type="date"
                      id="published_at"
                      value={form.published_at}
                      onChange={(e) =>
                        setForm({ ...form, published_at: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          className={`px-4 py-1.5 rounded-full text-sm border transition ${
                            form.tags.includes(tag.id)
                              ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm({ ...form, featured: e.target.checked })
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
                </>
              )}

              <div className={`${fullscreen ? "flex-grow flex flex-col" : ""}`}>
                {!fullscreen && (
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                )}
                <div
                  ref={editorRef}
                  data-color-mode="light"
                  className={`${fullscreen ? "h-full" : ""}`}
                >
                  <MDEditor
                    value={form.content}
                    onChange={(val) => setForm({ ...form, content: val || "" })}
                    height={fullscreen ? "100%" : 400}
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
                    className={`${
                      fullscreen
                        ? "h-full rounded-none"
                        : "rounded-md border border-gray-200 shadow-sm"
                    }`}
                    extraCommands={[
                      {
                        name: "fullscreen",
                        keyCommand: "fullscreen",
                        buttonProps: { "aria-label": "Toggle fullscreen" },
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 512 512">
                            <path
                              fill="currentColor"
                              d="M396.795 396.8H320V448h128V320h-51.205zm-281.59 0H192V448H64V320h51.205zm0-281.595H64V192h128V64H192zm281.595 0H320V64h128v128h-51.205z"
                            ></path>
                          </svg>
                        ),
                        execute: (state, api) => {
                          handleEditorFullscreen();
                        },
                      },
                    ]}
                  />
                </div>
              </div>

              {!fullscreen && (
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
                    className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                      loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
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
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading article data...</p>
          </div>
        )}
      </main>

      {!fullscreen && <MinimalFooter />}
    </div>
  );
}
