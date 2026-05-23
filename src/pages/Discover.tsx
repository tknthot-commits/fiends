import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, SlidersHorizontal } from 'lucide-react'
import UserCard from '@/components/UserCard'
import MatchPopup from '@/components/MatchPopup'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import type { UserCard as UserCardType, SwipeAction } from '../../shared/types'

const MOCK_USERS: UserCardType[] = [
  {
    id: '1', nickname: '小雨', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'], age: 24, gender: 1, city: '上海', occupation: '设计师', tags: ['摄影', '旅行', '美食'], bio: '喜欢记录生活中的美好瞬间', distance: '2.5km',
  },
  {
    id: '2', nickname: '清风', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'], age: 27, gender: 2, city: '北京', occupation: '工程师', tags: ['篮球', '音乐', '读书'], bio: '热爱生活，热爱运动', distance: '3.8km',
  },
  {
    id: '3', nickname: '暖暖', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'], age: 22, gender: 1, city: '深圳', occupation: '插画师', tags: ['画画', '猫', '咖啡'], bio: '画画的女孩运气不会太差', distance: '1.2km',
  },
  {
    id: '4', nickname: '阳光', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'], age: 26, gender: 2, city: '杭州', occupation: '产品经理', tags: ['桌游', '户外', '电影'], bio: '周末喜欢约朋友一起玩桌游', distance: '4.1km',
  },
  {
    id: '5', nickname: '柠檬', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'], age: 23, gender: 1, city: '广州', occupation: '自媒体', tags: ['美妆', '穿搭', '旅行'], bio: '分享生活美学', distance: '2.0km',
  },
]

const FILTER_OPTIONS = ['全部', '上海', '北京', '深圳', '杭州', '广州']

export default function Discover() {
  const currentUser = useAuthStore((s) => s.user)
  const preferredGender = currentUser?.gender === 2 ? 1 : 2

  const filteredUsers = useMemo(
    () => MOCK_USERS.filter((u) => u.gender === preferredGender),
    [preferredGender],
  )

  const [users, setUsers] = useState(filteredUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedUser, setMatchedUser] = useState<UserCardType | null>(null)
  const [activeFilter, setActiveFilter] = useState('全部')
  const [showFilters, setShowFilters] = useState(false)
  const [superLikeCount, setSuperLikeCount] = useState(3)

  const displayUser = users[currentIndex]

  const handleSwipe = useCallback(
    (action: SwipeAction) => {
      if (!displayUser) return

      if (action === 'super_like' && superLikeCount > 0) {
        setSuperLikeCount((c) => c - 1)
      }

      const isMatch = action === 'like' || action === 'super_like'
      if (isMatch && Math.random() > 0.7) {
        setMatchedUser(displayUser)
        setShowMatch(true)
      }

      setCurrentIndex((i) => i + 1)
    },
    [displayUser, superLikeCount]
  )

  const handleDragEnd = (direction: string) => {
    if (direction === 'right') handleSwipe('like')
    else if (direction === 'left') handleSwipe('pass')
    else if (direction === 'up') handleSwipe('super_like')
  }

  const resetCards = () => {
    setCurrentIndex(0)
    setUsers(filteredUsers)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={cn(
                  'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                  activeFilter === opt
                    ? 'bg-brand text-white shadow-brand'
                    : 'bg-white/70 text-text-secondary hover:bg-white'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 flex-shrink-0 rounded-full bg-white/70 p-2 transition-colors hover:bg-white"
          >
            <SlidersHorizontal className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 pb-4">
        {currentIndex < users.length ? (
          <div className="relative mx-auto h-full max-w-md">
            {users.slice(currentIndex, currentIndex + 2).map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                onSwipe={handleDragEnd}
                isTop={index === 0}
              />
            ))}

            <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-6">
              <button
                onClick={() => handleSwipe('pass')}
                className="btn-icon bg-white shadow-lg hover:shadow-xl"
              >
                <X className="h-7 w-7 text-coral" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => handleSwipe('super_like')}
                className={cn(
                  'btn-icon shadow-lg transition-all duration-300 hover:shadow-xl',
                  superLikeCount > 0 ? 'bg-white' : 'bg-gray-200 opacity-50'
                )}
                disabled={superLikeCount <= 0}
              >
                <div className="relative">
                  <Star className="h-6 w-5 text-brand" fill="#F7A072" />
                  {superLikeCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-[10px] font-bold text-brand">
                      {superLikeCount}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => handleSwipe('like')}
                className="btn-icon bg-brand text-white shadow-lg hover:shadow-xl"
              >
                <Heart className="h-7 w-7" fill="white" />
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            className="flex h-full flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 rounded-full bg-white/80 p-8 shadow-card">
              <Heart className="h-12 w-12 text-brand/50" />
            </div>
            <h3 className="font-heading text-xl font-bold text-dark">已经看到这里了</h3>
            <p className="mt-2 text-sm text-text-secondary">稍后再来看看，有新的人等你发现</p>
            <button
              onClick={resetCards}
              className="btn-primary mt-6"
            >
              重新看看
            </button>
          </motion.div>
        )}
      </div>

      <MatchPopup
        isOpen={showMatch}
        user={matchedUser}
        onClose={() => setShowMatch(false)}
        onStartChat={() => {
          setShowMatch(false)
        }}
      />
    </div>
  )
}