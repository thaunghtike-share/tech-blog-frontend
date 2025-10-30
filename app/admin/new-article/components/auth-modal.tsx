"use client";
import { useState, useEffect } from "react";
import SignUpForm from "./sign-up-form";
import SignInForm from "./sign-in-form";

interface AuthModalProps {
  onSuccess?: () => void;
}

// In AuthModal component, fix the SignUpForm import and usage:
export default function AuthModal({ onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      // Check if script is already loaded
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
      };
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Authentication Required</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Join Our Community
          </h1>
          <p className="text-gray-600">
            Sign in to share your knowledge with the community
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "signup"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === "signin"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Show loading if Google script isn't ready */}
        {!googleScriptLoaded && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading authentication...</p>
          </div>
        )}

        {/* Tab Content - Only show when Google script is loaded */}
        {googleScriptLoaded && (
          <>
            {activeTab === "signup" ? (
              <SignUpForm onSuccess={onSuccess} />
            ) : (
              <SignInForm onSuccess={onSuccess} />
            )}
          </>
        )}
      </div>
    </div>
  );
}