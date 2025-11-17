"use client";
import { useState } from "react";
import { useAuth } from "./hooks/use-auth";

interface SignUpFormProps {
  onSuccess?: () => void;
  switchToSignIn: () => void;
}

export default function SignUpForm({
  onSuccess,
  switchToSignIn,
}: SignUpFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    password_hint: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.username || !formData.password1 || !formData.password2) {
      setError("Username and password are required");
      return false;
    }

    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password1.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) return;
    setLoading(true);

    try {
      console.log("📤 Attempting registration...");

      const registerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/registration/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password1: formData.password1,
            password2: formData.password2,
            // Don't send password_hint here - Django doesn't know what to do with it
          }),
        }
      );

      console.log("📥 Registration response status:", registerResponse.status);

      if (registerResponse.status === 201) {
        console.log("✅ Account created successfully");

        // ✅ SAVE PASSWORD HINT SEPARATELY
        if (formData.password_hint) {
          try {
            const saveHintResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/save-password-hint/`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: formData.username,
                  password_hint: formData.password_hint,
                }),
              }
            );

            if (saveHintResponse.ok) {
              console.log("✅ Password hint saved successfully");
            } else {
              console.log("⚠️ Password hint not saved, but account created");
            }
          } catch (hintError) {
            console.error("❌ Failed to save password hint:", hintError);
            // Don't throw error - registration succeeded even if hint fails
          }
        }

        setSuccess(true);
      } else if (registerResponse.status === 400) {
        const errorData = await registerResponse.json();
        console.log("❌ Validation errors:", errorData);

        const errorMessage =
          errorData.username?.[0] ||
          errorData.email?.[0] ||
          errorData.password1?.[0] ||
          errorData.password2?.[0] ||
          errorData.non_field_errors?.[0] ||
          "Please check your information and try again.";
        throw new Error(errorMessage);
      } else {
        const errorText = await registerResponse.text();
        console.error("❌ Server error:", registerResponse.status, errorText);
        throw new Error(
          "Registration service is temporarily unavailable. Please try again later."
        );
      }
    } catch (error: any) {
      console.error("💥 Registration error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show success message
  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Account Created Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Your account has been created. You can now sign in to start writing
          articles.
        </p>
        <div className="space-y-3">
          <button
            onClick={switchToSignIn}
            className="w-full bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition-colors font-medium"
          >
            Sign In Now
          </button>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                username: "",
                email: "",
                password1: "",
                password2: "",
                password_hint: "",
              });
            }}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Create Another Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Username *
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
          placeholder="Choose a username"
          minLength={3}
          disabled={loading}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email Address (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
          placeholder="Enter your email (optional)"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password *
          </label>
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            placeholder="Create password"
            minLength={8}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password *
          </label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            placeholder="Confirm password"
            minLength={8}
            disabled={loading}
          />
        </div>
      </div>

      {/* Password Hint Field */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password Hint (Optional)
        </label>
        <input
          type="text"
          name="password_hint"
          value={formData.password_hint}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
          placeholder="e.g., name + date of birth"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          This will help you remember your password if you forget it
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToSignIn}
            className="text-sky-600 hover:text-sky-700 font-medium disabled:opacity-50"
            disabled={loading}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}
