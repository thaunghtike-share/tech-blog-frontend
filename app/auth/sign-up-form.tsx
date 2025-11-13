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
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password1 ||
      !formData.password2
    ) {
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

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const registrationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/registration/`;
      console.log("📤 Attempting registration at:", registrationUrl);

      // Step 1: Register the user
      const registerResponse = await fetch(registrationUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password1: formData.password1,
          password2: formData.password2,
        }),
      });

      console.log("📥 Registration response status:", registerResponse.status);

      // Check if response is JSON
      const contentType = registerResponse.headers.get("content-type");
      console.log("📄 Response content type:", contentType);

      let registerData;
      if (contentType && contentType.includes("application/json")) {
        registerData = await registerResponse.json();
      } else {
        // If not JSON, get as text to see what's returned
        const textResponse = await registerResponse.text();
        console.error("❌ Non-JSON response:", textResponse.substring(0, 500));
        throw new Error(
          "Server returned an error page. Check if registration endpoint exists."
        );
      }

      console.log("📋 Registration response data:", registerData);

      if (!registerResponse.ok) {
        throw new Error(
          registerData.username?.[0] ||
            registerData.email?.[0] ||
            registerData.password1?.[0] ||
            registerData.password2?.[0] ||
            registerData.non_field_errors?.[0] ||
            `Registration failed: ${registerResponse.status}`
        );
      }

      // Step 2: Auto-login after successful registration
      console.log("🔐 Attempting auto-login...");
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password1,
          }),
        }
      );

      if (!loginResponse.ok) {
        throw new Error(
          "Registration successful but automatic login failed. Please sign in manually."
        );
      }

      const loginData = await loginResponse.json();
      const authToken = loginData.token;

      // Use the login function from your auth context
      login(authToken, {
        username: formData.username,
        email: formData.email,
        avatar: "",
        profileComplete: false,
      });

      onSuccess?.();
      window.location.href = "/author-profile-form";
    } catch (error: any) {
      console.error("💥 Registration error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
          placeholder="Enter your email"
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
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
          placeholder="Create a password (min. 8 characters)"
          minLength={8}
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
          placeholder="Confirm your password"
          minLength={8}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToSignIn}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}
