export interface User {
  id: string
  phone: string
  nickname: string
  avatar: string
  photos: string[]
  bio: string
  age: number
  gender: 0 | 1 | 2
  city: string
  occupation: string
  tags: string[]
  isVerified: boolean
  isVip: boolean
  createdAt: string
}

export interface UserCard {
  id: string
  nickname: string
  avatar: string
  photos: string[]
  age: number
  gender: 0 | 1 | 2
  city: string
  occupation: string
  tags: string[]
  bio: string
  distance: string
}

export interface Match {
  id: string
  userId: string
  user: UserCard
  matchedAt: string
  lastMessage?: Message
}

export interface Message {
  id: string
  matchId: string
  senderId: string
  content: string
  messageType: 'text' | 'image' | 'voice'
  sentAt: string
  isRead: boolean
}

export interface Conversation {
  id: string
  matchId: string
  user: UserCard
  lastMessage: Message
  unreadCount: number
  updatedAt: string
}

export interface VoiceRoom {
  id: string
  name: string
  topic: string
  hostId: string
  hostName: string
  hostAvatar: string
  memberCount: number
  maxMembers: number
}

export interface VoiceRoomMember {
  userId: string
  nickname: string
  avatar: string
  isMuted: boolean
  isSpeaking: boolean
}

export interface Moment {
  id: string
  userId: string
  user: UserCard
  content: string
  images: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked: boolean
}

export type SwipeAction = 'like' | 'pass' | 'super_like'

export interface SwipeRequest {
  targetUserId: string
  action: SwipeAction
}

export interface SwipeResponse {
  isMatch: boolean
  match?: Match
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  phone: string
  password: string
}

export interface RegisterRequest {
  phone: string
  password: string
  code: string
  nickname: string
  gender: 0 | 1 | 2
}

export interface VoiceTokenResponse {
  token: string
  appId: string
  channelName: string
}