import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Question } from './types/chatbot.types';

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    text: 'ご用件をお選びください',
    options: [
      { id: 'opt1', text: '商品について', nextQuestionId: 'q2' },
      { id: 'opt2', text: 'サービスについて', nextQuestionId: 'q3' },
      { id: 'opt3', text: 'その他のお問い合わせ', nextQuestionId: 'q4' }
    ],
    answers: {
      opt1: '商品についてのご質問ですね。',
      opt2: 'サービスについてのご質問ですね。',
      opt3: 'その他のお問い合わせですね。'
    }
  },
  {
    id: 'q2',
    text: '商品について、どのような内容をお知りになりたいですか？',
    options: [
      { id: 'opt1', text: '価格について', nextQuestionId: null },
      { id: 'opt2', text: '在庫について', nextQuestionId: null },
      { id: 'opt3', text: '仕様について', nextQuestionId: null }
    ],
    answers: {
      opt1: '価格についてのご質問ですね。担当者よりご連絡させていただきます。',
      opt2: '在庫についてのご質問ですね。担当者よりご連絡させていただきます。',
      opt3: '仕様についてのご質問ですね。担当者よりご連絡させていただきます。'
    }
  }
];

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ChatbotWidget initialQuestions={sampleQuestions} />
    </React.StrictMode>
  );
} 