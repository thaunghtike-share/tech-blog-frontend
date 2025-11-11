"use client";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DRAFT_KEY = "new-article-draft";
const SAVE_INTERVAL = 5000;

export default function NewArticlePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true

  const [form, setForm] = useState({
    title: "",
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
      setLoading(false); // Stop loading after checking token

      // Load draft if user is logged in
      if (savedToken) {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
          try {
            const parsedDraft = JSON.parse(draft);
            setForm(parsedDraft);
          } catch (error) {
            console.error("Error parsing draft:", error);
          }
        }
      }
    }
  }, []);

  // Auto-save draft when logged in
  useEffect(() => {
    if (!token) return;

    const saveDraft = () => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const interval = setInterval(saveDraft, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [form, token]);

  // Fetch categories and tags when authenticated
  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(Array.isArray(catData) ? catData : catData.results || []);
        }

        if (tagRes.ok) {
          const tagData = await tagRes.json();
          setTags(Array.isArray(tagData) ? tagData : tagData.results || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    fetchData();
  }, [API_BASE_URL, token]);

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleEditorFullscreen = () => {
    if (!editorRef.current) return;

    if (!fullscreen) {
      editorRef.current.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      // Load Google Sign-In script
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      // Initialize Google Identity Services
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: "588363886976-b1vchi7rt4bif974kpr076dl47po8tor.apps.googleusercontent.com",
          callback: handleGoogleCallback,
        });
        
        // Trigger Google One Tap
        (window as any).google.accounts.id.prompt();
      }
    } catch (error) {
      console.error('Error loading Google Sign-In:', error);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      setLoading(true);
      
      const res = await fetch(`${API_BASE_URL}/google-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!res.ok) {
        throw new Error("Google login failed");
      }

      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      
      // Redirect to articles page after successful login
      setTimeout(() => {
        router.push("/articles");
      }, 1000);
      
    } catch (error: any) {
      console.error("Google login error:", error);
      setMessage({ text: "Login failed. Please try again.", type: "error" });
      setLoading(false);
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
        setTags(prev => [...prev, newTag]);
        setForm(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.id]
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

    const response = await fetch(
      `${API_BASE_URL}/upload-cover-image/`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }
    );

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
        setCategories(prev => [...prev, newCategory]);
        setForm(prev => ({
          ...prev,
          category: newCategory.id.toString()
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
    setForm({
      title: "",
      category: "",
      tags: [],
      featured: false,
      published_at: new Date().toISOString().slice(0, 10),
      content: "",
      cover_image: "",
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

    try {
      const res = await fetch(`${API_BASE_URL}/articles/`, {
        method: "POST",
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
          cover_image: form.cover_image || null,
        }),
      });

      if (res.ok) {
        setMessage({
          text: "Article submitted successfully! Redirecting...",
          type: "success",
        });
        localStorage.removeItem(DRAFT_KEY);
        
        // Redirect to articles page after successful submission
        setTimeout(() => {
          router.push("/articles");
        }, 1500);
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

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="h-full flex flex-col">
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
                    buttonProps: { "aria-label": "Toggle fullscreen" },
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 512 512">
                        <path
                          fill="currentColor"
                          d="M396.795 396.8H320V448h128V320h-51.205zm-281.59 0H192V448H64V320h51.205zm0-281.595H64V192h128V64H192zm281.595 0H320V64h128v128h-51.205z"
                        />
                      </svg>
                    ),
                    execute: handleEditorFullscreen,
                  },
                ]}
              />
            </div>
          </div>
        </div>
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

  // Show login prompt if not authenticated
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <MinimalHeader />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h1>
                <p className="text-gray-600">Please sign in with Google to create new articles</p>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>

              {message && (
                <div className={`mt-4 p-3 rounded-lg border ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  // Main editor form for authenticated users
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <MinimalHeader />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">New Article Editor</h1>
              <p className="text-gray-600 mt-2">
                {lastSaved && `Draft auto-saved at ${lastSaved}`}
              </p>
            </div>
          </div>

          {message && (
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-xs text-gray-500 mt-1">Defaults to today's date</p>
              </div>
            </div>

            {/* Tags Dropdown */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Tags</label>
              <div className="space-y-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTagDropdown(!showTagDropdown)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                  >
                    {form.tags.length > 0 
                      ? `${form.tags.length} tags selected`
                      : "Select tags"
                    }
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
                          <span className="ml-3 text-sm text-gray-700">{tag.name}</span>
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
                  {form.tags.map(tagId => {
                    const tag = tags.find(t => t.id === tagId);
                    return tag ? (
                      <span key={tag.id} className="bg-sky-100 text-sky-800 text-xs px-3 py-1 rounded-full">
                        {tag.name}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            {/* Rest of the form remains the same */}
            {/* Cover Image Upload */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Cover Image
              </label>

              {form.cover_image && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current Cover Image:</p>
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
                <p className="text-red-600 text-sm mt-2">{coverImageError}</p>
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

            {/* Content Editor */}
            <div>
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

              <div ref={editorRef} data-color-mode="light">
                <MDEditor
                  value={form.content}
                  onChange={(val) => handleChange("content", val || "")}
                  height={500}
                  preview={showPreview ? "live" : "edit"}
                  hideToolbar={false}
                  textareaProps={{
                    placeholder: "Write your article content here...",
                    className:
                      "text-sm leading-relaxed bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-400",
                  }}
                  previewOptions={{
                    className:
                      "bg-white text-gray-900 rounded-xl p-6 border border-gray-200",
                  }}
                  className="rounded-xl border border-gray-200 shadow-sm"
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
                      execute: handleEditorFullscreen,
                    },
                  ]}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={clearDraft}
                className="px-6 py-3 border border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-all duration-300 font-medium"
              >
                Clear Draft
              </button>

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
                    Submitting...
                  </span>
                ) : (
                  "Submit Article"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
}