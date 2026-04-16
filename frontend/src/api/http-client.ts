import type { ApiError, ApiResponse } from '../types/http';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | object | null;
}

export class ApiRequestError extends Error {
  code: string;
  details?: unknown;

  constructor(error: ApiError['error']) {
    super(error.message);
    this.name = 'ApiRequestError';
    this.code = error.code;
    this.details = error.details;
  }
}

export function getApiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

function isJsonBody(body: RequestOptions['body']) {
  return body !== null && typeof body === 'object' && !(body instanceof FormData);
}

export async function apiRequest<TData>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<TData>> {
  const { body, headers, ...requestOptions } = options;
  const hasJsonBody = isJsonBody(body);
  const requestBody = hasJsonBody ? JSON.stringify(body) : body;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    body: requestBody as BodyInit | null | undefined,
    headers: {
      ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  });

  return response.json() as Promise<ApiResponse<TData>>;
}

export async function requestData<TData>(
  path: string,
  options: RequestOptions = {},
): Promise<TData> {
  const response = await apiRequest<TData>(path, options);

  if (!response.success) {
    throw new ApiRequestError(response.error);
  }

  return response.data;
}
