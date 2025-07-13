"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Mail, Copy, Check, Share2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ShareButtonsProps {
  articleId: number // Added articleId to props
  title: string
  url: string
}

export function ShareButtons({ articleId, title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.facebook, "_blank")}
        className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <Facebook className="h-4 w-4" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
        className="flex items-center gap-1 text-blue-700 border-blue-300 hover:bg-blue-50"
      >
        <Linkedin className="h-4 w-4" />
        LinkedIn
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-gray-600 hover:bg-gray-100 bg-transparent"
          >
            <Share2 className="h-4 w-4" />
            More
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={copyLink}>
            {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, "_blank")}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </DropdownMenuItem>
          {/* Add more share options here if needed */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
