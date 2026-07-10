/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SocialProvider, useSocial } from './context/SocialContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { ProfileView } from './components/ProfileView';
import { FriendsTab } from './components/FriendsTab';
import { GroupsTab } from './components/GroupsTab';
import { ChatTab } from './components/ChatTab';
import { NotificationsTab } from './components/NotificationsTab';
import { motion, AnimatePresence } from 'motion/react';
import { Rss, MessageSquare, Users, Compass, User, Bell } from 'lucide-react';

const SocialAppContent: React.FC = () => {
  const { activeTab, setActiveTab, setViewingProfileId, currentUser } = useSocial();

  const handleMobileTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    if (tabId === 'profile') {
      setViewingProfileId(currentUser.id);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileView />;
      case 'friends':
        return <FriendsTab />;
      case 'groups':
        return <GroupsTab />;
      case 'chat':
        return <ChatTab />;
      case 'notifications':
        return <NotificationsTab />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row pb-20 md:pb-6">
        {/* Left Sidebar - Hidden on mobile, visible on medium screens */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Central View Content */}
        <main className="flex-1 px-4 py-6 md:px-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderActiveTab()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex justify-around py-3 px-2 shadow-lg transition-colors duration-200">
        <button
          onClick={() => handleMobileTabClick('feed')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'feed' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <Rss className="h-5 w-5" />
          <span className="text-[10px] font-bold">Feed</span>
        </button>

        <button
          onClick={() => handleMobileTabClick('chat')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'chat' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-bold">Chats</span>
        </button>

        <button
          onClick={() => handleMobileTabClick('friends')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'friends' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-[10px] font-bold">Friends</span>
        </button>

        <button
          onClick={() => handleMobileTabClick('groups')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'groups' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-bold">Groups</span>
        </button>

        <button
          onClick={() => handleMobileTabClick('profile')}
          className={`flex flex-col items-center space-y-1 ${
            activeTab === 'profile' ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <SocialProvider>
      <SocialAppContent />
    </SocialProvider>
  );
}

