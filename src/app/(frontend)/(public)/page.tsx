import { Container, Section } from '@/components/layout'
import { Entrance } from '@/components/motion-primitives'
import { DevTools } from '@/components/screen/home/dev-tools'
import { Features } from '@/components/screen/home/features'
import { ThemeColors } from '@/components/screen/home/theme-colors'
import { Main } from '@/components/shell/main'

export default function Home() {
	return (
		<Main className="my-0 px-0 md:px-0">
			<Section aria-labelledby="home-title" spacing="lg">
				<Container>
					<Entrance>
						<Section.Header>
							<Section.Eyebrow>Home</Section.Eyebrow>
							<Section.Title id="home-title" render={<h1 />}>
								Payload Starter Kit
							</Section.Title>
							<Section.Description>
								An opinionated starter built with PayloadCMS, PayloadAuth, and coss UI.
							</Section.Description>
						</Section.Header>
					</Entrance>
				</Container>

				<Section.Content className="mt-12 space-y-12 sm:mt-16 sm:space-y-16 lg:mt-28 lg:space-y-28">
					<Features />
					<DevTools />
					<ThemeColors />
				</Section.Content>
			</Section>
		</Main>
	)
}
