"use client"

import type React from "react"
import type { Question } from "./ChatbotQuestions"
import type { ChatbotTheme } from "./ChatbotTheme"

interface ChatbotUIProps {
  theme: ChatbotTheme
  messages: Array<{ text: string; isUser: boolean; timestamp: Date }>
  toggleChat: () => void
  isLoading: boolean
  questions: Question[]
  handleQuestionClick: (question: Question) => void
  companyName: string
  messagesEndRef: React.RefObject<HTMLDivElement>
  showQuestionsAfterResponse: boolean
  windowWidth: number
}

export const ChatbotUI: React.FC<ChatbotUIProps> = ({
  theme,
  messages,
  toggleChat,
  isLoading,
  questions,
  handleQuestionClick,
  companyName,
  messagesEndRef,
  showQuestionsAfterResponse,
  windowWidth,
}) => {
  // 最後のメッセージがボットからのものかどうかを確認
  const lastMessage = messages[messages.length - 1]
  const lastMessageIsFromBot = lastMessage && !lastMessage.isUser

  // 質問ボタンを表示するかどうか
  const shouldShowQuestions =
    messages.length === 1 || (showQuestionsAfterResponse && lastMessageIsFromBot && !isLoading)

  return (
    <div
      className="flex flex-col rounded-lg shadow-xl overflow-hidden"
      style={{ ...theme.chatWindow, width: `${windowWidth}px`, height: "500px" }}
    >
      {/* ヘッダー */}
      <div className="p-4 flex justify-between items-center" style={theme.header}>
        <h3 className="font-medium" style={theme.headerText}>
          {companyName}のサポート
        </h3>
        <button onClick={toggleChat} className="p-1 rounded-full" style={theme.closeButton} aria-label="Close chat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 p-4 overflow-y-auto" style={theme.messageArea}>
        {messages.length === 0 && (
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-lg" style={theme.botMessage}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={theme.loadingDot}></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-100" style={theme.loadingDot}></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-200" style={theme.loadingDot}></div>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.isUser ? "flex justify-end" : "flex justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[80%]`} style={msg.isUser ? theme.userMessage : theme.botMessage}>
              <p style={msg.isUser ? theme.userMessageText : theme.botMessageText}>{msg.text}</p>
              <small className="block mt-1 text-xs opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </small>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-lg" style={theme.botMessage}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-bounce" style={theme.loadingDot}></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-100" style={theme.loadingDot}></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-200" style={theme.loadingDot}></div>
              </div>
            </div>
          </div>
        )}

        {/* 選択式質問ボタン - 条件に基づいて表示 */}
        {shouldShowQuestions && (
          <div className="mt-4 space-y-2">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="w-full text-left p-3 rounded-lg transition-colors"
                style={theme.questionButton}
              >
                {question.text}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

