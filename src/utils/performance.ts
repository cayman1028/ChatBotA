interface PerformanceMetrics {
  renderTime: string;
  messageCount: number;
  memoryUsage: string;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metricsMap: Map<string, PerformanceMetrics[]>;
  private enabled: boolean;
  private startTimes: Map<string, number>;

  private constructor() {
    this.metricsMap = new Map();
    this.enabled = false;
    this.startTimes = new Map();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  startMeasure(componentId: string): void {
    if (!this.enabled) return;

    const startTime = performance.now();
    this.startTimes.set(componentId, startTime);

    const metrics = this.getMetricsArray(componentId);
    metrics.push({
      renderTime: '0ms',
      messageCount: 0,
      memoryUsage: this.getMemoryUsage(),
      timestamp: Date.now()
    });
  }

  endMeasure(componentId: string, messageCount: number): void {
    if (!this.enabled) return;

    const startTime = this.startTimes.get(componentId);
    if (!startTime) return;

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    const metrics = this.getMetricsArray(componentId);
    metrics.push({
      renderTime: `${renderTime.toFixed(2)}ms`,
      messageCount,
      memoryUsage: this.getMemoryUsage(),
      timestamp: Date.now()
    });

    // メトリクスをコンソールに出力
    console.log(`[Performance] ${componentId}:`, {
      renderTime: `${renderTime.toFixed(2)}ms`,
      messageCount,
      memoryUsage: this.getMemoryUsage()
    });
  }

  getMetrics(componentId: string): PerformanceMetrics[] {
    return this.metricsMap.get(componentId) || [];
  }

  clearMetrics(componentId: string): void {
    this.metricsMap.delete(componentId);
    this.startTimes.delete(componentId);
  }

  clearAllMetrics(): void {
    this.metricsMap.clear();
    this.startTimes.clear();
  }

  private getMetricsArray(componentId: string): PerformanceMetrics[] {
    if (!this.metricsMap.has(componentId)) {
      this.metricsMap.set(componentId, []);
    }
    return this.metricsMap.get(componentId)!;
  }

  private getMemoryUsage(): string {
    if (performance.memory) {
      const usedHeap = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      return `${usedHeap}MB`;
    }
    return 'N/A';
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance(); 