// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  ENDPOINTS: {
    ARTICLES: "/articles/",
    AUTHORS: "/authors/",
    TAGS: "/tags/",
    CATEGORIES: "/categories/",
  },
}

// API Helper Functions
export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  },
}