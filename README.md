# ChatbotA

法人向けの質問内容選択型チャットボットウィジェット

## 機能

- 質問内容選択型のチャットボット
- スクリプトタグでの簡単な埋め込み
- レスポンシブデザイン
- カスタマイズ可能な質問と回答

## インストール

```html
<!-- 必要なスクリプトとスタイルを読み込み -->
<script src="https://your-cdn.com/chatbot.umd.js"></script>
<link rel="stylesheet" href="https://your-cdn.com/chatbot.css">
```

## 使用方法

1. HTMLにチャットボット用のコンテナを追加：

```html
<div id="chatbot-container"></div>
```

2. チャットボットを初期化：

```javascript
// 質問と回答の設定
const questions = [
  {
    id: 'q1',
    text: '何についてお困りですか？',
    options: [
      {
        id: 'q1_opt1',
        text: '製品について',
        answer: '製品についての詳細は製品カタログをご覧ください。',
        nextQuestionId: 'q2'
      },
      {
        id: 'q1_opt2',
        text: '注文について',
        answer: 'ご注文は受注フォームからお願いいたします。'
      }
    ]
  },
  {
    id: 'q2',
    text: '製品のどの点についてお困りですか？',
    options: [
      {
        id: 'q2_opt1',
        text: '仕様について',
        answer: '製品仕様書をご確認ください。'
      }
    ]
  }
];

// チャットボットの初期化
window.ChatbotA.initialize('chatbot-container', questions);
```

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# テストの実行
npm test
```

## ライセンス

MIT