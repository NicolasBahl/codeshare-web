const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (url: string, token?: string | null) =>
  fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': token ? `Bearer ${token}` : "",
    },
  }).then((res) => res.json());
