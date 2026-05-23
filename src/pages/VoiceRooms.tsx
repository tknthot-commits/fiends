import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, Users, ChevronRight, Headphones } from 'lucide-react'
import type { VoiceRoom } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_ROOMS: VoiceRoom[] = [
  { id: 'r1', name: '深夜聊聊', topic: '情感话题 · 生活分享', hostId: 'h1', hostName: '小夜', hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', memberCount: 23, maxMembers: 50 },
  { id: 'r2', name: '音乐发烧友', topic: '音乐推荐 · 歌曲鉴赏', hostId: 'h2', hostName: '音符', hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', memberCount: 15, maxMembers: 30 },
  { id: 'r3', name: '读书分享会', topic: '文学交流 · 好书推荐', hostId: 'h3', hostName: '书虫', hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', memberCount: 8, maxMembers: 20 },
  { id: 'r4', name: '职场加油站', topic: '职场心得 · 经验分享', hostId: 'h4', hostName: '职场达人', hostAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', memberCount: 31, maxMembers: 100 },
]

const CATEGORIES = ['全部', '情感', '音乐', '读书', '职场', '游戏', '生活']

export default function VoiceRooms() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('全部')

  return (
    <div className="px-4 pt-3 pb-4">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-dark">语音房间</h2>
        <button className="btn-primary py-2 text-sm">
          <Mic className="mr-1 inline h-4 w-4" />
          创建房间
        </button>
      </div>

      <div className="mt-3 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
              activeCategory === cat
                ? 'bg-brand text-white shadow-brand'
                : 'bg-white/70 text-text-secondary hover:bg-white'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {MOCK_ROOMS.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="overflow-hidden rounded-[20px] bg-white shadow-card transition-all duration-300 hover:shadow-glass"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-brand/10 p-2">
                      <Headphones className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-dark">{room.name}</h3>
                  </div>
                  <p className="mt-1.5 ml-11 text-sm text-text-secondary">{room.topic}</p>
                </div>
                <button
                  onClick={() => navigate('/voice-call')}
                  className="btn-primary whitespace-nowrap py-2 text-sm"
                >
                  <Headphones className="mr-1 inline h-4 w-4" />
                  加入
                </button>
              </div>

              <div className="ml-11 mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <img
                      src={room.hostAvatar}
                      alt={room.hostName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-text-secondary">{room.hostName}</span>
                </div>
                <span className="text-text-secondary/40">|</span>
                <span className="flex items-center gap-1 text-xs text-text-secondary">
                  <Users className="h-3.5 w-3.5" />
                  {room.memberCount}/{room.maxMembers}
                </span>
              </div>
            </div>

            <div className="h-1.5 bg-cream">
              <div
                className="h-full rounded-r-full bg-gradient-to-r from-brand to-brand-light transition-all duration-500"
                style={{ width: `${(room.memberCount / room.maxMembers) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}