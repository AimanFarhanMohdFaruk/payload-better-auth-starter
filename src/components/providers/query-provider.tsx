'use client'

import { type ReactNode, useState } from 'react'

import { getQueryClientConfig } from '@/lib/query-client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient(getQueryClientConfig()))
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
