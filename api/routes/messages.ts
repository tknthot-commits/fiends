import { Router, type Request, type Response } from 'express'
import { conversations, messages, matches, scheduleAutoReply } from '../data/mock.js'
import type { Message } from '../../shared/types.js'

const router = Router()

router.get('/conversations', (req: Request, res: Response): void => {
  const userId = (req.query.userId as string) || 'user_1'

  const userConversations = conversations
    .filter(c => {
      const match = matches.find(m => m.id === c.matchId)
      return match && match.userId === userId
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  res.json({ success: true, data: userConversations })
})

router.get('/conversations/:id/messages', (req: Request, res: Response): void => {
  const conversation = conversations.find(c => c.id === req.params.id)
  if (!conversation) {
    res.status(404).json({ success: false, error: '对话不存在' })
    return
  }

  const conversationMessages = messages
    .filter(m => m.matchId === conversation.matchId)
    .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())

  res.json({ success: true, data: conversationMessages })
})

router.post('/conversations/:id/messages', (req: Request, res: Response): void => {
  const conversation = conversations.find(c => c.id === req.params.id)
  if (!conversation) {
    res.status(404).json({ success: false, error: '对话不存在' })
    return
  }

  const { content, messageType } = req.body as { content: string; messageType?: 'text' | 'image' | 'voice' }

  if (!content) {
    res.status(400).json({ success: false, error: '消息内容不能为空' })
    return
  }

  const senderId = (req.query.userId as string) || 'user_1'

  const newMessage: Message = {
    id: `msg_${Date.now()}`,
    matchId: conversation.matchId,
    senderId,
    content,
    messageType: messageType || 'text',
    sentAt: new Date().toISOString(),
    isRead: false,
  }

  messages.push(newMessage)

  conversation.lastMessage = newMessage
  conversation.unreadCount += 1
  conversation.updatedAt = newMessage.sentAt

  const match = matches.find(m => m.id === conversation.matchId)
  const receiverId = match ? (match.userId === senderId ? match.user.id : match.userId) : senderId

  scheduleAutoReply(conversation.matchId, senderId, receiverId, content, (reply) => {
    messages.push(reply)
    conversation.lastMessage = reply
    conversation.unreadCount += 1
    conversation.updatedAt = reply.sentAt
  })

  res.status(201).json({ success: true, data: newMessage })
})

export default router