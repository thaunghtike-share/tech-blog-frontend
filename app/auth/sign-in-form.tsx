"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "./hooks/use-auth";

interface SignInFormProps {
  onSuccess?: () => void;
  switchToSignUp?: () => void;
}

export default function SignInForm({
  onSuccess,
  switchToSignUp,
}: SignInFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [passwordHint, setPasswordHint] = useState("");
  const { login } = useAuth();
  const googleInitialized = useRef(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (googleInitialized.current) return;

      if (!(window as any).google) {
        console.error("Google Sign-In library not loaded");
        return;
      }

      try {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleResponse,
          ux_mode: "popup",
          auto_select: false,
        });

        if (googleButtonRef.current) {
          (window as any).google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              theme: "outline",
              size: "large",
              width: "380",
              text: "signin_with",
              shape: "pill",
            }
          );
        }

        googleInitialized.current = true;
        console.log("Google Sign-In initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Google Sign-In:", error);
        setError("Failed to initialize Google Sign-In");
      }
    };

    const loadGoogleScript = () => {
      if (
        document.querySelector('script[src*="accounts.google.com/gsi/client"]')
      ) {
        const checkGoogle = setInterval(() => {
          if ((window as any).google) {
            initializeGoogleSignIn();
            clearInterval(checkGoogle);
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Sign-In script loaded");
        setTimeout(initializeGoogleSignIn, 100);
      };
      script.onerror = () => {
        console.error("Failed to load Google Sign-In script");
        setError("Failed to load Google Sign-In. Please refresh the page.");
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      googleInitialized.current = false;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Hide hint when user starts typing again
    if (showHint) {
      setShowHint(false);
      setPasswordHint("");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setShowHint(false);
    setPasswordHint("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        await fetchPasswordHint(formData.username);
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      const authToken = data.token;

      // ✅ FIXED: Include all required User properties
      login(authToken, {
        id: data.user?.id || data.author?.id || 0, // Add ID (provide default)
        slug: data.author?.slug || "", // Add slug
        username: data.user?.username || formData.username,
        email: data.user?.email || "",
        avatar: data.author?.avatar,
        profileComplete: data.author?.profile_complete || false,
      });

      onSuccess?.();

      if (data.author?.profile_complete) {
        window.location.href = `/admin/author/${data.author.slug}`;
      } else {
        window.location.href = "/author-profile-form";
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const fetchPasswordHint = async (username: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password-hint/${username}/`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.hint) {
          setPasswordHint(data.hint);
          setShowHint(true);
        }
      }
    } catch (error) {
      console.error("Failed to fetch password hint");
    }
  };

  const handleGoogleResponse = async (response: any) => {
    setGoogleLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token: response.credential }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Google sign in failed");
      }

      const authToken = data.token;

      // ✅ FIXED: Include all required User properties
      login(authToken, {
        id: data.user?.id || data.author?.id || 0, // Add ID (provide default)
        slug: data.author?.slug || "", // Add slug
        username: data.user?.username || data.user?.first_name || "User",
        email: data.user?.email || "",
        avatar: data.author?.avatar || data.user?.avatar,
        profileComplete: data.author?.profile_complete || false,
      });

      if (data.author?.profile_complete && data.author?.slug) {
        window.location.href = `/admin/author/${data.author.slug}`;
      } else {
        window.location.href = "/author-profile-form";
      }
    } catch (error: any) {
      console.error("Google auth error:", error);
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError(
      "Forgot password? Please contact our team via Messenger or email for assistance."
    );
  };

  return (
    <div className="space-y-6">
      {/* Google Sign In */}
      <div className="space-y-3">
        <div ref={googleButtonRef} className="flex justify-center"></div>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Username/Password Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            placeholder="Enter your username or email"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            placeholder="Enter your password"
          />

          {/* ✅ PASSWORD HINT AND FORGOT PASSWORD IN ONE LINE */}
          <div className="flex justify-between items-center mt-2">
            {/* Password Hint */}
            {showHint && passwordHint && (
              <div className="text-xs text-blue-600">
                <span className="font-medium">Hint:</span> "{passwordHint}"
              </div>
            )}

            {/* Forgot Password - pushes to right */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sky-600 hover:text-sky-700 font-medium text-sm"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={formLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={switchToSignUp}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
          <div className="text-red-700 mb-2">{error}</div>
        </div>
      )}
    </div>
  );
}
