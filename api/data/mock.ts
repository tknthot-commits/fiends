import type {
  User, UserCard, Match, Message, Conversation,
  VoiceRoom, Moment, SwipeAction,
} from '../../shared/types.js'

interface StoredUser extends User {
  password: string
}

export const users: StoredUser[] = [
  {
    id: 'user_1',
    phone: '13800000001',
    password: '123456',
    nickname: '小星星',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=star',
    photos: [
      'https://picsum.photos/seed/star1/400/500',
      'https://picsum.photos/seed/star2/400/500',
    ],
    bio: '喜欢旅行、摄影和美食，希望找到志同道合的人一起探索世界',
    age: 25,
    gender: 1,
    city: '北京',
    occupation: '产品经理',
    tags: ['旅行', '摄影', '美食', '瑜伽'],
    isVerified: true,
    isVip: true,
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'user_2',
    phone: '13800000002',
    password: '123456',
    nickname: '清风明月',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=moon',
    photos: [
      'https://picsum.photos/seed/moon1/400/500',
      'https://picsum.photos/seed/moon2/400/500',
    ],
    bio: '程序员一枚，周末喜欢爬山和打篮球',
    age: 28,
    gender: 0,
    city: '上海',
    occupation: '全栈工程师',
    tags: ['篮球', '编程', '爬山', '音乐'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-02-20T10:00:00Z',
  },
  {
    id: 'user_3',
    phone: '13800000003',
    password: '123456',
    nickname: '向日葵',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=flower',
    photos: [
      'https://picsum.photos/seed/flower1/400/500',
      'https://picsum.photos/seed/flower2/400/500',
    ],
    bio: '热爱生活的设计师，养了一只猫，喜欢看日落',
    age: 24,
    gender: 1,
    city: '深圳',
    occupation: 'UI设计师',
    tags: ['设计', '撸猫', '画画', '摄影'],
    isVerified: true,
    isVip: true,
    createdAt: '2025-03-10T06:00:00Z',
  },
  {
    id: 'user_4',
    phone: '13800000004',
    password: '123456',
    nickname: '追风少年',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wind',
    photos: [
      'https://picsum.photos/seed/wind1/400/500',
      'https://picsum.photos/seed/wind2/400/500',
    ],
    bio: '健身教练，马拉松爱好者，生活就是不断挑战自己',
    age: 30,
    gender: 0,
    city: '广州',
    occupation: '健身教练',
    tags: ['健身', '跑步', '游泳', '阅读'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-01-05T12:00:00Z',
  },
  {
    id: 'user_5',
    phone: '13800000005',
    password: '123456',
    nickname: '甜心小贝',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=heart',
    photos: [
      'https://picsum.photos/seed/heart1/400/500',
      'https://picsum.photos/seed/heart2/400/500',
    ],
    bio: '甜品店主理人，喜欢一切美好的事物',
    age: 26,
    gender: 1,
    city: '杭州',
    occupation: '甜品店主理人',
    tags: ['烘焙', '咖啡', '鲜花', '旅行'],
    isVerified: false,
    isVip: true,
    createdAt: '2025-04-01T09:00:00Z',
  },
  {
    id: 'user_6',
    phone: '13800000006',
    password: '123456',
    nickname: '深海潜水员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ocean',
    photos: [
      'https://picsum.photos/seed/ocean1/400/500',
      'https://picsum.photos/seed/ocean2/400/500',
    ],
    bio: '潜水教练，自由潜爱好者，大海是我的第二故乡',
    age: 32,
    gender: 0,
    city: '三亚',
    occupation: '潜水教练',
    tags: ['潜水', '冲浪', '摄影', '旅行'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-02-14T14:00:00Z',
  },
  {
    id: 'user_7',
    phone: '13800000007',
    password: '123456',
    nickname: '书香女孩',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=book',
    photos: [
      'https://picsum.photos/seed/book1/400/500',
      'https://picsum.photos/seed/book2/400/500',
    ],
    bio: '图书管理员，喜欢安静地看书喝茶，偶尔也去听音乐会',
    age: 27,
    gender: 1,
    city: '北京',
    occupation: '图书管理员',
    tags: ['阅读', '茶道', '古典音乐', '写作'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-03-22T11:00:00Z',
  },
  {
    id: 'user_8',
    phone: '13800000008',
    password: '123456',
    nickname: '电吉他手',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guitar',
    photos: [
      'https://picsum.photos/seed/guitar1/400/500',
      'https://picsum.photos/seed/guitar2/400/500',
    ],
    bio: '乐队主唱兼吉他手，晚上在酒吧演出，白天是程序员',
    age: 29,
    gender: 0,
    city: '成都',
    occupation: '软件工程师',
    tags: ['音乐', '吉他', '编程', '美食'],
    isVerified: false,
    isVip: true,
    createdAt: '2025-04-10T16:00:00Z',
  },
  {
    id: 'user_9',
    phone: '13800000009',
    password: '123456',
    nickname: '瑜伽小仙女',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yoga',
    photos: [
      'https://picsum.photos/seed/yoga1/400/500',
      'https://picsum.photos/seed/yoga2/400/500',
    ],
    bio: '瑜伽老师，素食主义者，内心平静而充实',
    age: 23,
    gender: 1,
    city: '昆明',
    occupation: '瑜伽教练',
    tags: ['瑜伽', '冥想', '素食', '环保'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-05-01T07:00:00Z',
  },
  {
    id: 'user_10',
    phone: '13800000010',
    password: '123456',
    nickname: '摄影师阿杰',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=camera',
    photos: [
      'https://picsum.photos/seed/camera1/400/500',
      'https://picsum.photos/seed/camera2/400/500',
    ],
    bio: '自由摄影师，走过30个国家，想找个旅拍搭档',
    age: 31,
    gender: 0,
    city: '大理',
    occupation: '自由摄影师',
    tags: ['摄影', '旅行', '户外', '电影'],
    isVerified: true,
    isVip: true,
    createdAt: '2025-03-05T15:00:00Z',
  },
  {
    id: 'user_11',
    phone: '13800000011',
    password: '123456',
    nickname: '奶茶女孩',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=milk',
    photos: [
      'https://picsum.photos/seed/milk1/400/500',
      'https://picsum.photos/seed/milk2/400/500',
    ],
    bio: '奶茶重度爱好者，探店达人，周末不是在喝奶茶就是在去探店路上',
    age: 22,
    gender: 1,
    city: '上海',
    occupation: '新媒体运营',
    tags: ['奶茶', '探店', '追剧', '美妆'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-04-20T10:00:00Z',
  },
  {
    id: 'user_12',
    phone: '13800000012',
    password: '123456',
    nickname: '花间集',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=flower2',
    photos: [
      'https://picsum.photos/seed/flower3/400/500',
      'https://picsum.photos/seed/flower4/400/500',
    ],
    bio: '花店老板娘，每天和花打交道是最幸福的事💐',
    age: 26,
    gender: 1,
    city: '成都',
    occupation: '花店主理人',
    tags: ['花艺', '烘焙', '摄影', '猫'],
    isVerified: true,
    isVip: true,
    createdAt: '2025-04-25T09:00:00Z',
  },
  {
    id: 'user_13',
    phone: '13800000013',
    password: '123456',
    nickname: '舞蹈精灵',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dance',
    photos: [
      'https://picsum.photos/seed/dance1/400/500',
      'https://picsum.photos/seed/dance2/400/500',
    ],
    bio: '芭蕾舞老师，优雅永不过时，也喜欢HIPHOP的反差萌',
    age: 24,
    gender: 1,
    city: '北京',
    occupation: '舞蹈老师',
    tags: ['舞蹈', '健身', '音乐', '时尚'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-05-05T14:00:00Z',
  },
  {
    id: 'user_14',
    phone: '13800000014',
    password: '123456',
    nickname: '海边的小鹿',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=deer',
    photos: [
      'https://picsum.photos/seed/deer1/400/500',
      'https://picsum.photos/seed/deer2/400/500',
    ],
    bio: '冲浪女孩，赶海达人，每周必去海边报到🌊',
    age: 25,
    gender: 1,
    city: '三亚',
    occupation: '民宿管家',
    tags: ['冲浪', '赶海', '骑行', '摄影'],
    isVerified: false,
    isVip: true,
    createdAt: '2025-05-10T08:00:00Z',
  },
  {
    id: 'user_15',
    phone: '13800000015',
    password: '123456',
    nickname: '钢琴上的猫',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=piano',
    photos: [
      'https://picsum.photos/seed/piano1/400/500',
      'https://picsum.photos/seed/piano2/400/500',
    ],
    bio: '钢琴十级，猫奴一枚，喜欢安静也喜欢热闹',
    age: 27,
    gender: 1,
    city: '上海',
    occupation: '音乐教师',
    tags: ['钢琴', '撸猫', '阅读', '烘焙'],
    isVerified: true,
    isVip: false,
    createdAt: '2025-05-12T11:00:00Z',
  },
]

function toUserCard(u: User): UserCard {
  return {
    id: u.id,
    nickname: u.nickname,
    avatar: u.avatar,
    photos: u.photos,
    age: u.age,
    gender: u.gender,
    city: u.city,
    occupation: u.occupation,
    tags: u.tags,
    bio: u.bio,
    distance: `${Math.floor(Math.random() * 20 + 1)}km`,
  }
}

export const userCards: UserCard[] = users.map(toUserCard)

export const matches: Match[] = [
  {
    id: 'match_1',
    userId: 'user_1',
    user: toUserCard(users[1]),
    matchedAt: '2025-04-10T08:30:00Z',
  },
  {
    id: 'match_2',
    userId: 'user_1',
    user: toUserCard(users[3]),
    matchedAt: '2025-04-12T14:20:00Z',
  },
  {
    id: 'match_3',
    userId: 'user_1',
    user: toUserCard(users[6]),
    matchedAt: '2025-04-15T10:00:00Z',
  },
  {
    id: 'match_4',
    userId: 'user_1',
    user: toUserCard(users[8]),
    matchedAt: '2025-05-01T09:00:00Z',
  },
  {
    id: 'match_5',
    userId: 'user_2',
    user: toUserCard(users[0]),
    matchedAt: '2025-04-10T08:30:00Z',
  },
  {
    id: 'match_6',
    userId: 'user_2',
    user: toUserCard(users[4]),
    matchedAt: '2025-04-18T16:45:00Z',
  },
]

export const messages: Message[] = [
  {
    id: 'msg_1',
    matchId: 'match_1',
    senderId: 'user_1',
    content: '你好，看到你也喜欢旅行，最近去过哪里呀？',
    messageType: 'text',
    sentAt: '2025-04-10T09:00:00Z',
    isRead: true,
  },
  {
    id: 'msg_2',
    matchId: 'match_1',
    senderId: 'user_2',
    content: '嗨！上周刚去了黄山，风景太美了！',
    messageType: 'text',
    sentAt: '2025-04-10T09:05:00Z',
    isRead: true,
  },
  {
    id: 'msg_3',
    matchId: 'match_1',
    senderId: 'user_1',
    content: '哇，黄山一直是我想去的地方！发张照片看看？',
    messageType: 'text',
    sentAt: '2025-04-10T09:10:00Z',
    isRead: true,
  },
  {
    id: 'msg_4',
    matchId: 'match_1',
    senderId: 'user_2',
    content: 'https://picsum.photos/seed/huangshan/400/300',
    messageType: 'image',
    sentAt: '2025-04-10T09:12:00Z',
    isRead: true,
  },
  {
    id: 'msg_5',
    matchId: 'match_1',
    senderId: 'user_1',
    content: '太好看了！下次可以一起去吗？',
    messageType: 'text',
    sentAt: '2025-04-10T09:15:00Z',
    isRead: false,
  },
  {
    id: 'msg_6',
    matchId: 'match_2',
    senderId: 'user_4',
    content: '周末有个马拉松活动，感兴趣吗？',
    messageType: 'text',
    sentAt: '2025-04-13T10:00:00Z',
    isRead: true,
  },
  {
    id: 'msg_7',
    matchId: 'match_2',
    senderId: 'user_1',
    content: '我跑步不太行，不过可以给你加油😄',
    messageType: 'text',
    sentAt: '2025-04-13T10:30:00Z',
    isRead: true,
  },
  {
    id: 'msg_8',
    matchId: 'match_3',
    senderId: 'user_7',
    content: '最近在读一本很有意思的书，推荐给你',
    messageType: 'text',
    sentAt: '2025-04-16T11:00:00Z',
    isRead: false,
  },
]

export const conversations: Conversation[] = [
  {
    id: 'conv_1',
    matchId: 'match_1',
    user: toUserCard(users[1]),
    lastMessage: messages[4],
    unreadCount: 1,
    updatedAt: '2025-04-10T09:15:00Z',
  },
  {
    id: 'conv_2',
    matchId: 'match_2',
    user: toUserCard(users[3]),
    lastMessage: messages[6],
    unreadCount: 0,
    updatedAt: '2025-04-13T10:30:00Z',
  },
  {
    id: 'conv_3',
    matchId: 'match_3',
    user: toUserCard(users[6]),
    lastMessage: messages[7],
    unreadCount: 1,
    updatedAt: '2025-04-16T11:00:00Z',
  },
]

export const voiceRooms: VoiceRoom[] = [
  {
    id: 'room_1',
    name: '深夜音乐聊天室',
    topic: '分享你最爱的歌',
    hostId: 'user_8',
    hostName: '电吉他手',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guitar',
    memberCount: 5,
    maxMembers: 12,
  },
  {
    id: 'room_2',
    name: '旅行故事分享',
    topic: '聊聊你去过最难忘的地方',
    hostId: 'user_10',
    hostName: '摄影师阿杰',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=camera',
    memberCount: 8,
    maxMembers: 15,
  },
  {
    id: 'room_3',
    name: '周末桌游组局',
    topic: '狼人杀/剧本杀找搭子',
    hostId: 'user_3',
    hostName: '向日葵',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=flower',
    memberCount: 3,
    maxMembers: 10,
  },
  {
    id: 'room_4',
    name: '读书会',
    topic: '本月书单分享与讨论',
    hostId: 'user_7',
    hostName: '书香女孩',
    hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=book',
    memberCount: 12,
    maxMembers: 20,
  },
]

export const moments: Moment[] = [
  {
    id: 'moment_1',
    userId: 'user_1',
    user: toUserCard(users[0]),
    content: '今天的日落太美了，分享给大家🌅',
    images: ['https://picsum.photos/seed/sunset1/400/300'],
    likes: 42,
    comments: 8,
    createdAt: '2025-05-20T18:30:00Z',
    isLiked: false,
  },
  {
    id: 'moment_2',
    userId: 'user_2',
    user: toUserCard(users[1]),
    content: '周末爬山的收获，山顶的风景值得所有的汗水💪',
    images: [
      'https://picsum.photos/seed/mountain1/400/300',
      'https://picsum.photos/seed/mountain2/400/300',
    ],
    likes: 38,
    comments: 5,
    createdAt: '2025-05-19T15:00:00Z',
    isLiked: true,
  },
  {
    id: 'moment_3',
    userId: 'user_3',
    user: toUserCard(users[2]),
    content: '今天做的提拉米苏，颜值和味道都在线😋',
    images: ['https://picsum.photos/seed/cake1/400/300'],
    likes: 56,
    comments: 12,
    createdAt: '2025-05-18T20:00:00Z',
    isLiked: false,
  },
  {
    id: 'moment_4',
    userId: 'user_5',
    user: toUserCard(users[4]),
    content: '新店开业啦！欢迎大家来品尝🍰☕',
    images: [
      'https://picsum.photos/seed/shop1/400/300',
      'https://picsum.photos/seed/shop2/400/300',
      'https://picsum.photos/seed/shop3/400/300',
    ],
    likes: 89,
    comments: 23,
    createdAt: '2025-05-17T10:00:00Z',
    isLiked: true,
  },
  {
    id: 'moment_5',
    userId: 'user_8',
    user: toUserCard(users[7]),
    content: '昨晚的演出太炸了！感谢来捧场的朋友们🎸🔥',
    images: ['https://picsum.photos/seed/concert1/400/300'],
    likes: 67,
    comments: 15,
    createdAt: '2025-05-16T23:00:00Z',
    isLiked: false,
  },
  {
    id: 'moment_6',
    userId: 'user_10',
    user: toUserCard(users[9]),
    content: '在大理的日子，每天都是诗和远方📷',
    images: [
      'https://picsum.photos/seed/dali1/400/300',
      'https://picsum.photos/seed/dali2/400/300',
    ],
    likes: 73,
    comments: 11,
    createdAt: '2025-05-15T14:00:00Z',
    isLiked: true,
  },
]

export const swipeRecords: {
  userId: string
  targetUserId: string
  action: SwipeAction
  createdAt: string
}[] = [
  {
    userId: 'user_1',
    targetUserId: 'user_2',
    action: 'like',
    createdAt: '2025-04-10T08:00:00Z',
  },
  {
    userId: 'user_2',
    targetUserId: 'user_1',
    action: 'like',
    createdAt: '2025-04-10T08:00:00Z',
  },
  {
    userId: 'user_1',
    targetUserId: 'user_4',
    action: 'like',
    createdAt: '2025-04-12T14:00:00Z',
  },
  {
    userId: 'user_4',
    targetUserId: 'user_1',
    action: 'like',
    createdAt: '2025-04-12T14:00:00Z',
  },
]

export function getUserById(id: string): StoredUser | undefined {
  return users.find(u => u.id === id)
}

export function getUserCardById(id: string): UserCard | undefined {
  return userCards.find(u => u.id === id)
}

const AUTO_REPLIES: Record<string, string[]> = {
  default: [
    '哈哈，真的吗？😄',
    '好呀好呀～',
    '你平时喜欢做什么呀？',
    '嗯嗯，我在听~',
    '说的有道理！',
    '哈哈，你好有趣',
    '周末有什么安排吗？',
    '我也喜欢这个！',
    '真的假的？太巧了吧',
    '有眼光 👏',
  ],
  hello: [
    '你好呀！很高兴认识你 😊',
    '嗨～终于等到你啦！',
    'Hi！今天过得怎么样？',
    'Hello～ 你也在呀',
  ],
  food: [
    '吃货握爪！🍽️',
    '说到吃的我就来劲了！',
    '求推荐好吃的店！',
    '改天一起去吃呀～',
  ],
  travel: [
    '旅行是我最大的爱好！',
    '好想去旅行啊～',
    '你最喜欢哪个城市？',
    '下次旅行带上我！',
  ],
  music: [
    '你也喜欢音乐？太棒了！',
    '最近在听什么歌？',
    '推荐一首你最喜欢的歌吧 🎵',
    '有机会一起听歌！',
  ],
}

function detectTopic(content: string): string {
  const lower = content.toLowerCase()
  if (/你好|hi|hello|嗨|哈喽/.test(lower)) return 'hello'
  if (/吃|美食|餐厅|探店|好吃/.test(lower)) return 'food'
  if (/旅行|旅游|去|玩|风景/.test(lower)) return 'travel'
  if (/音乐|歌|听|唱/.test(lower)) return 'music'
  return 'default'
}

let replyTimers: ReturnType<typeof setTimeout>[] = []

export function clearReplyTimers() {
  replyTimers.forEach(t => clearTimeout(t))
  replyTimers = []
}

export function scheduleAutoReply(
  matchId: string,
  senderId: string,
  receiverId: string,
  content: string,
  onReply: (message: Message) => void,
) {
  const delay = 2000 + Math.random() * 4000
  const timer = setTimeout(() => {
    const topic = detectTopic(content)
    const replies = AUTO_REPLIES[topic] || AUTO_REPLIES.default
    const reply = replies[Math.floor(Math.random() * replies.length)]

    const replyMessage: Message = {
      id: `msg_auto_${Date.now()}`,
      matchId,
      senderId: receiverId,
      content: reply,
      messageType: 'text',
      sentAt: new Date().toISOString(),
      isRead: false,
    }

    onReply(replyMessage)
  }, delay)

  replyTimers.push(timer)
}