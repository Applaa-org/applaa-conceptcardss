const API_URL = 'https://haix.ai/api';

const CONCEPTS_TABLE = 'concepts_v3_final';
const PROGRESS_TABLE = 'progress_v3_final';

export interface Concept {
  id: number;
  title: string;
  description: string;
  detailed_info?: string; // New field for expanded information
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
    return Array.isArray(data) && data.length > 0 ? data : [];
  } catch (error) {
    console.error('API Error, will use fallback:', error);
    return [];
  }
}

export async function saveProgress(conceptId: number, status: 'learned' | 'review'): Promise<Progress> {
  try {
    const response = await fetch(`${API_URL}/${PROGRESS_TABLE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept_id: conceptId, status }),
    });
    if (!response.ok) throw new Error('Failed to save progress');
    return response.json();
  } catch (error) {
    return { id: Math.random(), concept_id: conceptId, status, updated_at: new Date().toISOString() };
  }
}