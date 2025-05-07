export const API_CONFIG = {
  baseUrl: process.env.PUBLIC_API_URL,
  endpoints: {
    formData: "/form-data",
    query: "/query",
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints) => {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
};
