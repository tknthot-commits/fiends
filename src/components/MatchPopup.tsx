import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, X } from 'lucide-react'
import type { UserCard } from '../../shared/types'

interface MatchPopupProps {
  isOpen: boolean
  user: UserCard | null
  onClose: () => void
  onStartChat: () => void
}

export default function MatchPopup({ isOpen, user, onClose, onStartChat }: MatchPopupProps) {
  if (!user) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-4 w-full max-w-sm overflow-hidden rounded-[24px] bg-white p-8 text-center shadow-glass"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1 text-text-secondary transition-colors hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10, stiffness: 150 }}
            >
              <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center">
                <div className="relative">
                  <Heart className="h-16 w-16 text-coral" fill="#FF6B6B" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-coral/20"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="font-heading text-3xl font-bold text-dark"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              配对成功！
            </motion.h2>

            <motion.p
              className="mt-2 text-text-secondary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              你和 <span className="font-semibold text-brand">{user.nickname}</span> 互相喜欢
            </motion.p>

            <motion.div
              className="mx-auto my-6 flex items-center justify-center gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-brand">
                <img src={user.avatar} alt={user.nickname} className="h-full w-full object-cover" />
              </div>
              <Heart className="h-6 w-6 text-coral" fill="#FF6B6B" />
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-brand">
                <img
                  src="/placeholder-avatar.svg"
                  alt="你"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={onStartChat}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                打个招呼
              </button>
              <button
                onClick={onClose}
                className="btn-secondary text-sm"
              >
                继续浏览
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}