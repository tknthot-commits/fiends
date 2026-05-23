import { Router, type Request, type Response } from 'express'
import { users, userCards, swipeRecords, matches, getUserCardById, getUserById } from '../data/mock.js'
import type { SwipeRequest } from '../../shared/types.js'

const router = Router()

router.get('/recommendations', (req: Request, res: Response): void => {
  const userId = (req.query.userId as string) || 'user_1'
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10

  const currentUser = getUserById(userId)
  if (!currentUser) {
    res.status(404).json({ success: false, error: '用户不存在' })
    return
  }

  const preferredGender = currentUser.gender === 2 ? 1 : 2

  const swipedUserIds = new Set(
    swipeRecords
      .filter(r => r.userId === userId)
      .map(r => r.targetUserId)
  )

  const matchedUserIds = new Set(
    matches
      .filter(m => m.userId === userId)
      .map(m => m.user.id)
  )

  const excludedIds = new Set([...swipedUserIds, ...matchedUserIds, userId])

  const recommendations = userCards
    .filter(u => !excludedIds.has(u.id) && u.gender === preferredGender)
    .slice((page - 1) * limit, page * limit)

  res.json({ success: true, data: { users: recommendations, total: recommendations.length } })
})

router.post('/swipe', (req: Request, res: Response): void => {
  const userId = (req.query.userId as string) || 'user_1'
  const { targetUserId, action } = req.body as SwipeRequest

  if (!targetUserId || !action) {
    res.status(400).json({ success: false, error: 'targetUserId 和 action 为必填项' })
    return
  }

  if (!['like', 'pass', 'super_like'].includes(action)) {
    res.status(400).json({ success: false, error: '无效的 action 值' })
    return
  }

  const targetUser = getUserById(targetUserId)
  if (!targetUser) {
    res.status(404).json({ success: false, error: '目标用户不存在' })
    return
  }

  swipeRecords.push({
    userId,
    targetUserId,
    action,
    createdAt: new Date().toISOString(),
  })

  let isMatch = false

  if (action === 'like' || action === 'super_like') {
    const mutualLike = swipeRecords.some(
      r => r.userId === targetUserId
        && r.targetUserId === userId
        && (r.action === 'like' || r.action === 'super_like')
    )

    if (mutualLike) {
      isMatch = true

      const newMatch = {
        id: `match_${Date.now()}`,
        userId,
        user: getUserCardById(targetUserId)!,
        matchedAt: new Date().toISOString(),
      }
      matches.push(newMatch)

      res.json({
        success: true,
        data: {
          isMatch: true,
          match: newMatch,
        },
      })
      return
    }
  }

  res.json({
    success: true,
    data: {
      isMatch: false,
    },
  })
})

export default router