/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSocial } from '../context/SocialContext';
import { Send, Check, Phone, Video, Search, MessageSquare, Smile, ShieldCheck } from 'lucide-react';

export const ChatTab: React.FC = () => {
  const {
    currentUser,
    users,
    messages,
    activeChatUserId,
    sendMessage,
    setActiveChatUserId,
    setViewingProfileId,
    setActiveTab,
  } = useSocial();

  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Get list of current user's friends to select from
  const friends = users.filter(u => currentUser.friends.includes(u.id));

  // 2. Selected user info
  const activeUser = activeChatUserId ? users.find(u => u.id === activeChatUserId) : null;

  // 3. Filter messages specific to this active conversion (between currentUser.id and activeChatUserId)
  const conversationMessages = messages.filter(m => {
    if (!activeChatUserId) return false;
    return (
      (m.senderId === currentUser.id && m.receiverId === activeChatUserId) ||
      (m.senderId === activeChatUserId && m.receiverId === currentUser.id)
    );
  });

  // 4. Mark messages as read when viewing conversation
  useEffect(() => {
    if (activeChatUserId) {
      // Mark matching incoming messages as read in-memory
      messages.forEach(m => {
        if (m.senderId === activeChatUserId && m.receiverId === currentUser.id) {
          m.read = true;
        }
      });
    }
  }, [activeChatUserId, messages, currentUser.id]);

  // 5. Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeChatUserId) return;

    sendMessage(activeChatUserId, input.trim());
    setInput('');
  };

  const handleUserClick = (id: string) => {
    setViewingProfileId(id);
    setActiveTab('profile');
  };

  // Helper: Get last message preview for a friend
  const getLastMessageInfo = (friendId: string) => {
    const friendMsgs = messages.filter(
      m =>
        (m.senderId === currentUser.id && m.receiverId === friendId) ||
        (m.senderId === friendId && m.receiverId === currentUser.id)
    );

    if (friendMsgs.length === 0) return { content: 'No messages yet', time: '', unread: false };

    const last = friendMsgs[friendMsgs.length - 1];
    const isUnread = last.senderId === friendId && !last.read;

    return {
      content: last.senderId === currentUser.id ? `You: ${last.content}` : last.content,
      time: new Date(last.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: isUnread,
    };
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm flex h-[calc(100vh-12rem)] min-h-[500px] transition-colors duration-200">
      
      {/* LEFT COLUMN: FRIENDS LIST */}
      <div className="w-full sm:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 bg-zinc-50/50 dark:bg-zinc-900/50">
        
        {/* Search header inside chat */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
            Messenger
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search chat sessions..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 outline-none"
            />
          </div>
        </div>

        {/* Friends scroll pane */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {friends.length === 0 ? (
            <div className="p-4 text-center text-zinc-400 text-xs">
              <p>No connections to chat with yet.</p>
              <p className="mt-1 text-[10px]">Add friends in the Friends tab first!</p>
            </div>
          ) : (
            friends.map(friend => {
              const isActive = activeChatUserId === friend.id;
              const lastMsg = getLastMessageInfo(friend.id);

              return (
                <button
                  key={friend.id}
                  onClick={() => setActiveChatUserId(friend.id)}
                  className={`flex items-center w-full p-3 rounded-xl text-left transition outline-none ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="relative mr-3 shrink-0">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                    />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-extrabold truncate text-zinc-900 dark:text-zinc-100">
                        {friend.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold">
                        {lastMsg.time}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] truncate mt-0.5 max-w-[170px] ${
                        lastMsg.unread
                          ? 'font-black text-indigo-600 dark:text-indigo-400'
                          : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    >
                      {lastMsg.content}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE CHAT WINDOW */}
      <div className={`flex-1 flex flex-col justify-between ${!activeChatUserId ? 'hidden sm:flex' : 'flex'}`}>
        {activeUser ? (
          <>
            {/* Conversation Header */}
            <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between shrink-0 bg-white dark:bg-zinc-900">
              <div className="flex items-center space-x-3 min-w-0">
                <button
                  onClick={() => handleUserClick(activeUser.id)}
                  className="focus:outline-none"
                >
                  <img
                    src={activeUser.avatar}
                    alt={activeUser.name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                  />
                </button>
                <div className="min-w-0">
                  <button
                    onClick={() => handleUserClick(activeUser.id)}
                    className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 truncate block text-left"
                  >
                    {activeUser.name}
                  </button>
                  <span className="text-[10px] text-emerald-500 font-bold block">
                    ● Active on mobile app
                  </span>
                </div>
              </div>

              {/* Action indicators (Phone, Camera, etc) */}
              <div className="flex items-center space-x-2 text-zinc-400 dark:text-zinc-500">
                <button
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition"
                  title="Voice Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition"
                  title="Video Call"
                >
                  <Video className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable chat body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/20 dark:bg-zinc-950/20">
              {/* Privacy/Encrypt Banner */}
              <div className="mx-auto max-w-sm bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl p-3 text-center space-y-1">
                <ShieldCheck className="h-4 w-4 text-indigo-500 mx-auto" />
                <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  Demo Chat Secure Encrypted
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                  Sandbox chat is end-to-end simulated. Try typing questions about coding to Sarah, climbing to Alex, or grids to Jordan!
                </p>
              </div>

              {conversationMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={activeUser.avatar}
                        alt={activeUser.name}
                        className="h-6 w-6 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}
                    <div className="max-w-[70%] space-y-0.5">
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-zinc-700/50 rounded-bl-none'
                        }`}
                      >
                        <p className="select-text whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      <span
                        className={`text-[9px] text-zinc-400 font-semibold block ${
                          isMe ? 'text-right mr-1.5' : 'text-left ml-1.5'
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Messenger Typing Bar */}
            <form
              onSubmit={handleSend}
              className="h-16 border-t border-zinc-200 dark:border-zinc-800 px-4 bg-white dark:bg-zinc-900 flex items-center space-x-2 shrink-0"
            >
              <button
                type="button"
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full transition"
                title="Add Emojis"
              >
                <Smile className="h-5 w-5" />
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Write a message to ${activeUser.name.split(' ')[0]}...`}
                  className="w-full px-4 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 border-none outline-none focus:ring-1 focus:ring-indigo-500 placeholder-zinc-400 dark:placeholder-zinc-500"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-full transition shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/10 dark:bg-zinc-950/10 space-y-4">
            <div className="h-16 w-16 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div className="max-w-md space-y-1.5">
              <h3 className="font-black text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                Select a conversation
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Connect and chat seamlessly in real time! Choose a contact on the left to start a sandbox encrypted conversation with interactive responses.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
