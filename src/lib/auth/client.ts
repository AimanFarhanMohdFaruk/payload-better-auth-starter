import { passkeyClient } from '@better-auth/passkey/client'
import {
	adminClient,
	emailOTPClient,
	inferAdditionalFields,
	multiSessionClient,
	phoneNumberClient,
	usernameClient,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { toastManager } from '@/components/ui/toast'

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [
		usernameClient(),
		phoneNumberClient(),
		emailOTPClient(),
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		inferAdditionalFields({
			user: {
				role: {
					type: 'string[]',
					defaultValue: ['user'],
				},
			},
		}),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toastManager.add({
					title: 'Too many requests',
					description: 'Please try again later.',
					type: 'error',
				})
			}
		},
	},
})

export const { signUp, signIn, signOut, useSession } = authClient

authClient.$store.listen('$sessionSignal', async () => {})
