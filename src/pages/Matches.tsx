import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Clock } from 'lucide-react'
import type { Match } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1', userId: 'u1',
    user: { id: 'u1', nickname: '小雨', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', photos: [], age: 24, gender: 1, city: '上海', occupation: '设计师', tags: ['摄影', '旅行'], bio: '', distance: '' },
    matchedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'm2', userId: 'u2',
    user: { id: 'u2', nickname: '清风', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', photos: [], age: 27, gender: 2, city: '北京', occupation: '工程师', tags: ['篮球', '音乐'], bio: '', distance: '' },
    matchedAt: '2024-01-14T15:20:00Z',
  },
  {
    id: 'm3', userId: 'u3',
    user: { id: 'u3', nickname: '暖暖', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', photos: [], age: 22, gender: 1, city: '深圳', occupation: '插画师', tags: ['画画'], bio: '', distance: '' },
    matchedAt: '2024-01-13T08:00:00Z',
  },
  {
    id: 'm4', userId: 'u4',
    user: { id: 'u4', nickname: '阳光', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', photos: [], age: 26, gender: 2, city: '杭州', occupation: '产品经理', tags: ['桌游'], bio: '', distance: '' },
    matchedAt: '2024-01-12T20:15:00Z',
  },
]

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN')
}

export default function Matches() {
  const navigate = useNavigate()
  const [matches] = useState(MOCK_MATCHES)

  return (
    <div className="px-4 pt-3 pb-4">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-dark">配对列表</h2>
        <span className="text-sm text-text-secondary">共 {matches.length} 个配对</span>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/chat/${match.id}`)}
              className="group cursor-pointer overflow-hidden rounded-[20px] bg-white p-4 shadow-card transition-all duration-300 hover:shadow-glass hover:-translate-y-1"
            >
              <div className="relative mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border-2 border-border">
                <img
                  src={match.user.avatar}
                  alt={match.user.nickname}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-brand/30 transition-all duration-300" />
              </div>
              <h3 className="text-center font-heading text-base font-bold text-dark">
                {match.user.nickname}
              </h3>
              <div className="mt-1 flex items-center justify-center gap-1 text-xs text-text-secondary">
                <Clock className="h-3 w-3" />
                {formatTime(match.matchedAt)}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-xs text-coral">
                <Heart className="h-3 w-3" fill="#FF6B6B" />
                <span>互相喜欢</span>
              </div>
              <button className="btn-secondary mt-3 w-full py-2 text-xs">
                <MessageCircle className="mr-1 inline h-3.5 w-3.5" />
                聊天
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center">
          <div className="mb-6 rounded-full bg-white/80 p-8 shadow-card">
            <Heart className="h-12 w-12 text-brand/50" />
          </div>
          <h3 className="font-heading text-xl font-bold text-dark">还没有配对</h3>
          <p className="mt-2 text-sm text-text-secondary">去发现页滑动卡片，找到你喜欢的人</p>
          <button
            onClick={() => navigate('/discover')}
            className="btn-primary mt-6"
          >
            去发现
          </button>
        </div>
      )}
    </div>
  )
}