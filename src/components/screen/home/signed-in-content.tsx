import { Container } from '@/components/layout/elements'
import { Entrance } from '@/components/motion-primitives'
import { UserCard } from '@/components/screen/home/user-card'

export const SignedInContent = () => {
	return (
		<Container>
			<Entrance.Stagger effect="fade" className="flex flex-col gap-12">
				<Entrance.Stagger.Item key="user-card">
					<UserCard />
				</Entrance.Stagger.Item>
			</Entrance.Stagger>
		</Container>
	)
}
