"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="app">
      <h1>チャットボットデモ</h1>
      <p>このページでは、シンプルなチャットボットのデモを表示しています。</p>
      <p>右下のチャットアイコンをクリックして、チャットボットを開いてください。</p>

      <div className="code-block">
        <h2>埋め込み方法</h2>
        <p>以下のスクリプトタグをあなたのウェブサイトに追加するだけで、チャットボットが表示されます。</p>
        <pre>
          {`<script 
  src="https://v0-japanese-support-chi.vercel.app/chatbot.js" 
  data-company="クライアント企業名" 
  data-position="bottom-right"
  data-message="こんにちは！お問い合わせ内容をお選びください。"
></script>`}
        </pre>
      </div>

      {/* チャットボット */}
      <div className="chatbot-container">
        {!isOpen ? (
          <button className="chat-button" onClick={() => setIsOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
                stroke="white"
                strokeWidth="1.5"
              ></path>
              <path d="M22 22L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>
          </button>
        ) : (
          <div className="chat-window">
            <div className="chat-header">
              <div>デモ株式会社のサポート</div>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                &times;
              </button>
            </div>
            <div className="chat-body">
              <div className="chat-message bot-message">
                こんにちは！デモチャットボットです。どのようにお手伝いできますか？
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

