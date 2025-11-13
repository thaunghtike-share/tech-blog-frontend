"use client";
import { useState, useEffect } from "react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

interface AuthModalProps {
  onSuccess?: () => void;
}

export default function AuthModal({ onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin"); // Changed to signin first
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        setGoogleScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Sign-In script loaded successfully");
        setGoogleScriptLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Google Sign-In script");
        setGoogleScriptLoaded(true); // Still allow form-based auth
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {activeTab === "signup" ? "Join Our Community" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {activeTab === "signup" 
              ? "Create an account to share your knowledge" 
              : "Sign in to your account to continue"}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "signin"
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === "signup"
                ? "text-sky-600 border-b-2 border-sky-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Show loading if Google script isn't ready */}
        {!googleScriptLoaded && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Loading authentication...</p>
          </div>
        )}

        {/* Tab Content */}
        <div className={!googleScriptLoaded ? "opacity-50" : ""}>
          {activeTab === "signup" ? (
            <SignUpForm onSuccess={onSuccess} switchToSignIn={() => setActiveTab("signin")} />
          ) : (
            <SignInForm onSuccess={onSuccess} switchToSignUp={() => setActiveTab("signup")} />
          )}
        </div>
      </div>
    </div>
  );
}