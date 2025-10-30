"use client";
import { useState, useEffect } from "react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import AuthModal from "./components/auth-modal";
import ArticleEditor from "./components/article-editor";
import ProfileForm from "./components/profile-form";
import { useAuth } from "./hooks/use-auth";

export default function NewArticlePage() {
  const { user, isAuthenticated, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <MinimalHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MinimalHeader />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-10 w-full">
        {!isAuthenticated ? (
          <AuthModal />
        ) : !user?.profileComplete ? (
          <ProfileForm />
        ) : (
          <ArticleEditor />
        )}
      </main>
      <MinimalFooter />
    </div>
  );
}