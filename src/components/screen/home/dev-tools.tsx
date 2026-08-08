import { Container } from '@/components/layout/elements'
import { Entrance } from '@/components/motion-primitives'
import { Services } from '@/components/screen/home/services'
import { SignedInContent } from '@/components/screen/home/signed-in-content'
import { SignedOutContent } from '@/components/screen/home/signed-out-content'

import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui'

export const DevTools = () => {
	return (
		<Container
			variant="muted"
			className="grid-4 grid md:grid-cols-2 md:gap-8"
			rootClassName="relative isolate bg-gradient-to-b from-muted/50 dark:from-muted/75 to-muted/0"
			render={<Entrance render={<section />} />}
		>
			<div
				className="absolute inset-0 z-[-1] opacity-20"
				style={{
					backgroundImage: `url('/images/pattern-plus.svg')`,
					backgroundSize: '60px 60px',
					backgroundRepeat: 'repeat',
					backgroundPosition: '15px 15px',
					maskImage: 'linear-gradient(to bottom, black, transparent)',
				}}
			/>
			<Services />
			<SignedIn>
				<SignedInContent />
			</SignedIn>
			<SignedOut>
				<SignedOutContent />
			</SignedOut>
		</Container>
	)
}
