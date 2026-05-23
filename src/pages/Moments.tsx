import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, MoreHorizontal } from 'lucide-react'
import type { Moment } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_MOMENTS: Moment[] = [
  {
    id: 'mom1', userId: 'u1',
    user: { id: 'u1', nickname: '小雨', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', photos: [], age: 24, gender: 1, city: '上海', occupation: '设计师', tags: [], bio: '', distance: '' },
    content: '周末的上海特别美，在武康路发现了一家超有格调的小店，咖啡和甜点都很棒 ☕️',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    ],
    likes: 42, comments: 8, createdAt: '2024-01-15T14:00:00Z', isLiked: false,
  },
  {
    id: 'mom2', userId: 'u2',
    user: { id: 'u2', nickname: '清风', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', photos: [], age: 27, gender: 2, city: '北京', occupation: '工程师', tags: [], bio: '', distance: '' },
    content: '今天打了三小时篮球，终于把投篮姿势纠正过来了！💪',
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400'],
    likes: 28, comments: 5, createdAt: '2024-01-14T16:30:00Z', isLiked: true,
  },
  {
    id: 'mom3', userId: 'u3',
    user: { id: 'u3', nickname: '暖暖', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', photos: [], age: 22, gender: 1, city: '深圳', occupation: '插画师', tags: [], bio: '', distance: '' },
    content: '新画的一幅水彩，大家觉得怎么样？🎨',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400',
      'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=400',
    ],
    likes: 56, comments: 12, createdAt: '2024-01-13T10:00:00Z', isLiked: false,
  },
]

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return `${Math.floor(diff / (1000 * 60))}分钟前`
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

export default function Moments() {
  const [moments, setMoments] = useState(MOCK_MOMENTS)

  const toggleLike = (momentId: string) => {
    setMoments((prev) =>
      prev.map((m) =>
        m.id === momentId
          ? { ...m, isLiked: !m.isLiked, likes: m.isLiked ? m.likes - 1 : m.likes + 1 }
          : m
      )
    )
  }

  return (
    <div className="px-4 pt-3 pb-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-dark">动态广场</h2>
        <span className="text-sm text-text-secondary">最新动态</span>
      </div>

      <div className="space-y-4">
        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="overflow-hidden rounded-[20px] bg-white shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={moment.user.avatar}
                    alt={moment.user.nickname}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-dark">{moment.user.nickname}</h4>
                  <span className="text-xs text-text-secondary">{formatTime(moment.createdAt)}</span>
                </div>
              </div>
              <button className="rounded-full p-1.5 transition-colors hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-sm leading-relaxed text-dark/80">{moment.content}</p>
            </div>

            {/* Images */}
            {moment.images.length > 0 && (
              <div
                className={cn(
                  'grid gap-1 px-4 pb-3',
                  moment.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                )}
              >
                {moment.images.map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      'overflow-hidden rounded-[12px]',
                      moment.images.length === 1 ? 'max-h-64' : 'aspect-square'
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
              <button
                onClick={() => toggleLike(moment.id)}
                className="flex items-center gap-1.5 transition-colors"
              >
                <Heart
                  className={cn(
                    'h-5 w-5 transition-all duration-200',
                    moment.isLiked ? 'text-coral' : 'text-text-secondary hover:text-coral'
                  )}
                  fill={moment.isLiked ? '#FF6B6B' : 'none'}
                />
                <span
                  className={cn(
                    'text-xs',
                    moment.isLiked ? 'text-coral font-medium' : 'text-text-secondary'
                  )}
                >
                  {moment.likes}
                </span>
              </button>

              <button className="flex items-center gap-1.5 text-text-secondary transition-colors hover:text-brand">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">{moment.comments}</span>
              </button>

              <button className="flex items-center gap-1.5 text-text-secondary transition-colors hover:text-brand">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}