/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Post, Group, Message, Notification, PrivacySetting, Comment } from '../types';
import {
  INITIAL_USERS,
  INITIAL_GROUPS,
  INITIAL_POSTS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data';

interface SocialContextType {
  users: UserProfile[];
  currentUser: UserProfile;
  posts: Post[];
  groups: Group[];
  messages: Message[];
  notifications: Notification[];
  darkMode: boolean;
  activeChatUserId: string | null;
  activeTab: 'feed' | 'profile' | 'friends' | 'groups' | 'chat' | 'notifications';
  activeGroupId: string | null;
  viewingProfileId: string | null;
  
  // Actions
  setDarkMode: (dark: boolean) => void;
  setActiveChatUserId: (id: string | null) => void;
  setActiveTab: (tab: 'feed' | 'profile' | 'friends' | 'groups' | 'chat' | 'notifications') => void;
  setActiveGroupId: (id: string | null) => void;
  setViewingProfileId: (id: string | null) => void;
  
  addPost: (content: string, image?: string, privacy?: PrivacySetting, groupId?: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (postId: string) => void;
  
  sendFriendRequest: (targetUserId: string) => void;
  acceptFriendRequest: (senderId: string) => void;
  rejectFriendRequest: (senderId: string) => void;
  removeFriend: (friendId: string) => void;
  
  createGroup: (name: string, description: string, category: string, coverPhoto?: string) => void;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  
  sendMessage: (receiverId: string, content: string) => void;
  markNotificationsRead: () => void;
  
  switchCurrentUser: (userId: string) => void;
  updateBio: (bio: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

// Simple Web Audio beep generator for high-fidelity interactive notifications!
function playNotificationSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    // AudioContext blocked or unsupported
  }
}

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to defaults
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const stored = localStorage.getItem('social_users');
    return stored ? JSON.parse(stored) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('social_current_user_id') || 'user_mi';
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem('social_posts');
    return stored ? JSON.parse(stored) : INITIAL_POSTS;
  });

  const [groups, setGroups] = useState<Group[]>(() => {
    const stored = localStorage.getItem('social_groups');
    return stored ? JSON.parse(stored) : INITIAL_GROUPS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem('social_messages');
    return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem('social_notifications');
    return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
  });

  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    const stored = localStorage.getItem('social_dark_mode');
    return stored ? JSON.parse(stored) : true; // Default to dark mode as requested in prompt!
  });

  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'friends' | 'groups' | 'chat' | 'notifications'>('feed');
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('social_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('social_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('social_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('social_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('social_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('social_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('social_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const setDarkMode = (dark: boolean) => setDarkModeState(dark);

  const switchCurrentUser = (userId: string) => {
    if (users.some(u => u.id === userId)) {
      setCurrentUserId(userId);
      setActiveChatUserId(null);
      setViewingProfileId(null);
      setActiveGroupId(null);
      setActiveTab('feed');
    }
  };

  const updateBio = (bio: string) => {
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, bio } : u));
  };

  // --- POST OPERATIONS ---
  const addPost = (content: string, image?: string, privacy: PrivacySetting = 'public', groupId?: string) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorId: currentUserId,
      content,
      image,
      privacy,
      groupId,
      createdAt: new Date().toISOString(),
      likes: [],
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);

    // If posted in a group, update group activity log or notifications (optional)
    if (groupId) {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        // Send a notification to other group members (excluding poster)
        group.members.forEach(memberId => {
          if (memberId !== currentUserId) {
            sendSystemNotification(
              memberId,
              'group_join',
              currentUserId,
              `posted in "${group.name}": "${content.slice(0, 30)}..."`,
              groupId
            );
          }
        });
      }
    }
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUserId);
        const nextLikes = isLiked
          ? post.likes.filter(id => id !== currentUserId)
          : [...post.likes, currentUserId];

        // Notify post author
        if (!isLiked && post.authorId !== currentUserId) {
          sendSystemNotification(
            post.authorId,
            'like',
            currentUserId,
            'liked your post.',
            postId
          );
        }

        return { ...post, likes: nextLikes };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    const commentId = `comment_${Date.now()}`;
    const newComment: Comment = {
      id: commentId,
      postId,
      authorId: currentUserId,
      content,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        // Notify post author
        if (post.authorId !== currentUserId) {
          sendSystemNotification(
            post.authorId,
            'comment',
            currentUserId,
            `commented on your post: "${content.slice(0, 30)}..."`,
            postId
          );
        }
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  // --- FRIEND OPERATIONS ---
  const sendFriendRequest = (targetUserId: string) => {
    // Add to outgoing
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return { ...u, friendRequestsOutgoing: [...u.friendRequestsOutgoing, targetUserId] };
      }
      if (u.id === targetUserId) {
        return { ...u, friendRequestsIncoming: [...u.friendRequestsIncoming, currentUserId] };
      }
      return u;
    }));

    // Send notification
    sendSystemNotification(
      targetUserId,
      'friend_request',
      currentUserId,
      'sent you a friend request.',
      currentUserId
    );
  };

  const acceptFriendRequest = (senderId: string) => {
    setUsers(prev => prev.map(u => {
      // Current User
      if (u.id === currentUserId) {
        return {
          ...u,
          friendRequestsIncoming: u.friendRequestsIncoming.filter(id => id !== senderId),
          friends: [...u.friends, senderId]
        };
      }
      // Sender
      if (u.id === senderId) {
        return {
          ...u,
          friendRequestsOutgoing: u.friendRequestsOutgoing.filter(id => id !== currentUserId),
          friends: [...u.friends, currentUserId]
        };
      }
      return u;
    }));

    // Send notification
    sendSystemNotification(
      senderId,
      'friend_accept',
      currentUserId,
      'accepted your friend request!',
      currentUserId
    );
  };

  const rejectFriendRequest = (senderId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return { ...u, friendRequestsIncoming: u.friendRequestsIncoming.filter(id => id !== senderId) };
      }
      if (u.id === senderId) {
        return { ...u, friendRequestsOutgoing: u.friendRequestsOutgoing.filter(id => id !== currentUserId) };
      }
      return u;
    }));
  };

  const removeFriend = (friendId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return { ...u, friends: u.friends.filter(id => id !== friendId) };
      }
      if (u.id === friendId) {
        return { ...u, friends: u.friends.filter(id => id !== currentUserId) };
      }
      return u;
    }));
  };

  // --- GROUP OPERATIONS ---
  const createGroup = (name: string, description: string, category: string, coverPhoto?: string) => {
    const groupId = `group_${Date.now()}`;
    const newGroup: Group = {
      id: groupId,
      name,
      description,
      category,
      coverPhoto: coverPhoto || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      members: [currentUserId],
      createdBy: currentUserId,
      createdAt: new Date().toISOString()
    };

    setGroups(prev => [...prev, newGroup]);
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, joinedGroups: [...u.joinedGroups, groupId] } : u));
    setActiveGroupId(groupId);
    setActiveTab('groups');
  };

  const joinGroup = (groupId: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, members: [...g.members, currentUserId] } : g));
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, joinedGroups: [...u.joinedGroups, groupId] } : u));
  };

  const leaveGroup = (groupId: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, members: g.members.filter(id => id !== currentUserId) } : g));
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, joinedGroups: u.joinedGroups.filter(id => id !== groupId) } : u));
    if (activeGroupId === groupId) {
      setActiveGroupId(null);
    }
  };

  // --- NOTIFICATION UTILITIES ---
  const sendSystemNotification = (
    userId: string,
    type: 'like' | 'comment' | 'friend_request' | 'friend_accept' | 'message' | 'group_join',
    senderId: string,
    content: string,
    relatedId?: string
  ) => {
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId,
      type,
      senderId,
      relatedId,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    
    // Play sound and trigger state if the target user is currently logged in!
    if (userId === currentUserId) {
      playNotificationSound();
    }
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.userId === currentUserId ? { ...n, read: true } : n));
  };

  // --- MESSAGE OPERATIONS & CHATBOT SIMULATOR ---
  const sendMessage = (receiverId: string, content: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUserId,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);

    // Send real-time notification to the receiver (if it were real multi-user, they would see it)
    sendSystemNotification(
      receiverId,
      'message',
      currentUserId,
      `sent you a message: "${content.slice(0, 30)}..."`,
      currentUserId
    );

    // Dynamic Mock Chatbot replies for realistic simulation!
    // Trigger reply only if messaging a system user from current user
    if (['user_sarah', 'user_alex', 'user_jordan'].includes(receiverId)) {
      simulateChatbotReply(receiverId, content);
    }
  };

  const simulateChatbotReply = (botId: string, userMessage: string) => {
    const bot = users.find(u => u.id === botId);
    if (!bot) return;

    // Simulate reading indicator or simple typing delay
    setTimeout(() => {
      let replyContent = '';
      const lMsg = userMessage.toLowerCase();

      if (botId === 'user_sarah') {
        if (lMsg.includes('hello') || lMsg.includes('hey') || lMsg.includes('hi')) {
          replyContent = `Hey there! How is your day going? I am currently refactoring some reactive rendering routes in my codebase. Always fun!`;
        } else if (lMsg.includes('framework') || lMsg.includes('typescript') || lMsg.includes('code') || lMsg.includes('react')) {
          replyContent = `Oh, I love talking shop! Standard client-side state is so fast. Are you working on a full-stack project or standard SPA right now?`;
        } else if (lMsg.includes('coffee') || lMsg.includes('meetup')) {
          replyContent = `That sounds perfect! Let is meet up 30 minutes before the event at the cafe around the corner. I will bring my laptop to show you my latest performance logs!`;
        } else {
          replyContent = `That is really interesting! I am actually reading a paper on advanced Web Audio synth oscillators right now. The web ecosystem moves so fast!`;
        }
      } else if (botId === 'user_alex') {
        if (lMsg.includes('hello') || lMsg.includes('hey') || lMsg.includes('hi')) {
          replyContent = `Hey! Good to hear from you. Just reviewing some photos from my Mount Rainier climb. The weather was perfect!`;
        } else if (lMsg.includes('hiking') || lMsg.includes('trail') || lMsg.includes('run') || lMsg.includes('climb')) {
          replyContent = `Yes! I am mapping out a 15k trail run for next Saturday. It has about 800m of elevation gain, interested in joining?`;
        } else if (lMsg.includes('photo') || lMsg.includes('camera') || lMsg.includes('sunset')) {
          replyContent = `Thanks! I shot that sunrise with a 24-70mm lens, f/8, 1/120s exposure. The light changed within minutes!`;
        } else {
          replyContent = `Awesome! Next time I am heading out to the North Cascades, I will let you know. The landscapes are unmatched.`;
        }
      } else if (botId === 'user_jordan') {
        if (lMsg.includes('hello') || lMsg.includes('hey') || lMsg.includes('hi')) {
          replyContent = `Hello! Hope you are having a creative day. I am currently reviewing the contrast ratios for the new interface concept.`;
        } else if (lMsg.includes('design') || lMsg.includes('accessibility') || lMsg.includes('color') || lMsg.includes('dark')) {
          replyContent = `Exactly! Using tailwind's semantic color system with soft, low-contrast shadows and clean typography is crucial for high-readability.`;
        } else {
          replyContent = `Nice thoughts. Design is always about resolving complexity with elegant layout structures and rhythmic spacing.`;
        }
      }

      const botMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        senderId: botId,
        receiverId: currentUserId,
        content: replyContent,
        createdAt: new Date().toISOString(),
        read: false
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Send notification of message to current user
      sendSystemNotification(
        currentUserId,
        'message',
        botId,
        replyContent,
        botId
      );
    }, 2000);
  };

  return (
    <SocialContext.Provider value={{
      users,
      currentUser,
      posts,
      groups,
      messages,
      notifications,
      darkMode,
      activeChatUserId,
      activeTab,
      activeGroupId,
      viewingProfileId,
      
      setDarkMode,
      setActiveChatUserId,
      setActiveTab,
      setActiveGroupId,
      setViewingProfileId,
      
      addPost,
      likePost,
      addComment,
      deletePost,
      
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      removeFriend,
      
      createGroup,
      joinGroup,
      leaveGroup,
      
      sendMessage,
      markNotificationsRead,
      
      switchCurrentUser,
      updateBio,
    }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
