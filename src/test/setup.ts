import "@testing-library/jest-dom"
import { jest } from "@jest/globals"

// グローバルなモックやセットアップをここに追加
// ResizeObserverのモック
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// ResizeObserverがまだ定義されていない場合のみ定義
if (typeof window !== "undefined" && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverMock
}

// matchMediaのモック
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

