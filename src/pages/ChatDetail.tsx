import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Phone, MoreVertical } from 'lucide-react'
import type { Message } from '../../shared/types'
import { cn } from '@/lib/utils'

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', matchId: '1', senderId: 'other', content: '你好呀！', messageType: 'text', sentAt: '2024-01-15T10:00:00Z', isRead: true },
  { id: 'm2', matchId: '1', senderId: 'me', content: '你好！很高兴认识你', messageType: 'text', sentAt: '2024-01-15T10:01:00Z', isRead: true },
  { id: 'm3', matchId: '1', senderId: 'other', content: '我看了你的资料，你也喜欢摄影吗？', messageType: 'text', sentAt: '2024-01-15T10:05:00Z', isRead: true },
  { id: 'm4', matchId: '1', senderId: 'me', content: '是的！我很喜欢街拍，你呢？', messageType: 'text', sentAt: '2024-01-15T10:06:00Z', isRead: true },
  { id: 'm5', matchId: '1', senderId: 'other', content: '我比较喜欢拍风景，周末有空一起去拍照吗？', messageType: 'text', sentAt: '2024-01-15T10:10:00Z', isRead: false },
]

const OTHER_USER = {
  nickname: '小雨',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  isOnline: true,
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function ChatDetail() {
  const navigate = useNavigate()
  const { matchId } = useParams()
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = inputText.trim()
    if (!text) return

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      matchId: matchId || '',
      senderId: 'me',
      content: text,
      messageType: 'text',
      sentAt: new Date().toISOString(),
      isRead: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="glass flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate('/chat')}
          className="rounded-full p-1.5 transition-colors hover:bg-white/50"
        >
          <ArrowLeft className="h-5 w-5 text-dark" />
        </button>

        <div className="flex flex-1 items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={OTHER_USER.avatar}
                alt={OTHER_USER.nickname}
                className="h-full w-full object-cover"
              />
            </div>
            {OTHER_USER.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-mint" />
            )}
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-dark">{OTHER_USER.nickname}</h3>
            <span className="text-xs text-mint">
              {OTHER_USER.isOnline ? '在线' : '离线'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full bg-white/70 p-2 transition-colors hover:bg-white">
            <Phone className="h-4 w-4 text-text-secondary" />
          </button>
          <button className="rounded-full bg-white/70 p-2 transition-colors hover:bg-white">
            <MoreVertical className="h-4 w-4 text-text-secondary" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4">
        <AnimatePresence>
          {messages.map((msg) => {
            const isMe = msg.senderId === 'me'
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('mb-3 flex', isMe ? 'justify-end' : 'justify-start')}
              >
                <div className="flex items-end gap-2 max-w-[75%]">
                  {!isMe && (
                    <div className="mb-1 h-7 w-7 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={OTHER_USER.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div
                      className={cn(
                        'rounded-[20px] px-4 py-2.5 text-sm leading-relaxed',
                        isMe
                          ? 'rounded-br-[4px] bg-brand text-white'
                          : 'rounded-bl-[4px] bg-white text-dark shadow-sm'
                      )}
                    >
                      {msg.content}
                    </div>
                    <div
                      className={cn(
                        'mt-1 flex gap-1.5 text-[10px] text-text-secondary/60',
                        isMe ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <span>{formatTime(msg.sentAt)}</span>
                      {isMe && (
                        <span>{msg.isRead ? '已读' : '已发送'}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="glass border-t border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            className="input-field flex-1 py-3"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200',
              inputText.trim()
                ? 'bg-brand text-white shadow-brand'
                : 'bg-gray-200 text-gray-400'
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}