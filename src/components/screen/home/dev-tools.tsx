import { Container } from '@/components/layout'
import { Entrance } from '@/components/motion-primitives'
import { Services } from '@/components/screen/home/services'
import { SignedInContent } from '@/components/screen/home/signed-in-content'
import { SignedOutContent } from '@/components/screen/home/signed-out-content'

import { SignedIn, SignedOut } from '@daveyplate/better-auth-ui'

export const DevTools = () => {
	return (
		<section className="from-muted/50 to-muted/0 dark:from-muted/75 relative isolate -mx-4 bg-gradient-to-b px-4 py-12 sm:py-16 md:-mx-8 md:px-8 lg:py-28">
			<Container
				className="grid-4 grid md:grid-cols-2 md:gap-8"
				gutter="none"
				render={<Entrance />}
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
		</section>
	)
}
