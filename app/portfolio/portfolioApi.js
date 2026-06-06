// app/portfolio/portfolioApi.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllProjects() {
  try {
    const response = await fetch(
      `${API_URL}/portfolio/`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}