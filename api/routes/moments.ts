import { Router, type Request, type Response } from 'express'
import { moments, getUserById, getUserCardById } from '../data/mock.js'
import type { Moment } from '../../shared/types.js'

const router = Router()

router.get('/', (req: Request, res: Response): void => {
  const page = parseInt(req.query.page as string) || 1
  const pageSize = parseInt(req.query.pageSize as string) || 10
  const userId = (req.query.userId as string) || 'user_1'

  const sorted = [...moments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const start = (page - 1) * pageSize
  const paged = sorted.slice(start, start + pageSize)

  const result = paged.map(m => ({
    ...m,
    isLiked: m.isLiked,
  }))

  res.json({
    success: true,
    data: {
      list: result,
      total: moments.length,
      page,
      pageSize,
      hasMore: start + pageSize < moments.length,
    },
  })
})

router.post('/', (req: Request, res: Response): void => {
  const { content, images } = req.body as { content?: string; images?: string[] }

  if (!content) {
    res.status(400).json({ success: false, error: '动态内容不能为空' })
    return
  }

  const userId = (req.query.userId as string) || 'user_1'
  const user = getUserById(userId)

  if (!user) {
    res.status(404).json({ success: false, error: '用户不存在' })
    return
  }

  const newMoment: Moment = {
    id: `moment_${Date.now()}`,
    userId,
    user: getUserCardById(userId)!,
    content,
    images: images || [],
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
    isLiked: false,
  }

  moments.unshift(newMoment)

  res.status(201).json({ success: true, data: newMoment })
})

router.post('/:id/like', (req: Request, res: Response): void => {
  const moment = moments.find(m => m.id === req.params.id)
  if (!moment) {
    res.status(404).json({ success: false, error: '动态不存在' })
    return
  }

  moment.isLiked = !moment.isLiked
  moment.likes += moment.isLiked ? 1 : -1

  res.json({
    success: true,
    data: {
      id: moment.id,
      likes: moment.likes,
      isLiked: moment.isLiked,
    },
  })
})

export default router