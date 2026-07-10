/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { Camera, Edit2, Check, X, UserPlus, UserMinus, MessageSquare, Compass } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    users,
    posts,
    groups,
    viewingProfileId,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    setActiveTab,
    setActiveChatUserId,
    setActiveGroupId,
    setViewingProfileId,
    updateBio,
  } = useSocial();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');

  // Determine which profile we are viewing
  const profileId = viewingProfileId || currentUser.id;
  const profileUser = users.find(u => u.id === profileId);

  if (!profileUser) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-bold text-rose-500">User profile not found.</p>
      </div>
    );
  }

  const isOwnProfile = profileUser.id === currentUser.id;

  // Relationship statuses
  const isFriend = currentUser.friends.includes(profileUser.id);
  const hasIncomingRequest = currentUser.friendRequestsIncoming.includes(profileUser.id);
  const hasOutgoingRequest = currentUser.friendRequestsOutgoing.includes(profileUser.id);

  // Filter posts created by this profile user that are visible to the current logged-in user
  const visibleUserPosts = posts.filter(post => {
    if (post.authorId !== profileUser.id) return false;
    if (isOwnProfile) return true; // Can see all own posts
    if (post.privacy === 'public') return true; // Anyone can see public
    if (post.privacy === 'friends') return isFriend; // Friends only
    return false; // Private posts hidden from others
  });

  const handleStartEditBio = () => {
    setNewBio(profileUser.bio);
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    updateBio(newBio.trim());
    setIsEditingBio(false);
  };

  const handleMessageUser = () => {
    setActiveChatUserId(profileUser.id);
    setActiveTab('chat');
  };

  const handleProfileClick = (id: string) => {
    setViewingProfileId(id);
    setIsEditingBio(false);
  };

  const handleGroupClick = (id: string) => {
    setActiveGroupId(id);
    setActiveTab('groups');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Block */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-200">
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 relative bg-zinc-200 dark:bg-zinc-800">
          <img
            src={profileUser.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isOwnProfile && (
            <button
              className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 text-xs font-bold flex items-center space-x-1 transition"
              title="Change Cover Photo"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Edit Cover</span>
            </button>
          )}
        </div>

        {/* Profile Info Overlay Segment */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Avatar */}
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-white dark:bg-zinc-800 shrink-0 shadow-md">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isOwnProfile && (
                  <button
                    className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition duration-150"
                    title="Change Avatar"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Name & Username */}
              <div className="pb-1">
                <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {profileUser.name}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-bold">
                  @{profileUser.username}
                </p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold mt-1">
                  {profileUser.friends.length} {profileUser.friends.length === 1 ? 'friend' : 'friends'}
                </p>
              </div>
            </div>

            {/* Profile CTA Buttons depending on who is viewing who */}
            <div className="flex items-center space-x-2 shrink-0">
              {isOwnProfile ? (
                <button
                  onClick={handleStartEditBio}
                  className="px-4 py-2 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center space-x-1.5 transition"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit Profile Bio</span>
                </button>
              ) : (
                <>
                  {/* Message Button */}
                  <button
                    onClick={handleMessageUser}
                    className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Message</span>
                  </button>

                  {/* Friendship State button */}
                  {isFriend ? (
                    <button
                      onClick={() => removeFriend(profileUser.id)}
                      className="px-4 py-2 text-xs font-bold bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                    >
                      <UserMinus className="h-3.5 w-3.5" />
                      <span>Unfriend</span>
                    </button>
                  ) : hasIncomingRequest ? (
                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => acceptFriendRequest(profileUser.id)}
                        className="px-3.5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer"
                      >
                        Accept Request
                      </button>
                    </div>
                  ) : hasOutgoingRequest ? (
                    <button
                      disabled
                      className="px-4 py-2 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 rounded-xl transition cursor-default"
                    >
                      Request Pending
                    </button>
                  ) : (
                    <button
                      onClick={() => sendFriendRequest(profileUser.id)}
                      className="px-4 py-2 text-xs font-bold bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-xl flex items-center space-x-1.5 transition cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Add Friend</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* User Bio Editor Drawer */}
          {isEditingBio ? (
            <div className="mt-4 p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-3">
              <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                Update Bio
              </span>
              <textarea
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Tell the community about yourself..."
                className="w-full text-sm p-3 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-1 focus:ring-indigo-500 h-20 resize-none"
                maxLength={200}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="px-3 py-1.5 text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBio}
                  className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            profileUser.bio && (
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 bg-zinc-50 dark:bg-zinc-800/30 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800/40 italic font-medium leading-relaxed select-text">
                &ldquo;{profileUser.bio}&rdquo;
              </p>
            )
          )}
        </div>
      </div>

      {/* Two Column Layout: Info/Friends vs Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Intro & Friends Grid */}
        <div className="lg:col-span-4 space-y-6">
          {/* Intro Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 border-zinc-100 dark:border-zinc-800">
              Intro
            </h3>

            <div className="space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300 font-semibold">
              <div className="flex items-center space-x-2.5">
                <span className="text-base">👤</span>
                <span>Username: <strong className="text-zinc-800 dark:text-zinc-200">@{profileUser.username}</strong></span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-base">📅</span>
                <span>Joined SocialCircle in July 2026</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="text-base">🛡️</span>
                <span>
                  Privacy Filter Profile: <strong className="text-indigo-600 dark:text-indigo-400">Active</strong>
                </span>
              </div>
            </div>

            {/* Groups Shortcut list */}
            {profileUser.joinedGroups.length > 0 && (
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                  Joined Groups
                </span>
                <div className="space-y-2">
                  {profileUser.joinedGroups.map(gid => {
                    const group = groups.find(g => g.id === gid);
                    if (!group) return null;
                    return (
                      <button
                        key={group.id}
                        onClick={() => handleGroupClick(group.id)}
                        className="flex items-center w-full text-left p-1 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs text-zinc-700 dark:text-zinc-300 transition font-bold"
                      >
                        <img
                          src={group.coverPhoto}
                          alt={group.name}
                          className="h-6 w-6 rounded object-cover mr-2"
                        />
                        <span className="truncate flex-1">{group.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Friends Connection Grid */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2 border-zinc-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Friends
              </h3>
              <span className="text-xs text-zinc-400 font-bold">{profileUser.friends.length} total</span>
            </div>

            {profileUser.friends.length === 0 ? (
              <p className="text-xs text-zinc-400 text-center py-4">No connected friends yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {profileUser.friends.map(friendId => {
                  const friend = users.find(u => u.id === friendId);
                  if (!friend) return null;
                  return (
                    <button
                      key={friend.id}
                      onClick={() => handleProfileClick(friend.id)}
                      className="group flex flex-col items-center p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition text-center outline-none"
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="h-14 w-14 rounded-xl object-cover ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:scale-105 transition"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-200 mt-1.5 truncate w-full">
                        {friend.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: User Posts Feed */}
        <div className="lg:col-span-8 space-y-5">
          {isOwnProfile && <CreatePost />}

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-2xl transition">
            <span className="text-xs font-extrabold text-zinc-500 dark:text-zinc-400 px-2 block">
              {isOwnProfile ? 'Your Updates' : `${profileUser.name.split(' ')[0]}'s Updates`} ({visibleUserPosts.length})
            </span>
          </div>

          {visibleUserPosts.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
                No visible updates.
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {isOwnProfile 
                  ? 'Share your first update to fill your profile!' 
                  : `Posts may be private or restricted by privacy rules.`}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {visibleUserPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
