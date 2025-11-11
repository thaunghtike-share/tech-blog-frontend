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
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DRAFT_KEY = "edit-article-draft";
const SAVE_INTERVAL = 5000;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

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
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

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
      if (googleButtonRef.current && (window as any).google) {
        (window as any).google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: googleButtonRef.current.clientWidth,
          text: "signin_with",
          shape: "pill",
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
        if (googleButtonRef.current) {
          (window as any).google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            width: googleButtonRef.current.clientWidth,
            text: "signin_with",
            shape: "pill",
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
        published_at: new Date().toISOString().slice(0, 10), // Auto-set to current date
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
    <div className={`min-h-screen flex flex-col bg-white ${fullscreen ? "overflow-hidden" : ""}`}>
      {!fullscreen && (
        <div className="top-0 z-50">
          <MinimalHeader />
        </div>
      )}

      <main className={`${fullscreen ? "fixed inset-0 z-50 bg-white" : "flex-grow max-w-6xl mx-auto px-6 py-8"}`}>
        <section className={`${fullscreen ? "h-full w-full" : ""}`}>
          {!token ? (
            <div className="max-w-md mx-auto mt-16">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Article</h1>
                  <p className="text-gray-600">Sign in to continue editing</p>
                </div>

                <div className="space-y-6">
                  {/* Google Sign In */}
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <div ref={googleButtonRef} className="w-full flex justify-center"></div>
                    </div>
                    {googleLoading && (
                      <p className="text-center text-gray-600 text-sm">Signing in with Google...</p>
                    )}
                  </div>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Username/Password Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                        placeholder="Enter your password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Sign In
                    </button>
                  </form>

                  {(loginError || message) && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
                      <div className="text-red-700 mb-2">{loginError || message?.text}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {!fullscreen && (
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Article</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {lastSaved && (
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Auto-saved: {lastSaved}</span>
                      )}
                      <span>Editing: {article?.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {articleLoading ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading Article</h2>
                  <p className="text-gray-600">Preparing your content for editing...</p>
                </div>
              ) : !article ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Article Not Found</h2>
                  <p className="text-gray-600 mb-4">
                    {message?.type === "error" ? message.text : "The article you're looking for doesn't exist."}
                  </p>
                  {message?.type === "error" && (
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={handleArticleSubmit}
                  className={`bg-white ${fullscreen ? "h-full" : "space-y-6"}`}
                >
                  {!fullscreen && message && (
                    <div
                      className={`p-4 rounded-lg border ${
                        message.type === "success"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <div className={`${fullscreen ? "h-full flex flex-col" : "space-y-6"}`}>
                    {!fullscreen && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Article Details */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-900 mb-3">Article Title</label>
                            <input
                              type="text"
                              value={form.title}
                              onChange={(e) => handleChange("title", e.target.value)}
                              required
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                              placeholder="Enter article title..."
                            />
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-sm font-semibold text-gray-900">Content</label>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setShowPreview(!showPreview)}
                                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  {showPreview ? "Hide Preview" : "Show Preview"}
                                </button>
                              </div>
                            </div>
                            <div ref={editorRef} data-color-mode="light">
                              <MDEditor
                                value={form.content}
                                onChange={(val) => handleChange("content", val || "")}
                                height={400}
                                preview={showPreview ? "live" : "edit"}
                                hideToolbar={false}
                                textareaProps={{
                                  placeholder: "Write your article content here...",
                                  className: "text-sm leading-relaxed bg-white text-gray-900",
                                }}
                                previewOptions={{
                                  className: "bg-white text-gray-900 rounded-lg p-4",
                                }}
                                className="rounded-lg border border-gray-300"
                                extraCommands={[
                                  {
                                    name: "fullscreen",
                                    keyCommand: "fullscreen",
                                    buttonProps: {
                                      "aria-label": "Toggle fullscreen",
                                    },
                                    icon: (
                                      <svg width="14" height="14" viewBox="0 0 512 512">
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
                        </div>

                        {/* Right Column - Settings */}
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Article Settings</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                  value={form.category}
                                  onChange={(e) => handleChange("category", e.target.value)}
                                  required
                                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                <div className="relative">
                                  <button
                                    type="button"
                                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                  >
                                    {form.tags.length > 0 
                                      ? `${form.tags.length} tags selected`
                                      : "Select tags"
                                    }
                                  </button>
                                  
                                  {showTagDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                      {tags.map((tag) => (
                                        <label
                                          key={tag.id}
                                          className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={form.tags.includes(tag.id)}
                                            onChange={() => toggleTag(tag.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {form.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {form.tags.map(tagId => {
                                      const tag = tags.find(t => t.id === tagId);
                                      return tag ? (
                                        <span key={tag.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                          {tag.name}
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                                <input
                                  type="date"
                                  value={form.published_at}
                                  onChange={(e) => handleChange("published_at", e.target.value)}
                                  required
                                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                                <p className="text-xs text-gray-500 mt-1">Automatically set to today's date</p>
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
                                  Feature this article
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                              <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    Updating Article...
                                  </span>
                                ) : (
                                  "Update Article"
                                )}
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => router.push(`/articles/${article.slug}`)}
                                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Fullscreen Editor */}
                    {fullscreen && (
                      <div className="flex-grow flex flex-col">
                        <div ref={editorRef} data-color-mode="light" className="h-full">
                          <MDEditor
                            value={form.content}
                            onChange={(val) => handleChange("content", val || "")}
                            height="100%"
                            preview="edit"
                            hideToolbar={false}
                            textareaProps={{
                              placeholder: "Write your article content here...",
                              className: "text-sm leading-relaxed bg-white text-gray-900",
                            }}
                            className="h-full rounded-none"
                            extraCommands={[
                              {
                                name: "fullscreen",
                                keyCommand: "fullscreen",
                                buttonProps: {
                                  "aria-label": "Toggle fullscreen",
                                },
                                icon: (
                                  <svg width="14" height="14" viewBox="0 0 512 512">
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