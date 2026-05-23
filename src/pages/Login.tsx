import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Lock, ArrowRight, Heart } from 'lucide-react'
import { api } from '@/apiClient'
import { useAuthStore } from '@/stores/authStore'
import type { AuthResponse, LoginRequest } from '../../shared/types'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !password) {
      setError('请填写手机号和密码')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await api.post<AuthResponse>('/auth/login', {
        phone,
        password,
      } as LoginRequest)
      setAuth(data.user, data.token)
      navigate('/discover', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-cream to-white">
      <div className="flex flex-1 flex-col justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-lg"
          >
            <Heart className="h-10 w-10 text-white" fill="white" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-dark">欢迎回来</h1>
          <p className="mt-2 text-text-secondary">登录暖遇，开始你的温暖之旅</p>
        </motion.div>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-[12px] bg-coral/10 px-4 py-2.5 text-sm text-coral"
            >
              {error}
            </motion.p>
          )}

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="手机号"
              className="input-field pl-12"
              maxLength={11}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              className="input-field pl-12"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex w-full items-center justify-center gap-2 text-base"
          >
            {loading ? '登录中...' : (
              <>
                登录
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-text-secondary">
            还没有账号？{' '}
            <Link to="/register" className="font-semibold text-brand hover:underline">
              立即注册
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}