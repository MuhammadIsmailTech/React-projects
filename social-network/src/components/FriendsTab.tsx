/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSocial } from '../context/SocialContext';
import { UserCheck, UserPlus, UserMinus, MessageSquare, ArrowRight } from 'lucide-react';

export const FriendsTab: React.FC = () => {
  const {
    currentUser,
    users,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    setActiveTab,
    setActiveChatUserId,
    setViewingProfileId,
  } = useSocial();

  // 1. Incoming Friend Requests
  const incomingRequests = users.filter(u => currentUser.friendRequestsIncoming.includes(u.id));

  // 2. Outgoing Pending Requests
  const outgoingRequests = users.filter(u => currentUser.friendRequestsOutgoing.includes(u.id));

  // 3. Current Friends
  const currentFriends = users.filter(u => currentUser.friends.includes(u.id));

  // 4. People you may know (Any user who is not myself, not my friend, and has no pending requests)
  const suggestedPeople = users.filter(u => {
    return u.id !== currentUser.id &&
      !currentUser.friends.includes(u.id) &&
      !currentUser.friendRequestsIncoming.includes(u.id) &&
      !currentUser.friendRequestsOutgoing.includes(u.id);
  });

  const handleProfileClick = (id: string) => {
    setViewingProfileId(id);
    setActiveTab('profile');
  };

  const handleChatClick = (id: string) => {
    setActiveChatUserId(id);
    setActiveTab('chat');
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm transition">
        <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center space-x-2">
          <span>👥 Connect & Friends System</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Manage your connections, accept requests, or find new people to expand your circle.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Requests & Suggestions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Incoming Friend Requests */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span>Incoming Requests</span>
              <span className="bg-indigo-500 text-white text-xs px-2.5 py-0.5 rounded-full">
                {incomingRequests.length}
              </span>
            </h3>

            {incomingRequests.length === 0 ? (
              <p className="text-xs text-zinc-400 py-4 text-center">No pending friend requests.</p>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map(user => (
                  <div
                    key={user.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-800/40 gap-3"
                  >
                    <button
                      onClick={() => handleProfileClick(user.id)}
                      className="flex items-center text-left focus:outline-none group"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover mr-3 ring-2 ring-indigo-500/10 group-hover:scale-105 transition"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">@{user.username}</p>
                      </div>
                    </button>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => acceptFriendRequest(user.id)}
                        className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectFriendRequest(user.id)}
                        className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition cursor-pointer"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggested People / People You May Know */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 border-zinc-100 dark:border-zinc-800">
              People You May Know
            </h3>

            {suggestedPeople.length === 0 ? (
              <p className="text-xs text-zinc-400 py-4 text-center">You are connected to everyone!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedPeople.map(user => (
                  <div
                    key={user.id}
                    className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-800/20 rounded-xl border border-zinc-100 dark:border-zinc-800/40 text-center"
                  >
                    <button
                      onClick={() => handleProfileClick(user.id)}
                      className="group flex flex-col items-center outline-none"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 group-hover:scale-105 transition"
                      />
                      <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 mt-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition block truncate max-w-[150px]">
                        {user.name}
                      </span>
                    </button>
                    <p className="text-[10px] text-zinc-400">@{user.username}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 h-8 px-2">
                      {user.bio || 'No profile bio yet.'}
                    </p>
                    
                    <button
                      onClick={() => sendFriendRequest(user.id)}
                      className="mt-4 w-full py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center space-x-1 transition cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Add Friend</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Connections List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 uppercase tracking-wider border-b pb-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span>My Friends ({currentFriends.length})</span>
            </h3>

            {currentFriends.length === 0 ? (
              <div className="py-8 text-center text-zinc-400 space-y-2">
                <p className="text-xs">No active friend connections yet.</p>
                <p className="text-[11px]">Send requests or accept invitations on the left to start connecting!</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {currentFriends.map(friend => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <button
                      onClick={() => handleProfileClick(friend.id)}
                      className="flex items-center text-left focus:outline-none group min-w-0"
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="h-9 w-9 rounded-full object-cover mr-3 ring-2 ring-zinc-100 dark:ring-zinc-800 group-hover:scale-105 transition"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                          {friend.name}
                        </p>
                        <p className="text-[10px] text-zinc-400">Online</p>
                      </div>
                    </button>

                    <div className="flex items-center space-x-1.5 shrink-0 ml-3">
                      <button
                        onClick={() => handleChatClick(friend.id)}
                        className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition"
                        title="Chat"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFriend(friend.id)}
                        className="p-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition"
                        title="Unfriend"
                      >
                        <UserMinus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Outgoing Pending list */}
          {outgoingRequests.length > 0 && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b pb-2 border-zinc-100 dark:border-zinc-800">
                Outgoing Pending Requests
              </h3>
              <div className="space-y-3">
                {outgoingRequests.map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                      Waiting...
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
