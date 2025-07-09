"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ClipboardCopy, Facebook, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  articleId: number;
  title: string;
}

export function ShareButtons({ articleId, title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(`${window.location.origin}/articles/${articleId}`);
  }, [articleId]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy link");
    }
  }, [currentUrl]);

  if (!currentUrl) return null;

  return (
    <div className="mt-12 mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Share this article:</h3>
      <div className="flex flex-wrap gap-3">
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#155CC0] text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#005f91] text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <ClipboardCopy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}

          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-600"
              >
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
