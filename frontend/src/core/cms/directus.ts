import { appConfig } from '@/core/config/env';
import { fetchDemoDirectus } from './adapter/JsonAdapter';

type QueryPrimitive = string | number | boolean;
interface QueryObject {
  [key: string]: QueryValue;
}

type QueryValue =
  | QueryPrimitive
  | null
  | undefined
  | QueryPrimitive[]
  | QueryObject;

export interface FetchDirectusOptions {
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
}

interface DirectusErrorPayload {
  errors?: Array<{
    message?: string;
    extensions?: {
      code?: string;
    };
  }>;
}

export class CmsApiError extends Error {
  readonly statusCode: number;
  readonly code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.name = 'CmsApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

function appendQueryValue(
  searchParams: URLSearchParams,
  key: string,
  value: QueryValue,
): void {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    searchParams.set(key, value.map((item) => String(item)).join(','));
    return;
  }

  if (typeof value === 'object') {
    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
      appendQueryValue(searchParams, `${key}[${nestedKey}]`, nestedValue);
    });
    return;
  }

  searchParams.set(key, String(value));
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const url = new URL(path, `${appConfig.apiBaseUrl}/`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    appendQueryValue(url.searchParams, key, value);
  });

  return url.toString();
}

export async function fetchDirectus<T>(
  path: string,
  options: FetchDirectusOptions = {},
): Promise<T> {
  if (appConfig.cmsMode === 'demo') {
    return fetchDemoDirectus<T>(path);
  }

  let response: Response;

  try {
    response = await fetch(buildUrl(path, options.query), {
      headers: {
        Accept: 'application/json',
        ...(appConfig.apiToken
          ? { Authorization: `Bearer ${appConfig.apiToken}` }
          : {}),
      },
      signal: options.signal,
    });
  } catch (error) {
    if (appConfig.cmsMode === 'directus') {
      throw error;
    }

    return fetchDemoDirectus<T>(path);
  }

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => null)) as DirectusErrorPayload | null;

    const firstError = payload?.errors?.[0];

    throw new CmsApiError(
      firstError?.message ?? 'The CMS request failed.',
      response.status,
      firstError?.extensions?.code,
    );
  }

  return (await response.json()) as T;
}
