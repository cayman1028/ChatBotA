"use client"
import { ChatbotWidget } from "@/components/ChatbotWidget"
import { defaultQuestions } from "@/components/ChatbotQuestions"

export default function Home() {
  return (
    <div className="app">
      <h1>法人向けチャットボット</h1>
      <p>日本語対応の法人向けウェブサイト埋め込み型チャットボットのデモページです。</p>
      <p>右下のチャットアイコンをクリックして、チャットボットを試してみてください。</p>

      <div className="code-block">
        <h2>埋め込み方法</h2>
        <p>以下のスクリプトタグをあなたのウェブサイトに追加するだけで、チャットボットが表示されます。</p>
        <pre>
          {`<script 
  src="https://your-domain.com/chatbot.js" 
  data-company="クライアント企業名" 
  data-position="bottom-right"
  data-message="こんにちは！お問い合わせ内容をお選びください。"
></script>`}
        </pre>
      </div>

      <div className="code-block">
        <h2>カスタマイズオプション</h2>
        <ul>
          <li>
            <strong>data-company</strong>: 会社名を設定します
          </li>
          <li>
            <strong>data-position</strong>: チャットボタンの位置を設定します (bottom-right, bottom-left, top-right,
            top-left)
          </li>
          <li>
            <strong>data-message</strong>: 初期メッセージを設定します
          </li>
          <li>
            <strong>data-theme</strong>: JSON形式でテーマをカスタマイズします
          </li>
          <li>
            <strong>data-questions</strong>: JSON形式で質問リストをカスタマイズします
          </li>
        </ul>
      </div>

      {/* チャットボット */}
      <ChatbotWidget
        companyName="デモ株式会社"
        questions={defaultQuestions}
        initialMessage="こんにちは！デモチャットボットです。どのようにお手伝いできますか？"
        theme={{
          header: {
            backgroundColor: "#000000",
          },
          chatButton: {
            backgroundColor: "#000000",
          },
          userMessage: {
            backgroundColor: "#000000",
          },
          loadingDot: {
            backgroundColor: "#000000",
          },
        }}
      />
    </div>
  )
}

