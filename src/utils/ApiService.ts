class ApiService {
  private API_URL = process.env.NEXT_PUBLIC_API_URL;
  private async fetcher(url: string, options: any) {
    const res = await fetch(this.API_URL + url, options);
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
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
}

const apiService = new ApiService();
export default apiService;
