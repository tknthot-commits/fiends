import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, ChevronRight } from 'lucide-react'
import type { Conversation } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1', matchId: 'm1',
    user: { id: 'u1', nickname: '小雨', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', photos: [], age: 24, gender: 1, city: '上海', occupation: '设计师', tags: [], bio: '', distance: '' },
    lastMessage: { id: 'msg1', matchId: 'm1', senderId: 'u1', content: '周末一起去看展吗？', messageType: 'text', sentAt: '2024-01-15T14:30:00Z', isRead: false },
    unreadCount: 2, updatedAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'c2', matchId: 'm2',
    user: { id: 'u2', nickname: '清风', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', photos: [], age: 27, gender: 2, city: '北京', occupation: '工程师', tags: [], bio: '', distance: '' },
    lastMessage: { id: 'msg2', matchId: 'm2', senderId: 'u2', content: '哈哈好的，那说定了', messageType: 'text', sentAt: '2024-01-14T20:00:00Z', isRead: true },
    unreadCount: 0, updatedAt: '2024-01-14T20:00:00Z',
  },
  {
    id: 'c3', matchId: 'm3',
    user: { id: 'u3', nickname: '暖暖', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', photos: [], age: 22, gender: 1, city: '深圳', occupation: '插画师', tags: [], bio: '', distance: '' },
    lastMessage: { id: 'msg3', matchId: 'm3', senderId: 'u3', content: '这张画好看吗？我刚画的', messageType: 'text', sentAt: '2024-01-13T09:15:00Z', isRead: true },
    unreadCount: 0, updatedAt: '2024-01-13T09:15:00Z',
  },
]

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return '昨天'
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

export default function Chat() {
  const navigate = useNavigate()
  const [conversations] = useState(MOCK_CONVERSATIONS)

  return (
    <div className="px-4 pt-3 pb-4">
      <h2 className="mb-4 font-heading text-xl font-bold text-dark">消息</h2>

      {conversations.length > 0 ? (
        <div className="space-y-2">
          {conversations.map((conv, index) => (
            <motion.div
              key={conv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/chat/${conv.matchId}`)}
              className="flex cursor-pointer items-center gap-4 rounded-[20px] bg-white p-4 shadow-card transition-all duration-300 hover:shadow-glass hover:-translate-y-0.5"
            >
              <div className="relative flex-shrink-0">
                <div className="h-14 w-14 overflow-hidden rounded-full">
                  <img
                    src={conv.user.avatar}
                    alt={conv.user.nickname}
                    className="h-full w-full object-cover"
                  />
                </div>
                {conv.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white shadow-sm">
                    {conv.unreadCount}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-bold text-dark">{conv.user.nickname}</h3>
                  <span className="flex-shrink-0 text-xs text-text-secondary">
                    {formatTime(conv.lastMessage.sentAt)}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between">
                  <p
                    className={cn(
                      'truncate text-sm',
                      conv.unreadCount > 0 ? 'font-semibold text-dark' : 'text-text-secondary'
                    )}
                  >
                    {conv.lastMessage.content}
                  </p>
                  <ChevronRight className="ml-2 h-4 w-4 flex-shrink-0 text-text-secondary/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center">
          <div className="mb-6 rounded-full bg-white/80 p-8 shadow-card">
            <MessageCircle className="h-12 w-12 text-brand/50" />
          </div>
          <h3 className="font-heading text-xl font-bold text-dark">暂无消息</h3>
          <p className="mt-2 text-sm text-text-secondary">配对成功后就可以开始聊天了</p>
        </div>
      )}
    </div>
  )
}