/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Bell, MessageSquare, Sun, Moon, Search, Users, ShieldAlert, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    users,
    notifications,
    messages,
    darkMode,
    setDarkMode,
    switchCurrentUser,
    setActiveTab,
    markNotificationsRead,
    setActiveChatUserId,
  } = useSocial();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = notifications.filter(n => n.userId === currentUser.id && !n.read);
  const unreadMessagesCount = messages.filter(m => m.receiverId === currentUser.id && !m.read).length;

  const handleNotificationClick = (n: any) => {
    setShowNotifications(false);
    markNotificationsRead();
    if (n.type === 'friend_request' || n.type === 'friend_accept') {
      setActiveTab('friends');
    } else if (n.type === 'message') {
      setActiveChatUserId(n.senderId);
      setActiveTab('chat');
    } else if (n.relatedId) {
      setActiveTab('feed');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 backdrop-blur-md transition-colors duration-200">
      {/* Brand Logo & Search */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setActiveTab('feed');
          }}
          className="flex items-center space-x-2 font-black text-2xl tracking-tight text-indigo-600 dark:text-indigo-400 focus:outline-none"
          id="btn-logo"
        >
          <span>SocialCircle</span>
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search posts, friends or groups..."
            className="w-64 pl-9 pr-4 py-1.5 text-sm rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Navigation Shortcuts for Sandbox Persona Swapper */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Sandbox Persona Indicator */}
        <div className="hidden lg:flex items-center bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-full py-1 px-3 space-x-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Active Persona:
          </span>
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">
            {currentUser.name}
          </span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
          title="Toggle Dark Mode"
          id="btn-dark-mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Message Shortcut */}
        <button
          onClick={() => {
            setActiveTab('chat');
          }}
          className="relative p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
          title="Messenger"
          id="btn-messages"
        >
          <MessageSquare className="h-5 w-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              if (!showNotifications) markNotificationsRead();
            }}
            className="relative p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition animate-none"
            title="Notifications"
            id="btn-notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden py-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">Notifications</span>
                <button
                  onClick={markNotificationsRead}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                    <span className="text-sm text-zinc-400">No notifications yet</span>
                  </div>
                ) : (
                  notifications
                    .filter(n => n.userId === currentUser.id)
                    .map(n => {
                      const sender = users.find(u => u.id === n.senderId);
                      return (
                        <button
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`flex items-start w-full px-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition border-b border-zinc-100 dark:border-zinc-800/40 ${
                            !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                          }`}
                        >
                          <img
                            src={sender?.avatar}
                            alt={sender?.name}
                            className="h-10 w-10 rounded-full object-cover mr-3 ring-2 ring-zinc-200 dark:ring-zinc-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-zinc-800 dark:text-zinc-200">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                {sender?.name}
                              </span>{' '}
                              {n.content}
                            </p>
                            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 block">
                              {new Date(n.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </button>
                      );
                    })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sandbox Swapper Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-1 focus:outline-none"
            id="btn-user-avatar"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500 hover:opacity-90 transition duration-150"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden py-3 animate-in fade-in duration-200">
              {/* Profile Card Summary */}
              <div className="px-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <p className="font-extrabold text-zinc-900 dark:text-zinc-100">{currentUser.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">@{currentUser.username}</p>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setShowUserMenu(false);
                  }}
                  className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Profile
                </button>
              </div>

              {/* Persona Swapper Segment */}
              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/40 mt-2">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Demo Persona Swapper
                </span>
                <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                  Switch between accounts to simulate messages, friend requests, and privacy filters.
                </p>

                <div className="space-y-1.5">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchCurrentUser(u.id);
                        setShowUserMenu(false);
                      }}
                      className={`flex items-center justify-between w-full p-1.5 rounded-lg text-left transition ${
                        u.id === currentUser.id
                          ? 'bg-indigo-600 text-white font-medium'
                          : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold truncate max-w-[150px]">
                          {u.name}
                        </span>
                      </div>
                      {u.id === currentUser.id && <Check className="h-3.5 w-3.5 text-white mr-1" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
