/**
 * Typed REST boundary for the future FastAPI backend. The frontend currently uses
 * src/lib/data.ts fixtures to make it usable while the API is under development.
 * Do not treat fixtures as persisted club records or real authentication.
 */
import type { HikingEvent, MediaAlbum } from './data';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';
export const isApiConfigured = Boolean(BASE_URL);
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE_URL) throw new Error('FastAPI is not configured. Set NEXT_PUBLIC_API_BASE_URL.');
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...init?.headers },
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}
export const mediaApi = {
  listAlbums: () => apiRequest<MediaAlbum[]>('/api/v1/media/albums'),
  uploadPhotos: (eventId: string, formData: FormData) => apiRequest<{ids: string[]}>(`/api/v1/events/${encodeURIComponent(eventId)}/photos`, {method:'POST',body:formData}),
};
export const eventApi = {
  list: () => apiRequest<HikingEvent[]>('/api/v1/events'),
};
