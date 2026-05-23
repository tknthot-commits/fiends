import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, MicOff, Volume2, PhoneOff, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

const CALL_PARTNER = {
  nickname: '小雨',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  isOnline: true,
}

export default function VoiceCall() {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isConnecting, setIsConnecting] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const connectTimer = setTimeout(() => setIsConnecting(false), 2000)
    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    if (!isConnecting) {
      intervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isConnecting])

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleHangUp = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    navigate(-1)
  }

  return (
    <div className="flex h-full flex-col items-center justify-between bg-gradient-to-b from-dark/95 to-dark p-8">
      {/* Top section */}
      <div className="flex flex-col items-center pt-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
            <img
              src={CALL_PARTNER.avatar}
              alt={CALL_PARTNER.nickname}
              className="h-full w-full object-cover"
            />
          </div>
          {!isConnecting && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-mint/50"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        <h2 className="font-heading text-2xl font-bold text-white">{CALL_PARTNER.nickname}</h2>
        <p className="mt-2 text-sm text-white/60">
          {isConnecting ? '等待接听...' : formatDuration(callDuration)}
        </p>

        {!isConnecting && (
          <div className="mt-6 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="h-8 w-1.5 rounded-full bg-mint"
                animate={{
                  height: [8, 24 + Math.random() * 20, 8],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col items-center gap-8 pb-12">
        <div className="flex items-center gap-8">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300',
              isMuted
                ? 'bg-coral text-white'
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            )}
          >
            {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleHangUp}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-coral text-white shadow-lg transition-all duration-300 hover:bg-red-500"
          >
            <PhoneOff className="h-7 w-7" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300',
              isSpeaker
                ? 'bg-mint text-white'
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            )}
          >
            {isSpeaker ? <Volume2 className="h-7 w-7" /> : <VolumeX className="h-7 w-7" />}
          </motion.button>
        </div>

        <p className="text-xs text-white/40">点击麦克风切换静音</p>
      </div>
    </div>
  )
}