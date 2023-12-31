class ApiService {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private readonly DEFAULT_HEADERS = { "Content-Type": "application/json" };

  private async fetcher(url: string, options?: any) {
    try {
      const res = await fetch(`${this.API_URL}${url}`, {
        headers: this.DEFAULT_HEADERS,
        ...options,
      });

      let data;

      if (res.status !== 204) {
        data = await res.json();
      }

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
      next: { revalidate: 0 },
    });
  }

  getUserByUsername(username: string) {
    return this.fetcher(`/users/${username}`, {
      method: "GET",
      next: { revalidate: 0 },
    });
  }

  getPostById(id: string) {
    return this.fetcher(`/posts/${id}`, {
      method: "GET",
      next: { revalidate: 0 },
    });
  }

  getStacks() {
    return this.fetcher("/stacks", { method: "GET" });
  }

  getTopUsers() {
    return this.fetcher("/users/top", {
      method: "GET",
      next: { revalidate: 0 },
    });
  }

  getPosts() {
    return this.fetcher("/posts", {
      method: "GET",
      next: { revalidate: 0 },
    });
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
    token: string | null,
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

  commentPost(postId: string, content: string, token: string) {
    return this.fetcher(`/posts/${postId}/comment`, {
      method: "POST",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content }),
    });
  }

  replyComment(
    postId: string,
    content: string,
    token: string,
    commentId: string,
  ) {
    return this.fetcher(`/posts/${postId}/comments/${commentId}`, {
      method: "POST",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content }),
    });
  }

  deletePost(postId: string, token: string) {
    return this.fetcher(`/posts/${postId}`, {
      method: "DELETE",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
    });
  }

  deleteComment(postId: string, commentId: string, token: string) {
    return this.fetcher(`/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { ...this.DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
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
        code: post.code,
      }),
    });
  }

  getUserNotifications(token: string) {
    return this.fetcher("/users/notification", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  patchNotification(token: string, id: string) {
    return this.fetcher(`/users/notification/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}

const apiService = new ApiService();
export default apiService;
