import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

type VitalName = 'LCP' | 'CLS' | 'INP';

type WebVitalsPayload = {
  app: string;
  name: VitalName;
  value: number;
  rating: string;
  delta: number;
  id: string;
  path: string;
  timestamp: string;
  budget: number;
  withinBudget: boolean;
};

const WEB_VITAL_BUDGETS: Record<VitalName, number> = {
  LCP: Number(import.meta.env.VITE_WEB_VITALS_BUDGET_LCP || 2500),
  CLS: Number(import.meta.env.VITE_WEB_VITALS_BUDGET_CLS || 0.1),
  INP: Number(import.meta.env.VITE_WEB_VITALS_BUDGET_INP || 200),
};

const TRACKED_METRICS: VitalName[] = ['LCP', 'CLS', 'INP'];
let monitoringStarted = false;

function isTrackedMetric(name: string): name is VitalName {
  return TRACKED_METRICS.includes(name as VitalName);
}

function toPayload(metric: Metric, app: string): WebVitalsPayload | null {
  if (!isTrackedMetric(metric.name)) return null;
  const budget = WEB_VITAL_BUDGETS[metric.name];
  return {
    app,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    budget,
    withinBudget: metric.value <= budget,
  };
}

function reportToEndpoint(payload: WebVitalsPayload) {
  const endpoint = String(import.meta.env.VITE_WEB_VITALS_ENDPOINT || '').trim();
  if (!endpoint) return;
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    if (queued) return;
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Monitoring should never block rendering.
  });
}

function handleMetric(metric: Metric, app: string) {
  const payload = toPayload(metric, app);
  if (!payload) return;

  if (!payload.withinBudget) {
    console.warn(
      `[WebVitals] ${payload.name} budget exceeded on ${payload.path}: ${payload.value.toFixed(
        payload.name === 'CLS' ? 3 : 0
      )} (budget ${payload.budget})`
    );
  }

  reportToEndpoint(payload);
}

export function initWebVitalsMonitoring(app = 'serbis-landing') {
  if (monitoringStarted) return;
  monitoringStarted = true;

  onLCP((metric) => handleMetric(metric, app));
  onCLS((metric) => handleMetric(metric, app));
  onINP((metric) => handleMetric(metric, app));
}

export { WEB_VITAL_BUDGETS };
