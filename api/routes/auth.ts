import { Router, type Request, type Response } from 'express'
import { users } from '../data/mock.js'
import type { LoginRequest, RegisterRequest } from '../../shared/types.js'

const router = Router()

router.post('/register', (req: Request, res: Response): void => {
  const { phone, password, nickname, gender } = req.body as RegisterRequest

  if (!phone || !password || !nickname) {
    res.status(400).json({ success: false, error: '手机号、密码和昵称为必填项' })
    return
  }

  const existing = users.find(u => u.phone === phone)
  if (existing) {
    res.status(409).json({ success: false, error: '该手机号已注册' })
    return
  }

  const newUser = {
    id: `user_${Date.now()}`,
    phone,
    password,
    nickname,
    gender: gender ?? 2 as 0 | 1 | 2,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
    photos: [],
    bio: '',
    age: 0,
    city: '',
    occupation: '',
    tags: [],
    isVerified: false,
    isVip: false,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)

  const { password: _, ...safeUser } = newUser
  res.status(201).json({
    success: true,
    data: {
      token: `mock_token_${newUser.id}`,
      user: safeUser,
    },
  })
})

router.post('/login', (req: Request, res: Response): void => {
  const { phone, password } = req.body as LoginRequest

  if (!phone || !password) {
    res.status(400).json({ success: false, error: '手机号和密码为必填项' })
    return
  }

  const user = users.find(u => u.phone === phone && u.password === password)
  if (!user) {
    res.status(401).json({ success: false, error: '手机号或密码错误' })
    return
  }

  const { password: _, ...safeUser } = user
  res.json({
    success: true,
    data: {
      token: `mock_token_${user.id}`,
      user: safeUser,
    },
  })
})

router.post('/logout', (req: Request, res: Response): void => {
  res.json({ success: true, data: null })
})

export default router