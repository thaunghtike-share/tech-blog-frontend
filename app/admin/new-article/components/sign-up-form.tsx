"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

interface SignUpFormProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  // Initialize Google Sign-In when component mounts
  useEffect(() => {
    const initializeGoogle = () => {
      if (!(window as any).google) {
        console.error("Google object not available");
        return false;
      }

      try {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleResponse,
          ux_mode: "popup",
          auto_select: false,
        });
        console.log("Google Sign-In initialized successfully");
        return true;
      } catch (err) {
        console.error("Failed to initialize Google Sign-In:", err);
        return false;
      }
    };

    if ((window as any).google) {
      initializeGoogle();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).google) {
          initializeGoogle();
          clearInterval(checkInterval);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        if (!(window as any).google) {
          setError("Google Sign-In failed to load. Please refresh the page.");
        }
      }, 5000);
    }

    return () => {
      const googleButton = document.getElementById("googleSignUpButton");
      if (googleButton) {
        googleButton.innerHTML = "";
      }
    };
  }, []);

  // Render Google Button when component mounts
  useEffect(() => {
    if ((window as any).google) {
      renderGoogleButton();
    }
  }, []);

  const renderGoogleButton = () => {
    const googleButton = document.getElementById("googleSignUpButton");
    if (googleButton && (window as any).google) {
      googleButton.innerHTML = "";
      
      (window as any).google.accounts.id.renderButton(googleButton, {
        theme: "filled_blue", // Changed to match your theme
        size: "large",
        width: "100%",
        text: "signup_with",
        logo_alignment: "left",
        shape: "rectangular",
      });

      // Add custom CSS to match your design
      const style = document.createElement('style');
      style.textContent = `
        #googleSignUpButton iframe {
          border-radius: 12px !important;
          border: 1px solid #d1d5db !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }
        #googleSignUpButton div {
          border-radius: 12px !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  const handleGoogleResponse = async (response: any) => {
    setGoogleLoading(true);
    setError(null);
    
    try {
      console.log("Google response received:", response);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Google sign up failed");
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
      console.error("Google auth error:", error);
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Account</h3>
        <p className="text-sm text-gray-600 mb-6">
          Sign up with Google to start writing articles
        </p>
      </div>

      {/* Google Sign Up Button Container */}
      <div className="">
        <div 
          id="googleSignUpButton" 
          className="w-full flex items-center justify-center rounded-xl overflow-hidden"
        />
        {googleLoading && (
          <div className="text-center mt-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sky-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Signing in with Google...</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => window.location.reload()}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}