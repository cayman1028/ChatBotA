import { performanceMonitor } from '../performance';

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    performanceMonitor.clearAllMetrics();
    performanceMonitor.enable();
  });

  afterEach(() => {
    performanceMonitor.disable();
  });

  it('シングルトンインスタンスが正しく動作すること', () => {
    const instance1 = performanceMonitor;
    const instance2 = performanceMonitor;
    expect(instance1).toBe(instance2);
  });

  it('パフォーマンス計測が正しく開始・終了すること', () => {
    const componentId = 'test-component';
    performanceMonitor.startMeasure(componentId);
    
    // 計測中にメッセージを追加
    performanceMonitor.endMeasure(componentId, 5);

    const metrics = performanceMonitor.getMetrics(componentId);
    expect(metrics).toHaveLength(2); // 開始と終了の2つのメトリクス
    expect(metrics[1].messageCount).toBe(5);
    expect(metrics[1].renderTime).toBeGreaterThan(0);
  });

  it('無効化時は計測が行われないこと', () => {
    performanceMonitor.disable();
    const componentId = 'test-component';
    
    performanceMonitor.startMeasure(componentId);
    performanceMonitor.endMeasure(componentId, 1);

    const metrics = performanceMonitor.getMetrics(componentId);
    expect(metrics).toHaveLength(0);
  });

  it('複数コンポーネントの計測が独立して行われること', () => {
    const component1 = 'component1';
    const component2 = 'component2';

    performanceMonitor.startMeasure(component1);
    performanceMonitor.endMeasure(component1, 1);

    performanceMonitor.startMeasure(component2);
    performanceMonitor.endMeasure(component2, 2);

    const metrics1 = performanceMonitor.getMetrics(component1);
    const metrics2 = performanceMonitor.getMetrics(component2);

    expect(metrics1).toHaveLength(2);
    expect(metrics2).toHaveLength(2);
    expect(metrics1[1].messageCount).toBe(1);
    expect(metrics2[1].messageCount).toBe(2);
  });

  it('メトリクスが正しくクリアされること', () => {
    const componentId = 'test-component';
    performanceMonitor.startMeasure(componentId);
    performanceMonitor.endMeasure(componentId, 1);

    performanceMonitor.clearMetrics(componentId);
    const metrics = performanceMonitor.getMetrics(componentId);
    expect(metrics).toHaveLength(0);
  });

  it('全メトリクスが正しくクリアされること', () => {
    const component1 = 'component1';
    const component2 = 'component2';

    performanceMonitor.startMeasure(component1);
    performanceMonitor.endMeasure(component1, 1);

    performanceMonitor.startMeasure(component2);
    performanceMonitor.endMeasure(component2, 2);

    performanceMonitor.clearAllMetrics();

    expect(performanceMonitor.getMetrics(component1)).toHaveLength(0);
    expect(performanceMonitor.getMetrics(component2)).toHaveLength(0);
  });
}); 