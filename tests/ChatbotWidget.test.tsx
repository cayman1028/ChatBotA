import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ChatbotWidget } from "../src/ChatbotWidget"

// モックフェッチの設定を改善し、より詳細にする
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "テストレスポンス" }),
  }),
) as jest.Mock

// テストの前にDOMをクリーンアップするヘルパー関数を追加
function cleanupChatbot() {
  const container = document.getElementById("corporate-chatbot-container")
  if (container) {
    document.body.removeChild(container)
  }
}

describe("ChatbotWidget", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    cleanupChatbot() // 各テスト前にDOMをクリーンアップ
  })

  afterEach(() => {
    cleanupChatbot() // 各テスト後にDOMをクリーンアップ
  })

  test("チャットボタンをクリックするとチャットウィンドウが開く", () => {
    render(<ChatbotWidget companyName="テスト株式会社" />)

    // チャットボタンをクリック
    const chatButton = screen.getByLabelText("Open chat")
    fireEvent.click(chatButton)

    // チャットウィンドウが表示される
    expect(screen.getByText("テスト株式会社のサポート")).toBeInTheDocument()
  })

  test("初期メッセージが表示される", () => {
    const initialMessage = "カスタム初期メッセージ"
    render(<ChatbotWidget companyName="テスト株式会社" initialMessage={initialMessage} />)

    // チャットボタンをクリック
    const chatButton = screen.getByLabelText("Open chat")
    fireEvent.click(chatButton)

    // 初期メッセージが表示される
    expect(screen.getByText(initialMessage)).toBeInTheDocument()
  })

  test("質問ボタンをクリックするとメッセージが送信される", async () => {
    render(<ChatbotWidget companyName="テスト株式会社" />)

    // チャットボタンをクリック
    const chatButton = screen.getByLabelText("Open chat")
    fireEvent.click(chatButton)

    // 質問ボタンをクリック
    const questionButton = screen.getByText("製品について教えてください")
    fireEvent.click(questionButton)

    // ユーザーメッセージが表示される
    expect(screen.getByText("製品について教えてください")).toBeInTheDocument()

    // APIレスポンスが表示される（タイムアウトを長めに設定）
    await waitFor(
      () => {
        expect(screen.getByText("テストレスポンス")).toBeInTheDocument()
      },
      { timeout: 2000 },
    ) // タイムアウトを2秒に設定
  })

  test("カスタムテーマが適用される", () => {
    const customTheme = {
      header: {
        backgroundColor: "red",
      },
    }

    render(<ChatbotWidget companyName="テスト株式会社" theme={customTheme} />)

    // チャットボタンをクリック
    const chatButton = screen.getByLabelText("Open chat")
    fireEvent.click(chatButton)

    // カスタムテーマが適用されている
    const header = screen.getByText("テスト株式会社のサポート").closest("div")
    expect(header).toHaveStyle("background-color: red")
  })

  test("チャットウィンドウを閉じることができる", () => {
    render(<ChatbotWidget companyName="テスト株式会社" />)

    // チャットボタンをクリック
    const chatButton = screen.getByLabelText("Open chat")
    fireEvent.click(chatButton)

    // チャットウィンドウが表示される
    expect(screen.getByText("テスト株式会社のサポート")).toBeInTheDocument()

    // 閉じるボタンをクリック
    const closeButton = screen.getByLabelText("Close chat")
    fireEvent.click(closeButton)

    // チャットウィンドウが非表示になる
    expect(screen.queryByText("テスト株式会社のサポート")).not.toBeInTheDocument()
  })
})

