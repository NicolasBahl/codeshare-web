class ApiService {
  async fetcher(url: string, options: any) {
    const res = await fetch(url, options);
    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  }

  async login(email: string, password: string) {
    return await this.fetcher("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }
}

export default new ApiService();
