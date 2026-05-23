import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Compass, Heart, Mic, MessageCircle, User, Bell } from 'lucide-react'
import { useAppStore, type PageTab } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const tabs: { key: PageTab; label: string; icon: typeof Compass; path: string }[] = [
  { key: 'discover', label: '发现', icon: Compass, path: '/discover' },
  { key: 'matches', label: '配对', icon: Heart, path: '/matches' },
  { key: 'voice', label: '语音', icon: Mic, path: '/voice-rooms' },
  { key: 'chat', label: '消息', icon: MessageCircle, path: '/chat' },
  { key: 'profile', label: '我的', icon: User, path: '/profile' },
]

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { unreadCount } = useAppStore()
  const { user, isAuthenticated } = useAuthStore()
  const [showNotifications, setShowNotifications] = useState(false)

  const currentTab = tabs.find((t) => location.pathname.startsWith(t.path))?.key || 'discover'

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if (!isAuthenticated && tab.key !== 'profile') {
      navigate('/login')
      return
    }
    navigate(tab.path)
  }

  const isChatDetail = location.pathname.startsWith('/chat/')

  return (
    <div className="flex h-full flex-col bg-cream">
      {!isChatDetail && (
        <header className="safe-top glass fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3">
          <h1
            className="font-heading text-xl font-bold tracking-wide"
            style={{ color: 'var(--color-brand)' }}
          >
            暖遇
          </h1>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-full p-2 transition-colors hover:bg-white/50"
          >
            <Bell className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </header>
      )}

      <main className={cn('flex-1 overflow-y-auto scrollbar-hide', !isChatDetail && 'pt-[56px] pb-[72px]')}>
        <Outlet />
      </main>

      {!isChatDetail && (
        <nav className="safe-bottom glass fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 px-2 pb-1 pt-2">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.key
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab)}
                  className="flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200"
                >
                  <div className="relative">
                    <Icon
                      className={cn('h-5 w-5 transition-colors duration-200', isActive ? 'text-brand' : 'text-text-secondary')}
                    />
                    {tab.key === 'chat' && unreadCount > 0 && (
                      <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-medium transition-colors duration-200',
                      isActive ? 'text-brand' : 'text-text-secondary'
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}