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
      next: { revalidate: 60 },
    });
  }

  getUserByUsername(username: string) {
    return this.fetcher(`/users/${username}`, {
      next: { revalidate: 60 },
    });
  }

  getPostById(id: string) {
    return this.fetcher(`/posts/${id}`, {
      method: "GET",
      next: { revalidate: 10 },
    });
  }

  getStacks() {
    return this.fetcher("/stacks", { method: "GET" });
  }

  getTopUsers() {
    return this.fetcher("/users/top", {
      method: "GET",
      next: { revalidate: 60 },
    });
  }

  getPosts() {
    return this.fetcher("/posts", { method: "GET", next: { revalidate: 10 } });
  }

  votePost(postId: string, value: -1 | 0 | 1, token: string) {
    return this.fetcher(`/posts/${postId}/vote`, {
      method: "POST",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ value }),
    });
  }

  changePassword(
    id: string | undefined,
    oldPassword: string,
    newPassword: string,
    token: string | null
  ) {
    return this.fetcher(`/users/change_password/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  changeEmail(id: string | undefined, email: string, token: string | null) {
    return this.fetcher(`/users/change_email/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ email }),
    });
  }

  getResult(query: string) {
    return this.fetcher("/search", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
  }

  createPost(post: {
    title: string;
    stack: string;
    content: string;
    code: string;
    token: string;
  }) {
    return this.fetcher("/posts", {
      method: "POST",
      headers: {
        ...this.DEFAULT_HEADERS,
        Authorization: `Bearer ${post.token}`,
      },
      body: JSON.stringify({
        title: post.title,
        stack: post.stack,
        content: post.content,
      }),
    });
  }
}

const apiService = new ApiService();
export default apiService;
