class ApiService {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private readonly DEFAULT_HEADERS = { "Content-Type": "application/json" };

  private async fetcher(url: string, options?: any) {
    try {
      const res = await fetch(`${this.API_URL}${url}`, {
        headers: this.DEFAULT_HEADERS,
        ...options,
      });
      const data = await res.json();

      return {
        status: res.status,
        data,
      };
    } catch (err) {
      throw err;
    }
  }

  login(email: string, password: string) {
    return this.fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  register(email: string, password: string, username: string) {
    return this.fetcher("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    });
  }

  getCurrentUser(token: string) {
    return this.fetcher("/users/me", {
      method: "GET",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
    });
  }

  getUserByUsername(username: string) {
    return this.fetcher(`/users/${username}`);
  }

  getPostById(id: string) {
    return this.fetcher(`/posts/${id}`, { method: "GET" });
  }

  getStacks() {
    return this.fetcher("/stacks", { method: "GET" });
  }

  getTopUsers() {
    return this.fetcher("/users/top", { method: "GET" });
  }

  getPosts() {
    return this.fetcher("/posts", { method: "GET" });
  }
}

const apiService = new ApiService();
export default apiService;
