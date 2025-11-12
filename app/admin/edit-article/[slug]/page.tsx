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
  cover_image: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DRAFT_KEY = "edit-article-draft";
const SAVE_INTERVAL = 5000;

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [token, setToken] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleLoading, setArticleLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5); // ADDED REDIRECT COUNTDOWN

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    tags: [] as number[],
    featured: false,
    published_at: new Date().toISOString().slice(0, 10),
    content: "",
    cover_image: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [coverImageProgress, setCoverImageProgress] = useState(0);
  const [coverImageError, setCoverImageError] = useState<string | null>(null);

  // New state for creating tags/categories
  const [newTagName, setNewTagName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [creatingTag, setCreatingTag] = useState(false);
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Load token on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      setLoading(false);
    }
  }, []);

  // Auto-redirect if not logged in - ADDED THIS EFFECT
  useEffect(() => {
    if (!loading && !token) {
      const countdown = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [loading, token, router]);

  // Fetch article when token changes - MOVED BEFORE CONDITIONAL RETURNS
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
        throw new Error("Session expired. Please login again.");
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch article: ${res.status}`);
      }

      const articleData: Article = await res.json();
      setArticle(articleData);
      setForm({
        title: articleData.title,
        slug: articleData.slug, // Add slug here
        category: articleData.category.toString(),
        tags: articleData.tags,
        featured: articleData.featured,
        published_at: articleData.published_at.slice(0, 10),
        content: articleData.content,
        cover_image: articleData.cover_image || "",
      });
    } catch (error) {
      console.error("Error in fetchArticle:", error);
      throw error;
    } finally {
      setArticleLoading(false);
    }
  };

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

  // Show redirect message if not authenticated - UPDATED WITH COUNTDOWN
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <MinimalHeader />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg mb-2">
              You need to be logged in to edit articles.
            </p>
            <p className="text-gray-500 text-sm">
              Redirecting to home page in {redirectCountdown} seconds...
            </p>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <MinimalHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  // ... rest of the code remains the same (handleCoverImageUpload, handleCreateTag, handleCreateCategory, etc.)

  // Handle cover image upload
  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setCoverImageError("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCoverImageError("File size must be less than 5MB");
      return;
    }

    setCoverImageUploading(true);
    setCoverImageError(null);
    setCoverImageProgress(10);

    try {
      const formData = new FormData();
      formData.append("cover_image", file);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      setCoverImageProgress(30);

      const response = await fetch(`${API_BASE_URL}/upload-cover-image/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      setCoverImageProgress(70);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cover image upload failed");
      }

      const data = await response.json();

      setCoverImageProgress(100);

      setForm((prev) => ({
        ...prev,
        cover_image: data.cover_image_url || data.url,
      }));

      setTimeout(() => {
        setCoverImageProgress(0);
        setCoverImageUploading(false);
      }, 1000);
    } catch (error: any) {
      setCoverImageError(error.message);
      setCoverImageProgress(0);
      setCoverImageUploading(false);
    }
  };

  // Create new tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    setCreatingTag(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/tags/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      if (res.ok) {
        const newTag = await res.json();
        setTags((prev) => [...prev, newTag]);
        setForm((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag.id],
        }));
        setNewTagName("");
        setShowNewTagInput(false);
        setMessage({ text: "Tag created successfully", type: "success" });
      } else {
        throw new Error("Failed to create tag");
      }
    } catch (error) {
      setMessage({ text: "Error creating tag", type: "error" });
    } finally {
      setCreatingTag(false);
    }
  };

  // Create new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setCategories((prev) => [...prev, newCategory]);
        setForm((prev) => ({
          ...prev,
          category: newCategory.id.toString(),
        }));
        setNewCategoryName("");
        setShowNewCategoryInput(false);
        setMessage({ text: "Category created successfully", type: "success" });
      } else {
        throw new Error("Failed to create category");
      }
    } catch (error) {
      setMessage({ text: "Error creating category", type: "error" });
    } finally {
      setCreatingCategory(false);
    }
  };

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

  function clearDraft() {
    localStorage.removeItem(DRAFT_KEY);
    setMessage({ text: "Draft cleared", type: "success" });
  }

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
          slug: form.slug, // Include slug in the update
          category: Number(form.category),
          tags: form.tags,
          featured: form.featured,
          published_at: form.published_at,
          content: form.content,
          cover_image: form.cover_image || null,
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
      {!fullscreen && <MinimalHeader />}

      <main className={`${fullscreen ? "fixed inset-0 z-50 bg-white" : "flex-grow max-w-7xl mx-auto px-4 py-10 w-full"}`}>
        <div className={`${fullscreen ? "h-full" : "bg-white rounded-2xl border border-gray-200 shadow-lg p-8"}`}>
          {!fullscreen && (
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Article</h1>
                <p className="text-gray-600 mt-2">
                  {lastSaved && `Draft auto-saved at ${lastSaved}`}
                </p>
              </div>

              {/* Clear Draft Button */}
              <button
                type="button"
                onClick={clearDraft}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Draft
              </button>
            </div>
          )}

          {!fullscreen && message && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {message.text}
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
            <form onSubmit={handleArticleSubmit} className={`${fullscreen ? "h-full" : "space-y-6"}`}>
              <div className={`${fullscreen ? "h-full flex flex-col" : "space-y-6"}`}>
                {!fullscreen && (
                  <>
                    {/* Article Title */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                        placeholder="Enter your article title"
                      />
                    </div>

                    {/* Slug Field */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.slug || ""}
                        onChange={(e) => handleChange("slug", e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 bg-gray-50"
                        placeholder="Enter URL slug"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">
                          This will be used in the article URL
                        </p>
                        <p className="text-xs text-gray-500">
                          {form.slug.length} characters
                        </p>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Final URL: /articles/{form.slug}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Category */}
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                          <select
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                          >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>

                          {!showNewCategoryInput ? (
                            <button
                              type="button"
                              onClick={() => setShowNewCategoryInput(true)}
                              className="w-full px-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg border border-dashed border-sky-300 transition-all duration-300"
                            >
                              + Create New Category
                            </button>
                          ) : (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Enter new category name"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                              />
                              <button
                                type="button"
                                onClick={handleCreateCategory}
                                disabled={creatingCategory}
                                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 text-sm font-medium"
                              >
                                {creatingCategory ? "Creating..." : "Add"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowNewCategoryInput(false)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Published Date */}
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Published Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={form.published_at}
                          onChange={(e) => handleChange("published_at", e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Defaults to today's date
                        </p>
                      </div>
                    </div>

                    {/* Tags Dropdown */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Tags
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowTagDropdown(!showTagDropdown)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                          >
                            {form.tags.length > 0
                              ? `${form.tags.length} tags selected`
                              : "Select tags"}
                          </button>

                          {showTagDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
                              {tags.map((tag) => (
                                <label
                                  key={tag.id}
                                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                >
                                  <input
                                    type="checkbox"
                                    checked={form.tags.includes(tag.id)}
                                    onChange={() => toggleTag(tag.id)}
                                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                                  />
                                  <span className="ml-3 text-sm text-gray-700">
                                    {tag.name}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {!showNewTagInput ? (
                          <button
                            type="button"
                            onClick={() => setShowNewTagInput(true)}
                            className="w-full px-4 py-2 text-sm text-sky-600 hover:bg-sky-50 rounded-lg border border-dashed border-sky-300 transition-all duration-300"
                          >
                            + Create New Tag
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newTagName}
                              onChange={(e) => setNewTagName(e.target.value)}
                              placeholder="Enter new tag name"
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                            />
                            <button
                              type="button"
                              onClick={handleCreateTag}
                              disabled={creatingTag}
                              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 text-sm font-medium"
                            >
                              {creatingTag ? "Creating..." : "Add"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowNewTagInput(false)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {form.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {form.tags.map((tagId) => {
                            const tag = tags.find((t) => t.id === tagId);
                            return tag ? (
                              <span
                                key={tag.id}
                                className="bg-sky-100 text-sky-800 text-xs px-3 py-1 rounded-full"
                              >
                                {tag.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Cover Image
                      </label>

                      {form.cover_image && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Current Cover Image:
                          </p>
                          <img
                            src={form.cover_image}
                            alt="Cover preview"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                          />
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleCoverImageUpload}
                            className="hidden"
                          />
                          <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-sky-500 hover:bg-sky-50 transition-all duration-300">
                            <div className="flex flex-col items-center gap-2">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">
                                Click to upload cover image
                              </span>
                              <span className="text-xs text-gray-500">
                                JPEG, PNG, GIF, WebP (max 5MB)
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>

                      {coverImageProgress > 0 && coverImageProgress < 100 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Uploading cover image...</span>
                            <span>{coverImageProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${coverImageProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {coverImageError && (
                        <p className="text-red-600 text-sm mt-2">
                          {coverImageError}
                        </p>
                      )}

                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Or use image URL:
                        </label>
                        <input
                          type="url"
                          value={form.cover_image}
                          onChange={(e) => handleChange("cover_image", e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 text-sm"
                          placeholder="https://example.com/cover-image.jpg"
                        />
                      </div>
                    </div>

                    {/* Featured Article Checkbox */}
                    <div className="flex items-center">
                      <input
                        id="featured"
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => handleChange("featured", e.target.checked)}
                        className="h-5 w-5 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="featured"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Featured Article
                      </label>
                    </div>
                  </>
                )}

                {/* Content Editor */}
                <div className={`${fullscreen ? "flex-grow flex flex-col" : ""}`}>
                  {!fullscreen && (
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Content (Markdown) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowPreview(!showPreview)}
                          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-medium"
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
                      preview={fullscreen ? "edit" : showPreview ? "live" : "edit"}
                      hideToolbar={false}
                      textareaProps={{
                        placeholder: "Write your article content here...",
                        className:
                          "text-sm leading-relaxed bg-white text-gray-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-400",
                      }}
                      previewOptions={{
                        className:
                          "bg-white text-gray-900 rounded-xl p-6 border border-gray-200",
                      }}
                      className={`${
                        fullscreen
                          ? "h-full rounded-none"
                          : "rounded-xl border border-gray-200 shadow-sm"
                      }`}
                      extraCommands={[
                        {
                          name: "fullscreen",
                          keyCommand: "fullscreen",
                          buttonProps: { "aria-label": "Toggle fullscreen" },
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

                {!fullscreen && (
                  <div className="flex justify-end items-center pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading || coverImageUploading}
                      className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                          Updating Article...
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
        </div>
      </main>

      {!fullscreen && <MinimalFooter />}
    </div>
  );
}