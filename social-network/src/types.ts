/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PrivacySetting = 'public' | 'friends' | 'private';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  friends: string[]; // List of user IDs
  friendRequestsIncoming: string[]; // List of user IDs
  friendRequestsOutgoing: string[]; // List of user IDs
  joinedGroups: string[]; // List of group IDs
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  image?: string;
  privacy: PrivacySetting;
  groupId?: string; // If posted inside a group
  createdAt: string;
  likes: string[]; // List of user IDs who liked
  comments: Comment[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  coverPhoto: string;
  members: string[]; // List of user IDs
  createdBy: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'friend_request' | 'friend_accept' | 'message' | 'group_join';
  senderId: string;
  relatedId?: string; // ID of post, group, or chat
  content: string;
  createdAt: string;
  read: boolean;
}
