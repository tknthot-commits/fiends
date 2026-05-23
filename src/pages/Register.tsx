import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Lock, User, KeyRound, ArrowRight, Heart } from 'lucide-react'
import { api } from '@/apiClient'
import { useAuthStore } from '@/stores/authStore'
import type { AuthResponse, RegisterRequest } from '../../shared/types'

export default function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const sendCode = async () => {
    if (!phone || phone.length < 11) {
      setError('请输入正确的手机号')
      return
    }

    setCodeLoading(true)
    setError('')

    try {
      await api.post('/auth/send-code', { phone })
      setCodeSent(true)
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送验证码失败')
    } finally {
      setCodeLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !code || !password || !nickname) {
      setError('请填写所有字段')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await api.post<AuthResponse>('/auth/register', {
        phone,
        password,
        code,
        nickname,
      } as RegisterRequest)
      setAuth(data.user, data.token)
      navigate('/discover', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败')
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
          className="mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 12 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark shadow-lg"
          >
            <Heart className="h-10 w-10 text-white" fill="white" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-dark">创建账号</h1>
          <p className="mt-2 text-text-secondary">加入暖遇，遇见温暖</p>
        </motion.div>

        <motion.form
          onSubmit={handleRegister}
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
            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="昵称"
              className="input-field pl-12"
              maxLength={20}
            />
          </div>

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
            <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="验证码"
              className="input-field pl-12 pr-28"
              maxLength={6}
            />
            <button
              type="button"
              onClick={sendCode}
              disabled={codeLoading || countdown > 0}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[12px] bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand/20 disabled:opacity-50"
            >
              {countdown > 0 ? `${countdown}s` : codeLoading ? '发送中...' : '获取验证码'}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码（至少6位）"
              className="input-field pl-12"
              minLength={6}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex w-full items-center justify-center gap-2 text-base"
          >
            {loading ? '注册中...' : (
              <>
                注册
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
            已有账号？{' '}
            <Link to="/login" className="font-semibold text-brand hover:underline">
              立即登录
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}