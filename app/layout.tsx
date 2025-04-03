import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "法人向けチャットボット",
  description: "日本語対応の法人向けウェブサイト埋め込み型チャットボット",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'