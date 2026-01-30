const API_URL = 'https://haix.ai/api';

// Unique random string for this app
const APP_ID = 'c8k2m1p9';
export const CONCEPTS_TABLE = `concepts_${APP_ID}`;
export const PROGRESS_TABLE = `progress_${APP_ID}`;

export interface Concept {
  id: number;
  title: string;
  description: string;
  example_image: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  created_at: string;
}

export interface Progress {
  id: number;
  concept_id: number;
  status: 'learned' | 'review';
  updated_at: string;
}

export async function getConcepts(): Promise<Concept[]> {
  const response = await fetch(`${API_URL}/${CONCEPTS_TABLE}`);
  if (!response.ok) throw new Error('Failed to fetch concepts');
  return response.json();
}

export async function saveProgress(conceptId: number, status: 'learned' | 'review'): Promise<Progress> {
  const response = await fetch(`${API_URL}/${PROGRESS_TABLE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concept_id: conceptId, status }),
  });
  if (!response.ok) throw new Error('Failed to save progress');
  return response.json();
}