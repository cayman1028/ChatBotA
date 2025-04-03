/**
 * 法人向けチャットボット埋め込みスクリプト
 */

;(() => {
  // チャットボットのコンテナを作成
  var container = document.createElement("div")
  container.id = "corporate-chatbot-container"
  document.body.appendChild(container)

  // 設定を取得
  var script = document.currentScript
  var config = {
    companyName: script.getAttribute("data-company") || "Company Name",
    position: script.getAttribute("data-position") || "bottom-right",
    message: script.getAttribute("data-message") || "こんにちは！お問い合わせ内容をお選びください。",
  }

  // スタイルを追加
  var style = document.createElement("style")
  style.textContent = `
    #corporate-chatbot-container {
      position: fixed;
      ${config.position.includes("bottom") ? "bottom: 20px;" : "top: 20px;"}
      ${config.position.includes("right") ? "right: 20px;" : "left: 20px;"}
      z-index: 9999;
    }
    .chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #4F46E5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .chat-window {
      position: absolute;
      bottom: 70px;
      ${config.position.includes("right") ? "right: 0;" : "left: 0;"}
      width: 350px;
      height: 500px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .chat-header {
      background-color: #4F46E5;
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-body {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      background-color: #f9fafb;
    }
    .chat-message {
      margin-bottom: 10px;
      max-width: 80%;
      padding: 10px;
      border-radius: 10px;
    }
    .bot-message {
      background-color: white;
      border: 1px solid #e5e7eb;
      align-self: flex-start;
    }
    .close-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 20px;
    }
  `
  document.head.appendChild(style)

  // チャットボタンを作成
  var chatButton = document.createElement("div")
  chatButton.className = "chat-button"
  chatButton.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="white" stroke-width="1.5"></path><path d="M22 22L20 20" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></svg>'
  container.appendChild(chatButton)

  // チャットウィンドウを作成
  var chatWindow = document.createElement("div")
  chatWindow.className = "chat-window"
  container.appendChild(chatWindow)

  // チャットヘッダーを作成
  var chatHeader = document.createElement("div")
  chatHeader.className = "chat-header"
  chatHeader.innerHTML = `
    <div>${config.companyName}のサポート</div>
    <button class="close-button">&times;</button>
  `
  chatWindow.appendChild(chatHeader)

  // チャットボディを作成
  var chatBody = document.createElement("div")
  chatBody.className = "chat-body"
  chatWindow.appendChild(chatBody)

  // 初期メッセージを追加
  var initialMessage = document.createElement("div")
  initialMessage.className = "chat-message bot-message"
  initialMessage.textContent = config.message
  chatBody.appendChild(initialMessage)

  // チャットボタンのクリックイベント
  chatButton.addEventListener("click", () => {
    chatWindow.style.display = "flex"
    chatButton.style.display = "none"
  })

  // 閉じるボタンのクリックイベント
  var closeButton = chatHeader.querySelector(".close-button")
  closeButton.addEventListener("click", () => {
    chatWindow.style.display = "none"
    chatButton.style.display = "flex"
  })

  console.log("チャットボットが初期化されました:", config)
})()

