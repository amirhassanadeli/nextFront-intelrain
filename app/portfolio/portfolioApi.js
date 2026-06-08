import { fetchAPI } from '../lib/baseApi';

export async function getAllProjects() {
  try {
    return await fetchAPI('/portfolio/', {
      cache: 'no-store', // optional
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}