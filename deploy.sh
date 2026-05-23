#!/bin/bash
set -e

echo "================================================"
echo "  🏡 暖遇 - 一键部署脚本"
echo "================================================"
echo ""

# 1. 检查 Node.js
if ! command -v node &> /dev/null; then
  echo "❌ 未检测到 Node.js，请先安装 Node.js 18+"
  echo "   推荐用 nvm 安装：curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash"
  echo "   然后执行：nvm install 22"
  exit 1
fi
echo "✅ Node.js $(node -v)"

# 2. 检查 PM2
if ! command -v pm2 &> /dev/null; then
  echo "📦 安装 PM2 进程管理器..."
  npm install -g pm2
fi
echo "✅ PM2 $(pm2 -v)"

# 3. 安装项目依赖
echo ""
echo "📦 安装依赖..."
npm install --production

# 4. 构建前端
echo ""
echo "🔨 构建前端..."
npm run build

# 5. 创建日志目录
mkdir -p logs

# 6. 启动服务
echo ""
echo "🚀 启动服务..."
pm2 delete nuanyu 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 7. 保存 PM2 进程列表（开机自启）
pm2 save

echo ""
echo "================================================"
echo "  ✅ 部署完成！"
echo "================================================"
echo ""
echo "  本地访问: http://localhost:3001"
echo ""

# 获取公网 IP
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com 2>/dev/null || curl -s https://api.ipify.org 2>/dev/null || echo "无法获取")
if [ "$PUBLIC_IP" != "无法获取" ]; then
  echo "  公网访问: http://$PUBLIC_IP:3001"
  echo ""
  echo "  ⚠️ 请确保服务器安全组/防火墙已开放端口 3001"
fi
echo ""
echo "  管理命令:"
echo "    pm2 status          # 查看状态"
echo "    pm2 logs nuanyu     # 查看日志"
echo "    pm2 restart nuanyu  # 重启服务"
echo "    pm2 stop nuanyu     # 停止服务"
echo "================================================"