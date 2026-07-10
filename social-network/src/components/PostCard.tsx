/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Post, Comment } from '../types';
import { Heart, MessageSquare, Globe, Users, Lock, Trash2, Send, CornerDownRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    currentUser,
    users,
    groups,
    likePost,
    addComment,
    deletePost,
    setActiveTab,
    setViewingProfileId,
    setActiveGroupId,
  } = useSocial();

  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Find author
  const author = users.find(u => u.id === post.authorId);
  if (!author) return null;

  // Find group if applicable
  const group = post.groupId ? groups.find(g => g.id === post.groupId) : null;

  const isLikedByMe = post.likes.includes(currentUser.id);
  const isMyPost = post.authorId === currentUser.id;

  const handleLike = () => {
    likePost(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    addComment(post.id, commentContent.trim());
    setCommentContent('');
    setShowComments(true);
  };

  const handleAuthorClick = () => {
    setViewingProfileId(author.id);
    setActiveTab('profile');
  };

  const handleGroupClick = () => {
    if (group) {
      setActiveGroupId(group.id);
      setActiveTab('groups');
    }
  };

  // Human-readable privacy rendering
  const getPrivacyIcon = () => {
    switch (post.privacy) {
      case 'friends':
        return <Users className="h-3.5 w-3.5" title="Friends Only" />;
      case 'private':
        return <Lock className="h-3.5 w-3.5" title="Only Me" />;
      default:
        return <Globe className="h-3.5 w-3.5" title="Public" />;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm transition-all duration-200">
      {/* Author Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={handleAuthorClick} className="focus:outline-none">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800 hover:opacity-95 transition"
            />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <button
                onClick={handleAuthorClick}
                className="font-bold text-sm text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition"
              >
                {author.name}
              </button>
              {group && (
                <>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold">in</span>
                  <button
                    onClick={handleGroupClick}
                    className="font-bold text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {group.name}
                  </button>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-0.5 text-zinc-400 dark:text-zinc-500 text-xs font-semibold">
              <span>{formatTime(post.createdAt)}</span>
              <span>&bull;</span>
              <div className="flex items-center space-x-1">
                {getPrivacyIcon()}
                <span className="capitalize text-[10px] tracking-wide">{post.privacy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delete option if it's my post */}
        {isMyPost && (
          <button
            onClick={() => deletePost(post.id)}
            className="p-1.5 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
            title="Delete post"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="mt-3">
        <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap select-text">
          {post.content}
        </p>
      </div>

      {/* Attached Image */}
      {post.image && (
        <div className="mt-3 -mx-4 border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 max-h-96 flex items-center justify-center overflow-hidden">
          <img
            src={post.image}
            alt="Post media"
            className="w-full object-cover max-h-96"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Likes and Comments Counters */}
      <div className="flex items-center justify-between mt-3.5 pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400 dark:text-zinc-500 font-bold">
        <div className="flex items-center space-x-1">
          <span className="flex items-center justify-center h-4 w-4 rounded-full bg-rose-500 text-white text-[9px]">
            ❤️
          </span>
          <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
        </div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="hover:underline focus:outline-none"
        >
          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
        </button>
      </div>

      {/* Interactive Actions bar */}
      <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            isLikedByMe
              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/20'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Heart className={`h-4.5 w-4.5 ${isLikedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>{isLikedByMe ? 'Liked' : 'Like'}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-extrabold transition text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${
            showComments ? 'bg-zinc-100 dark:bg-zinc-800 text-indigo-500 dark:text-indigo-400' : ''
          }`}
        >
          <MessageSquare className="h-4.5 w-4.5" />
          <span>Comment</span>
        </button>
      </div>

      {/* Comments List & Input */}
      {showComments && (
        <div className="mt-3.5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 space-y-3.5 animate-in slide-in-from-top duration-200">
          {/* List existing comments */}
          {post.comments.length > 0 && (
            <div className="space-y-3">
              {post.comments.map(comment => {
                const commentAuthor = users.find(u => u.id === comment.authorId);
                if (!commentAuthor) return null;
                return (
                  <div key={comment.id} className="flex items-start space-x-2.5">
                    <img
                      src={commentAuthor.avatar}
                      alt={commentAuthor.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-700 mt-0.5"
                    />
                    <div className="flex-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl px-3.5 py-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                          {commentAuthor.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          {formatTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 mt-1 font-medium leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Comment box */}
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-1">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover ring-1 ring-indigo-500/30"
            />
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
                className="w-full pl-3.5 pr-10 py-2 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border-none outline-none focus:ring-1 focus:ring-indigo-500 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!commentContent.trim()}
                className="absolute right-1.5 p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 disabled:text-zinc-300 dark:disabled:text-zinc-700 disabled:bg-transparent rounded-full transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
