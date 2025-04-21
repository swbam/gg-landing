interface GTMDataLayer extends Array<Record<string, unknown>> {
  push(event: Record<string, unknown>): number;
}

interface Window {
  dataLayer: GTMDataLayer;
}
