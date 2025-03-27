export class ChatbotError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatbotError';
  }
} 