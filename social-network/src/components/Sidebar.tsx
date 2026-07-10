/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSocial } from '../context/SocialContext';
import { Rss, MessageSquare, Users, Globe, User, Bell, ChevronRight, Compass } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentUser,
    groups,
    messages,
    notifications,
    activeTab,
    setActiveTab,
    setActiveGroupId,
    setViewingProfileId,
  } = useSocial();

  const unreadMessagesCount = messages.filter(m => m.receiverId === currentUser.id && !m.read).length;
  const unreadNotificationsCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;
  const incomingFriendRequestsCount = currentUser.friendRequestsIncoming.length;

  // Find groups joined by the current user
  const joinedGroups = groups.filter(g => g.members.includes(currentUser.id));

  const navItems = [
    {
      id: 'feed',
      label: 'News Feed',
      icon: Rss,
      badge: 0,
      color: 'text-indigo-500'
    },
    {
      id: 'chat',
      label: 'Messenger',
      icon: MessageSquare,
      badge: unreadMessagesCount,
      color: 'text-sky-500'
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: Users,
      badge: incomingFriendRequestsCount,
      color: 'text-teal-500'
    },
    {
      id: 'groups',
      label: 'Groups',
      icon: Compass,
      badge: 0,
      color: 'text-rose-500'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      badge: 0,
      color: 'text-emerald-500'
    }
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId === 'profile') {
      setViewingProfileId(currentUser.id);
    }
  };

  return (
    <aside className="w-full lg:w-64 flex flex-col shrink-0 p-4 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-200">
      {/* Short Profile Link Card */}
      <button
        onClick={() => handleTabClick('profile')}
        className="flex items-center p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition text-left mb-6 group w-full outline-none"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="h-11 w-11 rounded-full object-cover mr-3 ring-2 ring-indigo-500 group-hover:scale-105 transition"
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
            {currentUser.name}
          </p>
          <p className="text-xs text-zinc-400 truncate">@{currentUser.username}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition" />
      </button>

      {/* Main Navigation links */}
      <div className="space-y-1.5 flex-1">
        <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 block mb-2">
          Navigation
        </span>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition font-semibold text-sm ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : item.color}`} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-indigo-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Shortcuts: Your Groups */}
        {joinedGroups.length > 0 && (
          <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-3 block mb-3">
              Your Groups
            </span>
            <div className="space-y-1.5">
              {joinedGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroupId(group.id);
                    setActiveTab('groups');
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition text-sm text-zinc-700 dark:text-zinc-300 font-semibold group"
                >
                  <img
                    src={group.coverPhoto}
                    alt={group.name}
                    className="h-6 w-6 rounded-md object-cover mr-3 group-hover:scale-105 transition"
                  />
                  <span className="truncate flex-1">{group.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Minimal App Version footer info */}
      <div className="pt-4 mt-auto border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 dark:text-zinc-500 text-center">
        <p>SocialCircle Sandbox Engine</p>
        <p className="mt-0.5">Locally encrypted storage &bull; A11y Ready</p>
      </div>
    </aside>
  );
};
