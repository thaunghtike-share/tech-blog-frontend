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
    if (!formData.username || !formData.email || !formData.password1 || !formData.password2) {
      setError("All fields are required");
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

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
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

      // 1. Register user
      const registerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/registration/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      console.log("📥 Registration response status:", registerResponse.status);

      // Handle registration response
      if (registerResponse.status === 201) {
        console.log("✅ Registration successful - email verification sent");
        setSuccess(true); // ✅ This will show the success message
        // ❌ REMOVED: onSuccess?.(); - This was closing the modal
        
      } else if (registerResponse.status === 400) {
        // Validation errors
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
        // Other server errors
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
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-100">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Verify Your Email
        </h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-blue-800 text-sm font-medium mb-1">Check your email!</p>
              <p className="text-blue-700 text-sm">
                We've sent a verification link to <strong className="font-semibold">{formData.email}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={switchToSignIn}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium shadow-sm"
          >
            Go to Sign In
          </button>
          
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                username: "",
                email: "",
                password1: "",
                password2: "",
              });
            }}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Register Another Account
          </button>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 hover:border-gray-400"
            placeholder="Choose a username"
            minLength={3}
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 hover:border-gray-400"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 hover:border-gray-400"
            placeholder="Create a password (min. 8 characters)"
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 hover:border-gray-400"
            placeholder="Confirm your password"
            minLength={8}
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
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
            className="text-sky-600 hover:text-sky-700 font-medium transition-colors"
            disabled={loading}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}