import type { ReactNode } from 'react'

import { BetterAuthUIProvider } from '@/components/layout/better-auth-ui-provider'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { AnchoredToastProvider, ToastProvider } from '@/components/ui/toast'

import { BetterAuthProvider } from '@/lib/auth/context'
import { getContextProps } from '@/lib/auth/context/get-context-props'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<ToastProvider>
				<AnchoredToastProvider>
					<BetterAuthProvider {...getContextProps()}>
						<BetterAuthUIProvider>{children}</BetterAuthUIProvider>
					</BetterAuthProvider>
				</AnchoredToastProvider>
			</ToastProvider>
		</ThemeProvider>
	)
}
