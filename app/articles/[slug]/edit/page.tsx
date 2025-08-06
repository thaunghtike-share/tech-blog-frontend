"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";

interface Article {
  slug: string;
  title: string;
  content: string;
  published_at: string;
  category: number;
  tags: number[];
  featured: boolean;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface UserProfile {
  username: string;
  email: string;
  avatar?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DRAFT_KEY = "edit-article-draft";
const SAVE_INTERVAL = 5000;
const GOOGLE_CLIENT_ID =
  "588363886976-b1vchi7rt4bif974kpr076dl47po8tor.apps.googleusercontent.com";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);

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
  const [article, setArticle] = useState<Article | null>(null);

  // Load Google script
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleScriptLoaded(true);
        initializeGoogleSignIn();
      };
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!(window as any).google) return;
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      renderGoogleButton();
    };

    const renderGoogleButton = () => {
      const buttonContainer = document.getElementById("google-signin-button");
      if (buttonContainer && (window as any).google) {
        (window as any).google.accounts.id.renderButton(buttonContainer, {
          theme: "outline",
          size: "large",
          width: buttonContainer.clientWidth,
        });
        (window as any).google.accounts.id.prompt();
      }
    };

    if (typeof window !== "undefined") {
      if (!(window as any).google) {
        loadGoogleScript();
      } else {
        setGoogleScriptLoaded(true);
        initializeGoogleSignIn();
      }
    }

    return () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.cancel();
      }
    };
  }, []);

  // Re-render Google button when token changes
  useEffect(() => {
    if (googleScriptLoaded && !token) {
      const initializeGoogleSignIn = () => {
        if (!(window as any).google) return;
        (window as any).google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        const buttonContainer = document.getElementById("google-signin-button");
        if (buttonContainer) {
          (window as any).google.accounts.id.renderButton(buttonContainer, {
            theme: "outline",
            size: "large",
            width: buttonContainer.clientWidth,
          });
        }
      };
      initializeGoogleSignIn();
    }
  }, [token, googleScriptLoaded]);

  // Load token and user profile on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        fetchUserProfile(savedToken);
      }
    }
  }, []);

  // Fetch article when token changes
  useEffect(() => {
    const loadData = async () => {
      if (token) {
        try {
          await fetchArticle();
        } catch (error) {
          console.error("Error loading article:", error);
          setMessage({ text: "Failed to load article", type: "error" });
        }
      }
    };

    loadData();
  }, [token]);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/authors/me/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (res.ok) {
        const profileData = await res.json();
        setUserProfile({
          username: profileData.name || "Author",
          email: profileData.email || "",
          avatar: profileData.avatar,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchArticle = async () => {
    setArticleLoading(true);
    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const res = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        handleLogout();
        throw new Error("Session expired. Please login again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch article: ${res.status}`);
      }

      const articleData: Article = await res.json();
      setArticle(articleData);
      setForm({
        title: articleData.title,
        category: articleData.category.toString(),
        tags: articleData.tags,
        featured: articleData.featured,
        published_at: articleData.published_at,
        content: articleData.content,
      });
    } catch (error) {
      console.error("Error in fetchArticle:", error);
      throw error;
    } finally {
      setArticleLoading(false);
    }
  };

  // Handle Google login response
  async function handleGoogleResponse(response: any) {
    setGoogleLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Google login failed");
      }

      const data = await res.json();
      const authToken = data.token;
      localStorage.setItem("token", authToken);
      setToken(authToken);

      const profile = {
        username: data.user?.username || data.user?.first_name || "User",
        email: data.user?.email || "",
        avatar: data.author?.avatar || data.user?.avatar,
      };
      setUserProfile(profile);

      await fetchUserProfile(authToken);
      await fetchArticle();
    } catch (error: any) {
      setLoginError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  }

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
  const handleEditorFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!editorRef.current) return;
    if (!fullscreen) {
      editorRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

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
      const authToken = data.token;
      setToken(authToken);
      localStorage.setItem("token", authToken);
      setUsername("");
      setPassword("");
      const userData = {
        username: data.user?.username || username,
        email: data.user?.email || "",
      };
      setUserProfile(userData);
      setMessage({ text: "Login successful", type: "success" });
      await fetchArticle();
    } catch (error) {
      setLoginError("Login failed");
    }
  }

  function handleLogout() {
    setToken(null);
    setUserProfile(null);
    localStorage.removeItem("token");
    setMessage(null);
    setGoogleScriptLoaded(false);
    setTimeout(() => setGoogleScriptLoaded(true), 100);
  }

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTag(id: number) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(id)
        ? prev.tags.filter((tagId) => tagId !== id)
        : [...prev.tags, id],
    }));
  }

  async function handleArticleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!article) return;

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${article.slug}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          category: Number(form.category),
          tags: form.tags,
          featured: form.featured,
          published_at: form.published_at,
          content: form.content,
        }),
      });

      if (res.ok) {
        const updatedArticle = await res.json();
        setMessage({
          text: "Article updated successfully!",
          type: "success",
        });
        localStorage.removeItem(DRAFT_KEY);
        router.push(`/articles/${updatedArticle.slug}`);
      } else {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error: any) {
      setMessage({ text: "Error: " + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-50 relative ${
        fullscreen ? "overflow-hidden" : ""
      }`}
    >
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {!fullscreen && (
        <div className="top-0 z-50">
          <MinimalHeader />
        </div>
      )}

      <main
        className={`${
          fullscreen
            ? "fixed inset-0 z-50 bg-white"
            : "flex-grow max-w-7xl mx-auto px-4 py-10 relative z-10"
        }`}
      >
        <section className={`${fullscreen ? "h-full w-full" : ""}`}>
          {!token ? (
            <div className="max-w-md mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h1 className="text-xl font-bold text-center mb-4">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                </form>

                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500 text-sm">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex flex-col items-center w-full">
                  <div
                    id="google-signin-button"
                    className="w-full flex justify-center"
                  />
                  {googleLoading && (
                    <p className="text-blue-600 mt-2">
                      Logging in with Google...
                    </p>
                  )}
                </div>

                {(loginError || message) && (
                  <div
                    className={`mt-4 p-3 rounded-md text-sm ${
                      loginError || message?.type === "error"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {loginError || message?.text}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {!fullscreen && (
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Edit Article
                    </h1>
                    <p className="text-sm text-gray-500">
                      {lastSaved && `Draft auto-saved at ${lastSaved}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {userProfile && (
                      <div className="flex items-center">
                        {userProfile.avatar ? (
                          <img
                            src={userProfile.avatar}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
                            {userProfile.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {userProfile.username}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {articleLoading ? (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <p className="text-gray-700">Loading article...</p>
                </div>
              ) : !article ? (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                  <p className="text-gray-700">
                    {message?.type === "error"
                      ? message.text
                      : "Article not found"}
                  </p>
                  {message?.type === "error" && (
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Retry
                    </button>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={handleArticleSubmit}
                  className={`bg-white ${
                    fullscreen
                      ? "h-full"
                      : "p-6 rounded-lg shadow-md border border-gray-200"
                  }`}
                >
                  {!fullscreen && message && (
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

                  <div
                    className={`space-y-6 ${
                      fullscreen ? "h-full flex flex-col" : ""
                    }`}
                  >
                    {!fullscreen && (
                      <>
                        <div>
                          <label className="block font-medium text-sm text-gray-700 mb-1">
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                              handleChange("title", e.target.value)
                            }
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
                              Published Date{" "}
                              <span className="text-red-500">*</span>
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
                      </>
                    )}

                    <div
                      className={`${
                        fullscreen ? "flex-grow flex flex-col" : ""
                      }`}
                    >
                      {!fullscreen && (
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Content (Markdown){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setShowPreview(!showPreview)}
                              className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition"
                            >
                              {showPreview ? "Hide Preview" : "Show Preview"}
                            </button>
                          </div>
                        </div>
                      )}
                      <div
                        ref={editorRef}
                        data-color-mode="light"
                        className={`${fullscreen ? "h-full" : ""}`}
                      >
                        <MDEditor
                          value={form.content}
                          onChange={(val) => handleChange("content", val || "")}
                          height={fullscreen ? "100%" : 500}
                          preview={
                            fullscreen ? "edit" : showPreview ? "live" : "edit"
                          }
                          hideToolbar={false}
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
                              buttonProps: {
                                "aria-label": "Toggle fullscreen",
                              },
                              icon: (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M396.795 396.8H320V448h128V320h-51.205zm-281.59 0H192V448H64V320h51.205zm0-281.595H64V192h128V64H192zm281.595 0H320V64h128v128h-51.205z"
                                  />
                                </svg>
                              ),
                              execute: (state, api) => {
                                handleEditorFullscreen({
                                  preventDefault: () => {},
                                } as React.MouseEvent);
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
                          onClick={() =>
                            router.push(`/articles/${article.slug}`)
                          }
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Cancel
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
                              Updating...
                            </span>
                          ) : (
                            "Update Article"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </>
          )}
        </section>
      </main>

      {!fullscreen && <MinimalFooter />}
    </div>
  );
}
