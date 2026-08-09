'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { toastManager } from '@/components/ui/toast'
import { authClient } from '@/lib/auth/client'

import { AuthUIProvider } from '@daveyplate/better-auth-ui'

const showAuthToast = ({
	message,
	variant = 'default',
}: {
	message?: string
	variant?: 'default' | 'success' | 'error' | 'info' | 'warning'
}) => {
	if (!message) return

	toastManager.add({
		title: message,
		type: variant === 'default' ? undefined : variant,
	})
}

export function BetterAuthUIProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	return (
		<AuthUIProvider
			authClient={authClient}
			navigate={router.push}
			replace={router.replace}
			onSessionChange={router.refresh}
			credentials={{
				forgotPassword: true,
			}}
			passkey
			emailOTP
			basePath="/"
			signUp={{
				fields: ['name'],
			}}
			Link={Link}
			deleteUser={{
				verification: true,
			}}
			toast={showAuthToast}
		>
			{children}
		</AuthUIProvider>
	)
}
