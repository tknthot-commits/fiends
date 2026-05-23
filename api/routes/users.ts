import { Router, type Request, type Response } from 'express'
import { matches, getUserById, getUserCardById } from '../data/mock.js'

const router = Router()

router.get('/:id', (req: Request, res: Response): void => {
  const user = getUserById(req.params.id)
  if (!user) {
    res.status(404).json({ success: false, error: '用户不存在' })
    return
  }

  const { password: _, ...safeUser } = user
  res.json({ success: true, data: safeUser })
})

router.put('/:id', (req: Request, res: Response): void => {
  const user = getUserById(req.params.id)
  if (!user) {
    res.status(404).json({ success: false, error: '用户不存在' })
    return
  }

  const allowedFields = ['nickname', 'bio', 'age', 'gender', 'city', 'occupation', 'tags', 'avatar', 'photos']
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      (user as unknown as Record<string, unknown>)[field] = req.body[field]
    }
  }

  const { password: _, ...safeUser } = user
  res.json({ success: true, data: safeUser })
})

router.get('/:id/matches', (req: Request, res: Response): void => {
  const user = getUserById(req.params.id)
  if (!user) {
    res.status(404).json({ success: false, error: '用户不存在' })
    return
  }

  const userMatches = matches
    .filter(m => m.userId === req.params.id)
    .map(m => ({
      ...m,
      user: getUserCardById(m.user.id)!,
    }))

  res.json({ success: true, data: userMatches })
})

export default router