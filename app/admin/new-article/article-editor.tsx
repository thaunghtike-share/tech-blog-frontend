"use client";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import EditorHeader from "./editor-header";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function ArticleEditor() {
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
  const [showPreview, setShowPreview] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const DRAFT_KEY = "new-article-draft";
  const SAVE_INTERVAL = 5000;

  // Load categories and tags
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(
            Array.isArray(catData) ? catData : catData.results || []
          );
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
  }, [API_BASE_URL]);

  // Auto-save draft
  useEffect(() => {
    const saveDraft = () => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setLastSaved(new Date().toLocaleTimeString());
    };

    const interval = setInterval(saveDraft, SAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [form]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        setForm(JSON.parse(savedDraft));
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (id: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(id)
        ? prev.tags.filter((tagId) => tagId !== id)
        : [...prev.tags, id],
    }));
  };

  const clearDraft = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

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
        }),
      });

      if (res.ok) {
        setMessage({
          text: "Article submitted successfully!",
          type: "success",
        });
        localStorage.removeItem(DRAFT_KEY);
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
        throw new Error(JSON.stringify(errorData));
      }
    } catch (error: any) {
      setMessage({ text: "Error: " + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
      <EditorHeader lastSaved={lastSaved} />

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Article Metadata */}
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
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
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
          </div>

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
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                type="button"
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  form.tags.includes(tag.id)
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-lg"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-sky-300"
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
            disabled={loading}
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
  );
}
