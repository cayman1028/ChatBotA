export interface Question {
  id: string
  text: string
  category?: string
}

export const defaultQuestions: Question[] = [
  {
    id: "product-info",
    text: "製品について教えてください",
    category: "製品情報",
  },
  {
    id: "pricing",
    text: "料金プランを知りたいです",
    category: "料金",
  },
  {
    id: "support",
    text: "サポートに問い合わせたいです",
    category: "サポート",
  },
  {
    id: "demo",
    text: "デモを依頼したいです",
    category: "営業",
  },
]

