"use client";
import { useState } from "react";
import { useAuth } from "./hooks/use-auth";

interface GitHubLoginButtonProps {
  onSuccess?: () => void;
}

export default function GitHubLoginButton({
  onSuccess,
}: GitHubLoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // GitHub OAuth configuration
      const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const GITHUB_REDIRECT_URI = `${window.location.origin}/auth/github/callback`;

      // Store state for security
      const state = Math.random().toString(36).substring(2);
      sessionStorage.setItem("github_oauth_state", state);

      // Open GitHub OAuth window
      const authUrl = `https://github.com/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        GITHUB_REDIRECT_URI
      )}&scope=user:email&state=${state}`;

      const width = 600;
      const height = 700;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      window.open(
        authUrl,
        "github_oauth",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error: any) {
      console.error("GitHub login error:", error);
      setError("Failed to initialize GitHub login");
      setLoading(false);
    }
  };

  // Handle GitHub callback response
  const handleGitHubResponse = async (accessToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/github/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: accessToken }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "GitHub sign in failed");
      }

      const authToken = data.token;

      login(authToken, {
        username: data.user?.username || data.user?.first_name || "User",
        email: data.user?.email || "",
        avatar: data.author?.avatar || data.user?.avatar,
        profileComplete: data.author?.profile_complete || false,
      });

      onSuccess?.();

      // Use same redirect logic as Google login
      if (data.author?.profile_complete && data.author?.slug) {
        window.location.href = `/admin/author/${data.author.slug}`;
      } else {
        window.location.href = "/author-profile-form";
      }
    } catch (error: any) {
      console.error("GitHub auth error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Listen for GitHub OAuth messages
  useState(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "GITHUB_OAUTH_SUCCESS") {
        const { access_token } = event.data;
        await handleGitHubResponse(access_token);
      }

      if (event.data.type === "GITHUB_OAUTH_ERROR") {
        setError(event.data.error || "GitHub login failed");
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  });

  return (
    <div className="flex justify-center">
      <button
        onClick={handleGitHubLogin}
        disabled={loading}
        className="flex items-center justify-center gap-3 bg-gray-900 text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-all duration-300 font-base text-sm disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700 w-[380px]"
      >
        {loading ? (
          <span>Connecting to GitHub...</span>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            Continue with GitHub
          </>
        )}
      </button>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm">
          <div className="text-red-700 mb-2">{error}</div>
          <button
            onClick={handleGitHubLogin}
            className="text-red-600 hover:text-red-800 text-sm font-medium underline"
          >
            Try GitHub Sign-In again
          </button>
        </div>
      )}
    </div>
  );
}
