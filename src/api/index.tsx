const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const token = localStorage.getItem('access_token');

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message;
    try {
      const parsed = JSON.parse(errorText);
      message = parsed.message || JSON.stringify(parsed);
    } catch {
      message = errorText;
    }
    throw new Error(message || 'Serverdan xatolik.');
  }

  return res.json();
}

export async function apiPost<T>(endpoint: string, body: any): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    let message;
    try {
      const parsed = JSON.parse(errorText);
      message = parsed.message || JSON.stringify(parsed);
    } catch {
      message = errorText;
    }
    throw new Error(message || 'Serverdan xatolik.');
  }

  return res.json();
}
