const API_URL = 'https://haix.ai/api';

// Using the new v2 table names
const CONCEPTS_TABLE = 'concepts_v2_9f2d8a1b';
const PROGRESS_TABLE = 'progress_v2_9f2d8a1b';

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
  try {
    const response = await fetch(`${API_URL}/${CONCEPTS_TABLE}`);
    if (!response.ok) throw new Error('Failed to fetch concepts');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
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

export async function getProgress(): Promise<Progress[]> {
  const response = await fetch(`${API_URL}/${PROGRESS_TABLE}`);
  if (!response.ok) throw new Error('Failed to fetch progress');
  return response.json();
}