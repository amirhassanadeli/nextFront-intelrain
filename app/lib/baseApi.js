// app/lib/baseApi.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }

    if (!response.ok) {
      // اینجا خطاهای همه فیلدها را نمایش می‌دهیم
      console.error('Server Response:', data);
      const errorMessage = data
        ? Object.values(data)
            .flat()
            .join(' ') // همه پیام‌ها را به هم وصل می‌کنیم
        : `API Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}