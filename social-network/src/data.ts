/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, Post, Group, Message, Notification } from './types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_mi',
    name: 'Mi Ismail',
    username: 'mi_ismail',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?auto=format&fit=crop&w=1200&q=80',
    bio: 'Tech enthusiast and developer building high-quality web experiences. Love connecting with fellow builders!',
    friends: ['user_sarah', 'user_alex'],
    friendRequestsIncoming: ['user_jordan'],
    friendRequestsOutgoing: [],
    joinedGroups: ['group_tech', 'group_nature']
  },
  {
    id: 'user_sarah',
    name: 'Sarah Chen',
    username: 'sarah_codes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    bio: 'Software Engineer & Open Source contributor. Tinkering with TypeScript, React, and server-side runtimes.',
    friends: ['user_mi', 'user_alex', 'user_jordan'],
    friendRequestsIncoming: [],
    friendRequestsOutgoing: [],
    joinedGroups: ['group_tech']
  },
  {
    id: 'user_alex',
    name: 'Alex Morgan',
    username: 'alex_adventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    bio: 'Landscape & travel photographer. Always searching for the next summit and the perfect sunset golden hour.',
    friends: ['user_mi', 'user_sarah'],
    friendRequestsIncoming: [],
    friendRequestsOutgoing: [],
    joinedGroups: ['group_nature']
  },
  {
    id: 'user_jordan',
    name: 'Jordan Taylor',
    username: 'jordan_design',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    bio: 'Product Designer focusing on minimal interfaces, precise typography, and accessibility first.',
    friends: ['user_sarah'],
    friendRequestsIncoming: [],
    friendRequestsOutgoing: ['user_mi'], // Request sent to user_mi
    joinedGroups: ['group_design']
  }
];

export const INITIAL_GROUPS: Group[] = [
  {
    id: 'group_tech',
    name: 'Tech & AI Innovators',
    description: 'A community for developers, engineers, and tech enthusiasts to discuss Web Development, AI advancements, and open-source software.',
    category: 'Technology',
    coverPhoto: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    members: ['user_sarah', 'user_mi'],
    createdBy: 'user_sarah',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'group_nature',
    name: 'Nature & Hiking Enthusiasts',
    description: 'Share your favorite trails, climbing routes, outdoor gear reviews, and stunning nature photography from around the globe.',
    category: 'Outdoors',
    coverPhoto: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    members: ['user_alex', 'user_mi'],
    createdBy: 'user_alex',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'group_design',
    name: 'UI/UX Craft & Design',
    description: 'A place to discuss design systems, typography, color theory, accessibility standards, and the intersection of form and function.',
    category: 'Design',
    coverPhoto: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80',
    members: ['user_jordan', 'user_sarah'],
    createdBy: 'user_jordan',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorId: 'user_sarah',
    content: 'Just launched my new open-source TypeScript framework! It features hot-swappable client bundles and zero-config server-side routes. Building on top of modern standards is so satisfying. Check it out if you have a moment!',
    privacy: 'public',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes: ['user_mi', 'user_alex'],
    comments: [
      {
        id: 'comment_1_1',
        postId: 'post_1',
        authorId: 'user_mi',
        content: 'This looks incredibly clean, Sarah! Love how lightweight the output bundle is.',
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'comment_1_2',
        postId: 'post_1',
        authorId: 'user_sarah',
        content: 'Thanks, Mi! I am planning to add support for nested routing in the next minor version.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'user_alex',
    content: 'Caught this breathtaking sunrise at Mount Rainier this morning. The temperature was near freezing, but the golden glow hitting the glaciers made every shivering minute completely worth it.',
    image: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&w=1000&q=80',
    privacy: 'friends',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    likes: ['user_mi'],
    comments: [
      {
        id: 'comment_2_1',
        postId: 'post_2',
        authorId: 'user_sarah',
        content: 'Absolutely spectacular composition! The lighting here is magical.',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'user_jordan',
    content: 'A gentle reminder that accessibility is not a checklist item; it is the core of design. High-contrast typography, screen-reader compatibility, and generous focus states are essential features, not aesthetic compromises.',
    privacy: 'public',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    likes: ['user_sarah'],
    comments: []
  },
  {
    id: 'post_group_1',
    authorId: 'user_sarah',
    content: 'Hey team, does anyone have experience setting up secure Firestore rules for highly nested subcollections? I am trying to balance read optimization with recursive master-gate lookups.',
    privacy: 'public',
    groupId: 'group_tech',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    likes: ['user_mi'],
    comments: [
      {
        id: 'comment_g1_1',
        postId: 'post_group_1',
        authorId: 'user_mi',
        content: 'I highly recommend using standalone validation helpers for the data entities! Calling them in both create and update operations keeps the rules DRY and secure.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    senderId: 'user_sarah',
    receiverId: 'user_mi',
    content: 'Hey! Are you attending the local developer meetup this Friday?',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'msg_2',
    senderId: 'user_mi',
    receiverId: 'user_sarah',
    content: 'Hey Sarah! Yes, absolutely. I will be hosting a short presentation on reactive rendering architectures. Will you be presenting as well?',
    createdAt: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: 'msg_3',
    senderId: 'user_sarah',
    receiverId: 'user_mi',
    content: 'Oh that is awesome! No presentation for me this time, just excited to watch yours and chat. Let is grab a coffee beforehand!',
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'msg_4',
    senderId: 'user_alex',
    receiverId: 'user_mi',
    content: 'Hey Mi, did you see my Rainier photo? Let me know when you want to plan our next trail run!',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_mi',
    type: 'friend_request',
    senderId: 'user_jordan',
    content: 'sent you a friend request.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'notif_2',
    userId: 'user_mi',
    type: 'like',
    senderId: 'user_sarah',
    relatedId: 'post_group_1',
    content: 'liked your comment in Tech & AI Innovators.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: 'notif_3',
    userId: 'user_mi',
    type: 'comment',
    senderId: 'user_alex',
    relatedId: 'post_2',
    content: 'commented on your photo: "Spectacular composition!"',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];
