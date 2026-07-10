/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';
import { Compass, Users, Sparkles, X, Plus, LogOut, ArrowLeft } from 'lucide-react';

export const GroupsTab: React.FC = () => {
  const {
    currentUser,
    groups,
    posts,
    users,
    activeGroupId,
    createGroup,
    joinGroup,
    leaveGroup,
    setActiveGroupId,
    setViewingProfileId,
    setActiveTab,
  } = useSocial();

  const [isCreating, setIsCreating] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [groupCategory, setGroupCategory] = useState('Technology');
  const [groupCover, setGroupCover] = useState('');

  // Find currently active group if viewing details
  const activeGroup = activeGroupId ? groups.find(g => g.id === activeGroupId) : null;

  // Filter posts specific to this active group
  const activeGroupPosts = activeGroup
    ? posts.filter(post => post.groupId === activeGroup.id)
    : [];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || !groupDesc.trim()) return;

    createGroup(
      groupName.trim(),
      groupDesc.trim(),
      groupCategory,
      groupCover.trim() || undefined
    );

    // Reset fields
    setGroupName('');
    setGroupDesc('');
    setGroupCategory('Technology');
    setGroupCover('');
    setIsCreating(false);
  };

  const handleUserClick = (id: string) => {
    setViewingProfileId(id);
    setActiveTab('profile');
  };

  const categories = ['Technology', 'Outdoors', 'Design', 'Gaming', 'Cooking', 'Business', 'General'];

  // --- RENDERING DETAIL VIEW OF A SELECTED GROUP ---
  if (activeGroup) {
    const isMember = activeGroup.members.includes(currentUser.id);
    const creator = users.find(u => u.id === activeGroup.createdBy);

    return (
      <div className="space-y-6">
        {/* Back navigation */}
        <button
          onClick={() => setActiveGroupId(null)}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Groups Explorer</span>
        </button>

        {/* Group Banner & Cover */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-44 sm:h-56 relative bg-zinc-100 dark:bg-zinc-800">
            <img src={activeGroup.coverPhoto} alt="Group Banner" className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3">
              <span className="text-xs font-extrabold px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full">
                {activeGroup.category}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {activeGroup.name}
                </h1>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold mt-0.5">
                  🛡️ Closed Community &bull; {activeGroup.members.length} members
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2.5 max-w-2xl leading-relaxed">
                  {activeGroup.description}
                </p>
              </div>

              <div className="shrink-0">
                {isMember ? (
                  <button
                    onClick={() => leaveGroup(activeGroup.id)}
                    className="px-4 py-2 text-xs font-bold bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Leave Group</span>
                  </button>
                ) : (
                  <button
                    onClick={() => joinGroup(activeGroup.id)}
                    className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer"
                  >
                    Join Community
                  </button>
                )}
              </div>
            </div>

            {/* Members pile */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center space-x-3">
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                Group Members:
              </span>
              <div className="flex -space-x-2 overflow-hidden">
                {activeGroup.members.slice(0, 8).map(mid => {
                  const member = users.find(u => u.id === mid);
                  if (!member) return null;
                  return (
                    <button
                      key={mid}
                      onClick={() => handleUserClick(mid)}
                      title={member.name}
                      className="focus:outline-none"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-zinc-900 object-cover"
                      />
                    </button>
                  );
                })}
              </div>
              {activeGroup.members.length > 8 && (
                <span className="text-xs text-zinc-400 font-bold">+{activeGroup.members.length - 8} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Group Feed & Side Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-5">
            {isMember ? (
              <CreatePost defaultGroupId={activeGroup.id} />
            ) : (
              <div className="p-5 text-center bg-zinc-50 dark:bg-zinc-800/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  You must be a member to share posts inside this community.
                </p>
              </div>
            )}

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-2xl">
              <span className="text-xs font-extrabold text-zinc-500 dark:text-zinc-400 px-2">
                Discussion Board ({activeGroupPosts.length})
              </span>
            </div>

            {activeGroupPosts.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-sm">
                <p className="text-sm font-semibold text-zinc-400">Discussion is empty.</p>
                <p className="text-xs text-zinc-400 mt-1">Be the first to share an update inside this group!</p>
              </div>
            ) : (
              <div className="space-y-5">
                {activeGroupPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* About Group Card Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 border-zinc-100 dark:border-zinc-800">
                Group Guidelines
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Welcome to **{activeGroup.name}**! To ensure a healthy and engaging community, please adhere to:
              </p>
              <ul className="text-xs text-zinc-500 dark:text-zinc-400 space-y-2 list-disc pl-4 font-semibold">
                <li>Be respectful and constructive</li>
                <li>Keep posts related to {activeGroup.category}</li>
                <li>No spam or self-promotional linking</li>
              </ul>
              
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-extrabold">Group Organizer:</p>
                {creator && (
                  <button
                    onClick={() => handleUserClick(creator.id)}
                    className="flex items-center space-x-2 mt-2 text-left group"
                  >
                    <img src={creator.avatar} alt={creator.name} className="h-6 w-6 rounded-full object-cover" />
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 transition truncate">
                      {creator.name}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING EXPLORER / MAIN GROUPS PAGE ---
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center space-x-2">
            <span>Compass Group Communities</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Discover active community subgroups or create your own custom space.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
        >
          {isCreating ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{isCreating ? 'Close Form' : 'Create Group'}</span>
        </button>
      </div>

      {/* Creating Group Drawer */}
      {isCreating && (
        <form
          onSubmit={handleCreateSubmit}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-md space-y-4 animate-in slide-in-from-top duration-200"
        >
          <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
            Create a New Community Group
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Local Foodies & Coffee Spots"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  value={groupCategory}
                  onChange={(e) => setGroupCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-1">
                  Cover Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={groupCover}
                  onChange={(e) => setGroupCover(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                  placeholder="Summarize your group's focus and theme..."
                  className="w-full px-3 py-2 text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
            >
              Assemble Group
            </button>
          </div>
        </form>
      )}

      {/* Groups Grid Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map(group => {
          const isMember = group.members.includes(currentUser.id);
          return (
            <div
              key={group.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group/card hover:shadow-md transition duration-200"
            >
              {/* Cover */}
              <div className="h-28 relative bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                <img
                  src={group.coverPhoto}
                  alt={group.name}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-extrabold px-2 py-1 bg-black/60 text-white rounded-full uppercase tracking-wider">
                  {group.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition">
                    {group.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold mt-0.5">
                    {group.members.length} members
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2 h-8 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center space-x-1.5 pt-2 border-t border-zinc-50 dark:border-zinc-800">
                  <button
                    onClick={() => setActiveGroupId(group.id)}
                    className="flex-1 py-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 text-zinc-700 dark:text-zinc-300 rounded-lg transition text-center"
                  >
                    Enter Group
                  </button>
                  {isMember ? (
                    <button
                      onClick={() => leaveGroup(group.id)}
                      className="px-2.5 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/25 rounded-lg transition"
                      title="Leave Group"
                    >
                      Joined
                    </button>
                  ) : (
                    <button
                      onClick={() => joinGroup(group.id)}
                      className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
