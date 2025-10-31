"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "./hooks/use-auth";

interface SignInFormProps {
  onSuccess?: () => void;
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

        // Render the button explicitly for better control
        if (googleButtonRef.current) {
          (window as any).google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              theme: "outline",
              size: "large",
              width: "100%",
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
      // Check if script is already loaded
      if (
        document.querySelector('script[src*="accounts.google.com/gsi/client"]')
      ) {
        // Script already exists, wait for it to load
        const checkGoogle = setInterval(() => {
          if ((window as any).google) {
            initializeGoogleSignIn();
            clearInterval(checkGoogle);
          }
        }, 100);
        return;
      }

      // Load the Google Sign-In script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Sign-In script loaded");
        // Small delay to ensure complete initialization
        setTimeout(initializeGoogleSignIn, 100);
      };
      script.onerror = () => {
        console.error("Failed to load Google Sign-In script");
        setError("Failed to load Google Sign-In. Please refresh the page.");
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();

    // Cleanup function
    return () => {
      googleInitialized.current = false;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

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
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      const authToken = data.token;

      login(authToken, {
        username: data.user?.username || formData.username,
        email: data.user?.email || "",
        avatar: data.author?.avatar,
        profileComplete: data.author?.profile_complete || false,
      });

      onSuccess?.();

      // ✅ FIX: Add the same redirect logic as Google login
      if (data.author?.profile_complete) {
        // Redirect to admin dashboard
        window.location.href = `/admin/author/${data.author.slug}`;
      } else {
        // Redirect to profile completion
        window.location.href = "/author-profile-form";
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      if (!(window as any).google || !googleInitialized.current) {
        setError("Google Sign-In not ready. Please try again.");
        return;
      }

      // Use the prompt method with better error handling
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.log("Google Sign-In prompt not displayed");
          handlePopupBlocked();
        } else if (notification.isSkippedMoment()) {
          console.log("Google Sign-In prompt skipped");
          // User dismissed the prompt, no need to show error
          setGoogleLoading(false);
        } else if (notification.isDisplayed()) {
          console.log("Google Sign-In prompt displayed");
        }
      });
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setError("Failed to initialize Google Sign In");
      setGoogleLoading(false);
    }
  };

  const handlePopupBlocked = () => {
    setError(
      "Pop-up blocked! Please allow pop-ups for this site and try again. " +
        "You can also click the Google button again or check your browser's address bar for pop-up permissions."
    );
    setGoogleLoading(false);
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Google sign in failed");
      }

      const data = await res.json();
      const authToken = data.token;

      login(authToken, {
        username: data.user?.username || data.user?.first_name || "User",
        email: data.user?.email || "",
        avatar: data.author?.avatar || data.user?.avatar,
        profileComplete: data.author?.profile_complete || false,
      });

      // ✅ FIX: Redirect based on profile completion status
      if (data.author?.profile_complete) {
        // Redirect to admin dashboard
        window.location.href = `/admin/author/${data.author.slug}`;
      } else {
        // Redirect to profile completion
        window.location.href = "/author-profile-form";
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const retryGoogleSignIn = () => {
    setError(null);
    handleGoogleSignIn();
  };

  return (
    <div className="space-y-6">
      {/* Google Sign In - Two Options */}
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
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            placeholder="Enter your username"
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
        </div>
        <button
          type="submit"
          disabled={formLoading}
          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
          <div className="text-red-700 mb-2">{error}</div>
          {error.includes("pop-up") && (
            <button
              onClick={retryGoogleSignIn}
              className="text-red-600 hover:text-red-800 text-sm font-medium underline"
            >
              Try Google Sign-In again
            </button>
          )}
        </div>
      )}
    </div>
  );
}