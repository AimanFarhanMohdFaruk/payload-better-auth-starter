import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Button } from '@/components/ui/button'
import { Card, CardPanel } from '@/components/ui/card'
import { P } from '@/components/ui/typography'

export const SignedOutContent = () => {
	return (
		<Container>
			<AnimatedGroup preset="fade" className="flex flex-col gap-12">
				<Card className="max-w-md backdrop-blur-xs">
					<CardPanel className="flex items-center justify-between">
						<P>Authentication</P>
						<Button render={<Link href="/sign-in?redirectTo=/" />}>Sign in</Button>
					</CardPanel>
				</Card>
			</AnimatedGroup>
		</Container>
	)
}
