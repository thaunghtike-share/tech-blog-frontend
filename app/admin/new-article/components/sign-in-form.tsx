"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

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

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (!(window as any).google) {
        console.log("Google Sign-In not loaded yet");
        return;
      }

      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleResponse,
      });
    };

    // Check if Google is already loaded
    if ((window as any).google) {
      initializeGoogleSignIn();
    } else {
      // Wait for Google to load
      const checkGoogle = setInterval(() => {
        if ((window as any).google) {
          initializeGoogleSignIn();
          clearInterval(checkGoogle);
        }
      }, 100);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
      if (!(window as any).google) {
        setError("Google Sign-In not available. Please refresh the page.");
        return;
      }

      // Trigger Google Sign-In prompt
      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setError("Google Sign-In popup was blocked. Please allow popups and try again.");
        }
      });

    } catch (error) {
      setError("Failed to initialize Google Sign In");
      console.error("Google Sign-In error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleResponse = async (response: any) => {
    setGoogleLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

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

      onSuccess?.();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome Back</h3>
        <p className="text-sm text-gray-600 mb-6">
          Sign in to your account to continue writing
        </p>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {googleLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        <span className="text-sm font-medium text-gray-900">
          {googleLoading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>

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
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => window.location.reload()}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}