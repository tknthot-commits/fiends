import app from './app.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { messages, conversations, getUserById, scheduleAutoReply } from './data/mock.js'
import type { Message } from '../shared/types.js'

const PORT = process.env.PORT || 3001

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`[Socket] User connected: ${socket.id}`)

  socket.on('join', (userId: string) => {
    socket.join(`user:${userId}`)
    console.log(`[Socket] User ${userId} joined room user:${userId}`)
  })

  socket.on('leave', (userId: string) => {
    socket.leave(`user:${userId}`)
    console.log(`[Socket] User ${userId} left room user:${userId}`)
  })

  socket.on('message:send', (data: {
    conversationId: string
    matchId: string
    senderId: string
    receiverId: string
    content: string
    messageType?: 'text' | 'image' | 'voice'
  }) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId: data.matchId,
      senderId: data.senderId,
      content: data.content,
      messageType: data.messageType || 'text',
      sentAt: new Date().toISOString(),
      isRead: false,
    }

    messages.push(newMessage)

    const conv = conversations.find(c => c.id === data.conversationId)
    if (conv) {
      conv.lastMessage = newMessage
      conv.unreadCount += 1
      conv.updatedAt = newMessage.sentAt
    }

    io.to(`user:${data.senderId}`).emit('message:new', newMessage)
    io.to(`user:${data.receiverId}`).emit('message:new', newMessage)

    scheduleAutoReply(data.matchId, data.senderId, data.receiverId, data.content, (reply) => {
      messages.push(reply)
      io.to(`user:${data.senderId}`).emit('message:new', reply)
      io.to(`user:${data.receiverId}`).emit('message:new', reply)
    })
  })

  socket.on('message:read', (data: {
    conversationId: string
    userId: string
  }) => {
    const conv = conversations.find(c => c.id === data.conversationId)
    if (conv) {
      conv.unreadCount = 0
    }
    io.to(`user:${data.userId}`).emit('message:read-update', {
      conversationId: data.conversationId,
    })
  })

  socket.on('voice:invite', (data: {
    callerId: string
    callerName: string
    receiverId: string
    roomId: string
  }) => {
    io.to(`user:${data.receiverId}`).emit('voice:incoming', {
      callId: `call_${Date.now()}`,
      callerId: data.callerId,
      callerName: data.callerName,
      roomId: data.roomId,
      status: 'calling',
    })
  })

  socket.on('voice:accept', (data: {
    callId: string
    receiverId: string
    callerId: string
    roomId: string
  }) => {
    io.to(`user:${data.callerId}`).emit('voice:accepted', {
      callId: data.callId,
      receiverId: data.receiverId,
      roomId: data.roomId,
      status: 'connected',
    })
  })

  socket.on('voice:reject', (data: {
    callId: string
    callerId: string
    receiverId: string
  }) => {
    io.to(`user:${data.callerId}`).emit('voice:rejected', {
      callId: data.callId,
      receiverId: data.receiverId,
      status: 'rejected',
    })
  })

  socket.on('voice:end', (data: {
    callId: string
    roomId: string
    userId: string
    targetId: string
  }) => {
    io.to(`user:${data.targetId}`).emit('voice:ended', {
      callId: data.callId,
      roomId: data.roomId,
      userId: data.userId,
    })
  })

  socket.on('match:new', (data: {
    userId: string
    matchId: string
    matchedUserId: string
  }) => {
    io.to(`user:${data.userId}`).emit('match:created', data)
    io.to(`user:${data.matchedUserId}`).emit('match:created', data)
  })

  socket.on('disconnect', () => {
    console.log(`[Socket] User disconnected: ${socket.id}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received')
  httpServer.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received')
  httpServer.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

export default app