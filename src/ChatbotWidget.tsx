"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { ChatbotUI } from "./ChatbotUI"
import { defaultQuestions, type Question } from "./ChatbotQuestions"
import { defaultTheme, type ChatbotTheme } from "./ChatbotTheme"

export interface ChatbotConfig {
  companyName: string
  theme?: Partial<ChatbotTheme>
  questions?: Question[]
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  initialMessage?: string
}

const DEFAULT_CONFIG: ChatbotConfig = {
  companyName: "Company Name",
  position: "bottom-right",
  initialMessage: "こんにちは！以下からお問い合わせ内容をお選びください。",
}

export const ChatbotWidget: React.FC<ChatbotConfig> = (userConfig) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig }
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // レスポンシブ対応のためにウィンドウサイズを変更
  const [windowWidth, setWindowWidth] = useState(350)

  // マージされたテーマとクエスチョン
  const theme = { ...defaultTheme, ...(config.theme || {}) }
  const questions = config.questions || defaultQuestions

  // コンポーネントがマウントされたときにアニメーションのスタイルをヘッドに追加
  useEffect(() => {
    // すでに存在する場合は追加しない
    if (!document.getElementById("chatbot-animation-style")) {
      const style = document.createElement("style")
      style.id = "chatbot-animation-style"
      style.innerHTML = `
      @keyframes typingBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
    `
      document.head.appendChild(style)
    }

    return () => {
      // クリーンアップ時にスタイルを削除
      const styleElement = document.getElementById("chatbot-animation-style")
      if (styleElement) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: config.initialMessage || "", isUser: false, timestamp: new Date() }])
    }
  }, [isOpen, config.initialMessage, messages.length])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // useEffectを追加してレスポンシブ対応
  useEffect(() => {
    const handleResize = () => {
      // モバイルデバイスの場合は幅を調整
      if (window.innerWidth < 640) {
        setWindowWidth(window.innerWidth - 40)
      } else {
        setWindowWidth(350)
      }
    }

    // 初期化時とリサイズ時に実行
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // シンプル化した質問処理
  const handleQuestionClick = (question: Question) => {
    // ユーザーメッセージを追加
    const newUserMessage = { text: question.text, isUser: true, timestamp: new Date() }
    setMessages((prev) => [...prev, newUserMessage])

    // ローディング状態を設定
    setIsLoading(true)

    // 応答を遅延させて自然な感じにする
    setTimeout(() => {
      // 質問に対する定型応答
      const responses: Record<string, string> = {
        "product-info": `${config.companyName}の製品についての情報です。詳細は当社ウェブサイトの製品ページをご覧ください。`,
        pricing: `${config.companyName}の料金プランは、ベーシック、スタンダード、プレミアムの3種類をご用意しています。詳細はお問い合わせください。`,
        support: `${config.companyName}のサポートをご利用いただきありがとうございます。営業時間内に担当者からご連絡いたします。`,
        demo: `${config.companyName}のデモをご希望いただきありがとうございます。担当者が詳細をご案内いたします。`,
      }

      // ボットの応答を追加
      const botMessage = {
        text: responses[question.id] || `${config.companyName}にお問い合わせいただきありがとうございます。`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      // 追加の質問を促す
      setTimeout(() => {
        const followUpMessage = {
          text: "その他にご質問はありますか？",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, followUpMessage])
        setIsLoading(false)
      }, 500)
    }, 1000)
  }

  return (
    <div
      className="fixed z-50"
      style={{
        ...theme.container,
        [config.position?.split("-")[0] || "bottom"]: "20px",
        [config.position?.split("-")[1] || "right"]: "20px",
      }}
    >
      {!isOpen ? (
        // チャットボタンのアクセシビリティを改善
        <button
          onClick={toggleChat}
          className="rounded-full p-4 shadow-lg flex items-center justify-center"
          style={{
            ...theme.chatButton,
            backgroundColor: "#000000", // 黒色の背景
            width: "60px",
            height: "60px",
          }}
          aria-label="Open chat"
        >
          <div className="flex items-center justify-center w-full h-full" style={{ transform: "translateX(2px)" }}>
            {/* 吹き出しマークと「・・・」を組み合わせたSVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 角が丸い吹き出しマーク */}
              <path
                d="M26 14C26 8.48 20.52 4 14 4C7.48 4 2 8.48 2 14C2 17.84 4.08 21.12 7.36 23.04L6 28L12.64 25.36C13.08 25.44 13.52 25.52 14 25.52C20.52 25.52 26 21.52 26 14Z"
                fill="white"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 黒い「・・・」マーク */}
              <circle cx="10" cy="14" r="1.5" fill="black" />
              <circle cx="14" cy="14" r="1.5" fill="black" />
              <circle cx="18" cy="14" r="1.5" fill="black" />
            </svg>
          </div>
        </button>
      ) : (
        <ChatbotUI
          theme={theme}
          messages={messages}
          toggleChat={toggleChat}
          isLoading={isLoading}
          questions={questions}
          handleQuestionClick={handleQuestionClick}
          companyName={config.companyName}
          messagesEndRef={messagesEndRef}
          showQuestionsAfterResponse={true}
          windowWidth={windowWidth}
        />
      )}
    </div>
  )
}

// グローバルにチャットボットを初期化する関数
export function initChatbot(config: ChatbotConfig) {
  // すでに存在する場合は削除
  const existingContainer = document.getElementById("corporate-chatbot-container")
  if (existingContainer) {
    document.body.removeChild(existingContainer)
  }

  // 新しいコンテナを作成
  const container = document.createElement("div")
  container.id = "corporate-chatbot-container"
  document.body.appendChild(container)

  // Reactコンポーネントをレンダリング
  const root = createRoot(container)
  root.render(<ChatbotWidget {...config} />)
}

// グローバルに公開
if (typeof window !== "undefined") {
  ;(window as any).CorporateChatbot = {
    init: initChatbot,
  }
}

