import type { QueryClientConfig } from '@tanstack/react-query'

/** Default TanStack Query options for the app shell. */
export function getQueryClientConfig(): QueryClientConfig {
  return {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  }
}
