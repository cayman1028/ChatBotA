import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatbotService } from '../services/chatbot';
import '../styles/chatbot.css';
import { ChatbotProps, ChatbotState } from '../types/chatbot.types';
import { performanceMonitor } from '../utils/performance';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';

export const ChatbotWidget: React.FC<ChatbotProps> = ({ initialQuestions }) => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    currentQuestion: null,
    messages: [],
    isLoading: false
  });

  // サービスのインスタンスをメモ化
  const service = useMemo(() => new ChatbotService(initialQuestions), [initialQuestions]);

  // イベントハンドラをメモ化
  const handleToggle = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const handleClose = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleOptionSelect = useCallback(async (optionId: string) => {
    if (!state.currentQuestion) return;

    try {
      setState(prev => ({ ...prev, isLoading: true }));
      performanceMonitor.startMeasure('optionSelect');

      const selectedOption = state.currentQuestion.options.find(opt => opt.id === optionId);
      if (!selectedOption) return;

      const answer = service.selectOption(optionId);
      const nextQuestion = service.getCurrentQuestion();
      
      await new Promise(resolve => setTimeout(resolve, 500)); // ローディング状態を確認できるように遅延を追加

      setState(prev => ({
        ...prev,
        currentQuestion: nextQuestion,
        messages: [
          ...prev.messages,
          { type: 'answer' as const, text: answer, timestamp: new Date() },
          ...(nextQuestion 
            ? [{ type: 'question' as const, text: nextQuestion.text, timestamp: new Date() }]
            : [])
        ],
        isLoading: false
      }));

      performanceMonitor.endMeasure('optionSelect', state.messages.length + 2);
    } catch (error) {
      console.error('Error selecting option:', error);
      throw error; // エラーバウンダリで捕捉
    }
  }, [state.currentQuestion, service, state.messages.length]);

  useEffect(() => {
    if (state.isOpen) {
      setState(prev => ({ ...prev, isLoading: true }));
      performanceMonitor.startMeasure('initialLoad');

      try {
        const question = service.getCurrentQuestion();
        setState(prev => ({
          ...prev,
          currentQuestion: question,
          messages: question ? [{ type: 'question' as const, text: question.text, timestamp: new Date() }] : [],
          isLoading: false
        }));

        performanceMonitor.endMeasure('initialLoad', 1);
      } catch (error) {
        console.error('Error initializing chatbot:', error);
        throw error; // エラーバウンダリで捕捉
      }
    } else {
      setState(prev => ({
        ...prev,
        currentQuestion: null,
        messages: [],
        isLoading: false
      }));
    }
  }, [state.isOpen, service]);

  // メッセージリストをメモ化
  const messageList = useMemo(() => (
    <div className="chatbot-messages">
      {state.messages.map((message, index) => (
        <div
          key={`${message.type}-${index}-${message.timestamp?.getTime()}`}
          className={message.type === 'question' ? 'question-bubble' : 'answer-bubble'}
          data-testid={`${message.type}-message`}
        >
          {message.text}
        </div>
      ))}
      {state.isLoading && (
        <div className="chatbot-loading-container" data-testid="loading-container">
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  ), [state.messages, state.isLoading]);

  // オプションリストをメモ化
  const optionList = useMemo(() => (
    state.currentQuestion && (
      <div className="chatbot-options">
        {state.currentQuestion.options.map(option => (
          <button
            key={option.id}
            className="chatbot-option-button"
            onClick={() => handleOptionSelect(option.id)}
            data-testid={`option-${option.id}`}
            disabled={state.isLoading}
          >
            {option.text}
          </button>
        ))}
      </div>
    )
  ), [state.currentQuestion, state.isLoading, handleOptionSelect]);

  // 会話を再開する
  const handleRestart = useCallback(() => {
    setState(prev => ({
      ...prev,
      isLoading: true
    }));

    try {
      service.resetConversation();
      const question = service.getCurrentQuestion();
      setState(prev => ({
        ...prev,
        currentQuestion: question,
        messages: question ? [{ type: 'question', text: question.text, timestamp: new Date() }] : [],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error restarting conversation:', error);
      throw error; // エラーバウンダリで捕捉
    }
  }, [service]);

  return (
    <ErrorBoundary>
      <div className="chatbot-widget">
        <button
          className="chatbot-button"
          onClick={handleToggle}
          aria-label={state.isOpen ? 'チャットボットを最小化' : 'チャットボットを開く'}
          data-testid="chatbot-toggle-button"
          disabled={state.isLoading}
        >
          <svg className="chatbot-icon" viewBox="0 0 24 24">
            <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H6l-2,2V4h16V16z"/>
          </svg>
        </button>

        {state.isOpen && (
          <div className="chatbot-window" data-testid="chatbot-window">
            <div className="chatbot-header">
              <span>チャットボット</span>
              <button
                className="chatbot-close"
                onClick={handleClose}
                aria-label="チャットウィンドウを閉じる"
                data-testid="chatbot-close-button"
                disabled={state.isLoading}
              >
                &times;
              </button>
            </div>

            {messageList}
            {optionList}
            {!state.currentQuestion && state.messages.length > 0 && (
              <button
                className="chatbot-restart-button"
                onClick={handleRestart}
                data-testid="chatbot-restart-button"
                disabled={state.isLoading}
              >
                会話を再開する
              </button>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}; 