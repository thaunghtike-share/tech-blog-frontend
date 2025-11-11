"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/hooks/use-auth";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasExistingAvatar, setHasExistingAvatar] = useState(false);
  const { user, updateProfile } = useAuth();

  // Add this state to track if user has existing completed profile
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  
  // Add loading state for initial profile data
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    // Load existing profile data if available
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Wait 5 seconds even if no token
          await new Promise(resolve => setTimeout(resolve, 5000));
          setIsLoadingProfile(false);
          return;
        }

        // Wait 5 seconds before making the API call to ensure loading shows
        await new Promise(resolve => setTimeout(resolve, 3000));

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

          // Check if user already has an avatar (existing user)
          if (profileData.avatar && profileData.avatar.trim() !== "") {
            setHasExistingAvatar(true);
          }

          // ✅ Check if user already has a completed profile
          if (profileData.profile_complete) {
            setHasCompletedProfile(true);
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoadingProfile(false);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Please select a valid image file (JPEG, PNG, GIF, or WebP)"
      );
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(10);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      setUploadProgress(30);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-avatar/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      setUploadProgress(70);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();

      setUploadProgress(100);

      // Update the form with the new avatar URL
      setFormData((prev) => ({
        ...prev,
        avatar: data.avatar_url,
      }));

      // Mark as having an avatar now
      setHasExistingAvatar(true);

      // Show success message
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
    } catch (error: any) {
      setUploadError(error.message);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  const handleSkip = async () => {
    // Wait for form data to fully load by checking if all fields are populated
    const allFieldsFilled =
      formData.name?.trim() &&
      formData.bio?.trim() &&
      formData.job_title?.trim() &&
      formData.company?.trim() &&
      formData.linkedin?.trim() &&
      formData.avatar?.trim() &&
      formData.slug?.trim();

    if (!allFieldsFilled) {
      setError(
        "Please wait for your profile data to load completely, or fill all the fields before skipping."
      );
      return;
    }

    // If all fields are filled, allow redirect
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/authors/me/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.slug) {
          window.location.href = `/admin/author/${profileData.slug}`;
        } else {
          window.location.href = "/";
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to get author data:", error);
      window.location.href = "/";
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

  // Show loading state for 5 seconds
  if (isLoadingProfile) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Loading Your Profile</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Preparing Your Profile
          </h1>
          <p className="text-gray-600 mb-6">
            Loading your profile data, please wait...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      </div>
    );
  }

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
    <div className="relative overflow-x-hidden max-w-2xl mx-auto">
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

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700">
                Professional Information <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                    placeholder="Job title"
                  />
                </div>
                <div className="flex items-center h-12 text-gray-500 font-medium">
                  at
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
                    placeholder="Company name"
                  />
                </div>
              </div>
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
              LinkedIn URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          {/* Avatar Section - File Upload for new users, URL field for existing users */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Profile Photo <span className="text-red-500">*</span>
            </label>

            {/* Current Avatar Preview */}
            {formData.avatar && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Avatar:</p>
                <img
                  src={formData.avatar}
                  alt="Current avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                />
              </div>
            )}

            {/* File Upload - Show for all users */}
            <div className="mb-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileUpload}
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
                      Click to upload photo
                    </span>
                    <span className="text-xs text-gray-500">
                      JPEG, PNG, GIF, WebP (max 5MB)
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {uploadError && (
              <p className="text-red-600 text-sm mt-2">{uploadError}</p>
            )}

            {/* URL Input - Keep as fallback for existing users */}
            {hasExistingAvatar && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Or use custom URL:
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 text-sm"
                  placeholder="https://example.com/avatar.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Keep your existing avatar URL or change it
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Profile Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
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

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || isUploading}
              className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving Profile..." : "Complete Profile & Continue"}
            </button>

            {/* ✅ ALWAYS SHOW SKIP BUTTON - but it will show error if profile not completed */}
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}