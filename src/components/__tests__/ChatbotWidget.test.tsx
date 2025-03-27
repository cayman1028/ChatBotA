import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Question } from '../../types/chatbot.types';
import { performanceMonitor } from '../../utils/performance';
import { ChatbotWidget } from '../ChatbotWidget';
import { ErrorBoundary } from '../ErrorBoundary';

// パフォーマンスモニタリングのモック
vi.mock('../../utils/performance', () => ({
  performanceMonitor: {
    startMeasure: vi.fn(),
    endMeasure: vi.fn()
  }
}));

// エラーコンソールを抑制
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ChatbotWidget', () => {
  const mockQuestions: Question[] = [
    {
      id: 'q1',
      text: '何についてお困りですか？',
      options: [
        {
          id: 'q1_opt1',
          text: '製品について',
          answer: '製品についての詳細は製品カタログをご覧ください。',
          nextQuestionId: 'q2'
        }
      ],
      answers: {
        q1_opt1: '製品についての詳細は製品カタログをご覧ください。'
      }
    },
    {
      id: 'q2',
      text: '製品のどの点についてお困りですか？',
      options: [
        {
          id: 'q2_opt1',
          text: '仕様について',
          answer: '製品仕様書をご確認ください。',
          nextQuestionId: null
        }
      ],
      answers: {
        q2_opt1: '製品仕様書をご確認ください。'
      }
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('初期質問が表示されること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    await waitFor(() => {
      expect(screen.getByText('何についてお困りですか？')).toBeInTheDocument();
      expect(screen.getByText('製品について')).toBeInTheDocument();
    });
  });

  it('選択肢をクリックすると回答と次の質問が表示されること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 最初の選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q1_opt1'));
    
    await waitFor(() => {
      expect(screen.getByText('製品についての詳細は製品カタログをご覧ください。')).toBeInTheDocument();
      expect(screen.getByText('製品のどの点についてお困りですか？')).toBeInTheDocument();
      expect(screen.getByTestId('option-q2_opt1')).toBeInTheDocument();
    });
  });

  it('最後の質問で選択肢を選択すると会話が終了すること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 最初の選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q1_opt1'));
    await waitFor(() => {
      expect(screen.getByTestId('option-q2_opt1')).toBeInTheDocument();
    });
    
    // 2番目の選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q2_opt1'));
    await waitFor(() => {
      expect(screen.getByText('製品仕様書をご確認ください。')).toBeInTheDocument();
      expect(screen.getByTestId('chatbot-restart-button')).toBeInTheDocument();
    });
  });

  it('会話を再開するボタンをクリックすると初期状態に戻ること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 最初の選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q1_opt1'));
    await waitFor(() => {
      expect(screen.getByTestId('option-q2_opt1')).toBeInTheDocument();
    });
    
    // 2番目の選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q2_opt1'));
    await waitFor(() => {
      expect(screen.getByText('製品仕様書をご確認ください。')).toBeInTheDocument();
      expect(screen.getByTestId('chatbot-restart-button')).toBeInTheDocument();
    });
    
    // 会話を再開
    fireEvent.click(screen.getByTestId('chatbot-restart-button'));
    await waitFor(() => {
      expect(screen.getByText('何についてお困りですか？')).toBeInTheDocument();
      expect(screen.getByTestId('option-q1_opt1')).toBeInTheDocument();
    });
  });

  it('エラーが発生した場合、エラーバウンダリが表示されること', () => {
    const consoleError = console.error;
    console.error = vi.fn();

    render(
      <ErrorBoundary>
        <ChatbotWidget initialQuestions={[]} />
      </ErrorBoundary>
    );

    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
    expect(screen.getByText('質問リストが空です')).toBeInTheDocument();
    
    console.error = consoleError;
  });

  it('ローディング中はスピナーが表示されること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q1_opt1'));
    
    // ローディングスピナーが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId('loading-container')).toBeInTheDocument();
    });
    
    // ローディングが終了したことを確認
    await waitFor(() => {
      expect(screen.queryByTestId('loading-container')).not.toBeInTheDocument();
    });
  });

  it('パフォーマンスが計測されること', () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    expect(performanceMonitor.startMeasure).toHaveBeenCalledWith('initialLoad');
    expect(performanceMonitor.endMeasure).toHaveBeenCalledWith('initialLoad', 1);
  });

  it('選択肢が無効化されている間はクリックできないこと', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 選択肢をクリック
    const option = screen.getByTestId('option-q1_opt1');
    fireEvent.click(option);
    
    // ボタンが無効化されていることを確認
    await waitFor(() => {
      expect(option).toBeDisabled();
    });
    
    // ローディングが終了したことを確認
    await waitFor(() => {
      expect(screen.getByTestId('option-q2_opt1')).not.toBeDisabled();
    });
  });

  it('会話履歴が表示されること', async () => {
    render(<ChatbotWidget initialQuestions={mockQuestions} />);
    
    // チャットボットを開く
    fireEvent.click(screen.getByTestId('chatbot-toggle-button'));
    
    // 最初の質問が表示されることを確認
    expect(screen.getByText('何についてお困りですか？')).toBeInTheDocument();
    
    // 選択肢をクリック
    fireEvent.click(screen.getByTestId('option-q1_opt1'));
    
    // 回答と次の質問が表示されることを確認
    await waitFor(() => {
      const messages = screen.getAllByTestId(/^(question|answer)-message$/);
      expect(messages).toHaveLength(3); // 初期質問 + 回答 + 次の質問
    });
  });
}); 