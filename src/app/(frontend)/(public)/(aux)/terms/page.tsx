import Link from 'next/link'

import RichText from '@/components/payload/rich-text'
import { Main } from '@/components/shell/main'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Muted } from '@/components/ui/typography'

import { getGlobal } from '@/lib/payload/get-globals'

import type { GlobalTerm } from '@/payload-types'

export default async function TermsOfUsePage() {
	const termsOfUse = (await getGlobal('global-terms', 1)) as GlobalTerm

	if (!termsOfUse.content) {
		return (
			<Main>
				<div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
					<Alert variant="error">
						<AlertTitle>No terms of use found</AlertTitle>
						<AlertDescription>
							<Muted>
								Please create a terms of use in the{' '}
								<Link href="/admin/globals/global-terms" className="underline">
									admin panel
								</Link>
								.
							</Muted>
						</AlertDescription>
					</Alert>
				</div>
			</Main>
		)
	}
	return (
		<Main>
			<RichText data={termsOfUse.content} />
		</Main>
	)
}
