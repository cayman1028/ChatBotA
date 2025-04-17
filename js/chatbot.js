/**
 * テキスト入力に対応した埋め込み型チャットボット
 * WordPress用に最適化
 */

;(() => {
  // チャットボットの設定
  const chatbotConfig = {
    name: "TechVision",
    primaryColor: "#4338ca", // インディゴ色
    secondaryColor: "#f8f9fa",
    accentColor: "#8b5cf6", // 紫色
    welcomeMessage: "こんにちは！何でも気軽に聞いてくださいね。お手伝いできることがあれば嬉しいです！",
    // よくある質問（初期表示用）
    suggestedQuestions: [
      "サービス内容について知りたい",
      "料金体系について教えてください",
      "会社概要について",
      "開発プロセスについて",
    ],
    // 質問と回答のデータベース
    qaDatabase: [
      {
        id: "services",
        keywords: [
          "サービス",
          "提供",
          "何ができる",
          "何をしている",
          "事業内容",
          "業務",
          "仕事",
          "何を提供",
          "どんなサービス",
          "サービス内容",
          "事業",
          "商品",
          "製品",
          "何が得意",
          "専門",
          "扱って",
          "取り扱い",
          "取扱",
          "何をやって",
          "何をして",
          "業種",
          "分野",
        ],
        text: "サービス内容について知りたい",
        answer:
          "私たちがやっているサービスはこんな感じですよ\n\n・Webアプリ開発 - 使いやすくてカッコいいサイト作ります！\n・モバイルアプリ開発 - スマホでサクサク動くアプリお任せください\n・AIソリューション - 最新技術で業務効率アップ！\n・クラウド構築 - 安全・快適なシステム環境を整えます\n・ITコンサル - お悩みを一緒に解決しましょう\n\nもっと詳しく知りたいことがあれば、遠慮なく聞いてくださいね",
      },
      {
        id: "price",
        keywords: ["料金", "価格", "費用", "いくら", "予算", "見積もり", "金額", "コスト"],
        text: "料金体系について教えてください",
        answer:
          "料金のことですね！こんな感じでご用意しています\n\n・ベーシックプラン：月5万円〜 (小規模向け)\n・スタンダードプラン：月15万円〜 (中規模向け)\n・プレミアムプラン：月30万円〜 (大規模向け)\n\nでも、プロジェクトの内容によって変わってくるので、詳しいお見積りが欲しければ、お問い合わせフォームからご連絡くださいね！一緒に最適なプランを考えましょう",
      },
      {
        id: "support",
        keywords: ["サポート", "対応", "問い合わせ", "連絡", "ヘルプ", "助け", "支援"],
        text: "サポート体制について",
        answer:
          "サポートはバッチリ整えてますよ！\n\n・電話サポート：平日9時〜18時 (困ったらすぐ電話できます)\n・メールサポート：24時間受付中！ (対応は営業時間内になります)\n・チャットサポート：平日10時〜17時 (気軽に質問できます)\n\n専任スタッフがいつでもお客様の味方です！何かあったらいつでも連絡してくださいね",
      },
      {
        id: "contact",
        keywords: ["連絡先", "問い合わせ", "メール", "電話", "住所", "場所", "アクセス", "連絡方法"],
        text: "問い合わせ方法",
        answer:
          "ご連絡はこちらからどうぞ！\n\n・電話：03-1234-5678（平日9時〜18時）\n・メール：info@techvision.co.jp\n・お問い合わせフォーム：ウェブサイトから簡単に送れます\n\nどの方法でも大丈夫です！お気軽にご連絡くださいね。担当者がすぐに対応します",
      },
      {
        id: "company",
        keywords: ["会社", "企業", "概要", "歴史", "沿革", "設立", "従業員", "社員", "規模"],
        text: "会社概要について",
        answer:
          "私たちの会社のことですね！2015年から頑張ってます！\n\n・設立：2015年4月 (もう結構経ちました！)\n・代表：山田太郎 (熱い想いを持ったリーダーです)\n・社員数：約50名 (個性豊かなメンバーがいっぱい)\n・オフィス：東京都港区六本木 (おしゃれな場所にあります)\n・資本金：5,000万円\n\n「テクノロジーで未来を創る」をモットーに、毎日楽しく仕事してます！何か気になることあれば、もっと聞いてくださいね",
      },
      {
        id: "technology",
        keywords: ["技術", "テクノロジー", "開発言語", "フレームワーク", "スキル", "得意", "専門"],
        text: "使用している技術について",
        answer:
          "使ってる技術ですか？最新のものをいろいろ使ってますよ！\n\n【フロントエンド】\n・React, Vue.js, Angular (好みに合わせて選べます)\n・Next.js, Nuxt.js (高速サイト作れます)\n・TypeScript (バグ減らせます)\n\n【バックエンド】\n・Node.js, Python, Go, Java (なんでも対応可能)\n\n【インフラ】\n・AWS, GCP, Azure (クラウドはお任せ)\n・Docker, Kubernetes (コンテナ技術も得意)\n\n【AI】\n・TensorFlow, PyTorch (最新AI技術)\n\nお客様に合った技術で最高のものを作ります！何か気になる技術があれば教えてください",
      },
      {
        id: "process",
        keywords: ["開発プロセス", "進め方", "流れ", "手順", "ステップ", "方法論", "アジャイル", "ウォーターフォール"],
        text: "開発プロセスについて",
        answer:
          "開発の進め方ですね！こんな感じで進めていきますよ\n\n1. 要件定義：まずはしっかりお話を聞かせてください！\n2. 設計：使いやすいシステムを一緒に考えます\n3. 開発：小さく作って、どんどん改善していきます\n4. テスト：バグがないかしっかりチェック！\n5. リリース：いよいよ公開！\n6. サポート：公開後もしっかりサポートします\n\n途中経過も定期的にお見せしながら進めるので、安心してお任せください！何か不安なことがあれば、いつでも相談してくださいね",
      },
      {
        id: "case",
        keywords: ["事例", "実績", "導入", "成功", "ケース", "例", "参考", "クライアント", "顧客"],
        text: "導入事例について",
        answer:
          "これまでの実績をいくつかご紹介しますね！\n\n【銀行さんの例】\n・古いシステムを新しくして、処理速度70%アップ！\n・運用コストも40%削減できました\n\n【工場の例】\n・IoTとAIで生産管理システムを作ったら\n・生産効率25%アップ、不良品も15%減！\n\n【ショッピングモールの例】\n・オンラインとリアル店舗を連携させたら\n・売上130%増加！お客さんの満足度も上がりました\n\nもっと詳しく知りたい事例があれば、お気軽に聞いてくださいね",
      },
      {
        id: "ai",
        keywords: ["AI", "人工知能", "機械学習", "ディープラーニング", "自動化", "チャットボット", "ロボット"],
        text: "AIソリューションについて",
        answer:
          "AIのことですね！最近人気のテーマです\n\n【できること】\n・チャットボット：私みたいな24時間対応の相談役！\n・画像認識：写真から物体や顔を自動認識\n・需要予測：売れる商品を事前に予測できる\n・レコメンド：お客様の好みに合った商品を提案\n\n【メリット】\n・単純作業から解放されて、創造的な仕事に集中できる\n・ミスが減って精度アップ\n・データから新しい発見が見つかる\n\nAIって難しそうに聞こえるけど、実はビジネスにすごく役立つんですよ！興味あれば詳しく説明しますね",
      },
      {
        id: "security",
        keywords: ["セキュリティ", "安全", "保護", "対策", "リスク", "脆弱性", "ハッキング", "情報漏洩"],
        text: "セキュリティ対策について",
        answer:
          "セキュリティは超重要視してます！\n\n【開発中の対策】\n・安全なコードの書き方を徹底\n・定期的に脆弱性チェック\n・専門家による侵入テスト\n\n【データ保護】\n・大事なデータは暗号化\n・必要最小限のアクセス権限\n・定期的な監査\n\n【認証】\n・ISO 27001取得済み (セキュリティの国際規格)\n\n大切な情報は私たちにお任せください！守ります！何か気になることがあれば、もっと詳しく説明しますよ",
      },
      {
        id: "help",
        keywords: [
          "ヘルプ",
          "質問",
          "何ができる",
          "使い方",
          "機能",
          "できること",
          "案内",
          "どんな",
          "答えられる",
          "教えて",
          "何が",
          "何を",
          "どのような",
          "どういう",
          "どうやって",
          "できますか",
          "わかる",
          "知りたい",
          "説明",
        ],
        text: "このチャットボットでできること",
        answer:
          "私にできることですね！いろいろ答えられますよ\n\n・サービス内容について\n・料金のこと\n・会社の情報\n・技術的なこと\n・開発の進め方\n・導入事例\n・AIのこと\n・セキュリティ対策\n\nなんでも気軽に聞いてください！わからないことがあれば、人間のスタッフに繋ぐこともできますよ。「問い合わせ方法」と言ってもらえれば、連絡先をお伝えします",
      },
      {
        id: "greeting",
        keywords: ["こんにちは", "こんばんは", "おはよう", "やあ", "ハロー", "hello", "hi", "hey"],
        text: "挨拶",
        answer: "こんにちは！今日はどんなことでお手伝いできますか？何でも気軽に聞いてくださいね",
      },
      {
        id: "thanks",
        keywords: ["ありがとう", "感謝", "助かる", "thank", "thanks", "thx"],
        text: "お礼",
        answer: "どういたしまして！お役に立てて嬉しいです。他にも質問があればいつでも聞いてくださいね！",
      },
      {
        id: "bye",
        keywords: ["さようなら", "バイバイ", "じゃあね", "また", "bye", "goodbye", "cya"],
        text: "別れの挨拶",
        answer: "またいつでも話しかけてくださいね！お待ちしています。良い一日を！",
      },
      {
        id: "joke",
        keywords: ["冗談", "ジョーク", "面白い話", "笑える", "joke", "funny"],
        text: "ジョーク",
        answer:
          "プログラマーが冗談を言いました。でも誰も理解できませんでした...それはコメントがなかったからです！ もっと聞きたいですか？",
      },
      {
        id: "weather",
        keywords: ["天気", "気象", "雨", "晴れ", "weather", "rain", "sunny"],
        text: "天気",
        answer:
          "今日の天気ですか？窓の外を見てみてください！冗談です。残念ながら天気予報はまだ提供できていませんが、もしかしたら将来的には対応するかもしれませんね！",
      },
    ],
    // 回答が見つからない場合のメッセージ
    fallbackMessage:
      "ごめんなさい、その質問にはまだ答えられないみたいです\n\nでも、こんなことなら答えられますよ：\n・サービス内容\n・料金のこと\n・会社について\n・開発の進め方\n\n別の言葉で聞いてみてください！または、お問い合わせフォームから直接ご連絡いただくこともできますよ！",
  }

  // チャットボットのスタイル
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    .chatbot-container {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
      font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
    }
    
    .chatbot-button {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4338ca, #8b5cf6);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(67, 56, 202, 0.3);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 3px solid rgba(255, 255, 255, 0.8);
      animation: float 3s ease-in-out infinite;
    }
    
    .chatbot-button:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 15px 35px rgba(67, 56, 202, 0.4);
    }
    
    .chatbot-icon {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    
    .chatbot-speech-bubble {
      position: relative;
      width: 35px;
      height: 35px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .chatbot-speech-bubble:before {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 3px;
      width: 12px;
      height: 12px;
      background-color: white;
      clip-path: polygon(0 0, 100% 0, 0 100%);
      transform: rotate(45deg);
    }
    
    .chatbot-dots {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
    }
    
    .chatbot-dot {
      width: 4px;
      height: 4px;
      background-color: #4338ca;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    
    .chatbot-dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .chatbot-dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .chatbot-window {
      position: absolute;
      bottom: 20px;
      right: 0;
      width: 380px;
      height: 520px;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom right;
      animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      border: 1px solid rgba(67, 56, 202, 0.1);
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .chatbot-header {
      padding: 20px;
      background: linear-gradient(135deg, #4338ca, #8b5cf6);
      color: white;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
    }
    
    .chatbot-header:before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
      opacity: 0.5;
    }
    
    .chatbot-header-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .chatbot-header-logo {
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #4338ca;
      font-size: 14px;
    }
    
    .chatbot-close {
      cursor: default;
      font-size: 24px;
      opacity: 0.8;
      transition: all 0.2s;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .chatbot-close:hover {
      opacity: 1;
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .chatbot-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: #f9fafc;
      background-image: 
        radial-gradient(circle at 25% 25%, rgba(67, 56, 202, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    }
    
    .chatbot-message {
      margin-bottom: 15px;
      max-width: 85%;
      padding: 15px;
      border-radius: 18px;
      line-height: 1.5;
      white-space: pre-line;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      transition: all 0.3s;
      animation: messageIn 0.3s ease-out forwards;
    }
    
    @keyframes messageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .chatbot-message-user {
      background: linear-gradient(135deg, #4338ca, #8b5cf6);
      color: white;
      margin-left: auto;
      border-bottom-right-radius: 5px;
    }
    
    .chatbot-message-bot {
      background-color: white;
      color: #333;
      border-bottom-left-radius: 5px;
      /* 左側の青/紫の縁取りを削除 */
      /* border-left: 3px solid #4338ca; */
    }
    
    .chatbot-typing {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      max-width: 85%;
      padding: 15px;
      border-radius: 18px;
      background-color: white;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      animation: messageIn 0.3s ease-out forwards;
    }
    
    .chatbot-typing-dot {
      width: 8px;
      height: 8px;
      background-color: #4338ca;
      border-radius: 50%;
      margin: 0 2px;
      animation: typingPulse 1.5s infinite;
    }
    
    .chatbot-typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .chatbot-typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typingPulse {
      0% {
        transform: translateY(0);
        opacity: 0.5;
      }
      50% {
        transform: translateY(-5px);
        opacity: 1;
      }
      100% {
        transform: translateY(0);
        opacity: 0.5;
      }
    }
    
    .chatbot-suggested-questions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
    
    .chatbot-suggested-question {
      background-color: rgba(67, 56, 202, 0.1);
      color: #4338ca;
      border: none;
      border-radius: 18px;
      padding: 8px 16px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
    }
    
    .chatbot-suggested-question:hover {
      background-color: rgba(67, 56, 202, 0.2);
    }
    
    .chatbot-input-container {
      padding: 15px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      background-color: white;
      display: flex;
      align-items: center;
    }
    
    .chatbot-input {
      flex: 1;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      padding: 10px 15px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
    }
    
    .chatbot-input:focus {
      border-color: #4338ca;
      box-shadow: 0 0 0 2px rgba(67, 56, 202, 0.2);
    }
    
    .chatbot-send-button {
      background: linear-gradient(135deg, #4338ca, #8b5cf6);
      color: white;
      border: none;
      border-radius: 50%;
      width:  #4338ca, #8b5cf6);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 3px 10px rgba(67, 56, 202, 0.2);
    }
    
    .chatbot-send-button:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(67, 56, 202, 0.3);
    }
    
    .chatbot-send-button:active {
      transform: scale(0.95);
    }
    
    .chatbot-restart {
      background: linear-gradient(135deg, #4338ca, #8b5cf6);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 12px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      font-weight: 500;
      margin-top: 15px;
      display: inline-block;
      box-shadow: 0 5px 15px rgba(67, 56, 202, 0.2);
    }
    
    .chatbot-restart:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(67, 56, 202, 0.3);
    }
    
    /* スクロールバーのカスタマイズ */
    .chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 10px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(67, 56, 202, 0.3);
      border-radius: 10px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(67, 56, 202, 0.5);
    }
    
    /* レスポンシブ対応 */
    @media (max-width: 768px) {
      .chatbot-window {
        width: calc(100vw - 60px);
        right: 0;
        max-width: 380px;
      }
    }
    
    @media (max-width: 480px) {
      .chatbot-window {
        width: calc(100vw - 40px);
        height: 450px;
      }
      
      .chatbot-button {
        width: 60px;
        height: 60px;
      }
      
      .chatbot-icon {
        width: 30px;
        height: 30px;
      }
      
      .chatbot-speech-bubble {
        width: 30px;
        height: 30px;
      }
    }
    
    /* 追加アニメーション */
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `

  // DOMContentLoadedイベントでチャットボットを初期化
  document.addEventListener("DOMContentLoaded", () => {
    initChatbot()
  })

  // チャットボットの初期化関数
  function initChatbot() {
    // すでにチャットボットが存在する場合は作成しない
    if (document.querySelector(".chatbot-container")) {
      return
    }

    // スタイルをページに追加
    const styleElement = document.createElement("style")
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    // チャットボットのHTML構造を作成
    const chatbotHTML = `
      <div class="chatbot-container">
        <div class="chatbot-button">
          <div class="chatbot-icon">
            <div class="chatbot-speech-bubble">
              <div class="chatbot-dots">
                <div class="chatbot-dot"></div>
                <div class="chatbot-dot"></div>
                <div class="chatbot-dot"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-header-title">
              <div class="chatbot-header-logo">TV</div>
              <span>${chatbotConfig.name} サポート</span>
            </div>
            <span class="chatbot-close">&times;</span>
          </div>
          <div class="chatbot-messages"></div>
          <div class="chatbot-input-container">
            <input type="text" class="chatbot-input" placeholder="何でも気軽に聞いてください...">
            <button class="chatbot-send-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `

    // チャットボットをページに追加
    const chatbotContainer = document.createElement("div")
    chatbotContainer.innerHTML = chatbotHTML
    document.body.appendChild(chatbotContainer)

    // 要素の参照を取得
    const chatbotButton = document.querySelector(".chatbot-button")
    const chatbotWindow = document.querySelector(".chatbot-window")
    const chatbotClose = document.querySelector(".chatbot-close")
    const chatbotMessages = document.querySelector(".chatbot-messages")
    const chatbotInput = document.querySelector(".chatbot-input")
    const chatbotSendButton = document.querySelector(".chatbot-send-button")

    // チャットボットの開閉
    chatbotButton.addEventListener("click", () => {
      chatbotWindow.style.display = "flex"

      // 初回表示時にメッセージを表示
      if (chatbotMessages.children.length === 0) {
        initChat()
      }
    })

    // 閉じるボタンのクリックイベントを修正
    chatbotClose.addEventListener("click", (e) => {
      // イベントの伝播を停止して、確実にクリックイベントが処理されるようにする
      e.stopPropagation()
      chatbotWindow.style.display = "none"
    })

    // 送信ボタンのクリックイベント
    chatbotSendButton.addEventListener("click", handleUserInput)

    // 入力フィールドのEnterキーイベント
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleUserInput()
      }
    })

    // ユーザー入力を処理
    function handleUserInput() {
      const userInput = chatbotInput.value.trim()
      if (userInput === "") return

      // ユーザーの質問を表示
      addUserMessage(userInput)
      chatbotInput.value = ""

      // 入力中表示を追加
      showTypingIndicator()

      // 少し遅延させて回答を表示（チャット感を出すため）
      setTimeout(() => {
        // 入力中表示を削除
        hideTypingIndicator()

        // 回答を検索して表示
        const answer = findAnswer(userInput)
        addBotMessage(answer)

        // 初期表示では質問ボタンを表示しない
        // showSuggestedQuestions()
      }, 1000)
    }

    // 質問から回答を検索
    function findAnswer(question) {
      // 質問を小文字に変換
      const normalizedQuestion = question.toLowerCase()

      // 最も関連性の高い回答を検索
      let bestMatch = null
      let highestScore = 0

      for (const qa of chatbotConfig.qaDatabase) {
        const score = calculateRelevanceScore(normalizedQuestion, qa.keywords)

        if (score > highestScore) {
          highestScore = score
          bestMatch = qa
        }
      }

      // スコアが一定以上なら回答を返す、そうでなければフォールバックメッセージ
      if (highestScore > 0.05) {
        // 0.1から0.05に下げてより多くの質問に対応
        return bestMatch.answer
      } else {
        return chatbotConfig.fallbackMessage
      }
    }

    // 関連性スコアを計算（0〜1の値、1が最も関連性が高い）
    function calculateRelevanceScore(question, keywords) {
      let score = 0

      // 質問を小文字に変換し、句読点を削除
      const normalizedQuestion = question.toLowerCase().replace(/[、。？！.,?!]/g, "")

      for (const keyword of keywords) {
        // 完全一致
        if (normalizedQuestion.includes(keyword)) {
          score += 0.3
          continue
        }

        // 部分一致（キーワードが3文字以上の場合）
        if (keyword.length >= 3) {
          // 語幹一致（例：「できる」と「できますか」）
          if (normalizedQuestion.includes(keyword.substring(0, keyword.length - 1))) {
            score += 0.2
            continue
          }

          // 単語の一部が含まれる場合
          const keywordParts = keyword.split("")
          let partMatches = 0
          for (const part of keywordParts) {
            if (normalizedQuestion.includes(part)) {
              partMatches++
            }
          }

          // 50%以上の文字が一致する場合（60%から50%に下げる）
          if (partMatches / keywordParts.length >= 0.5) {
            score += 0.1
          }
        }
      }

      // 最大スコアは1に制限
      return Math.min(score, 1)
    }

    // チャットを初期化
    function initChat() {
      // ウェルカムメッセージを表示
      addBotMessage(chatbotConfig.welcomeMessage)

      // 初期表示では質問ボタンを表示しない
      // showSuggestedQuestions()
    }

    // ユーザーメッセージを追加
    function addUserMessage(text) {
      const messageElement = document.createElement("div")
      messageElement.className = "chatbot-message chatbot-message-user"
      messageElement.textContent = text
      chatbotMessages.appendChild(messageElement)
      scrollToBottom()
    }

    // ボットメッセージを追加
    function addBotMessage(text) {
      const messageElement = document.createElement("div")
      messageElement.className = "chatbot-message chatbot-message-bot"
      messageElement.textContent = text
      chatbotMessages.appendChild(messageElement)
      scrollToBottom()
    }

    // 入力中インジケーターを表示
    function showTypingIndicator() {
      const typingElement = document.createElement("div")
      typingElement.className = "chatbot-typing"
      typingElement.innerHTML = `
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
        <div class="chatbot-typing-dot"></div>
      `
      typingElement.id = "chatbot-typing-indicator"
      chatbotMessages.appendChild(typingElement)
      scrollToBottom()
    }

    // 入力中インジケーターを非表示
    function hideTypingIndicator() {
      const typingElement = document.getElementById("chatbot-typing-indicator")
      if (typingElement) {
        typingElement.remove()
      }
    }

    // よくある質問を表示
    function showSuggestedQuestions() {
      // 既存のよくある質問を削除
      const existingSuggestions = document.querySelector(".chatbot-suggested-questions")
      if (existingSuggestions) {
        existingSuggestions.remove()
      }

      // よくある質問コンテナを作成
      const suggestionsContainer = document.createElement("div")
      suggestionsContainer.className = "chatbot-suggested-questions"

      // よくある質問ボタンを追加
      chatbotConfig.suggestedQuestions.forEach((question) => {
        const button = document.createElement("button")
        button.className = "chatbot-suggested-question"
        button.textContent = question
        button.addEventListener("click", () => {
          // ボタンがクリックされたら、その質問をユーザー入力として処理
          addUserMessage(question)

          // 入力中表示を追加
          showTypingIndicator()

          // 少し遅延させて回答を表示
          setTimeout(() => {
            // 入力中表示を削除
            hideTypingIndicator()

            // 回答を検索して表示
            const answer = findAnswer(question)
            addBotMessage(answer)

            // 関連する質問を表示
            // showSuggestedQuestions()
          }, 1000)
        })

        suggestionsContainer.appendChild(button)
      })

      // よくある質問をメッセージエリアに追加
      chatbotMessages.appendChild(suggestionsContainer)
      scrollToBottom()
    }

    // メッセージ欄を下にスクロール
    function scrollToBottom() {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight
    }
  }
})()
