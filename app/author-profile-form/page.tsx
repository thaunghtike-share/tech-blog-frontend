"use client";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import ProfileForm from "./profile-form";

export default function AuthorProfileFormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white/95 relative overflow-x-hidden">
      <MinimalHeader />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-10 w-full">
        <ProfileForm />
      </main>
      <MinimalFooter />
    </div>
  );
}