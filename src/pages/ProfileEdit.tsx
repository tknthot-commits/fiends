import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Camera, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProfileEdit() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('小明')
  const [bio, setBio] = useState('热爱生活，喜欢摄影和旅行，周末经常会去探索城市里的小店和咖啡馆。')
  const [city, setCity] = useState('上海')
  const [occupation, setOccupation] = useState('全栈工程师')
  const [selectedTags, setSelectedTags] = useState(['摄影', '旅行', '咖啡', '读书', '运动'])
  const [isSaving, setIsSaving] = useState(false)

  const allTags = ['摄影', '旅行', '咖啡', '读书', '运动', '电影', '美食', '音乐', '绘画', '游戏', '宠物', '健身', '户外', '时尚', '科技']

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsSaving(false)
    navigate('/profile')
  }

  return (
    <div className="flex h-full flex-col">
      <header className="glass flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate('/profile')}
          className="rounded-full p-1.5 transition-colors hover:bg-white/50"
        >
          <ArrowLeft className="h-5 w-5 text-dark" />
        </button>
        <h2 className="font-heading text-lg font-bold text-dark">编辑资料</h2>
        <div className="flex-1" />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            'btn-primary py-2 text-sm',
            isSaving && 'opacity-70'
          )}
        >
          {isSaving ? '保存中...' : (
            <>
              <Save className="mr-1 inline h-4 w-4" />
              保存
            </>
          )}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 py-6">
        {/* Avatar */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100">
              <Camera className="h-8 w-8 text-white" />
            </button>
          </div>
          <p className="mt-2 text-xs text-text-secondary">点击更换头像</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-dark">昵称</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-field"
              placeholder="输入昵称"
              maxLength={20}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-dark">城市</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field"
              placeholder="所在城市"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-dark">职业</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="input-field"
              placeholder="你的职业"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-dark">个人简介</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field min-h-[100px] resize-none"
              placeholder="介绍一下自己..."
              maxLength={200}
            />
            <p className="mt-1 text-right text-xs text-text-secondary">{bio.length}/200</p>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-dark">兴趣标签</label>
            <div className="flex flex-wrap gap-2.5">
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200',
                    selectedTags.includes(tag)
                      ? 'bg-brand text-white shadow-brand'
                      : 'bg-white/70 text-text-secondary hover:bg-white'
                  )}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}