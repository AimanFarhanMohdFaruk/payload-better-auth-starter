import type { ReactNode } from 'react'

import { BetterAuthUIProvider } from '@/components/layout/better-auth-ui-provider'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'

import { BetterAuthProvider } from '@/lib/auth/context'
import { getContextProps } from '@/lib/auth/context/get-context-props'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <BetterAuthProvider {...(getContextProps() as any)}>
          <BetterAuthUIProvider>{children}</BetterAuthUIProvider>
        </BetterAuthProvider>
      </QueryProvider>
      <Toaster />
    </ThemeProvider>
  )
}
