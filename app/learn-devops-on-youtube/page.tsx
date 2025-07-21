"use client";
import { useState } from "react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { YouTubePlaylists } from "@/components/YouTubePlaylists";

export default function LearnDevOpsOnUtubePage() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      <MinimalHeader />
      <YouTubePlaylists showAll={showAll} setShowAll={setShowAll} />
      <MinimalFooter />
    </div>
  );
}