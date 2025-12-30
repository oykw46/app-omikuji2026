/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 開発時は画像の最適化を無効化
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig