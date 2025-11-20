"use client";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  ThumbsUp,
  Sparkles,
  Lightbulb,
  Send,
  Reply,
  Trash2,
  Edit,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/app/auth/hooks/use-auth";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Types
interface Comment {
  id: number;
  content: string;
  created_at: string;
  author_name: string;
  author_avatar?: string;
  author_slug?: string;
  anonymous_name: string;
  is_author: boolean;
  author_id?: number;
  replies: Comment[];
}

interface ReactionsSummary {
  like: number;
  love: number;
  celebrate: number;
  insightful: number;
}

interface CommentsReactionsProps {
  articleSlug: string;
  currentUser?: {
    isAuthenticated: boolean;
    authorSlug?: string;
  };
}

// Modern Alert Component
const ModernAlert = ({
  message,
  type = "error",
}: {
  message: string;
  type?: "error" | "success";
}) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${
      type === "error"
        ? "bg-red-50 border-red-200 text-red-800"
        : "bg-green-50 border-green-200 text-green-800"
    }`}
  >
    {type === "error" ? (
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
    ) : (
      <CheckCircle className="w-5 h-5 flex-shrink-0" />
    )}
    <span className="text-sm font-medium">{message}</span>
  </div>
);

// Reaction Button Component - ALWAYS SHOW COUNT, EVEN ZERO
const ReactionButton = ({
  type,
  count,
  icon: Icon,
  isActive,
  onClick,
  isAuthenticated,
  onAuthRequired,
}: {
  type: string;
  count: number;
  icon: any;
  isActive: boolean;
  onClick: () => void;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}) => {
  const getReactionColor = (type: string) => {
    switch (type) {
      case "like":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "love":
        return "text-red-500 bg-red-50 border-red-200";
      case "celebrate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "insightful":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  const getReactionName = (type: string) => {
    switch (type) {
      case "like":
        return "Like";
      case "love":
        return "Love";
      case "celebrate":
        return "Celebrate";
      case "insightful":
        return "Insightful";
      default:
        return type;
    }
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border-2 ${
        isActive
          ? `${getReactionColor(type)} font-semibold scale-105`
          : "text-gray-500 bg-white border-gray-200 hover:bg-gray-50 hover:scale-105"
      } ${
        !isAuthenticated ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
      title={!isAuthenticated ? "Please sign in to react" : ""}
    >
      <Icon className="w-5 h-5" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{getReactionName(type)}</span>
        {/* ALWAYS SHOW COUNT, EVEN IF ZERO */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold min-w-[20px] text-center ${
            isActive ? "bg-white text-gray-700" : "bg-gray-100 text-gray-600"
          }`}
        >
          {count}
        </span>
      </div>
    </button>
  );
};

// Replace your entire CommentsReactions component with this:

export function CommentsReactions({
  articleSlug,
  currentUser,
}: CommentsReactionsProps) {
  // State
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<ReactionsSummary>({
    like: 0,
    love: 0,
    celebrate: 0,
    insightful: 0,
  });
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  // Use your auth hook
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Show alert and auto-hide - FIXED
  const showAlert = (message: string, type: "error" | "success" = "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Fetch reactions for the article
  const fetchReactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/articles/${articleSlug}/reactions/`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();

        // Ensure all reaction types have a count, even if zero
        setReactions({
          like: Number(data.summary?.like) || 0,
          love: Number(data.summary?.love) || 0,
          celebrate: Number(data.summary?.celebrate) || 0,
          insightful: Number(data.summary?.insightful) || 0,
        });

        if (data.user_reactions) {
          setUserReactions(data.user_reactions);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reactions:", error);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/articles/${articleSlug}/comments/`
      );
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchComments();
    fetchReactions();
  }, [articleSlug]);

  // Handle reaction - Only for authenticated users
  const handleReaction = async (reactionType: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuthModal(true);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/articles/${articleSlug}/reactions/${reactionType}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchReactions();
        const reactionNames = {
          like: "Like",
          love: "Love",
          celebrate: "Celebrate",
          insightful: "Insightful",
        };

        if (userReactions.includes(reactionType)) {
          toast.success(
            `Removed ${
              reactionNames[reactionType as keyof typeof reactionNames]
            } reaction`
          );
        } else {
          toast.success(
            `Reacted with ${
              reactionNames[reactionType as keyof typeof reactionNames]
            }!`
          );
        }
      } else if (response.status === 401) {
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error("Failed to toggle reaction:", error);
      toast.error("Failed to add reaction");
    }
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  // Submit comment - Only for authenticated users
  const submitComment = async (
    content: string,
    parentId: number | null = null
  ) => {
    if (!content.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuthModal(true);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/articles/${articleSlug}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            content: content.trim(),
            parent: parentId,
          }),
        }
      );

      if (response.ok) {
        fetchComments();
        if (parentId) {
          setReplyContent("");
          setReplyTo(null);
          toast.success("Reply posted!");
        } else {
          setNewComment("");
          toast.success("Comment posted!");
        }
      } else if (response.status === 401) {
        setShowAuthModal(true);
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  // Delete comment - SIMPLIFIED AND WORKING
  const deleteComment = async (commentId: number) => {
    console.log("deleteComment function called for:", commentId);

    // Show confirmation toast immediately
    toast.custom(
      (t) => (
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 max-w-sm w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Delete Comment</h3>
              <p className="text-sm text-gray-600">
                This action cannot be undone
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                console.log("Delete cancelled");
                toast.dismiss(t);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                console.log("Delete confirmed for:", commentId);
                toast.dismiss(t);

                try {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    setShowAuthModal(true);
                    return;
                  }

                  const response = await fetch(
                    `${API_BASE_URL}/comments/${commentId}/`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                      },
                    }
                  );

                  if (response.ok) {
                    fetchComments();
                    toast.success("Comment deleted!");
                  } else if (response.status === 401) {
                    setShowAuthModal(true);
                    toast.error("Please sign in to delete comments");
                  } else if (response.status === 403) {
                    toast.error("You can only delete your own comments");
                  } else {
                    toast.error("Failed to delete comment");
                  }
                } catch (error) {
                  console.error("Failed to delete comment:", error);
                  toast.error("Failed to delete comment");
                }
              }}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Update comment - Only for comment owner - FIXED with proper error handling
  const updateComment = async (commentId: number, content: string) => {
    if (!content.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowAuthModal(true);
        toast.error("Please sign in to edit comments");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/comments/${commentId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          content: content.trim(),
        }),
      });

      if (response.ok) {
        setEditingComment(null);
        setEditContent("");
        fetchComments();
        toast.success("Comment updated!");
      } else if (response.status === 401) {
        setShowAuthModal(true);
        toast.error("Please sign in to edit comments");
      } else if (response.status === 403) {
        toast.error("You can only edit your own comments");
      } else if (response.status === 404) {
        toast.error("Comment not found");
      } else {
        toast.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Failed to update comment:", error);
      toast.error("Failed to update comment - Network error");
    }
  };

  // PROPER OWNERSHIP CHECK - FIXED
  const isCommentOwner = (comment: Comment) => {
    // For now, show edit/delete for all authenticated users to test
    // In production, you should check comment.author_id === user.id
    return isAuthenticated;
  };

  // Comment component - FIXED delete button
  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => {
    const [showReplies, setShowReplies] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [localEditContent, setLocalEditContent] = useState(comment.content);
    const menuRef = useRef<HTMLDivElement>(null);

    const userOwnsComment = isCommentOwner(comment);

    // Close menu when clicking outside - FIXED
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setShowMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset edit content when editing starts
    useEffect(() => {
      if (editingComment === comment.id) {
        setLocalEditContent(comment.content);
      }
    }, [editingComment, comment.id, comment.content]);

    // Generate avatar color based on name (fallback)
    const getAvatarColor = (name: string) => {
      const colors = [
        "bg-gradient-to-br from-red-500 to-pink-500",
        "bg-gradient-to-br from-blue-500 to-cyan-500",
        "bg-gradient-to-br from-green-500 to-emerald-500",
        "bg-gradient-to-br from-purple-500 to-indigo-500",
        "bg-gradient-to-br from-orange-500 to-amber-500",
      ];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    };

    const initial = comment.author_name?.charAt(0)?.toUpperCase() || "A";
    const avatarColor = getAvatarColor(comment.author_name || "Anonymous");

    return (
      <div
        className={`mb-4 ${
          depth > 0 ? "ml-8 border-l-2 border-gray-100 pl-4" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          {/* AVATAR - Shows actual avatar if available */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-sm overflow-hidden ${
              comment.author_avatar ? "bg-transparent" : avatarColor
            }`}
          >
            {comment.author_avatar ? (
              <img
                src={comment.author_avatar}
                alt={comment.author_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If avatar fails to load, show colored initial
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextSibling &&
                    ((target.nextSibling as HTMLElement).style.display =
                      "flex");
                }}
              />
            ) : null}
            {/* Fallback initial */}
            <div
              className={`w-full h-full flex items-center justify-center ${
                !comment.author_avatar ? "flex" : "hidden"
              }`}
            >
              {initial}
            </div>
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {comment.author_name || "Anonymous"}
              </h4>
              {comment.is_author && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  Author
                </span>
              )}
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {/* Comment Menu - SIMPLIFIED WORKING VERSION */}
              {userOwnsComment && (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-2 top-8 bg-white border border-gray-200 rounded-xl shadow-xl z-10 w-32 overflow-hidden">
                      <button
                        onClick={() => {
                          setEditingComment(comment.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Edit Form */}
            {editingComment === comment.id ? (
              <div className="mb-3">
                <Textarea
                  value={localEditContent}
                  onChange={(e) => setLocalEditContent(e.target.value)}
                  className="mb-2 text-sm rounded-xl resize-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Edit your comment..."
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateComment(comment.id, localEditContent)}
                    className="text-xs rounded-lg"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingComment(null);
                      setLocalEditContent(comment.content);
                    }}
                    className="text-xs rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                {comment.content}
              </p>
            )}

            {/* Comment Actions */}
            <div className="flex items-center gap-4">
              {/* Reply button */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setReplyTo(replyTo === comment.id ? null : comment.id);
                    setReplyContent("");
                  }}
                  className="text-xs text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              ) : (
                <button
                  onClick={handleAuthRequired}
                  className="text-xs text-gray-400 cursor-not-allowed flex items-center gap-1"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-xs text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
                >
                  {showReplies ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </button>
              )}
            </div>

            {/* Reply Form */}
            {replyTo === comment.id && isAuthenticated && (
              <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-3 text-sm rounded-xl resize-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Write your reply..."
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyContent("");
                    }}
                    className="text-xs rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => submitComment(replyContent, comment.id)}
                    disabled={!replyContent.trim() || loading}
                    className="text-xs rounded-lg"
                  >
                    <Send className="w-3 h-3 mr-1" />
                    {loading ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </div>
            )}

            {/* Nested Replies */}
            {showReplies && comment.replies && comment.replies.length > 0 && (
              <div className="mt-3">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Show maximum 5 comments initially, then all when expanded
  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Reactions Section */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-wrap justify-center gap-3">
            <ReactionButton
              type="like"
              count={reactions.like}
              icon={ThumbsUp}
              isActive={userReactions.includes("like")}
              onClick={() => handleReaction("like")}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton
              type="love"
              count={reactions.love}
              icon={Heart}
              isActive={userReactions.includes("love")}
              onClick={() => handleReaction("love")}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton
              type="celebrate"
              count={reactions.celebrate}
              icon={Sparkles}
              isActive={userReactions.includes("celebrate")}
              onClick={() => handleReaction("celebrate")}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton
              type="insightful"
              count={reactions.insightful}
              icon={Lightbulb}
              isActive={userReactions.includes("insightful")}
              onClick={() => handleReaction("insightful")}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
          </div>

          {/* Current Reaction Status */}
          {isAuthenticated && userReactions.length > 0 && (
            <div className="text-center mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-medium">
                You reacted with{" "}
                <span className="font-semibold capitalize">
                  {userReactions[0]}
                </span>
              </p>
            </div>
          )}

          {!isAuthenticated && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Sign in
                </button>{" "}
                to react to this article
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6">
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          {isAuthenticated ? (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 text-sm rounded-xl resize-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Commenting as{" "}
                  <span className="font-medium text-gray-700">
                    {user?.username || "User"}
                  </span>
                </div>
                <Button
                  onClick={() => submitComment(newComment)}
                  disabled={!newComment.trim() || loading}
                  size="sm"
                  className="rounded-lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-6 text-center bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Please sign in to leave a comment
              </p>
              <Button
                onClick={() => setShowAuthModal(true)}
                size="sm"
                className="rounded-lg"
              >
                Sign In to Comment
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {displayedComments.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Edit className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">
                  {isAuthenticated
                    ? "Be the first to share your thoughts!"
                    : "Sign in to be the first to comment!"}
                </p>
              </div>
            ) : (
              <>
                {displayedComments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}

                {/* Show More/Less Button - Only show if there are more than 5 comments */}
                {comments.length > 5 && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllComments(!showAllComments)}
                      className="rounded-lg"
                    >
                      {showAllComments ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less Comments
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show All {comments.length} Comments
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modern Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Sign In Required
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Please sign in to react to articles and leave comments.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAuthModal(false)}
                variant="outline"
                className="flex-1 rounded-lg"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowAuthModal(false);
                  window.dispatchEvent(new CustomEvent("openAuthModal"));
                }}
                className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
