class ApiService {
  private API_URL = process.env.NEXT_PUBLIC_API_URL;
  private async fetcher(url: string, options: any) {
    try {
      const res = await fetch(this.API_URL + url, options);

      const data = await res.json();
      return {
        status: res.status,
        data,
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Login a user
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   */
  async login(email: string, password: string) {
    return this.fetcher("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  }

  async register(email: string, password: string, username: string) {
    return this.fetcher("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
      credentials: "include",
    });
  }

  async getCurrentUser(token: string) {
    return this.fetcher("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    });
  }

  async logout() {
    return this.fetcher("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }
}

const apiService = new ApiService();
export default apiService;
