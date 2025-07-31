"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  // Load token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setAuthenticated(true);
    }
  }, []);

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
          setIsAuthor(true); // TEMP: allow any logged-in author
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
        ? new Date(form.published_at).toISOString() // ✅ Convert to datetime string
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MinimalHeader />

      <main className="max-w-4xl mx-auto py-10 px-4 flex-grow">
        {!authenticated ? (
          <form
            onSubmit={handleLogin}
            className="max-w-sm mx-auto bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4">Login to Edit</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-3 w-full border rounded px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3 w-full border rounded px-3 py-2"
              required
            />
            {loginError && (
              <p className="text-red-600 text-sm mb-3">{loginError}</p>
            )}
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        ) : !isAuthor && hasTriedFetch ? (
          <p className="text-red-600 text-center">
            You are not authorized to edit this article.
          </p>
        ) : isAuthor ? (
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Article</h2>
              <button
                onClick={handleLogout}
                type="button"
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </div>

            {message && (
              <p
                className={`p-3 rounded text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </p>
            )}

            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              required
              className="w-full border px-3 py-2 rounded"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={form.published_at}
              onChange={(e) =>
                setForm({ ...form, published_at: e.target.value })
              }
              required
              className="w-full border px-3 py-2 rounded"
            />

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    form.tags.includes(tag.id)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured
            </label>

            <MDEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val || "" })}
              height={400}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600 text-center">Loading...</p>
        )}
      </main>

      <MinimalFooter />
    </div>
  );
}