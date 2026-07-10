/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { Eye, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

export const Feed: React.FC = () => {
  const { posts, currentUser } = useSocial();
  const [feedFilter, setFeedFilter] = useState<'all' | 'friends'>('all');

  // Strict Privacy Filtering Algorithm
  const visiblePosts = posts.filter(post => {
    // 1. My own posts are always visible to me
    if (post.authorId === currentUser.id) return true;

    // 2. Do not show posts in groups we haven't joined in the main feed,
    // but for demo let's allow it if it's public and not group-gated.
    // Let's enforce that group posts are generally seen in groups or if public.
    
    // 3. Public posts are visible to everyone
    if (post.privacy === 'public') return true;

    // 4. Friends Only posts are visible only if the author is in my friends list
    if (post.privacy === 'friends') {
      return currentUser.friends.includes(post.authorId);
    }

    // 5. Private posts ('private') are only visible to the author (already handled in #1)
    return false;
  });

  // Apply feed tab filter (All visible vs Friends Only visible)
  const filteredPosts = visiblePosts.filter(post => {
    if (feedFilter === 'friends') {
      // Must be written by a friend (and not myself)
      return currentUser.friends.includes(post.authorId) && post.authorId !== currentUser.id;
    }
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Feed Content */}
      <div className="flex-1 space-y-5">
        {/* Feed Header Tabs */}
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl transition">
          <div className="flex space-x-1 w-full sm:w-auto">
            <button
              onClick={() => setFeedFilter('all')}
              className={`flex-1 sm:flex-initial text-xs font-bold px-4 py-2 rounded-xl transition ${
                feedFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setFeedFilter('friends')}
              className={`flex-1 sm:flex-initial text-xs font-bold px-4 py-2 rounded-xl transition ${
                feedFilter === 'friends'
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              Friends Feed
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-xl">
            <UserCheck className="h-3.5 w-3.5" />
            <span>Feed Filter Synced</span>
          </span>
        </div>

        {/* Create Post Area */}
        <CreatePost />

        {/* Post Lists */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              No updates to display in this feed filter.
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Add some friends, join a group, or post a new status to fill your feed!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Widget Guide Panel */}
      <div className="w-full lg:w-80 shrink-0 space-y-5">
        {/* Active Sandbox Feature Guide */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-2.5">
            <Eye className="h-5 w-5" />
            <h3 className="font-extrabold text-sm uppercase tracking-wide">Privacy Settings Engine</h3>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every post you share has strict **Attribute-Based Access Controls**! 
          </p>
          <div className="mt-3.5 space-y-2.5 text-xs">
            <div className="flex items-start space-x-2">
              <span className="text-base leading-none">🌐</span>
              <p className="text-zinc-500 dark:text-zinc-400">
                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">Public:</strong> Visible to anyone in the app sandbox.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-base leading-none">👥</span>
              <p className="text-zinc-500 dark:text-zinc-400">
                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">Friends:</strong> Visible only if the current active user is friends with the author.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-base leading-none">🔒</span>
              <p className="text-zinc-500 dark:text-zinc-400">
                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">Only Me:</strong> Strictly hidden from everyone else except yourself.
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-3.5 border-t border-indigo-100 dark:border-indigo-900/50">
            <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest block mb-1">
              Test Interactive Demo
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Create a **Private** post right now. Then use the **Persona Swapper** in the top right menu to switch to **Sarah codes** or **Jordan**. You will notice that your private post is completely invisible to them!
            </p>
          </div>
        </div>

        {/* Quick Sandbox Facts */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm text-xs space-y-3">
          <div className="flex items-center space-x-2 font-bold text-zinc-800 dark:text-zinc-200">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Real-time Chat Simulation</span>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Head over to **Messenger** and say hello to Sarah, Alex, or Jordan! Our sandbox is pre-configured with intelligent, conversational chatbot personas who will respond in real time.
          </p>
        </div>
      </div>
    </div>
  );
};
