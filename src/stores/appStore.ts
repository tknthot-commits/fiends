import { create } from 'zustand'

export type PageTab = 'discover' | 'matches' | 'voice' | 'chat' | 'profile'

interface Notification {
  id: string
  type: 'match' | 'message' | 'system'
  title: string
  content: string
  isRead: boolean
  createdAt: string
}

interface AppState {
  currentTab: PageTab
  notifications: Notification[]
  unreadCount: number
  setCurrentTab: (tab: PageTab) => void
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppState>((set) => ({
  currentTab: 'discover',
  notifications: [],
  unreadCount: 0,
  setCurrentTab: (tab) => set({ currentTab: tab }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))