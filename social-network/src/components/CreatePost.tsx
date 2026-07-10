/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { Globe, Users, Lock, Image as ImageIcon, Sparkles, X, ChevronDown } from 'lucide-react';
import { PrivacySetting } from '../types';

interface CreatePostProps {
  defaultGroupId?: string;
}

const SAMPLE_IMAGES = [
  { label: '🏔️ Hiking', url: 'https://images.unsplash.com/photo-1551632871-65973ac97b24?auto=format&fit=crop&w=600&q=80' },
  { label: '💻 Workspace', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80' },
  { label: '☕ Latte Art', url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80' },
  { label: '🌅 Sunset', url: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&w=600&q=80' },
  { label: '🐶 Golden Retriever', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' },
  { label: '🌃 Neon City', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80' }
];

export const CreatePost: React.FC<CreatePostProps> = ({ defaultGroupId }) => {
  const { currentUser, groups, addPost } = useSocial();
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [privacy, setPrivacy] = useState<PrivacySetting>('public');
  const [groupId, setGroupId] = useState(defaultGroupId || '');
  const [showImageSuggestions, setShowImageSuggestions] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isUrlInputOpen, setIsUrlInputOpen] = useState(false);

  // Get joined groups for selection if not locked to one
  const joinedGroups = groups.filter(g => g.members.includes(currentUser.id));

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    addPost(content, image || undefined, privacy, groupId || undefined);
    
    // Reset fields
    setContent('');
    setImage('');
    setCustomImageUrl('');
    setShowImageSuggestions(false);
    setIsUrlInputOpen(false);
  };

  const handleSelectSampleImage = (url: string) => {
    setImage(url);
    setShowImageSuggestions(false);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setImage(customImageUrl.trim());
      setIsUrlInputOpen(false);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setCustomImageUrl('');
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: Globe, desc: 'Anyone on SocialCircle' },
    { value: 'friends', label: 'Friends', icon: Users, desc: 'Your connected friends' },
    { value: 'private', label: 'Only Me', icon: Lock, desc: 'Only visible to yourself' }
  ] as const;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm transition-all duration-200">
      <form onSubmit={handlePost}>
        <div className="flex items-start space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/10"
          />
          <div className="flex-1">
            {/* Post Target Selector (Feed vs Group) */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Privacy Setting Dropdown */}
              <div className="relative group/privacy">
                <select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as PrivacySetting)}
                  className="appearance-none bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 pl-7 pr-7 py-1.5 rounded-full border-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition"
                >
                  <option value="public">🌐 Public</option>
                  <option value="friends">👥 Friends</option>
                  <option value="private">🔒 Only Me</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 h-3 w-3 text-zinc-500 pointer-events-none" />
              </div>

              {/* Group Selector (if not inside a forced group) */}
              {!defaultGroupId && joinedGroups.length > 0 && (
                <div className="relative">
                  <select
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    className="appearance-none bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 pl-3 pr-7 py-1.5 rounded-full border-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer transition"
                  >
                    <option value="">🏠 News Feed</option>
                    {joinedGroups.map(g => (
                      <option key={g.id} value={g.id}>
                        💬 {g.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-2.5 h-3 w-3 text-zinc-500 pointer-events-none" />
                </div>
              )}
            </div>

            {/* Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                groupId 
                  ? `Write an update inside this group...` 
                  : `What is on your mind, ${currentUser.name.split(' ')[0]}?`
              }
              className="w-full min-h-[90px] bg-transparent text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 border-none resize-none focus:ring-0 outline-none"
              maxLength={2000}
            />

            {/* Selected Image Preview */}
            {image && (
              <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 my-2 max-h-64 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
                <img src={image} alt="Upload preview" className="max-h-64 w-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            {/* Quick Suggestions toggle */}
            <button
              type="button"
              onClick={() => {
                setShowImageSuggestions(!showImageSuggestions);
                setIsUrlInputOpen(false);
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                showImageSuggestions
                  ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Add Image</span>
            </button>

            {/* Custom URL Input toggle */}
            <button
              type="button"
              onClick={() => {
                setIsUrlInputOpen(!isUrlInputOpen);
                setShowImageSuggestions(false);
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                isUrlInputOpen
                  ? 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Custom URL</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim() && !image}
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white rounded-full transition duration-150 shadow-sm shadow-indigo-600/10 cursor-pointer"
          >
            Share Update
          </button>
        </div>

        {/* Sample Image Suggestions drawer */}
        {showImageSuggestions && (
          <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-100 dark:border-zinc-800/50 animate-in slide-in-from-top duration-200">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
              Select a beautiful sample photo
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => handleSelectSampleImage(img.url)}
                  className="group relative rounded-lg overflow-hidden h-14 w-full flex items-center justify-center border border-zinc-200 dark:border-zinc-700 hover:border-indigo-500 transition duration-150 text-left"
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.4] group-hover:scale-105 transition"
                  />
                  <span className="relative z-10 text-[10px] sm:text-xs font-extrabold text-white text-center">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom URL Form Drawer */}
        {isUrlInputOpen && (
          <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-100 dark:border-zinc-800/50 animate-in slide-in-from-top duration-200">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">
              Paste direct image URL
            </span>
            <div className="flex space-x-2">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleCustomUrlSubmit}
                className="px-3 py-1.5 text-xs font-bold bg-zinc-800 dark:bg-zinc-700 text-white rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
