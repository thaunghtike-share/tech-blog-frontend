"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/use-auth";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    job_title: "",
    company: "",
    linkedin: "",
    avatar: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user, updateProfile } = useAuth();

  useEffect(() => {
    // Load existing profile data if available
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/authors/me/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setFormData({
            name: profileData.name || "",
            bio: profileData.bio || "",
            job_title: profileData.job_title || "",
            company: profileData.company || "",
            linkedin: profileData.linkedin || "",
            avatar: profileData.avatar || "",
            slug: profileData.slug || "",
          });
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/authors/me/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            profile_complete: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const savedProfile = await response.json();

      // Update the auth state
      updateProfile({
        profileComplete: true,
        username: savedProfile.name || user?.username,
        avatar: savedProfile.avatar,
      });

      // Show success message
      setSuccess(true);

      setTimeout(() => {
        window.location.href = `/admin/author/${formData.slug}`;
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Profile Completed!</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Welcome to the Community!
          </h1>
          <p className="text-gray-600 mb-6">
            Your profile has been saved successfully. Redirecting to your
            dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/95 rounded-2xl border border-gray-200 shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Complete Your Profile</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Tell Us About Yourself
          </h1>
          <p className="text-gray-600">
            Complete your author profile to start writing articles
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... rest of your form fields remain the same ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                placeholder="Your current position"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              required
              placeholder="Tell us about yourself, your expertise, and experience..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              placeholder="Where you work"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Avatar URL (GitHub Raw URL)
            </label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              placeholder="https://raw.githubusercontent.com/username/repo/path/to/image.png"
            />
            <p className="text-sm text-gray-500 mt-2">
              Use a GitHub raw URL for your avatar image for best results
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Profile Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              placeholder="your-unique-profile-slug"
            />
            <p className="text-sm text-gray-500 mt-2">
              This will be used in your profile URL (e.g., /authors/your-slug)
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving Profile..." : "Complete Profile & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
