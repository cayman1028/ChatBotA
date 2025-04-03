import type { Question } from "../src/ChatbotQuestions"

// 不動産会社向けのカスタム質問例
export const realEstateQuestions: Question[] = [
  {
    id: "property-search",
    text: "物件を探しています",
    category: "物件検索",
  },
  {
    id: "selling",
    text: "不動産の売却について相談したい",
    category: "売却",
  },
  {
    id: "rental",
    text: "賃貸物件について知りたい",
    category: "賃貸",
  },
  {
    id: "investment",
    text: "不動産投資について教えてください",
    category: "投資",
  },
  {
    id: "contact",
    text: "担当者と直接話したい",
    category: "お問い合わせ",
  },
]

// IT企業向けのカスタム質問例
export const itCompanyQuestions: Question[] = [
  {
    id: "services",
    text: "サービス内容について教えてください",
    category: "サービス",
  },
  {
    id: "case-studies",
    text: "導入事例を見せてください",
    category: "事例",
  },
  {
    id: "technology",
    text: "使用している技術スタックは？",
    category: "技術",
  },
  {
    id: "pricing",
    text: "料金体系について知りたい",
    category: "料金",
  },
  {
    id: "contact-sales",
    text: "営業担当者と話したい",
    category: "営業",
  },
]

