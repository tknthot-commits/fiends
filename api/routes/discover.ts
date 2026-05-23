import { Router, type Request, type Response } from 'express'

const router = Router()

router.get('/filters', (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      genders: [
        { value: 0, label: '男' },
        { value: 1, label: '女' },
        { value: 2, label: '不限' },
      ],
      ageRange: { min: 18, max: 60 },
      cities: [
        '北京', '上海', '广州', '深圳', '杭州',
        '成都', '武汉', '南京', '西安', '重庆',
        '长沙', '苏州', '三亚', '昆明', '大理',
      ],
      tags: [
        '旅行', '摄影', '美食', '健身', '音乐',
        '阅读', '瑜伽', '跑步', '绘画', '烘焙',
        '电影', '编程', '篮球', '游泳', '户外',
      ],
      sortBy: [
        { value: 'distance', label: '距离最近' },
        { value: 'age', label: '年龄' },
        { value: 'popularity', label: '人气最高' },
        { value: 'newest', label: '最新加入' },
      ],
    },
  })
})

export default router