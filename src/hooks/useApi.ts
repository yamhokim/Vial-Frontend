import { getApiUrl } from "@/config/api";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: ApiMethod;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const useApi = () => {
  const fetchApi = async <T>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T> => {
    const { method = "GET", body, headers = {} } = options;

    const response = await fetch(getApiUrl(endpoint), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  };

  const fetchDelete = async (endpoint: string): Promise<void> => {
    const response = await fetch(getApiUrl(endpoint), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Check if there's content to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      await response.json();
    }
  };

  return {
    getFormData: () => fetchApi<{ data: FormData[] }>("formData"),
    createQuery: (data: {
      title: string;
      description?: string;
      formDataId: string;
    }) => fetchApi("query", { method: "POST", body: data }),
    updateQuery: (id: string, data: { status: "OPEN" | "RESOLVED" }) =>
      fetchApi(`query/${id}`, { method: "PUT", body: data }),
    deleteQuery: (id: string) => fetchDelete(`query/${id}`),
  };
};
