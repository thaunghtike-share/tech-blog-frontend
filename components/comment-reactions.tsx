"use client";
import { useState, useEffect } from 'react';
import { Heart, ThumbsUp, Sparkles, Lightbulb, Send, Reply, Trash2, Edit, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/app/auth/hooks/use-auth';

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

// Reaction Button Component
const ReactionButton = ({ 
  type, 
  count, 
  icon: Icon, 
  isActive,
  onClick,
  isAuthenticated,
  onAuthRequired
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
    switch(type) {
      case 'like': return 'text-blue-600';
      case 'love': return 'text-red-500'; 
      case 'celebrate': return 'text-yellow-500';
      case 'insightful': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getReactionName = (type: string) => {
    switch(type) {
      case 'like': return 'Like';
      case 'love': return 'Love';
      case 'celebrate': return 'Celebrate';
      case 'insightful': return 'Insightful';
      default: return type;
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
      className={`group flex items-center gap-3 px-4 py-2 transition-all duration-200 hover:scale-105 ${
        isActive ? `${getReactionColor(type)} font-semibold` : 'text-gray-500 hover:text-gray-700'
      } ${!isAuthenticated ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      title={!isAuthenticated ? "Please sign in to react" : ""}
    >
      <Icon className="w-5 h-5" />
      <div className="flex items-center gap-2">
        <span className="text-sm">{getReactionName(type)}</span>
        {count > 0 && (
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {count}
          </span>
        )}
      </div>
    </button>
  );
};

export function CommentsReactions({ articleSlug, currentUser }: CommentsReactionsProps) {
  // State
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactions, setReactions] = useState<ReactionsSummary>({
    like: 0, love: 0, celebrate: 0, insightful: 0
  });
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [anonymousName, setAnonymousName] = useState('');
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Use your auth hook
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Fetch reactions for the article
  const fetchReactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add authorization header if user is authenticated
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }

      const response = await fetch(
        `${API_BASE_URL}/articles/${articleSlug}/reactions/`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Update reactions summary
        if (data.summary) {
          setReactions({
            like: Number(data.summary.like) || 0,
            love: Number(data.summary.love) || 0,
            celebrate: Number(data.summary.celebrate) || 0,
            insightful: Number(data.summary.insightful) || 0
          });
        }
        
        // Update user's reactions if authenticated
        if (data.user_reactions) {
          setUserReactions(data.user_reactions);
        }
      }
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${articleSlug}/comments/`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        // Refresh reactions to get updated counts
        fetchReactions();
      } else if (response.status === 401) {
        // Unauthorized - show auth modal
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error('Failed to toggle reaction:', error);
    }
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  // Submit comment
  const submitComment = async (content: string, parentId: number | null = null) => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/articles/${articleSlug}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          parent: parentId,
          anonymous_name: anonymousName || 'Anonymous',
          anonymous_email: anonymousEmail
        }),
      });

      if (response.ok) {
        fetchComments();
        
        if (parentId) {
          setReplyContent('');
          setReplyTo(null);
        } else {
          setNewComment('');
          setAnonymousName('');
          setAnonymousEmail('');
        }
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete comment
  const deleteComment = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  // Update comment
  const updateComment = async (commentId: number) => {
    if (!editContent.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/comments/${commentId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editContent.trim()
        }),
      });

      if (response.ok) {
        setEditingComment(null);
        setEditContent('');
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  // Comment component
  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReplies, setShowReplies] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    return (
      <div className={`mb-3 ${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="flex items-start gap-2">
          {/* Author Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {comment.author_avatar ? (
              <img 
                src={comment.author_avatar} 
                alt={comment.author_name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              comment.author_name?.charAt(0)?.toUpperCase() || 'A'
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {comment.author_name || 'Anonymous'}
              </h4>
              {comment.is_author && (
                <span className="px-1.5 py-0.5 bg-sky-100 text-sky-700 text-xs rounded-full font-medium">
                  Author
                </span>
              )}
              <span className="text-xs text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
              
              {/* Comment Menu */}
              {comment.is_author && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MoreHorizontal className="w-3 h-3 text-gray-500" />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                      <button
                        onClick={() => {
                          setEditingComment(comment.id);
                          setEditContent(comment.content);
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteComment(comment.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Edit Form */}
            {editingComment === comment.id ? (
              <div className="mb-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-2 text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateComment(comment.id)}
                    className="text-xs"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingComment(null);
                      setEditContent('');
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
            )}

            {/* Comment Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-xs text-gray-600 hover:text-sky-600 font-medium"
              >
                Reply
              </button>

              {comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-xs text-gray-600 hover:text-sky-600 font-medium flex items-center gap-1"
                >
                  {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </button>
              )}
            </div>

            {/* Reply Form */}
            {replyTo === comment.id && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="mb-2 text-sm"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyContent('');
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => submitComment(replyContent, comment.id)}
                    disabled={!replyContent.trim() || loading}
                    className="text-xs"
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            )}

            {/* Nested Replies */}
            {showReplies && comment.replies && comment.replies.length > 0 && (
              <div className="mt-2">
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

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Reactions Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-center gap-3">
            <ReactionButton 
              type="like" 
              count={reactions.like} 
              icon={ThumbsUp}
              isActive={userReactions.includes('like')}
              onClick={() => handleReaction('like')}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton 
              type="love" 
              count={reactions.love} 
              icon={Heart}
              isActive={userReactions.includes('love')}
              onClick={() => handleReaction('love')}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton 
              type="celebrate" 
              count={reactions.celebrate} 
              icon={Sparkles}
              isActive={userReactions.includes('celebrate')}
              onClick={() => handleReaction('celebrate')}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
            <ReactionButton 
              type="insightful" 
              count={reactions.insightful} 
              icon={Lightbulb}
              isActive={userReactions.includes('insightful')}
              onClick={() => handleReaction('insightful')}
              isAuthenticated={isAuthenticated}
              onAuthRequired={handleAuthRequired}
            />
          </div>
          
          {/* Authentication Notice */}
          {!isAuthenticated && (
            <div className="text-center mt-3">
              <p className="text-sm text-gray-600">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="text-sky-600 hover:text-sky-700 font-medium underline"
                >
                  Sign in
                </button> to react to this article
              </p>
            </div>
          )}

          {/* Current Reaction Status */}
          {isAuthenticated && userReactions.length > 0 && (
            <div className="text-center mt-3 text-sm text-gray-600">
              You reacted with <span className="font-semibold capitalize">{userReactions[0]}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({comments.length})
          </h3>

          {/* Comment Form */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 text-sm"
              rows={3}
            />
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Commenting as <span className="font-medium">Anonymous</span>
              </div>
              
              <Button
                onClick={() => submitComment(newComment)}
                disabled={!newComment.trim() || loading}
                size="sm"
                className="text-xs"
              >
                <Send className="w-3 h-3 mr-1" />
                {loading ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {displayedComments.length === 0 ? (
              <p className="text-gray-500 text-center py-4 text-sm">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              <>
                {displayedComments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
                
                {/* Show More/Less Button */}
                {comments.length > 3 && (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => setShowAllComments(!showAllComments)}
                      className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                    >
                      {showAllComments ? 'Show less comments' : `Show all ${comments.length} comments`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Sign In Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to react to articles and engage with the community.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAuthModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAuthModal(false);
                  // Trigger your auth modal from MinimalHeader
                  const authButton = document.querySelector('[onclick*="AuthModal"]');
                  if (authButton) {
                    (authButton as HTMLButtonElement).click();
                  }
                }}
                className="flex-1 bg-sky-600 hover:bg-sky-700"
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