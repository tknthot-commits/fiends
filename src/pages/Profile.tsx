import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Settings, Edit3, Camera, MapPin, Briefcase, BadgeCheck, Shield, Calendar } from 'lucide-react'
import type { User } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_PROFILE: User = {
  id: 'me',
  phone: '138****8888',
  nickname: '小明',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  photos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  ],
  bio: '热爱生活，喜欢摄影和旅行，周末经常会去探索城市里的小店和咖啡馆。希望找到志同道合的朋友一起分享生活中的美好。',
  age: 26,
  gender: 2,
  city: '上海',
  occupation: '全栈工程师',
  tags: ['摄影', '旅行', '咖啡', '读书', '运动', '电影', '美食', '音乐'],
  isVerified: true,
  isVip: true,
  createdAt: '2023-06-15T00:00:00Z',
}

const TAG_COLORS = [
  'bg-brand/10 text-brand',
  'bg-mint/10 text-mint',
  'bg-coral/10 text-coral',
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-600',
]

export default function Profile() {
  const navigate = useNavigate()
  const [profile] = useState(MOCK_PROFILE)

  return (
    <div className="pb-6">
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/30 to-brand/10" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <button
          onClick={() => navigate('/profile/edit')}
          className="absolute top-4 right-4 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Edit3 className="h-4 w-4 text-text-secondary" />
        </button>
        <button className="absolute top-4 left-4 rounded-full bg-white/70 p-2 backdrop-blur-sm transition-colors hover:bg-white">
          <Settings className="h-4 w-4 text-text-secondary" />
        </button>
      </div>

      {/* Avatar & Basic Info */}
      <div className="relative -mt-16 px-5">
        <div className="flex items-end gap-4">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src={profile.avatar}
                alt={profile.nickname}
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform hover:scale-105">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-2xl font-bold text-dark">{profile.nickname}</h2>
              {profile.isVerified && (
                <BadgeCheck className="h-5 w-5 text-mint" fill="#7EC8B3" stroke="white" strokeWidth={2} />
              )}
              {profile.isVip && (
                <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">VIP</span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-3 text-sm text-text-secondary">
              <span>{profile.age}岁</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {profile.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-5 px-5">
        <div className="rounded-[20px] bg-white p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Briefcase className="h-4 w-4" />
            <span>{profile.occupation}</span>
            <span className="mx-2 text-border">|</span>
            <Calendar className="h-4 w-4" />
            <span>加入于 {new Date(profile.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-dark/80">{profile.bio}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 px-5">
        <h3 className="mb-3 font-heading text-base font-bold text-dark">兴趣标签</h3>
        <div className="flex flex-wrap gap-2.5">
          {profile.tags.map((tag, i) => (
            <span
              key={tag}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-medium',
                TAG_COLORS[i % TAG_COLORS.length]
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Photos */}
      {profile.photos.length > 0 && (
        <div className="mt-5 px-5">
          <h3 className="mb-3 font-heading text-base font-bold text-dark">照片墙</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {profile.photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square overflow-hidden rounded-[16px]"
              >
                <img
                  src={photo}
                  alt={`photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </motion.div>
            ))}
            <button className="flex aspect-square items-center justify-center rounded-[16px] border-2 border-dashed border-border bg-white/50 transition-colors hover:bg-white">
              <Camera className="h-6 w-6 text-text-secondary" />
            </button>
          </div>
        </div>
      )}

      {/* Verification */}
      <div className="mt-5 px-5">
        <div className="flex items-center gap-3 rounded-[20px] bg-white p-4 shadow-card">
          <Shield className="h-8 w-8 text-mint" />
          <div>
            <h4 className="text-sm font-semibold text-dark">实名认证</h4>
            <p className="text-xs text-text-secondary">已通过身份认证，安全可靠</p>
          </div>
          <BadgeCheck className="ml-auto h-5 w-5 text-mint" fill="#7EC8B3" stroke="white" />
        </div>
      </div>

      <div className="mt-6 px-5">
        <button
          onClick={() => navigate('/profile/edit')}
          className="btn-primary w-full"
        >
          <Edit3 className="mr-2 inline h-4 w-4" />
          编辑资料
        </button>
      </div>
    </div>
  )
}