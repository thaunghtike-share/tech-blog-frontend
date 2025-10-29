"use client";

import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { TopUdemyCourses } from "@/components/TopUdemyCourses";

export default function LearnDevOpsOnUdemyPage() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden relative">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <MinimalHeader />
      <main className="relative z-10 -mt-12 md:-mt-5">
        <TopUdemyCourses />
      </main>
      <div className="-mt-9 md:-mt-5">
      <MinimalFooter />
      </div>
    </div>
  );
}