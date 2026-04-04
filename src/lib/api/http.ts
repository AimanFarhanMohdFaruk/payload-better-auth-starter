/**
 * Shared HTTP helpers for `src/lib/api/*` (browser-safe; no server imports).
 */

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text) as unknown
    } catch {
      throw new ApiError('Invalid JSON response', response.status, text)
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof (data as { message: unknown }).message === 'string'
        ? (data as { message: string }).message
        : response.statusText || 'Request failed'
    throw new ApiError(message, response.status, data)
  }

  return data as T
}

export type ApiFetchInit = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown>
}

/**
 * Relative `fetch` to this app’s API with JSON handling.
 */
export async function apiFetch<T>(path: string, init: ApiFetchInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  let body = init.body as BodyInit | undefined

  if (body && typeof body === 'object' && !(body instanceof FormData) && !(body instanceof Blob)) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  const response = await fetch(path, {
    ...init,
    headers,
    body,
    credentials: init.credentials ?? 'same-origin',
  })

  return parseJsonResponse<T>(response)
}
