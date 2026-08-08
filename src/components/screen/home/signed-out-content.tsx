import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { Entrance } from '@/components/motion-primitives'
import { Button } from '@/components/ui/button'
import { Card, CardPanel } from '@/components/ui/card'
import { P } from '@/components/ui/typography'

export const SignedOutContent = () => {
	return (
		<Container>
			<Entrance.Stagger effect="fade" className="flex flex-col gap-12">
				<Entrance.Stagger.Item key="authentication">
					<Card className="max-w-md backdrop-blur-xs">
						<CardPanel className="flex items-center justify-between">
							<P>Authentication</P>
							<Button render={<Link href="/sign-in?redirectTo=/" />}>Sign in</Button>
						</CardPanel>
					</Card>
				</Entrance.Stagger.Item>
			</Entrance.Stagger>
		</Container>
	)
}
