import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Briefcase } from 'lucide-react'
import type { UserCard as UserCardType } from '../../shared/types'
import { cn } from '@/lib/utils'

interface UserCardProps {
  user: UserCardType
  onSwipe: (direction: 'left' | 'right' | 'up') => void
  isTop?: boolean
}

export default function UserCard({ user, onSwipe, isTop = true }: UserCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15])

  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      onSwipe('right')
    } else if (info.offset.x < -threshold) {
      onSwipe('left')
    } else if (info.offset.y < -threshold) {
      onSwipe('up')
    }
  }

  return (
    <motion.div
      className={cn(
        'absolute inset-0 rounded-[24px] overflow-hidden cursor-grab active:cursor-grabbing card-shadow bg-white',
        !isTop && 'scale-[0.95]'
      )}
      style={{ x, rotate }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 0.9, opacity: 0 } : false}
      animate={isTop ? { scale: 1, opacity: 1 } : { scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full w-full">
        <img
          src={user.photos[0] || user.avatar}
          alt={user.nickname}
          className="h-full w-full object-cover"
        />

        <motion.div
          className="absolute top-12 left-6 rotate-[-15deg]"
          style={{ opacity: likeOpacity }}
        >
          <span className="rounded-[12px] border-4 border-mint px-4 py-2 font-heading text-3xl font-bold text-mint shadow-lg">
            喜欢
          </span>
        </motion.div>

        <motion.div
          className="absolute top-12 right-6 rotate-[15deg]"
          style={{ opacity: nopeOpacity }}
        >
          <span className="rounded-[12px] border-4 border-coral px-4 py-2 font-heading text-3xl font-bold text-coral shadow-lg">
            跳过
          </span>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-20">
          <div className="flex items-end gap-2">
            <h2 className="font-heading text-2xl font-bold text-white">{user.nickname}</h2>
            <span className="mb-0.5 text-xl font-light text-white/90">{user.age}</span>
            {user.gender === 1 && <span className="mb-0.5 text-xl">♀</span>}
            {user.gender === 2 && <span className="mb-0.5 text-xl">♂</span>}
          </div>

          <div className="mt-2 flex items-center gap-3 text-sm text-white/80">
            {user.city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {user.city}
              </span>
            )}
            {user.occupation && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {user.occupation}
              </span>
            )}
            {user.distance && (
              <span className="text-white/60">{user.distance}</span>
            )}
          </div>

          {user.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {user.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {user.bio && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
              {user.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}