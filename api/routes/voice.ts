import { Router, type Request, type Response } from 'express'
import { voiceRooms } from '../data/mock.js'

const router = Router()

router.get('/voice-rooms', (req: Request, res: Response): void => {
  res.json({ success: true, data: voiceRooms })
})

router.post('/voice/token', (req: Request, res: Response): void => {
  const { channelName } = req.body as { channelName?: string }

  res.json({
    success: true,
    data: {
      token: `mock_agora_token_${Date.now()}`,
      appId: 'mock_agora_app_id',
      channelName: channelName || `channel_${Date.now()}`,
    },
  })
})

router.post('/voice/call', (req: Request, res: Response): void => {
  const { targetUserId, roomId } = req.body as { targetUserId?: string; roomId?: string }

  if (!targetUserId) {
    res.status(400).json({ success: false, error: 'targetUserId 为必填项' })
    return
  }

  res.json({
    success: true,
    data: {
      callId: `call_${Date.now()}`,
      callerId: req.query.userId || 'user_1',
      targetUserId,
      roomId: roomId || `channel_${Date.now()}`,
      status: 'calling',
      token: `mock_agora_token_${Date.now()}`,
      appId: 'mock_agora_app_id',
      createdAt: new Date().toISOString(),
    },
  })
})

export default router