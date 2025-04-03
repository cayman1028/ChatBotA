import type React from "react"

export interface ChatbotTheme {
  // コンテナ
  container: React.CSSProperties

  // チャットボタン
  chatButton: React.CSSProperties

  // チャットウィンドウ
  chatWindow: React.CSSProperties

  // ヘッダー
  header: React.CSSProperties
  headerText: React.CSSProperties
  closeButton: React.CSSProperties

  // メッセージエリア
  messageArea: React.CSSProperties
  userMessage: React.CSSProperties
  userMessageText: React.CSSProperties
  botMessage: React.CSSProperties
  botMessageText: React.CSSProperties

  // 質問ボタン
  questionButton: React.CSSProperties

  // ローディング
  loadingDot: React.CSSProperties
}

export const defaultTheme: ChatbotTheme = {
  // コンテナ
  container: {
    fontFamily: "sans-serif",
  },

  // チャットボタン
  chatButton: {
    backgroundColor: "#000000",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },

  // チャットウィンドウ
  chatWindow: {
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
  },

  // ヘッダー
  header: {
    backgroundColor: "#000000", // 青から黒に変更
    color: "white",
  },
  headerText: {
    fontWeight: 600,
  },
  closeButton: {
    color: "white",
  },

  // メッセージエリア
  messageArea: {
    backgroundColor: "#F9FAFB",
  },
  userMessage: {
    backgroundColor: "#000000", // 青から黒に変更
    color: "white",
    borderRadius: "18px 18px 0 18px",
  },
  userMessageText: {
    color: "white",
  },
  botMessage: {
    backgroundColor: "white",
    color: "#1F2937",
    border: "1px solid #E5E7EB",
    borderRadius: "18px 18px 18px 0",
  },
  botMessageText: {
    color: "#1F2937",
  },

  // 質問ボタン
  questionButton: {
    backgroundColor: "white",
    color: "#1F2937",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    cursor: "pointer",
  },

  // ローディング
  loadingDot: {
    backgroundColor: "#000000", // 青から黒に変更
  },
}

