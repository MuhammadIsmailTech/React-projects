/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSocial } from '../context/SocialContext';
import { Bell, Check, Trash2, Heart, MessageSquare, UserCheck, Compass } from 'lucide-react';

export const NotificationsTab: React.FC = () => {
  const {
    currentUser,
    users,
    notifications,
    markNotificationsRead,
    setActiveTab,
    setActiveChatUserId,
  } = useSocial();

  const myNotifications = notifications.filter(n => n.userId === currentUser.id);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      case 'friend_request':
        return <UserCheck className="h-4 w-4 text-teal-500" />;
      case 'friend_accept':
        return <UserCheck className="h-4 w-4 text-emerald-500" />;
      default:
        return <Compass className="h-4 w-4 text-sky-500" />;
    }
  };

  const handleNotificationClick = (n: any) => {
    if (n.type === 'friend_request' || n.type === 'friend_accept') {
      setActiveTab('friends');
    } else if (n.type === 'message') {
      setActiveChatUserId(n.senderId);
      setActiveTab('chat');
    } else {
      setActiveTab('feed');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm transition-colors duration-200">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center space-x-2">
            <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>Activity History</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Keep track of who liked your posts, commented, or requested connection.
          </p>
        </div>

        <button
          onClick={markNotificationsRead}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 max-h-[500px] overflow-y-auto">
        {myNotifications.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 space-y-2 px-4">
            <p className="text-sm font-semibold">No notifications yet.</p>
            <p className="text-xs">Incoming activity alerts will be registered here.</p>
          </div>
        ) : (
          myNotifications.map(n => {
            const sender = users.find(u => u.id === n.senderId);
            return (
              <button
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`flex items-start w-full px-5 py-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition gap-4 ${
                  !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/15' : ''
                }`}
              >
                {/* Indicator Icon */}
                <div className="relative">
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800"
                  />
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    {getIcon(n.type)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                    <strong className="font-extrabold text-zinc-900 dark:text-zinc-100">{sender?.name}</strong>{' '}
                    {n.content}
                  </p>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold mt-1.5 block">
                    {new Date(n.createdAt).toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
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
  );
};
