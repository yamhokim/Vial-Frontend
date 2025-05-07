export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  endpoints: {
    formData: "/form-data",
    query: "/query",
  },
} as const;

export const getApiUrl = (endpoint: string) => {
  const baseEndpoint = endpoint.split("/")[0];
  const path =
    API_CONFIG.endpoints[baseEndpoint as keyof typeof API_CONFIG.endpoints];
  if (!path) throw new Error(`Unknown endpoint: ${endpoint}`);

  const fullPath = endpoint.includes("/")
    ? `${path}/${endpoint.split("/").slice(1).join("/")}`
    : path;

  return `${API_CONFIG.baseUrl}${fullPath}`;
};
