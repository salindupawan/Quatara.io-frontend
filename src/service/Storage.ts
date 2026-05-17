// types/storage.ts

export interface Annotation {
  id: string;
  type: 'signature' | 'date';
  pageIndex: number;
  xRatio: number;
  yRatio: number;
}

export interface OnboardingData {
  projectId: string;
  projectName: string;
  pdfUrl: string;
  annotations: Annotation[];
  lastUpdated: string;
  clientName?: string;
}

export type StorageKey = 'quatara_current_project' | 'quatara_settings' | 'quatara_history';